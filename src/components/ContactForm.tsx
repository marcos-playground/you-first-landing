import { type FormEvent, useState } from "react";

type ProjectType = {
  value: string;
  label: string;
};

type ContactFormProps = {
  projectTypes: ProjectType[];
  submitLabel: string;
};

type FormStatus = "idle" | "loading" | "success" | "error";

const feedbackStyles = {
  success: {
    background: "#ecfdf3",
    border: "1px solid #bbf7d0",
    color: "#166534",
  },
  error: {
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#991b1b",
  },
};

export default function ContactForm({ projectTypes, submitLabel }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = event.currentTarget;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: new FormData(form),
      });
      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(result?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMsg(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        style={{ ...feedbackStyles.success, borderRadius: "8px", padding: "1rem", lineHeight: 1.5 }}
      >
        Thanks for reaching out. We received your message and will be in touch within 1-2 business days.
      </div>
    );
  }

  return (
    <>
      {status === "error" && (
        <div
          role="alert"
          style={{ ...feedbackStyles.error, borderRadius: "8px", marginBottom: "1.25rem", padding: "1rem", lineHeight: 1.5 }}
        >
          {errorMsg}
        </div>
      )}

      <form className="site-form" onSubmit={handleSubmit}>
        <div className="site-form-row">
          <div className="site-form-group">
            <label htmlFor="firstName" className="site-form-label">
              First Name
            </label>
            <input type="text" id="firstName" name="firstName" required className="site-form-input" placeholder="John" />
          </div>
          <div className="site-form-group">
            <label htmlFor="lastName" className="site-form-label">
              Last Name
            </label>
            <input type="text" id="lastName" name="lastName" required className="site-form-input" placeholder="Doe" />
          </div>
        </div>

        <div className="site-form-group">
          <label htmlFor="email" className="site-form-label">
            Email
          </label>
          <input type="email" id="email" name="email" required className="site-form-input" placeholder="john@example.com" />
        </div>

        <div className="site-form-group">
          <label htmlFor="phone" className="site-form-label">
            Phone
          </label>
          <input type="tel" id="phone" name="phone" className="site-form-input" placeholder="(555) 123-4567" />
        </div>

        <div className="site-form-group">
          <label htmlFor="projectType" className="site-form-label">
            Project Type
          </label>
          <select id="projectType" name="projectType" required className="site-form-input site-form-select" defaultValue="">
            <option value="" disabled>
              Select a project type
            </option>
            {projectTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="site-form-group">
          <label htmlFor="message" className="site-form-label">
            Tell us about your project
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="site-form-input site-form-textarea"
            placeholder="Describe your project, timeline, budget range, and any other details..."
          />
        </div>

        <button type="submit" className="site-btn site-btn-primary" style={{ width: "100%" }} disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : submitLabel}
        </button>
      </form>
    </>
  );
}
