const express = require("express");
const app = express();

app.get("/api/signin", (req, res) => {
  res.json({ message: "welcome to sign in page " });
});

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`API is running on ${port}`);
});
