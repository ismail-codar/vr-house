/* eslint-env node */

const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.use("/build", express.static("build"));
app.use("/assets", express.static("assets"));
app.use("/poses", express.static("poses"));
app.use("/models", express.static("models"));

// listen for requests :)
const listener = app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("Your app is listening on port " + listener.address().port);
});
