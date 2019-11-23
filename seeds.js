var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data =[
    {name: "Shangrila", image:"https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c722b7ed79349c358_340.png",
    description: "Bla Bla Bla"},
    {name: "Oh Bla Dee", image:"https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c722b7ed79349c358_340.jpg",
    description: "Great night's sleep"},
    {name: "Oh Bla Dah", image:"https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c722b7ed79349c358_340.jpg",
    description: "Awesome spot"}
]


function seedDB(){


    Campground.remove({},(err)=>{
        if(err){
        console.log(err);
        }else{
            console.log("removed all campgrounds!");
                data.forEach(seed => {
                    Campground.create(seed,(err,campground)=>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log(seed);
                            Comment.create({
                                text:"This place is great but missing internet",
                                author: "Homer"},(err,comment)=>{
                                if(err){
                                    console.log(err);
                                }else{
                                    console.log(comment);
                                    campground.comments.push(comment);
                                    campground.save()
                                }
                            })
                        }
                    });
                    
                });
        }
    
    });
    //add a few campgrounds
/*     Campground.create(data) */


    //add a few comments
}

module.exports = seedDB;