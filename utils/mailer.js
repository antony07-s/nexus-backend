import { Resend } from "resend";

let hasWarnedAboutMissingConfig = false;

export const sendContactNotification = async (submission) => {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.NOTIFY_EMAIL;

  // Email is optional. Saving the enquiry must never fail because notifications
  // have not been configured for a local or preview environment.
  if (!apiKey || !recipient) {
    if (!hasWarnedAboutMissingConfig) {
      console.warn("Contact email notification skipped: RESEND_API_KEY or NOTIFY_EMAIL is not configured.");
      hasWarnedAboutMissingConfig = true;
    }
    return;
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.RESEND_FROM || "Nexus Design & Built <onboarding@resend.dev>",
      to: recipient,
      subject: `New contact form message: ${submission.name}`,
      html: `
        <h2>New project inquiry</h2>
        <p><strong>Name:</strong> ${submission.name}</p>
        <p><strong>Email:</strong> ${submission.email}</p>
        <p><strong>Contact No:</strong> ${submission.contactNo}</p>
        <p><strong>Budget:</strong> ${submission.budget || "—"}</p>
        <p><strong>Project Type:</strong> ${submission.projectType}</p>
        <p><strong>Site Address:</strong> ${submission.siteAddress || "—"}</p>
        <p><strong>Message:</strong> ${submission.message || "—"}</p>
      `,
    });
  } catch (err) {
    console.error("Failed to send notification email:", err.message);
  }
};
