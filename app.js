const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser");

// App configuration
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// ROUTES
app.get("/", (req, res) => {
  res.render("index");
})

app.get("/about", (req, res) => {
  res.render("about");
})

app.get("/posts", (req, res) => {
  res.render("posts");
})

app.get("/membership", (req, res) => {
  res.render("membership");
})

app.get("/photos", (req, res) => {
  res.render("photos");
})

app.get("/calendar", (req, res) => {
  res.render("calendar");
})

app.get("/prayers", (req, res) => {
  res.render("prayers");
})

app.get("/community", (req, res) => {
  res.render("community");
})

app.get("/donations", (req, res) => {
  res.render("donations");
})

app.get("/contact", (req, res) => {
  res.render("contact");
})

// Verifies server being online
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
