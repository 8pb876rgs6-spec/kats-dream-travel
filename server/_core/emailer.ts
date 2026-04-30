import nodemailer from "nodemailer";
import { ENV } from "./env";

let transporter: nodemailer.Transporter | null = null;

/**
 * Initialize Gmail transporter for sending emails
 */
function getTransporter(): nodemailer.Transporter {
  if (transporter) {
    return transporter;
  }

  if (!ENV.gmailEmail || !ENV.gmailPassword) {
    throw new Error("Gmail credentials not configured");
  }

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: ENV.gmailEmail,
      pass: ENV.gmailPassword,
    },
  });

  return transporter;
}

export type EmailPayload = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

/**
 * Send email via Gmail SMTP
 */
export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  try {
    const transport = getTransporter();

    const result = await transport.sendMail({
      from: ENV.gmailEmail,
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
    });

    console.log(`[Email] Sent to ${payload.to}: ${payload.subject}`);
    return true;
  } catch (error) {
    console.error("[Email] Error sending email:", error);
    return false;
  }
}

/**
 * Send travel inquiry email to Kat
 */
export async function sendInquiryEmail(
  inquiryData: {
    name: string;
    email: string;
    phone: string;
    vacationType: string;
    cruiseTerminal: string;
    departureDate?: string;
    nights: string;
    travelers: string;
    roomsCabins: string;
    pastGuests?: string;
    cabinPreference: string;
    gratuities: boolean;
    travelProtection: boolean;
    message?: string;
  },
  textContent: string
): Promise<boolean> {
  const addOns = [
    inquiryData.gratuities && "Prepaid gratuities",
    inquiryData.travelProtection && "Travel protection insurance",
  ]
    .filter(Boolean)
    .join(", ") || "None";

  return sendEmail({
    to: ENV.gmailEmail || "katsddtravel@gmail.com",
    subject: `New Travel Inquiry from ${inquiryData.name}`,
    text: textContent,
  });
}
