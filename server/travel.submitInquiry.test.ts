import { describe, it, expect, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";

// Mock the notifyOwner function
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn(async (payload) => {
    // Store all notifications for inspection
    if (!(global as any).allNotifications) {
      (global as any).allNotifications = [];
    }
    (global as any).allNotifications.push(payload);
    return true;
  }),
}));

describe("travel.submitInquiry", () => {
  beforeEach(() => {
    (global as any).allNotifications = [];
  });

  it("should submit an inquiry and send email and SMS notifications", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const result = await caller.travel.submitInquiry({
      name: "John Doe",
      email: "john@example.com",
      phone: "(555) 123-4567",
      vacationType: "Cruise",
      cruiseTerminal: "Port Canaveral",
      departureDate: "2026-06-15",
      nights: "7 nights",
      travelers: "2 adults, 2 children (ages 8, 12)",
      roomsCabins: "1 cabin - 2 adults, 2 children",
      pastGuests: "John Doe, 01/15/1980",
      cabinPreference: "Balcony",
      gratuities: true,
      travelProtection: true,
      message: "We would love a family-friendly cruise with activities for kids.",
    });

    expect(result.success).toBe(true);
    expect(result.message).toBe("Inquiry submitted successfully");

    // Verify both email and SMS were sent
    const allNotifications = (global as any).allNotifications;
    expect(allNotifications.length).toBeGreaterThanOrEqual(2);

    // Find the email notification (contains full details)
    const emailNotification = allNotifications.find(
      (n: any) =>
        n.title?.includes("New Travel Inquiry") &&
        n.content?.includes("CONTACT INFORMATION")
    );
    expect(emailNotification).toBeDefined();
    expect(emailNotification.title).toContain("New Travel Inquiry from John Doe");

    // Verify the email content is plain-text and NOT HTML
    expect(emailNotification.content).not.toContain("<!DOCTYPE html>");
    expect(emailNotification.content).not.toContain("<html>");
    expect(emailNotification.content).not.toContain("<style>");
    expect(emailNotification.content).not.toContain("<div");

    // Verify the email content contains all the expected information
    expect(emailNotification.content).toContain(
      "KAT'S DREAM DESTINATION TRAVEL"
    );
    expect(emailNotification.content).toContain("CONTACT INFORMATION");
    expect(emailNotification.content).toContain("John Doe");
    expect(emailNotification.content).toContain("john@example.com");
    expect(emailNotification.content).toContain("(555) 123-4567");
    expect(emailNotification.content).toContain("TRAVEL DETAILS");
    expect(emailNotification.content).toContain("Vacation Type: Cruise");
    expect(emailNotification.content).toContain(
      "Cruise Terminal/Airport: Port Canaveral"
    );
    expect(emailNotification.content).toContain("Earliest Departure: 2026-06-15");
    expect(emailNotification.content).toContain("Number of Nights: 7 nights");
    expect(emailNotification.content).toContain(
      "Travelers: 2 adults, 2 children (ages 8, 12)"
    );
    expect(emailNotification.content).toContain(
      "Rooms/Cabins: 1 cabin - 2 adults, 2 children"
    );
    expect(emailNotification.content).toContain(
      "Past Cruise Guests: John Doe, 01/15/1980"
    );
    expect(emailNotification.content).toContain("Cabin Preference: Balcony");
    expect(emailNotification.content).toContain("ADD-ONS");
    expect(emailNotification.content).toContain("Prepaid gratuities");
    expect(emailNotification.content).toContain("Travel protection insurance");
    expect(emailNotification.content).toContain("ADDITIONAL DETAILS");
    expect(emailNotification.content).toContain(
      "We would love a family-friendly cruise with activities for kids."
    );
    expect(emailNotification.content).toContain("katsddtravel@gmail.com");
    expect(emailNotification.content).toContain("(281) 636-4873");

    // Verify SMS was also sent
    const smsNotification = allNotifications.find(
      (n: any) => n.title === "SMS Alert"
    );
    expect(smsNotification).toBeDefined();
    expect(smsNotification.content).toContain("New inquiry from John Doe");
    expect(smsNotification.content).toContain("Cruise");
    expect(smsNotification.content).toContain("Port Canaveral");
    expect(smsNotification.content).toContain("john@example.com");
  });

  it("should handle optional fields correctly", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const result = await caller.travel.submitInquiry({
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "(555) 987-6543",
      vacationType: "Destination",
      cruiseTerminal: "LAX",
      departureDate: "",
      nights: "5 nights",
      travelers: "1 adult",
      roomsCabins: "1 room",
      pastGuests: "",
      cabinPreference: "Interior",
      gratuities: false,
      travelProtection: false,
      message: "",
    });

    expect(result.success).toBe(true);

    const allNotifications = (global as any).allNotifications;
    const emailNotification = allNotifications.find(
      (n: any) =>
        n.title?.includes("New Travel Inquiry") &&
        n.content?.includes("CONTACT INFORMATION")
    );
    expect(emailNotification).toBeDefined();
    expect(emailNotification.content).toContain(
      "Earliest Departure: Not specified"
    );
    expect(emailNotification.content).toContain("Past Cruise Guests: N/A");
    expect(emailNotification.content).toContain("Requested: None");
    expect(emailNotification.content).not.toContain("ADDITIONAL DETAILS");
  });

  it("should format add-ons correctly when only one is selected", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const result = await caller.travel.submitInquiry({
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "(555) 555-5555",
      vacationType: "Cruise",
      cruiseTerminal: "Miami",
      departureDate: "2026-07-01",
      nights: "10+ nights",
      travelers: "4 adults",
      roomsCabins: "2 cabins",
      pastGuests: "",
      cabinPreference: "Suite",
      gratuities: true,
      travelProtection: false,
      message: "",
    });

    expect(result.success).toBe(true);

    const allNotifications = (global as any).allNotifications;
    const emailNotification = allNotifications.find(
      (n: any) =>
        n.title?.includes("New Travel Inquiry") &&
        n.content?.includes("CONTACT INFORMATION")
    );
    expect(emailNotification).toBeDefined();
    expect(emailNotification.content).toContain(
      "Requested: Prepaid gratuities"
    );
    expect(emailNotification.content).not.toContain(
      "Travel protection insurance"
    );
  });
});
