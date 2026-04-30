import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { notifyOwner } from "./_core/notification";
import { sendInquirySMS } from "./_core/sms";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  travel: router({
    submitInquiry: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Valid email is required"),
          phone: z.string().min(1, "Phone is required"),
          vacationType: z.string().min(1, "Vacation type is required"),
          cruiseTerminal: z.string().min(1, "Cruise terminal/airport is required"),
          departureDate: z.string().optional(),
          nights: z.string().min(1, "Number of nights is required"),
          travelers: z.string().min(1, "Traveler info is required"),
          roomsCabins: z.string().min(1, "Rooms/cabins info is required"),
          pastGuests: z.string().optional(),
          cabinPreference: z.string().min(1, "Cabin preference is required"),
          gratuities: z.boolean().default(false),
          travelProtection: z.boolean().default(false),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const addOns = [
          input.gratuities && "Prepaid gratuities",
          input.travelProtection && "Travel protection insurance",
        ]
          .filter(Boolean)
          .join(", ") || "None";

        // Plain-text email content with clean formatting
        const textContent = `
✈️ KAT'S DREAM DESTINATION TRAVEL
Personalized Luxury Travel Agency
${'='.repeat(60)}

NEW TRAVEL INQUIRY RECEIVED

CONTACT INFORMATION
${'-'.repeat(60)}
Name: ${input.name}
Email: ${input.email}
Phone: ${input.phone}

TRAVEL DETAILS
${'-'.repeat(60)}
Vacation Type: ${input.vacationType}
Cruise Terminal/Airport: ${input.cruiseTerminal}
Earliest Departure: ${input.departureDate || "Not specified"}
Number of Nights: ${input.nights}
Travelers: ${input.travelers}
Rooms/Cabins: ${input.roomsCabins}
Past Cruise Guests: ${input.pastGuests || "N/A"}
Cabin Preference: ${input.cabinPreference}

ADD-ONS
${'-'.repeat(60)}
Requested: ${addOns}
${input.message ? `\nADDITIONAL DETAILS\n${'-'.repeat(60)}\n${input.message}` : ''}

${'='.repeat(60)}
This inquiry was submitted through your Kat's Dream Destination Travel website.
Reply directly to the customer's email address to follow up.

From: Kat's Dream Destination Travel
Email: katsddtravel@gmail.com
Phone: (281) 636-4873
Personalized travel planning for cruises, trains, and unforgettable experiences
        `.trim();

        // Send notification to owner with plain-text content
        const notificationSent = await notifyOwner({
          title: `New Travel Inquiry from ${input.name}`,
          content: textContent,
        });

        // Send SMS alert to Kat's phone via Verizon email-to-SMS gateway
        const smsSent = await sendInquirySMS({
          name: input.name,
          email: input.email,
          vacationType: input.vacationType,
          cruiseTerminal: input.cruiseTerminal,
        });

        return {
          success: true,
          message: "Inquiry submitted successfully",
          notificationSent,
          smsSent,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
