const express = require("express");
const app = express();

app.get("/shoe", (req, res) => {
  console.log("shoe");
  res.send("shoe");
});

app.listen(3003, () => {
  console.log(`Server running wella!`);
});
