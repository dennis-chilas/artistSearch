const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

app.listen(4000, () => console.log('listening at 4000') );

app.use( express.static('public'));
app.use( express.json() );





// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: '',
  clientSecret: '',
  redirectUri: 'http://localhost:8888/callback'
});

spotifyApi.clientCredentialsGrant().then(
  function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  },
  function(err) {
    console.log(
      'Something went wrong when retrieving an access token',
      err.message
    );
  }
);


app.post('/api', (request, response) => {
  console.log("neuer get request...");

  console.log(request.body.search);


  spotifyApi.searchArtists(request.body.search)
  .then(function(data) {
    console.log('Search artists by "Love"', data.body);
    response.json(data.body);
  }, function(err) {
    console.error(err);
  });

});