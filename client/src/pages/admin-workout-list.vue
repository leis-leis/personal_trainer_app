<script setup>
import router from "@/router";
import { useUserStore } from "../stores/user";
import { ref } from "vue";
import { onMounted } from "vue";
import axios from "axios";

const workouts = ref("")

onMounted(async () => {
  const res = await axios.get("http://127.0.0.1:4000/api/workouts/workoutlist")
  workouts.value = res.data.workouts
})

function adminpanel(){
    router.push("/adminpanel")
}

function workoutsadd(){
    router.push("/adminworkoutadd")
}
</script>

<template>
  <v-container style="display: flex; flex-direction: row; justify-content: space-around;">
    <v-btn @click="adminpanel" variant="tonal">
      Panel administracyjny
    </v-btn>
    <h1>Lista planów treningowych</h1>
    <v-btn @click="workoutsadd" variant="tonal">
      Dodaj plan treningowy
    </v-btn>
  </v-container>

  <v-list>
    <v-list-item v-for="workout in workouts">
        <v-container style="display: flex; flex-direction: row;">
            <v-container style="display: flex; flex-direction: column;">
                <v-list-item-title>{{ workout.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ workout.desc }}</v-list-item-subtitle>
            </v-container>
        </v-container>
    </v-list-item>
  </v-list>
</template>

<style scoped></style>
