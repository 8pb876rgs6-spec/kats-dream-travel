import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'katsddtravel@gmail.com',
    pass: 'lrli dlgt zhya zxtw',
  },
});

const testContent = `
✈️ KAT'S DREAM DESTINATION TRAVEL
Personalized Luxury Travel Agency
============================================================

NEW TRAVEL INQUIRY RECEIVED

CONTACT INFORMATION
------------------------------------------------------------
Name: Test Customer
Email: test@example.com
Phone: (555) 123-4567

TRAVEL DETAILS
------------------------------------------------------------
Vacation Type: Cruise
Cruise Terminal/Airport: Port Canaveral
Earliest Departure: 2026-06-15
Number of Nights: 7 nights
Travelers: 2 adults, 2 children (ages 8, 12)
Rooms/Cabins: 1 cabin - 2 adults, 2 children
Past Cruise Guests: Test Customer, 01/15/1980
Cabin Preference: Balcony

ADD-ONS
------------------------------------------------------------
Requested: Prepaid gratuities, Travel protection insurance

ADDITIONAL DETAILS
------------------------------------------------------------
This is a test email to verify the inquiry system is working correctly.

============================================================
This inquiry was submitted through your Kat's Dream Destination Travel website.
Reply directly to the customer's email address to follow up.

From: Kat's Dream Destination Travel
Email: katsddtravel@gmail.com
Phone: (281) 636-4873
Personalized travel planning for cruises, trains, and unforgettable experiences
`;

try {
  const result = await transporter.sendMail({
    from: 'katsddtravel@gmail.com',
    to: 'katsddtravel@gmail.com',
    subject: 'New Travel Inquiry from Test Customer',
    text: testContent,
  });
  console.log('✅ Test email sent successfully:', result.messageId);
} catch (error) {
  console.error('❌ Error sending test email:', error.message);
}
