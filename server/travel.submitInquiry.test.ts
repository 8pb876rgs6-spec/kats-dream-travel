import { describe, it, expect, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";

// Mock the notifyOwner function
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn(async (payload) => {
    // Store the payload for inspection
    (global as any).lastNotificationPayload = payload;
    return true;
  }),
}));

describe("travel.submitInquiry", () => {
  beforeEach(() => {
    (global as any).lastNotificationPayload = null;
  });

  it("should submit an inquiry and send a plain-text email notification", async () => {
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

    // Verify the notification was sent
    const payload = (global as any).lastNotificationPayload;
    expect(payload).toBeDefined();
    expect(payload.title).toContain("New Travel Inquiry from John Doe");

    // Verify the content is plain-text and NOT HTML
    expect(payload.content).not.toContain("<!DOCTYPE html>");
    expect(payload.content).not.toContain("<html>");
    expect(payload.content).not.toContain("<style>");
    expect(payload.content).not.toContain("<div");

    // Verify the content contains all the expected information
    expect(payload.content).toContain("KAT'S DREAM DESTINATION TRAVEL");
    expect(payload.content).toContain("CONTACT INFORMATION");
    expect(payload.content).toContain("John Doe");
    expect(payload.content).toContain("john@example.com");
    expect(payload.content).toContain("(555) 123-4567");
    expect(payload.content).toContain("TRAVEL DETAILS");
    expect(payload.content).toContain("Vacation Type: Cruise");
    expect(payload.content).toContain("Cruise Terminal/Airport: Port Canaveral");
    expect(payload.content).toContain("Earliest Departure: 2026-06-15");
    expect(payload.content).toContain("Number of Nights: 7 nights");
    expect(payload.content).toContain("Travelers: 2 adults, 2 children (ages 8, 12)");
    expect(payload.content).toContain("Rooms/Cabins: 1 cabin - 2 adults, 2 children");
    expect(payload.content).toContain("Past Cruise Guests: John Doe, 01/15/1980");
    expect(payload.content).toContain("Cabin Preference: Balcony");
    expect(payload.content).toContain("ADD-ONS");
    expect(payload.content).toContain("Prepaid gratuities");
    expect(payload.content).toContain("Travel protection insurance");
    expect(payload.content).toContain("ADDITIONAL DETAILS");
    expect(payload.content).toContain("We would love a family-friendly cruise with activities for kids.");
    expect(payload.content).toContain("katsddtravel@gmail.com");
    expect(payload.content).toContain("(281) 636-4873");
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

    const payload = (global as any).lastNotificationPayload;
    expect(payload.content).toContain("Earliest Departure: Not specified");
    expect(payload.content).toContain("Past Cruise Guests: N/A");
    expect(payload.content).toContain("Requested: None");
    expect(payload.content).not.toContain("ADDITIONAL DETAILS");
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

    const payload = (global as any).lastNotificationPayload;
    expect(payload.content).toContain("Requested: Prepaid gratuities");
    expect(payload.content).not.toContain("Travel protection insurance");
  });
});
