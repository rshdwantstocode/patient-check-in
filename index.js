import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

const data = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,// default PostgreSQL port
});

data.connect()

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

app.post("/login", async (req, res)=>{
  const {username, password} = req.body;
  try {
    const result = await data.query("SELECT username, password FROM admins");
    if (result.rows[0].username === username && result.rows[0].password === password) {
        res.render("home");
    } else {
      res.render("login");
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log("Server now running at Port " + port);
});
