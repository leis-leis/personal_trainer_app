const express = require("express");
const router = express.Router();
var multer = require("multer");
var crypto = require("crypto");
const path = require("path");

const User = require("../../models/User");
const Workout = require("../../models/Workout");
const Exercise = require("../../models/Exercise");

function removeEmpty(obj) {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([_, v]) => v != null)
        .map(([k, v]) => [k, v === Object(v) ? removeEmpty(v) : v])
    );
  }

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

// console.log("dzien zero: " + req.body.dayzero)
console.log(req.body)
// console.log(req.body.plan[0].exercises)
    
    if(!req.body.title){
        return res.json({
            msg: "Nie podano nazwy planu treningowego",
            success: false,
          });
    }
    const w = await Workout.findOne({title: req.body.title})
    if(w){
        return res.json({
            msg: "Plan o podanej nazwie już istnieje",
            success: false,
          });
    }
    if(!req.body.desc){
        return res.json({
            msg: "Nie podano opisu planu treningowego",
            success: false,
          });
    }
    console.log(req.body.plan[0].exercises)

    req.body.plan?.forEach((p, i) => {
        if(!req.body.plan[i].day || req.body.plan[i].day == ''){
            return res.json({
                msg: `Nie można stworzyć planu bez podziału na dni (dzień ${i+1})`,
                success: false,
              });
        }
    })

    req.body.plan?.forEach((p, i) => {
        if(req.body.plan[i].exercises.length < 1){
            return res.json({
                msg: `Nie można stworzyć dnia bez ćwiczeń (dzień ${i+1})`,
                success: false,
              });
        }
    })
    
    

    var newPlan = {
        title: req.body.title,
        desc: req.body.desc,
        //isPublic: req.body.isPublic,
        //creator: req.body.creator,
        plan: [{}],
        //isPublic: req.body.isPublic,
        //users: [],
    }

    
    
    
    req.body.plan.forEach(async (p, i) => {
        var resArray = []
        //newPlan.plan[index].day = p.day
        
        p.exercises.forEach(element => {
            if(element.exercise == "" || element.reps == ""){
                console.log('puste')
            }else{
                //console.log(element) //no id here
                resArray.push(element)
            }
        })
        //console.log(resArray)

        
            newPlan.plan[i] = { day: "", exercises: []}
            newPlan.plan[i].day = req.body.plan[i].day
            for(var j = 0; j < resArray.length; j++){
                newPlan.plan[i].exercises[j] = {exercise: "", reps: ""}
                newPlan.plan[i].exercises[j].exercise = resArray[j].id
                newPlan.plan[i].exercises[j].reps = resArray[j].reps
            }
        
        // resArray.forEach(async (e, idx) => {
        //     //console.log(e)
        //     // const ex = await Exercise.findOne({title: e.exercise})
        //     // console.log(ex._id)
        //     newPlan.plan[index].exercises[idx].exercise = e.id
        //     newPlan.plan[index].exercises[idx].reps = e.reps
        // })
    })
    
        //console.log("ćwiczenia z dania: " + newPlan.plan[i].day +"\n"+newPlan.plan[i].exercises)
    
    // newPlan.plan.forEach(e => {
    //     console.log(e.day)
    //     e.exercises.forEach(el => {
    //         console.log(el)
    //     })
    // })

    // if(req.body.users?.length > 0){
    //     req.body.users.forEach(u => {
    //         newPlan.users.push(u)
    //     })
    // }
    
    //console.log(newPlan)


    //console.log(newPlan.plan[0].exercises)
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

router.get("/workout/:id", async (req, res) => {
    const workout = await Workout.findOne({_id: req.params.id})
    if(workout){
        return res.json({
            success: true,
            workout: workout,
        })
    }else{
        return res.json({
            success: false,
            msg: "Błąd przy wyszukiwaniu planu treningowego",
        })
    }
})

router.get("/workoutmanage/:id", async (req, res) => {
    const workout = await Workout.findOne({_id: req.params.id})
    if(workout){
        return res.json({
            success: true,
            workout: workout,
        })
    }else{
        return res.json({
            success: false,
            msg: "Błąd przy wyszukiwaniu planu treningowego",
        })
    }
})


module.exports = router; 