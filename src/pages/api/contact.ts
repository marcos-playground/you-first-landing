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

const brand = {
  white: "#FAF9F7",
  cream: "#F3EDE4",
  sand: "#D9D2C7",
  stone: "#B8AFA3",
  charcoal: "#2A2A2A",
  charcoalLight: "#5A5A5A",
  ember: "#E8611A",
  emberLight: "#F4845F",
};

const logoContentId = "you-first-logo";
const logoAttachment = {
  content:
    "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",
  filename: "you-first-logo.png",
  contentType: "image/png",
  contentId: logoContentId,
};

function renderEmailLayout({
  eyebrow,
  title,
  preview,
  body,
}: {
  eyebrow: string;
  title: string;
  preview: string;
  body: string;
}): string {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(title)}</title>
      </head>
      <body style="margin: 0; padding: 0; background: ${brand.cream}; color: ${brand.charcoal}; font-family: Manrope, Arial, sans-serif;">
        <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; color: transparent;">${escapeHtml(preview)}</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background: ${brand.cream};">
          <tr>
            <td align="center" style="padding: 32px 16px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 640px; border-collapse: collapse; background: ${brand.white}; border: 1px solid ${brand.sand};">
                <tr>
                  <td style="background: ${brand.charcoal}; padding: 28px 32px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                      <tr>
                        <td style="width: 76px; vertical-align: middle;">
                          <img src="cid:${logoContentId}" width="64" height="64" alt="You First" style="display: block; width: 64px; height: 64px; border: 0; border-radius: 12px; background: ${brand.white};" />
                        </td>
                        <td style="vertical-align: middle; padding-left: 18px;">
                          <div style="color: ${brand.emberLight}; font-size: 12px; font-weight: 800; letter-spacing: 1.6px; text-transform: uppercase;">${escapeHtml(eyebrow)}</div>
                          <h1 style="margin: 8px 0 0; color: ${brand.white}; font-family: Georgia, 'Times New Roman', serif; font-size: 30px; line-height: 1.12; font-weight: 700;">${escapeHtml(title)}</h1>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="height: 6px; background: ${brand.ember}; line-height: 6px; font-size: 1px;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="padding: 34px 32px 30px;">
                    ${body}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function renderNotificationEmail({
  fullName,
  rows,
}: {
  fullName: string;
  rows: string[][];
}): string {
  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <th align="left" style="width: 34%; padding: 14px 16px; border-bottom: 1px solid ${brand.sand}; background: ${brand.cream}; color: ${brand.charcoal}; font-size: 12px; line-height: 1.5; letter-spacing: 0.8px; text-transform: uppercase;">${escapeHtml(label)}</th>
          <td style="padding: 14px 16px; border-bottom: 1px solid ${brand.sand}; color: ${brand.charcoalLight}; font-size: 15px; line-height: 1.6;">${escapeHtml(value).replaceAll("\n", "<br />")}</td>
        </tr>
      `,
    )
    .join("");

  return renderEmailLayout({
    eyebrow: "New inquiry",
    title: "A new project conversation just landed",
    preview: `New contact form submission from ${fullName}.`,
    body: `
      <p style="margin: 0 0 22px; color: ${brand.charcoalLight}; font-size: 16px; line-height: 1.7;">
        ${escapeHtml(fullName)} sent a message through the website. Reply directly to this email to continue the conversation.
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid ${brand.sand};">
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `,
  });
}

function renderConfirmationEmail({
  firstName,
}: {
  firstName: string;
}): string {
  return renderEmailLayout({
    eyebrow: "Message received",
    title: "Thanks for reaching out",
    preview: "We received your message and will be in touch soon.",
    body: `
      <p style="margin: 0 0 18px; color: ${brand.charcoal}; font-size: 18px; line-height: 1.6;">
        Hi ${escapeHtml(firstName)},
      </p>
      <p style="margin: 0 0 18px; color: ${brand.charcoalLight}; font-size: 16px; line-height: 1.7;">
        Thanks for sharing your project with us. We received your message and will review the details with care.
      </p>
      <p style="margin: 0 0 24px; color: ${brand.charcoalLight}; font-size: 16px; line-height: 1.7;">
        You can expect a response within 1-2 business days. If anything urgent changes in the meantime, simply reply to this email.
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
        <tr>
          <td style="background: ${brand.ember}; padding: 13px 18px;">
            <span style="color: ${brand.white}; font-size: 14px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase;">We are on it</span>
          </td>
        </tr>
      </table>
    `,
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

  const resendApiKey = import.meta.env.RESEND_API_KEY;
  const toEmail = import.meta.env.CONTACT_TO_EMAIL;
  const fromEmail = import.meta.env.CONTACT_FROM_EMAIL;
  console.log("Contact form submission received", {
    submission,
    resendApiKey: !!resendApiKey,
    toEmail: !!toEmail,
    fromEmail: !!fromEmail,
  });

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
        html: renderNotificationEmail({ fullName, rows: notificationRows }),
        text: `New Contact Form Submission

Name: ${fullName}
Email: ${submission.email}
Phone: ${submission.phone || "Not provided"}
Project Type: ${submission.projectType}
Message: ${submission.message}`,
        attachments: [logoAttachment],
      }),
      resend.emails.send({
        from: fromEmail,
        to: submission.email,
        subject: "We received your message!",
        html: renderConfirmationEmail({ firstName: submission.firstName }),
        text: `Hi ${submission.firstName},

Thanks for reaching out. We received your message and will be in touch within 1-2 business days.`,
        attachments: [logoAttachment],
      }),
    ]);
  } catch (error) {
    console.error("Failed to send contact form email", error);

    return jsonResponse({ success: false, error: "Unable to send your message right now." }, 500);
  }

  return jsonResponse({ success: true }, 200);
};
