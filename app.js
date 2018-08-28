const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser");

// App configuration
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// ROUTES
app.get("/", (req, res) => {
  res.render("index", {pageName: 'index'});
})

app.get("/about", (req, res) => {
  res.render("about", {pageName: req.path.slice(1)});
})

app.get("/posts", (req, res) => {
  res.render("posts", {pageName: req.path.slice(1)});
})

app.get("/membership", (req, res) => {
  res.render("membership", {pageName: req.path.slice(1)});
})

app.get("/photos", (req, res) => {
  res.render("photos", {pageName: req.path.slice(1)});
})

app.get("/calendar", (req, res) => {
  res.render("calendar", {pageName: req.path.slice(1)});
})

app.get("/prayers", (req, res) => {
  res.render("prayers", {pageName: req.path.slice(1)});
})

app.get("/community", (req, res) => {
  res.render("community", {pageName: req.path.slice(1)});
})

app.get("/donations", (req, res) => {
  res.render("donations", {pageName: req.path.slice(1)});
})

app.get("/contact", (req, res) => {
  res.render("contact", {pageName: req.path.slice(1)});
})

// Verifies server being online
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
