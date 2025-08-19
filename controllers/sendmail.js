const nodemailer = require("nodemailer");

const sendmail = async (req, res) => {
  try {
    // Generate test SMTP service account from ethereal.email
    const testAccount = await nodemailer.createTestAccount();

    // Create a transporter using the test account
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // dynamically generated
        pass: testAccount.pass, // dynamically generated
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: `"Url shortner" <${testAccount.user}>`,
      to: "dhruvu3400@gmail.com",
      subject: "Hello from tests ✔",
      text: "This message was sent from a Node.js integration test.",
    });

    // Ethereal gives a preview URL for the sent email
    res.json({
      message: "Mail sent successfully!",
      info,
      previewUrl: nodemailer.getTestMessageUrl(info),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email", error });
  }
};

module.exports = sendmail;
