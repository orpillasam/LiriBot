
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var apiKeys = require('./keys.js')

var twitterAPIKey = new twitter(apiKeys.twitterKeys);
var spotifyAPIKey = new spotify(apiKeys.spotifyKeys);

var action = process.argv[2];
var searchTerm = process.argv[3];

for (var i = 4; i < process.argv.length; i++){
	searchTerm += '+' + process.argv[i]
};


function showInstructions(){
  console.log(
    "----------------------------------------------" + "\n" +
    'Thank you for using Liri Bot' + "\n" +
    "Type 'node liri.js my-tweets' to see my last 20 tweets" + "\n" +
    "Type 'node liri.js spotify-this-song' and a song title to find information on this song" + "\n" +
    "Type 'node liri.js movie-this' and a movie title to find information on this song" + "\n" +
    "Type 'node lirl.js do-what-it-says' to call a pre-defined song" + "\n" +
    '----------------------------------------------'
  );
};


/*------------Function to call different functions depending on the search term----------------*/

function switchAction(){
switch (action) {
  case "my-tweets":
    getTweets();
    break;

  case "spotify-this-song":
    getSpotify();
    break;

  case "movie-this":
    getMovie();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;
}
};


/*----------------------Twitter-----------------*/

function getTweets(){
  console.log("getting tweets");
  
	var params = {
	    screen_name: 'SunfyreTek1'
	};

	twitterAPIKey.get('statuses/user_timeline', params, function (error, tweets, response) {
		if (error) {
	  		console.log ('An error occurred: ' + error)
		} else {
			  console.log('-------------------------')
			  for (var j = 0; j < tweets.length; j++) {
			    var twitterTweets = ('Tweet Number: ' + (j + 1) + '\n' + tweets[j].created_at + '\n' + tweets[j].text + '\n')
			    console.log(twitterTweets)
			    console.log('--------------------------');
			  }
      }
      showInstructions();
  });
  
};


/*--------------------------Spotify --------------------*/


function getSpotify(){
	console.log('-------------------------')
	console.log("Time to play your music!")
	console.log(searchTerm);
  //searches for "The Sign by Ace of Base" if no search term was entered
	if (searchTerm ===  undefined || searchTerm ==="") {
  console.log("You didn't enter a song, so here's my favorite song!");
	searchTerm = 'The Sign Ace of Base'
	}; 

	spotifyAPIKey.search({ type: 'track', query: searchTerm }, function (err, data) {
	if (err) {
	  console.log('An error has occurred: ' + err)
	} else {

	// console.log(data);
	for (let k = 0; k<data.tracks.items[0].artists.length; k++){
    	console.log("Artist: " + data.tracks.items[0].artists[k].name);
 	}
	console.log("Song Name: " + data.tracks.items[0].name);
 	console.log("Preview: " + data.tracks.items[0].preview_url);
   	console.log("Album Name: " + (data.tracks.items[0].album.name));
  }
  showInstructions();
  });
  
};

/*---------------------------OMDB---------------------------*/


function getMovie(){
  //searches for "Mr. Nobody" if no movie was entered
  if (searchTerm ===  undefined || searchTerm ==="") {
    console.log("You didn't enter a movie, so here's my favorite movie!");
    searchTerm = 'Mr. Nobody'
    }; 

	var queryUrl = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=" + apiKeys.omdbKey;
	console.log(queryUrl);
	request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    var data = JSON.parse(body);
    console.log(
    "-----------------------------------------------------------" + "\n" +
    "Title: " + data.Title + '\n' + 
    "Year: " + data.Year + '\n' + 
    "IMDB Rating: " + data.Ratings[0].Value + '\n' + 
    "Rotten Tomato Rating: " + data.Ratings[1].Value + '\n' + 
    "Country of Production: " + data.Country + '\n' + 
    "Language: " + data.Language + '\n' + 
    "Plot: " + data.Plot + '\n' + 
    "Actors: " + data.Actors + '\n' +
    "-----------------------------------------------------------"
  );
  };
  showInstructions();
  });
  
};


/*---------------do-what-it-says---------------*/


function doWhatItSays(){
  fs.readFile("random.txt", "utf8", function(err,data){
    if (err){
      return console.log('Error occured' + err)
    }else{
        var dataArr = data.split(',');
  		action = dataArr[0];
  		searchTerm = dataArr[1];
      switchAction();
      
    };
  });
  
};

/*-------------------Log Results -----------------*/


function log (logResults) {
  fs.appendFile('log.txt', logResults, err => {
    if (err) {
      throw err
    };
  });
};

showInstructions();
switchAction();