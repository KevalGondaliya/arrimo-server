const express = require("express");

const app = express();
const PORT = 8088;

require("./config.js");
require("./models");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

app.use("/users", require("./routes/users.js"));
app.use("/events", require("./routes/events.js"));

app.listen(PORT, () => console.log(`Your app running on: ${PORT}`));
