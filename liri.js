
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var fetch = require('node-fetch');
var fs = require('fs');
var apiKeys = require('./keys.js')

var twitterAPIKey = new twitter(apiKeys.twitterKeys);
var spotifyAPIKey = new spotify(apiKeys.spotifyKeys);


var action = process.argv[2];
var searchTerm = process.argv[3];



for (var i = 4; i < process.argv.length; i++){
	searchTerm += '+' + process.argv[i]
};


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
	});
};

/*--------------------------Spotify --------------------*/

function getSpotify(){
	console.log('-------------------------')
	console.log("Time to play your music!")
	console.log(searchTerm);
	var searchSong;
	if (searchTerm === undefined) {
	searchSong = 'The Sign'
	} else {
	searchSong = searchTerm
	}

	spotifyAPIKey.search({ type: 'track', query: searchSong }, function (err, data) {
	if (err) {
	  console.log('An error has occurred: ' + err)
	} else {

	// console.log(data);
	for (let k = 0; k<data.tracks.items[0].artists.length; k++){
    	console.log("Artist: " + data.tracks.items[0].artists[k].name);
 	}
	console.log("Song Name: " + data.tracks.items[0].name);
 	console.log("Preview: " + data.tracks.items[0].external_urls.spotify);
   	console.log("Album Name: " + (data.tracks.items[0].album.name));
	// let response = data.tracks.items
	// let spotifyData = ('This is the top result I\'ve found for that search\n' + 'Track Title: ' + response[0].name + '\n' + 'Artist: ' + response[0].artists[0].name + '\n' + 'Album: ' + response[0].album.name)
	// console.log(spotifyData)
	// log(spotifyData)
	// if (response[0].preview_url === null) {
	//   console.log('Preview: No preview available')
	// } else {
	//   console.log('Preview: ' + response[0].preview_url)
	// }
	// console.log('--------------------')
	}
	})
}