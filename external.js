function myFunc(){

    var test = new Date();

    $("#theDate").innerHTML = test.toLocaleDateString();
    //document.getElementById("theDate").innerHTML = "Last Collected Data: " + currentDate;
    
    
}

//myFunc();

$(function () {
    myFunc();
});