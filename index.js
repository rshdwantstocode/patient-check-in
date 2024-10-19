import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log("Server now running at Port " + port);
});
