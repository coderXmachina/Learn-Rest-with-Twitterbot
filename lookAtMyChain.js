/**
 * Created by admin on 1/23/2018.
 */

var fs = require('fs');
const SHA256 = require('crypto-js/sha256');

class myBloq {
    constructor(index, timestamp, details , data, previousHash = ''){
        this.index = index;                 //optional what number block on the chain
        this.entryTimestamp = timestamp;         //when the blck
        this.data = data;                   //content data associated with this block
        this.details = details;             //details of the interaction
        this.previousHash = previousHash;   //string, hash of the last one
        this.hash = this.calculateMyHash();                     //hash of the bloq
    }

    //create method to calculate hash
    calculateMyHash(){
        //we will use sha 256
        return  SHA256(this.index + this.previousHash+ this.entryTimestamp + JSON.stringify(this.data)).toString();
    }

}

//class called Block Chain
class bloqChain{
    constructor(){
        this.chain = [this.createGenesisBloq()]; //point to the constructor
    }

    createGenesisBloq(){
        return new myBloq(0 , "1/1/2018" , "Genesis Bloq", "0")
    }

    getLaestBloq(){
        return this.chain[this.chain.length - 1];
    }
    addBloq(newBloq){
        newBloq.previousHash = this.getLaestBloq().hash;
        newBloq.hash = newBloq.calculateMyHash();
        this.chain.push(newBloq);
    }

    verifyBloq(){//Block Validator
        for(let i = 1; i < this.chain.length ; i++){
            const currentBlock = this.chain[i]; //lol DNE lah
            const previousBlock = this.chain[i - 1];
            
            //this verifies the bloq...
            //is the 
            if(currentBlock.hash !== currentBlock.calculateMyHash()){
                //console.log("Chain Invalid");
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
            //
            
            /*
            //does our block point to the correct previous block
            if(currentBlock.previousHash !== previousBlock.hash){ 
                console.log("Chain Invalid");
                return false;
            } */
            
        }//ends for loop
        
        return true;
    }

}

let fedCoin = new bloqChain(); //that class though
fedCoin.addBloq(new myBloq(1, "7/2/2018", {xo : "4"}));
fedCoin.addBloq(new myBloq(2, "16/3/2018", {xo : "7"}));
fedCoin.addBloq(new myBloq(3, "4/4/2018", {xo : "11"}));
fedCoin.addBloq(new myBloq(4, "1/5/2018", {xo : "3"}));
fedCoin.addBloq(new myBloq(5, "22/5/2019", {xo : "2"}));

let myLedger = new bloqChain();

myLedger.addBloq(new myBloq(1, "29/1/2018", {purchase: "Fish Oil", amount : 210, spendTimestamp: "24/1/2017" }));
myLedger.addBloq(new myBloq(2, "29/1/2018", {purchase: "Pastries and Teethcare", amount : 20, spendTimestamp: "24/1/2017" }));
myLedger.addBloq(new myBloq(3, "29/1/2018", {purchase: "Water and Breakfast", amount : 10, spendTimestamp: "25/1/2017" }));
myLedger.addBloq(new myBloq(4, "29/1/2018", {purchase: "Pizza and Pastries", amount : 40, spendTimestamp: "25/1/2017" }));
myLedger.addBloq(new myBloq(5, "29/1/2018", {purchase: "Friday Snackems & Misc", amount : 10, spendTimestamp: "26/1/2017" }));
myLedger.addBloq(new myBloq(6, "29/1/2018", {purchase: "Tribute + Food On Movie Day", amount : 60, spendTimestamp: "27/1/2017" }));
myLedger.addBloq(new myBloq(7, "30/1/2018", {purchase: "Pre Debate Refreshments", amount : 9, spendTimestamp: "29/1/2017" }));//7 E drinks
myLedger.addBloq(new myBloq(8, "30/1/2018", {purchase: "Bread and Butter Dinner", amount : 12, spendTimestamp: "29/1/2017" }));//Bread and Cream Cheese Nun
myLedger.addBloq(new myBloq(9, "30/1/2018", {purchase: "Janvier Rent", amount : 1050, spendTimestamp: "29/1/2017" }));//Rent
myLedger.addBloq(new myBloq(10, "30/1/2018", {purchase: "Tesla Plasma Ball", amount : 32, spendTimestamp: "30/1/2017" }));//Plasma Ball
myLedger.addBloq(new myBloq(10, "27/7/2018", {purchase: "breakfast", amount : 10, spendTimestamp: "27/7/2018" }));//Plasma Ball
myLedger.addBloq(new myBloq(10, "20/7/2018", {purchase: "Pants", amount : 60, spendTimestamp: "26/7/2018" }));//Plasma Ball

console.log(JSON.stringify(fedCoin, null, 4));

/*
fs.writeFile('mybloq.json' , JSON.stringify(fedCoin, null, 4), function(err,res){
    if(err){
        console.log("We got Error");
    }
    
    else{
        console.log("Success")
    }
    
}); */

fs.writeFile('myLedger.json' , JSON.stringify(myLedger, null, 4), function(err,res){
    if(err){
        console.log("We got Error");
    }

    else{
        console.log("Successfully wrote the file")
    }

});

console.log("is chain valid? " + fedCoin.verifyBloq());

console.log("\nChanging Value!\n");

fedCoin.chain[1].data = { xo: "100"};

console.log("is chain valid? " + fedCoin.verifyBloq() + "\n");

console.log("Now Recalculating Hash " + fedCoin.verifyBloq() + "\n");

//console.log(JSON.stringify(fedCoin, null, 4));

fedCoin.chain[1].hash = fedCoin.chain[1].calculateMyHash();//recalculate my hash

console.log("is chain valid? " + fedCoin.verifyBloq() + "\n\n");

//console.log(JSON.stringify(fedCoin, null, 4));

console.log("This is the Hash of myledger.chain[4]: It will be same as manually calcualte");

console.log(myLedger.chain[4].hash);
console.log(SHA256(myLedger.chain[4].index + myLedger.chain[4].previousHash +  myLedger.chain[4].entryTimestamp + JSON.stringify(myLedger.chain[4].data)).toString());

console.log("This will be different:");

console.log(SHA256(myLedger.chain[4].index + myLedger.chain[4].previousHash +  myLedger.chain[4].entryTimestamp + JSON.stringify(myLedger.chain[4].details)).toString());