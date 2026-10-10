const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "SWYNEX backend is running successfully"
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});