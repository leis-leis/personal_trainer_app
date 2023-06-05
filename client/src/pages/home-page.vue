<script setup>
import router from "@/router";
import { useUserStore } from "../stores/user";
import { ref } from "vue";
import { onMounted } from "vue";
import axios from "axios";

const blogPosts = ref("")

onMounted(async () => {
  const res = await axios.get("http://127.0.0.1:4000/api/posts/postlist")
  blogPosts.value = res.data.posts
})

</script>

<template>
  <h1></h1>
  <v-list>
    <v-list-item v-for="post in blogPosts">
        <v-container style="display: flex; flex-direction: column;">
            
            <v-container style="display: flex; flex-direction: column;">
                <v-list-item-title>{{ post.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ post.desc }}</v-list-item-subtitle>
                
            </v-container>
            <v-container style="display: flex; flex-direction: column;">
              <v-img width="100" :src="'/src/assets/uploads/posts/' + post.photos[0]?.photo"></v-img>
                <v-list-item-subtitle>{{ post.photos[0].photoDesc }}</v-list-item-subtitle>
                
            </v-container>
            
        </v-container>
    </v-list-item>
  </v-list>
</template>

<style scoped></style>
