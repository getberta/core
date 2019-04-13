var spotifyWebApi = require('spotify-web-api-node');
var messages = require('./../assets/messagesEN').messages;
var nrc = require('node-run-cmd');
var NodeSpotify = require ("node-spotify-helper");
var webHelper = new NodeSpotify.SpotifyWebHelper();

var spotifyApi = new spotifyWebApi({
    clientId: '18562265628b4f01a46e84eecc8ec910',
    clientSecret: 'd51c3b7e1e9c4a9ebfbe0028724ae83c'
});

spotifyApi.clientCredentialsGrant().then((data) => {
    spotifyApi.setAccessToken(data.body['access_token']);

    }, (error) => {
        console.log(error);
});

async function playSpotify(spotifyUri) {
    try {
        var tokens = await webHelper.getTokens();
        await webHelper.connect();
        await webHelper.play(spotifyUri);
    } catch(err) {
        console.log(err);
    }
}

async function pauseSpotify() {
    try {
        await webHelper.connect();
        await webHelper.pause();
    } catch(err) {
        
    }
}

async function resumeSpotify() {
    try {
        await webHelper.connect();
        await webHelper.unpause();
    } catch(err) {

    }
}

module.exports = function spotifyControl(musicToPlay) {

    spotifyApi.searchTracks(musicToPlay).then((data) => {
        playSpotify(data.body.tracks.items[0].uri);
    }, (error) => {
        console.log(error);
    });

}