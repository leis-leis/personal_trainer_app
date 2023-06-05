<script setup>
import router from "@/router";
import { useUserStore } from "../stores/user";
import { ref } from "vue";
import { onMounted } from "vue";
import axios from "axios";

const exercises = ref("")

onMounted(async () => {
  const res = await axios.get("http://127.0.0.1:4000/api/exercises/exerciselist")
  exercises.value = res.data.exercises
  console.log(exercises.value)
})

function adminpanel(){
    router.push("/adminpanel")
}

function exercisesadd(){
    router.push("/adminexerciseadd")
}
</script>

<template>
  <v-container style="display: flex; flex-direction: row; justify-content: space-around;">
    <v-btn @click="adminpanel" variant="tonal">
      Panel administracyjny
    </v-btn>
    <h1>Lista ćwiczeń</h1>
    <v-btn @click="exercisesadd" variant="tonal">
      Dodaj ćwiczenie
    </v-btn>
  </v-container>

  <v-list>
    <v-list-item v-for="exercise in exercises">
      <router-link :to="{name: 'exercise', params: {id: exercise._id}}">
        <v-container style="display: flex; flex-direction: row;">
            <v-img width="100" :src="'/src/assets/uploads/exercises/' + exercise.photos[0]?.photo"></v-img>
            <v-container style="display: flex; flex-direction: column;">
                <v-list-item-title>{{ exercise.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ exercise.desc }}</v-list-item-subtitle>
            </v-container>
        </v-container>
      </router-link>
    </v-list-item>
  </v-list>
</template>

<style scoped></style>
