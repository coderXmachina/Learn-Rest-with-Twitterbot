/**
 * Created by admin on 12/4/2017.
 */

var twit = require('twit');
var config = require('./config');
var meConfig = require('./mine.js');

var Twitter = new twit (config);

var retweet = function() {

    var thisTweet = meConfig.hashArray1[Math.floor(Math.random() * 8)];

    var params = {
        q: thisTweet,
        result_type: "recent",
        lang: 'en'
    };
    
    //learn to tweet with reply
    Twitter.get('search/tweets', params, function(err, data) {
        // if there no errors
        if (!err) {
            // grab ID of tweet to retweet

            var retweetId = data.statuses[0];
            
            console.log("Retrieved Tweet about:" + params.q + "\n");
            
            //theres a chance that entities doesn't exist
            if(typeof retweetId.entities.urls[0] != 'undefined'){
                var linkPostString = meConfig.quoteArray[Math.floor(Math.random() * 9)];

                console.log("It exists Proceed.");
                console.log("Analyze this:" + JSON.stringify(retweetId) + "\n\n");
                
                //craft the letter
                linkPostString += (params.q + " ");
                linkPostString += retweetId.entities.urls[0].url; //this is what you text about

                console.log("This is your tweet:" + linkPostString);
                //craft this request
                postThisTweet(linkPostString);

            }

            else{
                var textPostString = meConfig.quoteArray[Math.floor(Math.random() * 9)];
                console.log("URL does not Exist, But This is the Tweet though?");
                console.log("Analyze this:" + JSON.stringify(retweetId) + "\n\n");

                //console.log(JSON.stringify(retweetId));
                textPostString += (" " + params.q + " ");
                textPostString += retweetId.text; //this is what you text about
                
                //craft this request
                console.log("This is your tweet:" + textPostString);
                postThisTweet(textPostString);
                
            }

            /*
            var myInsertParams = {
                text: 'Wow this is cool! #sciencepic' + putInText
            }; */
            
            //postThisTweet()
            
        }
        // if unable to Search a tweet
        else {

            console.log('\nSomething went wrong while SEARCHING for: ' + params.q);
            console.log('SEARCHING error:' + err);

        }
    });

}//end of function

function postThisTweet(tweetTxt){
    var tweet = {
        status: tweetTxt
    };

    Twitter.post('statuses/update', tweet, function(err, data, res){
        if(err){
            console.log("error posting status update");
        }

        else{
            console.log("\n\nStatus succcessfully updated")
        }

    })

}//end of functiom


//just call retweet
retweet();
// retweet in every 5 minutes
setInterval(retweet, 480000);
