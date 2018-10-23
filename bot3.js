var twit = require('twit');
var fs = require('fs');
var config = require('./config');
var meConfig = require('./mine.js'); //checks hashspace

var Twitter = new twit (config);
var checker = [3];//global

class myNetSecNewsCollectInstance{
    //collect data, one go is a full 3 sweep
    collect() {

        //----------------------------------------------------------------
        /*
         When one category of # is chosen in a batch it will not be chosen again. Next batch is fine but don't repetitively 
         */

        var thisInstance = meConfig.cyberSecArray[Math.floor(Math.random() * 7)]; //by this time we have the checker
        checker[t] = meConfig.cyberSecArray[Math.floor(Math.random() * 7)];

        var params = {
            q: thisInstance,
            result_type: "recent",
            lang: 'en'
        };

        //learn to tweet with reply
        Twitter.get('search/tweets', params, function(err, data) {
            // if there no errors
            if (!err) {
                // grab ID of tweet to retweet

                var retweetId = data.statuses[0];

                //theres a chance that entities doesn't exist, this is the outcome we want
                if(typeof retweetId.entities.urls[0] != 'undefined'){//is there a URL?

                    var putInString = '';
                    console.log("\n" +"[" + t + "]" + " Retrieved News on: " + params.q);
                    console.log("This the Text:" + retweetId.text + "\nThis the Link:" +  JSON.stringify(retweetId.entities.urls[0].url) + "\n");

                    putInString += '\r\nLatest news on ' + params.q + "\r\n";
                    putInString += (retweetId.text + " " + "\r\n" + JSON.stringify(retweetId.entities.urls[0].url) + "\r\n");

                    /*Append to String*/
                    fs.appendFile('securityNewsletter.txt', putInString, function(err){
                        if(err) throw err;
                    });
                }

                else{//theres no Link in the article, I think we should recursive call
                    console.log("Theres's no link in the article, Recall function");
                    newsScrapeInstance.collect();
                }

                //postThisTweet()

            }
            // Terrible Error
            else {
                console.log('\nSomething went wrong while SEARCHING for: ' + params.q);
                console.log('Twitter.Get error:' + err);
                console.log("Recall the function");

                collect();//calls collect again
            }
        });

    };//end of function
}

let newsScrapeInstance = new myNetSecNewsCollectInstance();

for(var t = 0; t < 3; t++){//will be called 3 times
    //console.log("-----------------------------------------------------");
    newsScrapeInstance.collect();
    //console.log("-----------------------------------------------------");
}

// retweet in every 5 minutes
//setInterval(, 480000);
