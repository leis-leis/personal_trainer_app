const express = require("express");
const router = express.Router();
var multer = require("multer");
var crypto = require("crypto");
const path = require("path");

const User = require("../../models/User");
const Exercise = require("../../models/Exercise");

var fileName;
const storage = multer.diskStorage({
  destination: "./client/src/assets/uploads/exercises",
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

router.post("/exerciseadd", uploads.any("photos"), async (req, res) => {
    let newExercise = {}
    let photos = []

    if(!req.body.title){
        return res.json({
            success: false,
            msg: "Podaj nazwę ćwiczenia",
        });
    }else{
        const found = await Exercise.findOne({ title: req.body.title })
        if(found){
            return res.json({
                success: false,
                msg: "Ćwiczenie o podanej nazwie już istnieje",
            });
        }else{
            newExercise.title = req.body.title
        }  
    }
    if(!req.body.desc){
        return res.json({
            success: false,
            msg: "Podaj opis ćwiczenia",
        });
    }
    else{
        newExercise.desc = req.body.desc
    }

    if(req.body.videoLink != undefined && req.files.length == 0){
        return res.json({
            success: false,
            msg: "Dodaj link do filmu, lub zdjęcie/cia",
        });
    }

    if(req.body.videoLink){
        newExercise.videoLink = req.body.videoLink
    }

    

    if (req.files[0]?.path == undefined) {
    } else {
        req.files.forEach(element => {
            var obj = {
                photo: element.filename,
                desc: "",
            }
            photos.push(obj)
        })
    }

    if(req.body.descs){
        let photoDescs = []
        photoDescs.push(req.body.descs)

        //console.log(req.body.descs)
        photoDescs.forEach(function(element, i){
            photos[i].desc = element
        })
        newExercise.photos = photos
    }
    
    if(!req.body.creator){
        return res.json({
            success: false,
            msg: "jak to sie stalo"
        })
    }else{
        newExercise.creator = req.body.creator
    }

    const saved = await new Exercise(newExercise).save()
       
    return res.json({
        success: true,
        msg: "cos",
        exercise: newExercise,
    });
})

router.get("/exerciselist", async (req, res) => {
    const exercises = await Exercise.find({}, { title: 1, desc: 1, photos: { $slice: 1 } })
    
    return res.json({
        success: true,
        exercises: exercises,
    })
})

router.get("/exercises/:search?", async (req, res) => {
      let regex
  
      if(req.params.search){
        let s = req.params.search
        regex = new RegExp(s, 'i') // "i" opcja na case insensitive
      }
      var exercise
      if(regex){
        exercise = await Exercise.find({
        "title" : { "$regex": regex }
      }) 
      }else{
        exercise = await Exercise.find({
      })
      }
  
      return res.json({
        success: true,
        exercises: exercise
      });
      
    }
  )

router.get("/exercisecheck/:title", async (req, res) => {
    const exercise = await Exercise.findOne({title: req.params.title})
    if(exercise){
        return res.json({
            success: true,
            id: exercise._id
        })
    }else{
        return res.json({
            success: false,
            msg: "Błąd przy wyszukiwaniu ćwiczenia",
        })
    }
})

router.get("/exercise/:id", async (req, res) => {
    const exercise = await Exercise.findOne({_id: req.params.id})
    if(exercise){
        return res.json({
            success: true,
            exercise: exercise,
        })
    }else{
        return res.json({
            success: false,
            msg: "Błąd przy wyszukiwaniu ćwiczenia",
        })
    }
})


module.exports = router; 