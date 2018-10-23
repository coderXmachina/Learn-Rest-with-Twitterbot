/**
 * Created by admin on 1/30/2018.
 */

var bloq = require('./myLedger.json');

console.log("These are the Spendings on day of 24/1/2018");

for(var i = 0; i < 11 ; i++){
    if(bloq.chain[i].details.spendTimestamp == "25/1/2017"){
        console.log(bloq.chain[i].details);
        console.log("\n");
    }
}