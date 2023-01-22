const express = require("express");

const PORT = 3000;

const app = express();

app.get("/recommend", (req, res) => {
  res.json({ first: "first place" });
});

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
