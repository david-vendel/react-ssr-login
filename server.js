const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("*", (req, res) => {
  res.send("This is my working app");
});

app.listen(PORT, () => {
  console.log(`app running ${PORT}`);
});
