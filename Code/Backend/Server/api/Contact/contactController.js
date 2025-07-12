const nodemailer = require("nodemailer");

contact=async(req, res) => {
  const { user_email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "trailstotales35@gmail.com",
    pass: "obpn dhpp owuk yxcq",
  },
  tls:{
    rejectUnauthorized:false
  }
  });

  const mailOptions = {
    from: user_email,
    to: "trailstotales35@gmail.com",
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Email failed to send." });
  }
}

module.exports={contact}
