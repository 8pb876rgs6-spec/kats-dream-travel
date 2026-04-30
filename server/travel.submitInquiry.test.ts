import { describe, it, expect, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";

// Mock the email and SMS services
vi.mock("./_core/emailer", () => ({
  sendInquiryEmail: vi.fn(async (data, textContent) => {
    // Store the email content for inspection
    (global as any).lastEmailContent = textContent;
    return true;
  }),
}));

vi.mock("./_core/sms", () => ({
  sendInquirySMS: vi.fn(async () => {
    return true;
  }),
}));

describe("travel.submitInquiry", () => {
  beforeEach(() => {
    (global as any).lastEmailContent = null;
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
    expect(result.emailSent).toBe(true);
    expect(result.smsSent).toBe(true);

    // Verify the email content
    const emailContent = (global as any).lastEmailContent;
    expect(emailContent).toBeDefined();

    // Verify the content is plain-text and NOT HTML
    expect(emailContent).not.toContain("<!DOCTYPE html>");
    expect(emailContent).not.toContain("<html>");
    expect(emailContent).not.toContain("<style>");
    expect(emailContent).not.toContain("<div");

    // Verify the email content contains all the expected information
    expect(emailContent).toContain("KAT'S DREAM DESTINATION TRAVEL");
    expect(emailContent).toContain("CONTACT INFORMATION");
    expect(emailContent).toContain("John Doe");
    expect(emailContent).toContain("john@example.com");
    expect(emailContent).toContain("(555) 123-4567");
    expect(emailContent).toContain("TRAVEL DETAILS");
    expect(emailContent).toContain("Vacation Type: Cruise");
    expect(emailContent).toContain("Cruise Terminal/Airport: Port Canaveral");
    expect(emailContent).toContain("Earliest Departure: 2026-06-15");
    expect(emailContent).toContain("Number of Nights: 7 nights");
    expect(emailContent).toContain("Travelers: 2 adults, 2 children (ages 8, 12)");
    expect(emailContent).toContain("Rooms/Cabins: 1 cabin - 2 adults, 2 children");
    expect(emailContent).toContain("Past Cruise Guests: John Doe, 01/15/1980");
    expect(emailContent).toContain("Cabin Preference: Balcony");
    expect(emailContent).toContain("ADD-ONS");
    expect(emailContent).toContain("Prepaid gratuities");
    expect(emailContent).toContain("Travel protection insurance");
    expect(emailContent).toContain("ADDITIONAL DETAILS");
    expect(emailContent).toContain(
      "We would love a family-friendly cruise with activities for kids."
    );
    expect(emailContent).toContain("katsddtravel@gmail.com");
    expect(emailContent).toContain("(281) 636-4873");
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

    const emailContent = (global as any).lastEmailContent;
    expect(emailContent).toBeDefined();
    expect(emailContent).toContain("Earliest Departure: Not specified");
    expect(emailContent).toContain("Past Cruise Guests: N/A");
    expect(emailContent).toContain("Requested: None");
    expect(emailContent).not.toContain("ADDITIONAL DETAILS");
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

    const emailContent = (global as any).lastEmailContent;
    expect(emailContent).toBeDefined();
    expect(emailContent).toContain("Requested: Prepaid gratuities");
    expect(emailContent).not.toContain("Travel protection insurance");
  });
});
