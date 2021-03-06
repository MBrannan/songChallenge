// node/express application
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//puts post request body data and store it on req.body
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', process.env.PORT || 3000);

var songs = [
   {
      artist: "Bruce Springsteen",
      title: "Born in the U.S.A.",
      date: "11/8/2016"
   }
];

//Routes
app.get('/songs', function(req, res) {
  console.log('handling get request for songs');
  res.send(songs);
});

app.post('/songs', function(req, res) {
  console.log("REQ body: ", req.body);
  var newSong = req.body;
  var isDuplicate = false;
  for (i = 0; i < songs.length; i++) {
    if (newSong.title == songs[i].title && newSong.artist == songs[i].artist) {
      res.sendStatus(400);
      isDuplicate = true;
    }
  }
  if (isDuplicate == true || newSong.title == "" || (newSong.artist == "")) {
    console.log("Cannot add duplicate songs");
    res.sendStatus(400);
  } else {
      var currentDate = new Date();
      newSong.date = currentDate.toLocaleDateString();
      console.log(newSong.date);
      songs.push(newSong);
      res.sendStatus(201);
  }
});

// static file routing
app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  console.log(file);

  res.sendFile(path.join(__dirname, './public/', file));
  // /public/views/index.html
});

app.listen(app.get('port'), function() {
  console.log('Server is listening on port ' + app.get('port'));
});
