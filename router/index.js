const express = require("express");
const agenda = require("../config/agenda");
const route = express.Router();

route.post("/schedule-job/create", async (req, res) => {
  const { email } = req.body;
  console.log(`Scheduling job for email: ${email}`);

  try {
    const job = await agenda.schedule("in 1 minute", "send abandoned cart email", {
      email,
      stage: 1,
    });
    return res.status(200).json({
      success: true,
      message: `Successfully scheduled job for email: ${email}`,
      job
    });
  } catch (error) {
    console.error("Error scheduling job:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to schedule job" });
  }
});

route.delete("/schedule-job/delete", async (req, res) => {
  const { email } = req.body;
  console.log(`Canceling job for email: ${email}`);

  try {
    const task_canceled = await agenda.cancel({ "data.email": email });
    console.log(`Canceled ${task_canceled} job(s) for email: ${email}`);

    return res.status(200).json({
      success: true,
      message: `Successfully canceled ${task_canceled} job(s)`,
    });
  } catch (error) {
    console.error("Error canceling job:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to cancel job" });
  }
});

module.exports = route;
