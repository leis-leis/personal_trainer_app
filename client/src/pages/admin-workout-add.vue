<script setup>
import router from "@/router";
import { useUserStore } from "../stores/user";
import { ref } from "vue";
import { onMounted } from "vue";
import axios from "axios";
import { compileScript } from "vue/compiler-sfc";

const plan = ref([])
const title = ref("")
const desc = ref("")
const videoLink = ref("")
const exercises = ref("")

const visible = ref("")
const alert = ref("")

visible.value = false

function workouts(){
  router.push("/adminworkoutlist")
}

async function showExercises(e, el){
  //console.log(el)
  //el.id = "siema"
  //e.target.value = "cwiczenie"
  //console.log(e.target)
  const res = await axios.get("http://localhost:4000/api/exercises/exercises/" + el.exercise, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    exercises.value = res.data.exercises;
    //console.log(exercises.value)
}

function addDay(){
  plan.value.push({ day: "", exercises: [{  }] })
}

function addExercise(index){
    plan.value[index].exercises.push({ exercise: "", reps: "", id: "" })
}

const addWorkout = async () => {
  // console.log(plan.value)
  // console.log("numer dzien")
  // console.log(plan.value[0].day)
  // console.log("tablica cwiczenia")
  // console.log(plan.value[0].exercises)
  // console.log("nazwa cwiczenia")
  // console.log(plan.value[0].exercises[0].exercise)
  //console.log(plan.value[0].exercises[0]._id)
  //console.log("\n\n")
  
  let idx = 0
  let toDelete = []

  plan.value.forEach(async (day, i) => {
    day.exercises.forEach(async (ex, j) => {
      if(ex.exercise != ""){ //typ danych moze byc zepsuty
        idx++
        const res = await axios.get("http://localhost:4000/api/exercises/exercisecheck/" + ex.exercise, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        if(!res.data.success){
          visible.value = true
          alert.value = res.data.msg + " " + ex.exercise
          return
        }else{
          ex.id = res.data.id
          //plan.value[i].exercises[j].id = res.data.id
        }
        if(ex.reps == ""){
          visible.value = true
          alert.value = "Nie podano liczby powtórzeń dla ćwiczenia " + ex.exercise
          return
        }
      }else{
        toDelete.push(idx)
        idx++
      }
      

    })
    //console.log(toDelete)
    toDelete.forEach(i => {
      //delete day.exercises[i] // wali jakies errory tutaj ale ogolnie przekazuje dobrze
    })
    //console.log(plan.value[0].exercises)

  })
  console.log(plan.value)
  console.log(plan.value[0].exercises)

  const res = await axios.post("http://localhost:4000/api/workouts/workoutadd", {
      title: title.value,
      desc: desc.value,
      plan: plan.value,
      dayzero: plan.value[0].exercises
    },
    {
      headers: {
       //Authorization: userStore.token,
      },
    })

    console.log(res);

    console.log(plan.value[0].exercises)

    if(!res.data.success){
      visible.value = true
      alert.value = res.data.msg
    }

}
</script>
 
<template>
  <v-container style="display: flex; flex-direction: row; justify-content: space-around;">
    <v-btn @click="workouts" variant="tonal">
      Plany treningowe
    </v-btn>
    <h1>Dodaj plan treningowy</h1>
  </v-container>

  <v-container style="width: 50%;">
    <v-container>
            <!-- https://vuetifyjs.com/en/components/alerts/ -->
            <v-alert 
            v-model="visible" 
            :text="alert" 
            title="Błąd!" 
            variant="tonal" 
            type="error"
            icon="mdi-exclamation"
            border="top" 
            closable 
            close-text="Zamknij ostrzeżenie o błędzie"
            >
            </v-alert>
          </v-container>
        <v-container>
            <v-text-field v-model="title" label="Nazwa planu"></v-text-field>
          
            <v-text-field v-model="desc" label="Opis planu"></v-text-field>

            <v-container v-for="(day, index) in plan">
              <v-text-field v-model="day.day" label="Dzień"></v-text-field>
              <v-container style="display: flex; flex-direction:row;" v-for="(e, idx) in day.exercises">
                <v-text-field v-model="plan[index].exercises[idx].exercise" @keyup="showExercises($event, e)" @click.once="addExercise(index)" :list="'ex'+idx" label="Ćwiczenie"></v-text-field>
                <datalist :id="'ex'+idx">
                    <option v-for="ex in exercises" :key="ex._id" :value="ex.title"></option>
                </datalist>
                <v-text-field v-model="plan[index].exercises[idx].reps" label="Liczba powtórzeń"></v-text-field>
              </v-container>
            </v-container>
            <v-btn @click="addDay">
              Dodaj kolejny dzień
            </v-btn>

        </v-container>
        <v-container class="text-center">
            <!-- https://vuetifyjs.com/en/components/buttons/ -->
            <v-btn @click="addWorkout" variant="tonal">
              Dodaj plan treningowy
            </v-btn>
          </v-container>
  </v-container>
</template>

<style scoped></style>
