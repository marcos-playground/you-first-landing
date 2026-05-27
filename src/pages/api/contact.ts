import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const requiredFields = ["firstName", "lastName", "email", "projectType", "message"] as const;

type ContactField = (typeof requiredFields)[number] | "phone";

function getFormValue(formData: FormData, field: ContactField): string {
  const value = formData.get(field);

  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function jsonResponse(body: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return jsonResponse({ success: false, error: "Please submit the contact form data." }, 400);
  }

  const submission = {
    firstName: getFormValue(formData, "firstName"),
    lastName: getFormValue(formData, "lastName"),
    email: getFormValue(formData, "email"),
    phone: getFormValue(formData, "phone"),
    projectType: getFormValue(formData, "projectType"),
    message: getFormValue(formData, "message"),
  };

  const missingFields = requiredFields.filter((field) => !submission[field]);

  if (missingFields.length > 0) {
    return jsonResponse({ success: false, error: "Please complete all required fields.", missingFields }, 400);
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !toEmail || !fromEmail) {
    return jsonResponse({ success: false, error: "Contact email configuration is missing." }, 500);
  }

  const resend = new Resend(resendApiKey);
  const fullName = `${submission.firstName} ${submission.lastName}`;
  const notificationRows = [
    ["Name", fullName],
    ["Email", submission.email],
    ["Phone", submission.phone || "Not provided"],
    ["Project Type", submission.projectType],
    ["Message", submission.message],
  ];

  try {
    await Promise.all([
      resend.emails.send({
        from: fromEmail,
        to: toEmail,
        replyTo: submission.email,
        subject: `New Contact Form Submission - ${fullName}`,
        html: `
          <h1>New Contact Form Submission</h1>
          <table cellpadding="8" cellspacing="0" border="0" style="border-collapse: collapse;">
            <tbody>
              ${notificationRows
                .map(
                  ([label, value]) => `
                    <tr>
                      <th align="left" style="border: 1px solid #ddd; background: #f7f7f7;">${escapeHtml(label)}</th>
                      <td style="border: 1px solid #ddd;">${escapeHtml(value).replaceAll("\n", "<br />")}</td>
                    </tr>
                  `,
                )
                .join("")}
            </tbody>
          </table>
        `,
      }),
      resend.emails.send({
        from: fromEmail,
        to: submission.email,
        subject: "We received your message!",
        html: `
          <p>Hi ${escapeHtml(submission.firstName)},</p>
          <p>Thanks for reaching out. We'll be in touch within 1-2 business days.</p>
        `,
      }),
    ]);
  } catch (error) {
    console.error("Failed to send contact form email", error);

    return jsonResponse({ success: false, error: "Unable to send your message right now." }, 500);
  }

  return jsonResponse({ success: true }, 200);
};
