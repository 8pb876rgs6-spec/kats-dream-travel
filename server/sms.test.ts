import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendSMS, sendInquirySMS } from "./_core/sms";
import * as notificationModule from "./_core/notification";

// Mock the notification service
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn(),
}));

describe("SMS Notifications", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("sendSMS", () => {
    it("should send SMS to Verizon gateway via notification service", async () => {
      vi.mocked(notificationModule.notifyOwner).mockResolvedValueOnce(true);

      const result = await sendSMS({
        phoneNumber: "2816364873",
        message: "Test SMS message",
        carrier: "verizon",
      });

      expect(result).toBe(true);
      expect(notificationModule.notifyOwner).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "SMS Alert",
          content: "Test SMS message",
        })
      );
    });

    it("should truncate messages longer than 160 characters", async () => {
      vi.mocked(notificationModule.notifyOwner).mockResolvedValueOnce(true);

      const longMessage = "a".repeat(200);
      await sendSMS({
        phoneNumber: "2816364873",
        message: longMessage,
        carrier: "verizon",
      });

      const callArgs = vi.mocked(notificationModule.notifyOwner).mock
        .calls[0][0];
      expect(callArgs.content.length).toBeLessThanOrEqual(160);
      expect(callArgs.content).toMatch(/\.\.\.$/);
    });

    it("should support different carriers", async () => {
      vi.mocked(notificationModule.notifyOwner).mockResolvedValue(true);

      const carriers = [
        "verizon",
        "att",
        "tmobile",
        "sprint",
        "uscellular",
      ];

      for (const carrier of carriers) {
        vi.mocked(notificationModule.notifyOwner).mockClear();
        await sendSMS({
          phoneNumber: "2816364873",
          message: "Test",
          carrier: carrier as any,
        });

        expect(notificationModule.notifyOwner).toHaveBeenCalled();
      }
    });

    it("should handle phone numbers with formatting", async () => {
      vi.mocked(notificationModule.notifyOwner).mockResolvedValueOnce(true);

      const result = await sendSMS({
        phoneNumber: "(281) 636-4873",
        message: "Test",
        carrier: "verizon",
      });

      expect(result).toBe(true);
    });

    it("should return false when notification service fails", async () => {
      vi.mocked(notificationModule.notifyOwner).mockResolvedValueOnce(false);

      const result = await sendSMS({
        phoneNumber: "2816364873",
        message: "Test",
        carrier: "verizon",
      });

      expect(result).toBe(false);
    });

    it("should return false on error", async () => {
      vi.mocked(notificationModule.notifyOwner).mockRejectedValueOnce(
        new Error("Service error")
      );

      const result = await sendSMS({
        phoneNumber: "2816364873",
        message: "Test",
        carrier: "verizon",
      });

      expect(result).toBe(false);
    });
  });

  describe("sendInquirySMS", () => {
    it("should send inquiry SMS with formatted message", async () => {
      vi.mocked(notificationModule.notifyOwner).mockResolvedValueOnce(true);

      const result = await sendInquirySMS({
        name: "John Doe",
        email: "john@example.com",
        vacationType: "Cruise",
        cruiseTerminal: "Port Canaveral",
      });

      expect(result).toBe(true);
      expect(notificationModule.notifyOwner).toHaveBeenCalled();

      const callArgs = vi.mocked(notificationModule.notifyOwner).mock
        .calls[0][0];
      expect(callArgs.content).toContain("New inquiry from John Doe");
      expect(callArgs.content).toContain("Cruise");
      expect(callArgs.content).toContain("Port Canaveral");
      expect(callArgs.content).toContain("john@example.com");
    });

    it("should send SMS to Kat's Verizon number", async () => {
      vi.mocked(notificationModule.notifyOwner).mockResolvedValueOnce(true);

      await sendInquirySMS({
        name: "Jane Smith",
        email: "jane@example.com",
        vacationType: "Destination",
        cruiseTerminal: "LAX",
      });

      expect(notificationModule.notifyOwner).toHaveBeenCalled();
    });

    it("should format inquiry data correctly in SMS", async () => {
      vi.mocked(notificationModule.notifyOwner).mockResolvedValueOnce(true);

      await sendInquirySMS({
        name: "Bob Johnson",
        email: "bob@example.com",
        vacationType: "Train Journey",
        cruiseTerminal: "NYC Penn Station",
      });

      const callArgs = vi.mocked(notificationModule.notifyOwner).mock
        .calls[0][0];
      const message = callArgs.content;

      expect(message).toMatch(/Bob Johnson/);
      expect(message).toMatch(/Train Journey/);
      expect(message).toMatch(/NYC Penn Station/);
      expect(message).toMatch(/bob@example.com/);
    });
  });
});
