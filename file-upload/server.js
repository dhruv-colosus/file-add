require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

global.__basedir = __dirname;
console.log(__basedir);
const app = express();
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 8000;

const initRoutes = require("./routes/index");

app.use(express.urlencoded({ extended: true }));

initRoutes(app);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("home");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
