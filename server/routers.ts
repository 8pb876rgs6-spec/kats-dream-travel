import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { notifyOwner } from "./_core/notification";

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

        // HTML email template with Kat's branding
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 8px; }
    .header { background: linear-gradient(135deg, #0a1628 0%, #1e3a5f 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; letter-spacing: 1px; }
    .tagline { font-size: 14px; opacity: 0.9; }
    .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
    .section { margin-bottom: 25px; }
    .section-title { font-size: 14px; font-weight: bold; color: #1e3a5f; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; border-bottom: 2px solid #3b82f6; padding-bottom: 8px; }
    .detail-row { display: flex; margin-bottom: 8px; }
    .detail-label { font-weight: 600; color: #0a1628; width: 180px; }
    .detail-value { color: #555; flex: 1; }
    .footer { background: #0a1628; color: white; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; margin-top: 0; }
    .footer-text { margin: 5px 0; }
    .sender-info { color: #3b82f6; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">✈️ Kat's Dream Destination</div>
      <div class="tagline">Personalized Luxury Travel Agency</div>
    </div>
    <div class="content">
      <p style="font-size: 16px; color: #0a1628; margin-bottom: 20px;"><strong>New Travel Inquiry Received</strong></p>
      
      <div class="section">
        <div class="section-title">Contact Information</div>
        <div class="detail-row">
          <div class="detail-label">Name:</div>
          <div class="detail-value">${input.name}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Email:</div>
          <div class="detail-value"><a href="mailto:${input.email}" style="color: #3b82f6; text-decoration: none;">${input.email}</a></div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Phone:</div>
          <div class="detail-value"><a href="tel:${input.phone}" style="color: #3b82f6; text-decoration: none;">${input.phone}</a></div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Travel Details</div>
        <div class="detail-row">
          <div class="detail-label">Vacation Type:</div>
          <div class="detail-value">${input.vacationType}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Cruise Terminal/Airport:</div>
          <div class="detail-value">${input.cruiseTerminal}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Earliest Departure:</div>
          <div class="detail-value">${input.departureDate || "Not specified"}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Number of Nights:</div>
          <div class="detail-value">${input.nights}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Travelers:</div>
          <div class="detail-value">${input.travelers}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Rooms/Cabins:</div>
          <div class="detail-value">${input.roomsCabins}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Past Cruise Guests:</div>
          <div class="detail-value">${input.pastGuests || "N/A"}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Cabin Preference:</div>
          <div class="detail-value">${input.cabinPreference}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Add-Ons</div>
        <div class="detail-row">
          <div class="detail-label">Requested:</div>
          <div class="detail-value">${addOns}</div>
        </div>
      </div>

      ${input.message ? `
      <div class="section">
        <div class="section-title">Additional Details</div>
        <p style="color: #555; white-space: pre-wrap;">${input.message}</p>
      </div>
      ` : ""}

      <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666;">
        This inquiry was submitted through your Kat's Dream Destination Travel website. Reply directly to the customer's email address to follow up.
      </p>
    </div>
    <div class="footer">
      <div class="footer-text"><span class="sender-info">From: Kat's Dream Destination Travel</span></div>
      <div class="footer-text">Email: <span class="sender-info">katsddtravel@gmail.com</span></div>
      <div class="footer-text" style="margin-top: 10px; opacity: 0.8;">Personalized travel planning for cruises, trains, and unforgettable experiences</div>
    </div>
  </div>
</body>
</html>
        `;

        // Send notification to owner with HTML content
        const notificationSent = await notifyOwner({
          title: `New Travel Inquiry from ${input.name}`,
          content: htmlContent,
        });

        return {
          success: true,
          message: "Inquiry submitted successfully",
          notificationSent,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
