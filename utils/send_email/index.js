const { transporter } = require("../../config/index");

async function send_email_via_nodemailer(mail, max_tries, back_off, discount) {
  let attempts = 0;

  const mail_options = {
    from: process.env.SMTP_FROM_EMAIL || "no-reply@example.com",
    to: mail,
    subject: `Your ${discount} coupon is waiting!`,
    text: `Use code ${discount} at checkout to claim your discount!`,
  };

  while (attempts < max_tries) {
    attempts++;
    try {
      await transporter.sendMail(mail_options);
      return;
    } catch (error) {
      last_error = error;
      const transient =
        /rate|timeout|connection|throttle|ETIMEDOUT|ECONNRESET/i.test(
          String(error?.message || "")
        );
      console.log(`Error sending email to ${mail.to}:`, error.message || error);
      if (!transient || attempts >= max_tries) break;
      const backoff = back_off * Math.pow(2, attempts - 1);
      await new Promise((r) => setTimeout(r, backoff));
    }
    return;
  }
}

module.exports = { send_email_via_nodemailer };
