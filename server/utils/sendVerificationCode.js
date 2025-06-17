import { generateVerificationOtpEmailTemplate } from "./emailTemplates.js";
import { sendEmail } from "./sendEmail.js";

export async function sendVerificationCode(verificationCode, email, res) {
  try {
    const message = generateVerificationOtpEmailTemplate(verificationCode);

    // ✅ Add await here
    await sendEmail({
      email,
      subject: "Verification Code (Bookaura Library Management System)",
      message,
    });

    res.status(200).json({
      success: true,
      message: "Verification code sent successfully.",
    });
  } catch (error) {
    console.error("Error sending verification email:", error); // ✅ Log actual error
    return res.status(500).json({
      success: false,
      message: "Verification code failed to send",
    });
  }
}
