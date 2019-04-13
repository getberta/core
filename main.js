var express = require('express'),
    port = 7000,
    app = express(),
    mode = 'DEV',
    mongoose = require('mongoose'),
    commandBrain = require('./features/commandBrain'),
    spotifyControl = require('./features/spotifyControl');

mongoose.connect('mongodb://localhost:27017/berta', (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('db connected with sucess!');
    }
});

var configSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    wifi_name: {
        type: String,
        required: true
    },
    wifi_password: {
        type: String,
        required: true
    },
    facebook_apikey: {
        type: String,
        required: false
    },
    google_apikey: {
        type: String,
        required: false
    },
    instagram_apikey: {
        type: String,
        required: false
    },
    twitter_apikey: {
        type: String,
        required: false
    },
    configed: {
        type: String,
        required: true
    }
});

var Config = mongoose.model('config', configSchema);
var errorMsg = '<h1>An error ocurred!</h1><p>Please try again.'

app.get('/core/info', (req, res) => {
    Config.findOne({
        configed: true
    }, (err, config) => {
        if(err) {
            console.log(err);
            res.send(errorMsg);
        } else {
            res.send(config);
        }
    });
});

app.get('/core/cmd/:command', (req, res) => {
    var command = req.params.command;
    res.send(command);
    commandBrain(command);
});

app.listen(port, () => {
    console.log('berta core ' + mode + ' running on port ' + port);
})