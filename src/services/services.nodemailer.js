const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendRegistrationEmail(userEmail, name){
  const subject = "Welcome to Backend Ledger!";

  const text = `Hello ${name},

        Thank you for registering at Backend Ledger.
        We're excited to have you onboard!

        Best regards,
        Backend Ledger Team`;

  const html = `
                <h2>Hello ${name},</h2>
                <p>Thank you for registering at <b>Backend Ledger</b>.</p>
                <p>We're excited to have you onboard! 🚀</p>
                <br/>
                <p>Best regards,<br/>Backend Ledger Team</p>
                `;

  await sendEmail(userEmail, subject, text, html);
};

async function sendTransactionEmail(userEmail, name, amount) {
  const subject = "Transaction Successful";

  const text = `Hello ${name},

Your transaction was completed successfully.

Amount: ₹${amount}

Thank you for using Backend Ledger.

Best regards,
Backend Ledger Team`;

  const html = `
    <p>Hello ${name},</p>
    <p>Your transaction was completed successfully.</p>

    <p><b>Amount:</b> ₹${amount}</p>

    <br/>
    <p>Thank you for using Backend Ledger.</p>
    <p>Best regards,<br/>Backend Ledger Team</p>
  `;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionFailureEmail(userEmail, name, amount) {
  const subject = "Transaction Failed";

  const text = `Hello ${name},

Your transaction could not be completed.

Amount: ₹${amount}

Please try again later.

Best regards,
Backend Ledger Team`;

  const html = `
    <p>Hello ${name},</p>
    <p>Your transaction could not be completed.</p>

    <p><b>Amount:</b> ₹${amount}</p>

    <br/>
    <p>Please try again later.</p>
    <p>Best regards,<br/>Backend Ledger Team</p>
  `;

  await sendEmail(userEmail, subject, text, html);
}

module.exports = {
    sendRegistrationEmail,
    sendTransactionEmail,
    sendTransactionFailureEmail
}