const express = require("express");
const router = express.Router();
var multer = require("multer");
var crypto = require("crypto");
const path = require("path");

const User = require("../../models/User");
const Workout = require("../../models/Workout");
const Exercise = require("../../models/Exercise");

router.get("/workoutadd", async (req, res) => {
    const exercises = await Exercise.find({}, { title: 1, desc: 1 })
    
    return res.json({
        success: true,
        exercises: exercises,
    })
})

router.post("/workoutadd", async (req, res) => {
//     title
//   desc:
//   plan: [{
//     day:
//     exercises: []
//   }],
//   isPublic:
//   users: []
//   creator: 

//console.log(req.body)

    if(!req.body.title){
        return res.json({
            msg: "Nie podano nazwy planu treningowego",
            success: false,
          });
    }
    if(!req.body.desc){
        return res.json({
            msg: "Nie podano opisu planu treningowego",
            success: false,
          });
    }

    req.body.plan?.forEach((p, i) => {
        if(!req.body.plan[i].day){
            return res.json({
                msg: `Nie można stworzyć planu bez podziału na dni (dzień ${p.day})`,
                success: false,
              });
        }
    })

    req.body.plan?.forEach((p, i) => {
        if(req.body.plan[i].exercises.length < 1){
            return res.json({
                msg: `Nie można stworzyć dnia bez ćwiczeń (dzień ${p.day})`,
                success: false,
              });
        }
    })
    
    

    var newPlan = {
        title: req.body.title,
        desc: req.body.desc,
        isPublic: req.body.isPublic,
        creator: req.body.creator,
        plan: [],
        isPublic: req.body.isPublic,
        users: [],
    }

    for(var i = 0; i < req.body.plan.length; i++){
        newPlan.plan[i] = { day: "", exercises: []}
        for(var j = 0; j < req.body.plan[i].exercises.length; j++){
            newPlan.plan[i].exercises[j] = { exercise: "", reps: "" }
        }
    }
    

    req.body.plan.forEach((p, index) => {
        
        newPlan.plan[index].day = p.day

        p.exercises.forEach((e, idx) => {
            newPlan.plan[index].exercises[idx].exercise = e.exercise
            newPlan.plan[index].exercises[idx].reps = e.reps
        })
    })
    // newPlan.plan.forEach(e => {
    //     console.log(e.day)
    //     e.exercises.forEach(el => {
    //         console.log(el)
    //     })
    // })

    if(req.body.users?.length > 0){
        req.body.users.forEach(u => {
            newPlan.users.push(u)
        })
    }
    
    const saved = await new Workout(newPlan).save()

    return res.json({
        msg: "dodano plan treningowy",
        workout: newPlan,
        success: true,
    });
})

router.get("/workoutlist", async (req, res) => {
    const workouts = await Workout.find({}, { title: 1, desc: 1 })
    
    return res.json({
        success: true,
        workouts: workouts,
    })
})


module.exports = router; 