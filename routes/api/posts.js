const express = require("express");
const router = express.Router();
var multer = require("multer");
var crypto = require("crypto");
const path = require("path");

const User = require("../../models/User");
const Post = require("../../models/Post");

var fileName;
const storage = multer.diskStorage({
  destination: "./client/src/assets/uploads/posts",
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(
        null,
        fileName = raw.toString("hex") + Date.now() + path.extname(file.originalname)
      );
    });
  },
});

const uploads = multer({ storage: storage });

router.post("/postadd", uploads.any("photos"), async (req, res) => {
    let newPost = {}
    let photos = []

    if(!req.body.title){
        return res.json({
            success: false,
            msg: "Podaj tytuł posta",
        });
    }else{
        const found = await Post.findOne({ title: req.body.title })
        if(found){
            return res.json({
                success: false,
                msg: "Post o podanym tytule już istnieje",
            });
        }else{
            newPost.title = req.body.title
        }  
    }
    if(!req.body.desc){
        return res.json({
            success: false,
            msg: "Podaj opis posta",
        });
    }
    else{
        newPost.desc = req.body.desc
    }

    if(req.body.videoLink){
        newPost.videoLink = req.body.videoLink
    }

    
console.log(req.files)
    if (req.files[0]?.path == undefined) {
    } else {
        if(req.files.length < 2){
             var obj = {
                photo: req.files[0].filename,
                desc: "",
            }
            photos.push(obj)
        }else{
            req.files.forEach(element => {
                var obj = {
                    photo: element.filename,
                    desc: "",
                }
                photos.push(obj)
            })
        }
    }

    if(req.body.descs){
        if(req.body.descs.length < 2){
            photos[0].desc = req.body.descs
            newPost.photos = photos
        }else if(req.body.descs.length > 1){
            let photoDescs = req.body.descs
            console.log(req.body.descs)
            photoDescs.forEach(function(element, i){
                photos[i].desc = element
            })
            newPost.photos = photos
        }
    }
    
    
    if(!req.body.creator){
        return res.json({
            success: false,
            msg: "jak to sie stalo"
        })
    }else{
        newPost.user = req.body.creator
    }

    const saved = await new Post(newPost).save()
       
    return res.json({
        success: true,
        msg: "cos",
        post: newPost,
    });
})

router.get("/postlist", async (req, res) => {
    const posts = await Post.find({}, { title: 1, desc: 1, photos: { $slice: 1 } }).sort([['date', -1]])
    
    return res.json({
        success: true,
        posts: posts,
    })
})

router.get("/post/:id", async (req, res) => {
    const post = await Post.findOne({_id: req.params.id})
    if(post){
        return res.json({
            success: true,
            exercise: exercise,
        })
    }else{
        return res.json({
            success: false,
            msg: "Błąd przy wyszukiwaniu posta",
        })
    }
})


module.exports = router; 