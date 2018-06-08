require("dotenv").config();

// require
var keys = require("./keys");
var request = require("request");
var Twitter = require("twitter");
var fs = require('fs');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// Writes to the log.txt file
// var writeToLog = function (data) {
// 	// Append the JSON data 
// 	fs.appendFile("log.txt", JSON.stringify(data) + "\n", function (err) {
// 		if (err) {
// 			return console.log(err);
// 		}

// 		console.log("log.txt was updated!");
// 	});
// };

// searching twitter 
var getMyTwitter = function () {
	var client = new Twitter(keys.twitter);

	//Pull the most recent tweets
	var params = { screen_name: 'Christina Thach' };
	client.get('statuses/user_timeline', params, function (error, tweets, response) {
		if (error) { error };

		console.log("===================");
		console.log("Here are the most recent tweets");

		for (var i = 0; i < tweets.length; i++) {


			console.log("_____________________________________________");
			console.log("Tweeted on: " + tweets[i].created_at);
			console.log(tweets[i].text);

		}

	}
	);
}
	// searching spotify
	var getMySong = function (songTitle) {
		console.log("thisfunction has been called");

		spotify.search(
			{ type: 'track', query: songTitle, limit: 5 },
			function (err, data) {
				if (err) {
					return console.log('Error occurred: ' + err);
				}
				var songs = data.tracks.items;

				for (var i = 0; i < songs.length; i++) {
					console.log(i);
					console.log("song name: " + songs[i].name);
					console.log("preview song: " + songs[i].preview_url);
					console.log("album: " + songs[i].album.name);
					console.log("-----------------------------------")
				}


			});

		// Function for running a command based on text file
		var doWhatItSays = function () {
			fs.readFile("random.txt", "utf8", function (error, data) {
				console.log(data);

				var dataArr = data.split(",");

				if (dataArr.length === 2) {
					pick(dataArr[0], dataArr[1]);
				}
				else if (dataArr.length === 1) {
					pick(dataArr[0]);
				}
			});
		}
	};

	// Function to determined
	var pick = function (caseData, functionData) {
		switch (caseData) {
			case "my-tweets":
				getMyTwitter();
				break;
			case "spotify-this-song":
				getMySong(functionData);
				break;
			case "do-what-it-says":
				doWhatItSays();
				break;
			default:
				console.log("LIRI can't find.");
		}
	};

	// Function which takes in command line arguments and executes correct function accordingly
	var runThis = function (argOne, argTwo) {
		pick(argOne, argTwo);
	};

	// MAIN PROCESS
	// =====================================
	runThis(process.argv[2], process.argv[3]);

