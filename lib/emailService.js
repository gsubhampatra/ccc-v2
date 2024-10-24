import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export async function sendEmail(
  to,
  subject,
  registrationDetails,
  eventDetails
) {
  const { name, email, phone, eventId } = registrationDetails;
  const { title, venue, date, time } = eventDetails;
  const htmlTemplate = `
  <style>
    .card {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background: linear-gradient(to right, #3498db, #8e44ad);
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      font-family: Arial, sans-serif;
    }
    .header {
      background-color: #003366;
      color: white;
      padding: 10px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .content {
      padding: 20px;
      background-color: white;
      border-radius: 0 0 5px 5px;
    }
    h1, h2 {
      color: #003366;
    }
  </style>
  <div class="card">
    <div class="header">
      <h1>Cloud Computing Club</h1>
    </div>
    <div class="content">
      <h2>Registration Confirmation</h2>
      <p>Thank you for registering for ${title}! We're excited to have you join us.</p>
      <h3>Event Details:</h3>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Location:</strong> ${venue}</p>
      <h3>Your Registration Details:</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p>We look forward to seeing you at the event! If you have any questions, please don't hesitate to contact us.</p>
      <p>Best regards,<br>Cloud Computing Club Team</p>
    </div>
  </div>
  `;
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
}
