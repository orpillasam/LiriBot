console.log('this is loaded');

var twitterKeys = {
  consumer_key: 'glLKr0VGtQadwjBe1EOsYDLpn',
  consumer_secret: 'x9uKZPxJuXMfpjm7bENya8Sbal0KUblTNPYogUHuifTPY7hmpd',
  access_token_key: '939944472925782016-KySwq1KIXMapQubZaeXmJ269lgoyLjd',
  access_token_secret: 'LioGyvzCCjzjO4lPs8Mm0zFcH6YD8057A0rByLiVh0AYp'
}

var spotifyKeys ={
    id: '05dcd79aa48b498d9f3aad54b842da98',
    secret: 'c99b2b58e1d8497296c361ecdb9bb0af'
  },

var omdbKey = {
    apiKey: ''
  }
// var params = {screen_name: 'nodejs'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
// });

module.exports = {
	twitterKeys:twitterKeys,
	spotifyKeys:spotifyKeys,
	omdbKeys:omdbKeys
	};
