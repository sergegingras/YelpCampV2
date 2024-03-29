const   express = require("express"),
        app = express(),   
        bodyParser = require("body-parser"),
        mongoose = require('mongoose'),
        Campground = require('./models/campground.js'),
        seedDB = require("./seeds.js");

seedDB();

mongoose.connect('mongodb://localhost:27017/yelp_campV3',{useNewUrlParser: true, useUnifiedTopology: true});



app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");


app.get("/",(req,res)=>{
    //this just sends data to the page. 
    //res.send("THIS WILL BE THE LANDING PAGE SOON");
    res.render("landing");
});

//this is the index -- show all campgrounds
app.get("/campgrounds",(req,res)=>{
    //get all campgrounds from the db
    Campground.find({},(err,allCampgrounds)=>{
        if(err){
            console.log(err);
        }else{
            res.render("index.ejs",{campgrounds:allCampgrounds});
        }
    })
    //res.render("campgrounds",{campgrounds:campgrounds});
})

// new -- this is the show the form
app.get("/campgrounds/new",(req,res)=>{
    res.render("new.ejs")
})
// create -- add new campground to database
app.post("/campgrounds",(req,res)=>{
    //I did this just to test the post route using postman
    // commented this out after -- res.send("you hit the post button")
    //want to get data from form and add to campgrounds array
    //redirect back to campgrounds page. 
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name:name,image:image,description:desc};
    
    //create a n ew campground and save to db
    Campground.create(newCampground,(err,newlyCreated)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
    
    //campgrounds.push(newCampground);
    //res.redirect("/campgrounds");
});

app.get("/campgrounds/:id",function(req,res){
    //find the campground with provided id 
    //render show template with that campground
    Campground.findById(req.params.id).populate("comments").exec((err,foundCampground)=>{
        if(err){
            console.log(err);
        }else{
         // render the show template
         console.log(foundCampground);
         console.log("hi serge");
         res.render("show.ejs",{campground: foundCampground});       
        }
    });
    

});
app.listen(3000,()=>{
	console.log("YelpCamp Server started port 3000");
}
);
