import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock nodemailer BEFORE importing emailer
vi.mock("nodemailer", () => ({
  default: {
    createTransport: vi.fn(),
  },
}));

import { sendEmail, sendInquiryEmail } from "./_core/emailer";
import nodemailer from "nodemailer";

describe("Email Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("sendEmail", () => {
    it("should send email successfully", async () => {
      const mockSendMail = vi.fn().mockResolvedValue({ messageId: "123" });
      vi.mocked(nodemailer.createTransport).mockReturnValue({
        sendMail: mockSendMail,
      } as any);

      const result = await sendEmail({
        to: "test@example.com",
        subject: "Test Subject",
        text: "Test content",
      });

      expect(result).toBe(true);
    });


  });

  describe("sendInquiryEmail", () => {
    it("should send inquiry email successfully", async () => {
      const mockSendMail = vi.fn().mockResolvedValue({ messageId: "123" });
      vi.mocked(nodemailer.createTransport).mockReturnValue({
        sendMail: mockSendMail,
      } as any);

      const result = await sendInquiryEmail(
        {
          name: "John Doe",
          email: "john@example.com",
          phone: "(555) 123-4567",
          vacationType: "Cruise",
          cruiseTerminal: "Port Canaveral",
          departureDate: "2026-06-15",
          nights: "7 nights",
          travelers: "2 adults, 2 children",
          roomsCabins: "1 cabin",
          pastGuests: "John Doe",
          cabinPreference: "Balcony",
          gratuities: true,
          travelProtection: true,
          message: "Test message",
        },
        "Test content"
      );

      expect(result).toBe(true);
    });

    it("should return true on successful send", async () => {
      const mockSendMail = vi.fn().mockResolvedValue({ messageId: "123" });
      vi.mocked(nodemailer.createTransport).mockReturnValue({
        sendMail: mockSendMail,
      } as any);

      const result = await sendInquiryEmail(
        {
          name: "Bob Johnson",
          email: "bob@example.com",
          phone: "(555) 555-5555",
          vacationType: "Cruise",
          cruiseTerminal: "Miami",
          nights: "10 nights",
          travelers: "4 adults",
          roomsCabins: "2 cabins",
          cabinPreference: "Suite",
          gratuities: true,
          travelProtection: false,
        },
        "Test content"
      );

      expect(result).toBe(true);
    });
  });
});
