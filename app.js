const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser");

// App configuration
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// ROUTES
app.get("/", function(req, res) {
  res.render("index");
})

// Verifies server being online
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
