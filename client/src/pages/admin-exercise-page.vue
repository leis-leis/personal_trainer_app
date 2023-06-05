<script setup>
import axios from "axios";
import router from "@/router";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "../stores/user";
import { ref } from "vue";
import { onMounted } from "vue";


const route = useRoute()

const exercise = ref("")
const photos = ref("")
const activeIndex = ref(0)

onMounted(async () => {
  const res = await axios.get("http://127.0.0.1:4000/api/exercises/exercise/" + route.params.id)
  exercise.value = res.data.exercise
  photos.value = exercise.value.photos
})

</script>

<template>
  <h1>{{ exercise.title }}</h1>
  <p>{{ exercise.desc }}</p>
<v-container>
    
<v-carousel v-model="activeIndex">
    <v-carousel-item v-for="(photo, i) in photos" :key="i"
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
