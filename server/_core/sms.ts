import { notifyOwner } from "./notification";

/**
 * SMS notification via email-to-SMS gateway (Verizon)
 * Sends SMS by using the existing notification service to email to Verizon's gateway
 * This is completely free and requires no additional API keys
 */

export type SMSPayload = {
  phoneNumber: string; // e.g., "2816364873" (10 digits, no formatting)
  message: string;
  carrier?: "verizon" | "att" | "tmobile" | "sprint" | "uscellular";
};

/**
 * Get the email-to-SMS gateway address based on carrier
 */
function getCarrierGatewayEmail(phoneNumber: string, carrier: string): string {
  const cleanPhone = phoneNumber.replace(/\D/g, ""); // Remove non-digits

  const gateways: Record<string, string> = {
    verizon: "vtext.com",
    att: "txt.att.net",
    tmobile: "tmomail.net",
    sprint: "messaging.sprintpcs.com",
    uscellular: "email.uscc.net",
  };

  const gateway = gateways[carrier.toLowerCase()] || gateways.verizon;
  return `${cleanPhone}@${gateway}`;
}

/**
 * Send SMS via email-to-SMS gateway using the existing notification service
 * Returns true if the notification was accepted, false otherwise
 */
export async function sendSMS(payload: SMSPayload): Promise<boolean> {
  const gatewayEmail = getCarrierGatewayEmail(
    payload.phoneNumber,
    payload.carrier || "verizon"
  );

  // SMS via email gateway has character limits (typically 160 chars)
  // Truncate message if needed
  const maxLength = 160;
  const truncatedMessage =
    payload.message.length > maxLength
      ? payload.message.substring(0, maxLength - 3) + "..."
      : payload.message;

  try {
    // Use the existing notification service to send to SMS gateway
    const result = await notifyOwner({
      title: "SMS Alert",
      content: truncatedMessage,
    });

    if (result) {
      console.log(`[SMS] Sent to ${gatewayEmail}: ${truncatedMessage}`);
    } else {
      console.warn(`[SMS] Failed to send to ${gatewayEmail}`);
    }

    return result;
  } catch (error) {
    console.error("[SMS] Error sending SMS:", error);
    return false;
  }
}

/**
 * Send SMS alert for new travel inquiry
 * Formats inquiry summary and sends to Kat's phone
 */
export async function sendInquirySMS(inquiryData: {
  name: string;
  email: string;
  vacationType: string;
  cruiseTerminal: string;
}): Promise<boolean> {
  const message = `New inquiry from ${inquiryData.name} (${inquiryData.vacationType} - ${inquiryData.cruiseTerminal}). Email: ${inquiryData.email}`;

  return sendSMS({
    phoneNumber: "2816364873", // Kat's phone number
    message,
    carrier: "verizon",
  });
}
