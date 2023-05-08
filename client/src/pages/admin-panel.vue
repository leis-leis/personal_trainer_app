<script setup>
import router from "@/router";
import { useUserStore } from "../stores/user";
import { ref } from "vue";
import { onMounted } from "vue";

function exercises(){
  router.push("/adminexerciselist")
}
function workouts(){
  router.push("/adminworkoutlist")
}
</script>

<template>
  <h1>admin panel</h1>
  <v-container>
    <v-btn @click="exercises" variant="tonal">
      Ćwiczenia
    </v-btn>
    <v-btn @click="workouts" variant="tonal">
      Treningi
    </v-btn>
    <v-btn @click="diets" variant="tonal">
      Diety
    </v-btn>
    <v-btn @click="calendar" variant="tonal">
      Harmonogram
    </v-btn>
  </v-container>
</template>

<style scoped></style>
