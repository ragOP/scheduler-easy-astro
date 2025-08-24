const { agenda } = require('../config/index');
const { send_email_via_nodemailer } = require('../utils/send_email');

agenda.define("send abandoned cart email", async (job) => {
  const { email, stage } = job.attrs.data;

  let discount = "";
  let nextDelay = null;
  let nextStage = stage + 1;

  const max_tries = process.env.RETRIES || 3;
  const back_off = process.env.BACKOFF_MS || 1500;

  if (stage === 1) {
    discount = "30% OFF";
    nextDelay = "1 minutes";
  } else if (stage === 2) {
    discount = "50% OFF";
    nextDelay = "1 minutes";
  } else if (stage === 3) {
    discount = "50% OFF (reminder)";
    nextDelay = "1 minutes";
  } else if (stage === 4) {
    discount = "75% FINAL OFFER";
  }

  console.log(`Job Scheduled: send stage ${stage} email to ${email}, sent at ${new Date().toLocaleTimeString()}`);

  await send_email_via_nodemailer(email, max_tries, back_off, discount);

  if (nextDelay) {
    await agenda.schedule(nextDelay, "send abandoned cart email", {
      email,
      stage: nextStage,
    });
  }
});
