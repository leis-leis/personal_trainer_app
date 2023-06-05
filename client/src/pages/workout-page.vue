<script setup>
import router from "@/router";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "../stores/user";
import { ref } from "vue";
import { onMounted } from "vue";
import axios from "axios";

const route = useRoute()

const workout = ref("")

const noDays = ref("")
const currentDay = ref(0)
const activeIndex = ref(0)

const day = ref("")
const exercise = ref("")
const reps = ref("")

const noExInDay = ref("")
const currentEx = ref(0)

async function getExercise(id){
    const res = await axios.get("http://127.0.0.1:4000/api/exercises/exercise/" + id)
    //console.log(res.data)
    if(res.data.success){
        console.log(workout.value)
        reps.value = workout.value.plan[currentDay.value].exercises[currentEx.value].reps
        return res.data.exercise
    }else{
        //obsluzyc blad
        console.log(res.data.msg)
    }
}

async function prevDay(){
    if(currentDay.value == 0){
        currentDay.value = noDays.value -1
    }else{
        currentDay.value -= 1
    }
    day.value = workout.value.plan[currentDay.value].day
    noExInDay.value = workout.value.plan[currentDay.value].exercises.length
    currentEx.value = 0
    exercise.value = await getExercise(workout.value.plan[currentDay.value].exercises[currentEx.value].exercise)
}

async function nextDay(){
    if(noDays.value -1 > currentDay.value){
        currentDay.value += 1
    }else{
        currentDay.value = 0
    }
    day.value = workout.value.plan[currentDay.value].day
    noExInDay.value = workout.value.plan[currentDay.value].exercises.length
    currentEx.value = 0
    exercise.value = await getExercise(workout.value.plan[currentDay.value].exercises[currentEx.value].exercise)
    //console.log(currentDay.value)
}

async function prevEx(){
    if(currentEx.value == 0){
        currentEx.value = noExInDay.value -1
    }else{
        currentEx.value -= 1
    }
    exercise.value = await getExercise(workout.value.plan[currentDay.value].exercises[currentEx.value].exercise)
}

async function nextEx(){
    if(noExInDay.value -1 > currentEx.value){
        currentEx.value += 1
    }else{
        currentEx.value = 0
    }
    exercise.value = await getExercise(workout.value.plan[currentDay.value].exercises[currentEx.value].exercise)
}


onMounted(async () => {
  const res = await axios.get("http://127.0.0.1:4000/api/workouts/workout/" + route.params.id)
  workout.value = res.data.workout
  noDays.value = res.data.workout.plan.length
  currentDay.value = 0
  console.log(noDays.value)
  noExInDay.value = res.data.workout.plan[currentDay.value].exercises.length
  currentEx.value = 0
  console.log(noExInDay.value)
  console.log(workout.value)

  day.value = workout.value.plan[currentDay.value].day

  exercise.value = await getExercise(workout.value.plan[currentDay.value].exercises[currentEx.value].exercise)
  //console.log(day.value)
//   console.log(workout.value.plan[0].day)
//console.log(exercise.value)
})

</script>

<template>
  <h1>{{ workout.title }}</h1>
  <p>{{ workout.desc }}</p>
  <v-container>
    <v-btn @click="prevDay" variant="tonal">
        Poprzedni dzień
    </v-btn>
    <h3>{{ day }}</h3>
    <v-btn @click="nextDay" variant="tonal">
        Następny dzień
    </v-btn>
</v-container>
<v-container>
    <v-btn @click="prevEx" variant="tonal">
        Poprzednie ćwiczenie
    </v-btn>
    <h4>{{ exercise.title }}</h4>
    <p>{{ exercise.desc }}</p>
    <p>Liczba powtórzeń: {{ reps }}</p>
    <v-btn @click="nextEx" variant="tonal">
        Następne ćwiczenie
    </v-btn>
    
    <v-carousel v-model="activeIndex">
    <v-carousel-item v-for="photo in exercise.photos"
        :src="'/src/assets/uploads/exercises/' + photo.photo"
    >
        <div class="d-flex fill-height justify-center align-end">
          <div class="text-h2">
            {{ photo.desc }}
          </div>
        </div>
</v-carousel-item>
    </v-carousel>
</v-container>
</template>

<style scoped></style>
