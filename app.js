const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser"),
      request    = require("request");

// App configuration
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// ROUTES
app.get("/", (req, res) => {
  // Thanks to https://curl.trillworks.com/#node, from which code here was adapted.
  // NOTE See http://callbackhell.com/ for potential future refactoring.
  // Obtain the access token.
  const headers = {
    'accept': 'application/json',
    'content-type': 'application/x-www-form-urlencoded'
  };
  const CLIENT_ID = process.env.HEROKU_CLIENT_ID
  const CLIENT_SECRET = process.env.HEROKU_CLIENT_SECRET
  const dataString = 'client_id=' + CLIENT_ID + '&client_secret=' +
    CLIENT_SECRET + '&grant_type=client_credentials&scope=verse%20chapter';
  const options = {
    url: 'https://bhagavadgita.io/auth/oauth/token',
    method: 'POST',
    headers: headers,
    body: dataString
  };
  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      // Collect authorization data
      let auth = JSON.parse(body);
      const url = generateURL(auth);
      request(url, (error, response, body) => {
        let verse = JSON.parse(body);
        // Recursively submit another request if the verse returned does not exist.
        if (Boolean(verse.text)) {
          res.render("index", {pageName: 'index', verse: verse});
        } else {
          request(options, callback);
        }
      });
    }
  }

  // Generate the verse and render the page.
  request(options, callback);
});

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

// Middleware
function generateURL(auth) {
  // Retrive a random verse.
  let chapterNum = Math.ceil(Math.random() * 18);
  const chapterVerses = {1: 47, 2: 72, 3: 43, 4: 42, 5: 26, 6: 47, 7: 30, 8: 28,
    9: 34, 10: 42, 11: 55, 12: 20, 13: 35, 14: 27, 15: 20, 16: 24, 17: 28, 18: 78};
  let verseNum = Math.ceil(Math.random() * chapterVerses[chapterNum]);
  //
  return "https://bhagavadgita.io/api/v1/chapters/" + chapterNum + "/verses/" + verseNum + "?access_token=" + auth.access_token
}
