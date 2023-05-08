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

const visible = ref("")
const alert = ref("")

visible.value = false

function workouts(){
  router.push("/adminworkoutlist")
}

async function showExercises(){

}

function addDay(){
  plan.value.push({ day: "", exercises: [{ exercise: "", reps: "" }] })
}

function addExercise(index){
    plan.value[index].exercises.push({ exercise: "", reps: ""})
}

const addWorkout = async () => {
  console.log(plan.value)
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
                <v-text-field @click.once="addExercise(index)" v-model="e.exercise" label="Ćwiczenie"></v-text-field>
                <!--@keyup="showExercises(idx)" :id="'ex'+idx" 
                    <datalist :id="'ex'+idx">
                    <option v-for="ex in exercises" :value="ex._id">{{ ex.title }}</option>
                </datalist> -->
                <v-text-field v-model="e.reps" label="Liczba powtórzeń"></v-text-field>
              </v-container>
            </v-container>
            <v-btn @click="addDay">
              Dodaj kolejny dzień
            </v-btn>

            <v-text-field v-model="videoLink" label="Link do wideo"></v-text-field>

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
