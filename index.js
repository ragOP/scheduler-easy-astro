require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { connect_to_database } = require("./config/index");
const PORT = process.env.PORT || 9006;
require("./jobs/index");

connect_to_database(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    data: "Server is running",
  });
});

app.use('/api', require('./router/index'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
