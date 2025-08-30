const { agenda } = require("../config/index");
const { send_email_via_nodemailer } = require("../utils/send_email");

agenda.define("send abandoned cart email", async (job) => {
  const { email, stage } = job.attrs.data;

  let discount = "";
  let nextDelay = null;
  let nextStage = stage + 1;

  const max_tries = process.env.RETRIES || 3;
  const back_off = process.env.BACKOFF_MS || 1500;

  if (stage === 1) {
    discount = "30% OFF";
    discount_code = "rag30";
    nextDelay = "6 hours";
  } else if (stage === 2) {
    discount = "50% OFF";
    discount_code = "rag50";
    nextDelay = "24 hours";
  } else {
    discount = "75% FINAL OFFER";
    discount_code = "rag75";
  }

  console.log(
    `Job Scheduled: send stage ${stage} email to ${email}, sent at ${new Date().toLocaleTimeString()}`
  );

  await send_email_via_nodemailer(
    email,
    max_tries,
    back_off,
    discount,
    discount_code
  );

  if (nextDelay) {
    await agenda.schedule(nextDelay, "send abandoned cart email", {
      email,
      stage: nextStage,
    });
  }
});
