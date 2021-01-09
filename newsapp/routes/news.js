var express = require("express");
const { render } = require("../app");

var router = express.Router();
var moment = require("moment");

var News = require("../models/NewsSchema");

// get all news
router.get("/", function(req, res, next){
    let ListNews=[];
    News.find(function(err,news){
        if(news){
            for(let data of news){
                ListNews.push({
                    id:data.id,
                    name:data.name,
                    released_on:data.released_on
                })
            }
            res.render("news/allNews", {ListNews})
        } else {
            ListNews.push({
                id:"",
                name:"",
                released_on:""
            });
            res.render("news/allNews", {ListNews});
        }
    });
});

// create news
router.get("/create", function(req, res, next){
    res.render("news/createNews", {title:"Create News"});
});

// update news
router.get("/update/:newsId", function(req, res, next){
    News.findById(req.params.newsId, function(err, newsInfo){
        
        var newDate = moment(newsInfo.released_on).format("YYYY-MM-DD");
        if (newsInfo){
            console.log(newsInfo);
            res.render("news/updateNews", {
                news:newsInfo,
                newDate
            });
        }
    });
});

// action create
router.post("/create", function(req, res){
    const {name, date} = req.body;

    let errors = [];
    
    if(!name || !date){
        errors.push({msg:"Silahkan lengkapi data"});
    }
    if(errors.length > 0){
        res.render("news/createNews", {errors});
    } else {
        const newNews = News({
            name,
            released_on : date
        });
        newNews.save().then(
            news =>{
                errors.push({msg:"data berhasil ditambah"});
                res.render("news/createNews", {errors})
            }
        ).catch(err=>console.log(err));
    }
});

//action update
router.post("/update", function(req, res){
    let errors = [];

    News.findByIdAndUpdate(req.body.id, {name:req.body.name,released_on:req.body.date}, 
        function(err){
            if(err){
                console.log(err);
            } else {
                errors.push({msg:"Data Berhasil terupdate"});
                var newNews = {_id:req.body.id, name:req.body.name};
                var newDate = moment(req.body.date).format("YYYY-MM-DD");
                res.render("news/updateNews",{
                    news: newNews,
                    newDate,
                    errors
                })
            }
        })
});

// action delete
router.get("/delete/:newsId", function(req, res){
    News.findByIdAndDelete(req.params.newsId, function(){
        res.redirect("/news");
    })
});

module.exports = router;