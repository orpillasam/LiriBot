
var twitter = require('twitter');
var spotify = require('node-spotify-api');
// var fetch = require('node-fetch');
var fs = require('fs');
var keys = require('./keys.js')

var action = process.argv[2];
var searchTerm = process.argv[3];

// for (var i = 4; i < process.argv.length; i++){
// 	searchTerm += '+' + proces.argv[i]
// };


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

function getTweets(){
	console.log("getting tweets");
	//get last 20 tweets
	var client = new twitter({
  		consumer_key: keys.consumer_key,
    	consumer_secret: keys.consumer_secret,
    	access_token_key: keys.access_token_key,
   		access_token_secret: keys.access_token_secret
});



	var params = {
	    screen_name: 'SunfyreTek1'
	  };
	  client.get('statuses/user_timeline', params, function (error, tweets, response) {
	    if (error) throw error{
	      console.log ('An error occurred: ' + error)
	    } else {
	      console.log('-------------------------')
	      for (var j = 0; j < tweets.length; j++) {
	        var twitterTweets = ('Tweet Number: ' + (j + 1) + '\n' + tweets[j].created_at + '\n' + tweets[j].text + '\n')
	        console.log(twitterTweets)
	        console.log('--------------------------');
	      }
	    }
	  })

}

function getSpotify(){
	var spotifySearch = new spotify({
    	id: keys.client_key,
    	secret: keys.client_secret
  })
  console.log('--------------------')
  console.log("Let's play that music!")
  var searchSong;
  if (searchTerm === undefined) {
    searchSong = 'The Sign'
  } else {
    searchSong = searchTerm
  }
  spotifySearch.search({ type: 'track', query: searchSong }, function (err, data) {
    if (err) {
      console.log('An error has occurred: ' + err)
    } else {
      let response = data.tracks.items
      let spotifyData = ('This is the top result I\'ve found for that search\n' + 'Track Title: ' + response[0].name + '\n' + 'Artist: ' + response[0].artists[0].name + '\n' + 'Album: ' + response[0].album.name)
      console.log(spotifyData)
      log(spotifyData)
      if (response[0].preview_url === null) {
        console.log('Preview: No preview available')
      } else {
        console.log('Preview: ' + response[0].preview_url)
      }
      console.log('--------------------')
    }
  })
}