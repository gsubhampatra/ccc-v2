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
  const { name, email, phone, rollno } = registrationDetails;
  const { title, venue, date, time, whatsappGroupUrl } = eventDetails;
  const htmlTemplate = `
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; text-align: center;">
    <div style="margin: 20px auto; padding: 0; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; padding: 15px; font-size: 24px; font-weight: bold; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px;">
        <img src="https://i.ibb.co/C0DGCkd/111.png" height="45px" width="46px" alt="" style="border-radius: 10px; object-position: center;" />
        Cloud Computing Club
      </div>
      <div style="padding: 20px;">
        <h2 style="margin-top: 0;">Registration Confirmation 🥳</h2>
        <p style="text-align: center; line-height: 1.6; margin: 10px 0;">Thank you for registering for <strong style="text-align: center;">${title}</strong>! We're excited to have you join us.</p>
        
        <h3 style="text-align: center;">Event Details</h3>
        <hr />
        <p style="text-align: center; line-height: 1.6; margin: 10px 0;"><strong style="text-align: center;">Date:</strong> ${date}</p>
        <p style="text-align: center; line-height: 1.6; margin: 10px 0;"><strong style="text-align: center;">Time:</strong> ${time}</p>
        <p style="text-align: center; line-height: 1.6; margin: 10px 0;"><strong style="text-align: center;">Location:</strong> ${venue}</p>

        <h3 style="text-align: center;">Your Registration Details</h3>
        <hr/>
        <p style="text-align: center; line-height: 1.6; margin: 10px 0;"><strong style="text-align: center;">Name:</strong> ${name}</p>
        <p style="text-align: center; line-height: 1.6; margin: 10px 0;"><strong style="text-align: center;">Email:</strong> ${email}</p>
        <p style="text-align: center; line-height: 1.6; margin: 10px 0;"><strong style="text-align: center;">Phone:</strong> ${phone}</p>
        <p style="text-align: center; line-height: 1.6; margin: 10px 0;"><strong style="text-align: center;">Roll No:</strong> ${rollno}</p>
        <p style="text-align: center; line-height: 1.6; margin: 10px 0;"><strong style="text-align: center;">Whatsapp Group:</strong> <a  href="${whatsappGroupUrl}">Join Group</a></p>

        <p style="text-align: center; line-height: 1.6; margin: 10px 0;">We look forward to seeing you at the event! If you have any questions, please don't hesitate to contact us.</p>
        <p style="text-align: center; line-height: 1.6; margin: 10px 0;">Best regards,<br>Cloud Computing Club Team</p>
      </div>
    </div>
  </body>
  `;
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    replyTo: "cloudcomputing@nist.edu",
    subject,
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendMessage(formData) {
  const { firstName, lastName, email, message } = formData;
  
  const htmlTemplate = `
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
    <div style="margin: 20px auto; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; padding: 15px; font-size: 24px; font-weight: bold;">
        <img src="https://i.ibb.co/C0DGCkd/111.png" height="45px" width="46px" alt="" style="border-radius: 10px;" />
        <div>Help Message</div>
      </div>
      
      <div style="padding: 20px;">
        <h3>Contact Details:</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        
        <h3>Message:</h3>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
    </div>
  </body>
  `;

  const mailOptions = {
    from: process.env.EMAIL,
    to: "cloudcomputing@nist.edu",
    subject: `Help Message from ${firstName} ${lastName}`,
    html: htmlTemplate,
    replyTo: email, // Allows direct reply to the sender
  };

  await transporter.sendMail(mailOptions);
}
