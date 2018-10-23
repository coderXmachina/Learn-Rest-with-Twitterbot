/**
 * Created by admin on 1/8/2018.
 */

const request = require('request');

var apod = require("apod");
var fs = require("fs");
var moment = require('moment');

var namingConvInc = 10; //for downloading
var testDate = 1;      //for date test

var t = moment().subtract(4,'years').format();

console.log("Script that Gets NASA APOD for whatever use we may have of APOD");
console.log("Start to Retrieve APOD from date: " + t + "\n");

apod.apiKey = "0jWkyIedRWeC8ExdWGXXOLgOlNHEjam6DvodbTzo";

var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){

        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

var getMyAPOD = function(){
    //access API

    var g = new Date(2015, 3, testDate); //this is the date
    var APODTextDescitp = '';

    namingConvention = 'APOD';
    testDate++;
    namingConvention = namingConvention + (namingConvInc + '.png');

    console.log("getMyAPOD has been called!");
    console.log("Now Getting APOD: " + namingConvention + "From date: " + g + "\n");
    
    apod(g , function(err, mydata) { //year, month, day
        if(err){
            console.log("We have error trying to get APOD:");
            console.log(err + "\n");
        }

        else{

            console.log("APOD url: " + JSON.stringify(mydata.explanation) + "\n");
            console.log("APOD url: " + JSON.stringify(mydata.url) + "\n");
            
            ///////////////////////////////////////////////////////////////////////////////////////

            if(mydata.media_type == 'image'){//proceed with archiving

                APODTextDescitp = "\r\n" + namingConvention + "\r\n" + g + "\r\n" + mydata.explanation + "\r\n\r\n";

                fs.appendFile('APOD Description.txt', APODTextDescitp, function(err){
                    if(err) throw err;
                    console.log('APOD Archived')
                });
                
                download(mydata.url, namingConvention, function() {
                    console.log(namingConvention + ' APOD Downloaded.\n\n\n')
                }); 
            }
            
            else{
                console.log("APOD on " + g +  " is not an image.")
            }
            

            //make http request
            /*
             request(mydata.url, { json: true }, (err, res, body) => {
             if (err) {
             return console.log(err); }

             console.log(body.url);
             console.log(body.explanation);
             }); */

            ///////////////////////////////////////////////////////////////////////////////////////
        }

    });

    namingConvInc++;

}//end of get my APOD funcction

getMyAPOD();
setInterval(getMyAPOD, 120000); //every two minutes give me an apod

/*
//just call retweet
getMyAPOD();
// retweet in every 5 minutes
setInterval(getMyAPOD, 180000);
*/