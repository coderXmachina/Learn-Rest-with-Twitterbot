/**
 * Created by admin on 12/4/2017.
 */

var twit = require('twit');
var config = require('./config');
var meConfig = require('./mine.js');

var Twitter = new twit (config);

var retweet = function() {
    
    var thisTweet = meConfig.hashArray1[Math.floor(Math.random() * 9)];
    
    //console.log("This is derTweet:" + derTweet);
    
    var params = {
        q: thisTweet,
        //result_type: "recent",
        lang: 'en'
    };

    Twitter.get('search/tweets', params, function(err, data) {
        // if there no errors
        if (!err) {
            // grab ID of tweet to retweet
            
            var retweetId = data.statuses[0].id_str;
            
            // Tell TWITTER to retweet
            Twitter.post('statuses/retweet/:id', {id: retweetId}, function(err, response) {
                if (response) {
                    console.log("\nNow Tweeting about:" + params.q);
                    console.log('Retweeted!!!');
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('\nSomething went wrong while RETWEETING... Duplication maybe...\nThe Problem:');
                    console.log(err);
                }
            });
        }
        // if unable to Search a tweet
        else {
            
            console.log('\nSomething went wrong while SEARCHING for: ' + params.q);
            console.log('SEARCHING error:' + err);
        
        }
    });

}//end of function


//just call retweet
retweet();
// retweet in every 5 minutes
setInterval(retweet, 30000);
