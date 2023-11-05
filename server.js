const express = require("express");

const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/qiubeconqoipeca`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

server.listen(3030, () => {
  console.log("server runing ");
});
