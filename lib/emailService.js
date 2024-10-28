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
  const { name, email, phone, branch, batch, rollno, eventId } =
    registrationDetails;
  const { title, venue, date, time } = eventDetails;
  const htmlTemplate = `
   <style>
      body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
       background-image: linear-gradient(to right, #3b82f6, #a855f7);
       text-align: center;

      }

      .card {
        margin: 20px auto;
        padding: 0;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }

      .header {
        background-color: #003366;
        color: white;
        text-align: center;
        padding: 15px;
        font-size: 24px;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap:2px;
      }
      .header img{
        border-radius: 10px;
        object-position: center;
      }

      .content {
       background-image: linear-gradient(to right, #3b82f6, #a855f7);
                
        padding: 20px;
      }

      h2 {
        color: white;
        margin-top: 0;
      }
      h3{
        text-align: center;
        color:white;
      }

      p {
        text-align: center;
        color: white;
        line-height: 1.6;
        margin: 10px 0;
      }

      strong {
        text-align: center;
        color: #d2d7fc;
      }

    
    </style>
  </head>

  <body>
    <div class="card">
      <div class="header">
        <img src="https://i.ibb.co/C0DGCkd/111.png" height="45px" width="46px"  alt="" />
        Cloud Computing Club
      </div>
      <div class="content">
        <h2>Registration Confirmation 🥳</h2>
        <p>Thank you for registering for <strong>${title}</strong>! We're excited to have you join us.</p>
        
        <h3>Event Details</h3>
        <hr />
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Location:</strong> ${venue}</p>

        <h3>Your Registration Details</h3>
        <hr/>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Roll No:</strong> ${rollno}</p>

        <p>We look forward to seeing you at the event! If you have any questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>Cloud Computing Club Team</p>
      </div>
    
    </div>
  </body>
  `;
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
}
