const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine','ejs'); //  tells app to use ejs as a view engine

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); // to add static pages to website
var items = ["wake-up","brush","eat"];
let worklist = [];

app.get("/",function(req,res){
    var current = new Date();
    //var today = current.getDay();   // type I to show date
    // var day = "";
    // if(today === 1)
    // {
    //     day = "Monday";
    // }
    // else if(today === 2)
    // {
    //     day = "Tuesday";
    // }
    // else if(today === 3)
    // {
    //     day = "Wednesday";
    // }
    // else if(today === 4)
    // {
    //     day = "Thursday";
    // }
    // else if(today === 5)
    // {
    //     day = "Friday";
    // }
    // else if(today === 6)
    // {
    //     day = "Saturday";
    // }
    // else if(today === 0)
    // {
    //     day = "Sunday";
    // }

    //or
   
    var options = {     // new way to show date(type II)
        weekday: "long",
        day : "numeric",
        month : "long",
    };

    var day = current.toLocaleDateString("en-US",options);

    res.render("list",{listItems:day,newListItem:items}); // render can only be written once
    
});

app.post("/",function(req,res){
    var item = req.body.newItem;
    if(req.body.list == "worklist")
    {
        worklist.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item); // item added to items array
        res.redirect("/"); // redirects to ejs loop
    }
});

app.get("/work",function(req,res){
    res.render("list",{listItems:"worklist",newListItem:worklist});
});



// app.post("/work",function(req,res){
//    let item = req.body.newItem;
//    worklist.push(item);
//    res.redirect("/work");
// });

app.listen(3000,function(){
    console.log("Server up");
});