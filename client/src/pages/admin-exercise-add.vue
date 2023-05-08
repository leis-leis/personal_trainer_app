<script setup>
import router from "@/router";
import { useUserStore } from "../stores/user";
import { ref } from "vue";
import { onMounted } from "vue";
import axios from "axios";

const photos = ref([])
const title = ref("")
const desc = ref("")
const videoLink = ref("")

const visible = ref("")
const alert = ref("")

visible.value = false

function exercises(){
  router.push("/adminexerciselist")
}

function addPhoto(){
  photos.value.push({ photo: "", desc: "" })
}

const addExercise = async () => {
  let images = []
  let descs = []
  photos.value.forEach((e) => {
    images.push(e.photo)
    descs.push(e.desc)
  })

  const formData = new FormData()
  for(var x = 0; x < photos.value.length; x++){
    formData.append("photos", photos.value[x].photo[0])
  }
  for(var x = 0; x < photos.value.length; x++){
    formData.append("descs", photos.value[x].desc)
  }
  formData.append("title", title.value)
  formData.append("desc", desc.value)
  formData.append("videoLink", videoLink.value)
  formData.append("creator", JSON.parse(localStorage.getItem("loggedInUser"))._id)

  // formData.forEach((val, key, formData) => {
  //   console.log(key + ": " + val);
  // });

  const res = await axios.post("http://127.0.0.1:4000/api/exercises/exerciseadd",
        formData,
        {
          "Content-Type": "multipart/form-data"
        });
  if(!res?.data?.success){
    alert.value = res?.data.msg
    visible.value = true
  }else{
    router.push("/adminexerciselist")
  }
}
</script>

<template>
  <v-container style="display: flex; flex-direction: row; justify-content: space-around;">
    <v-btn @click="exercises" variant="tonal">
      Ćwiczenia
    </v-btn>
    <h1>Dodaj ćwiczenie</h1>
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
            <v-text-field v-model="title" label="Nazwa ćwiczenia"></v-text-field>
          
            <v-text-field v-model="desc" label="Opis ćwiczenia"></v-text-field>

            <v-container v-for="(photo, index) in photos">
              <v-file-input accept="image/*" single v-model="photo.photo" label="Zdjęcie"></v-file-input>
              <v-text-field v-model="photo.desc" label="Opis zdjęcia"></v-text-field>
            </v-container>
            <v-btn @click="addPhoto">
              Dodaj zdjęcie
            </v-btn>

            <v-text-field v-model="videoLink" label="Link do wideo"></v-text-field>

        </v-container>
        <v-container class="text-center">
            <!-- https://vuetifyjs.com/en/components/buttons/ -->
            <v-btn @click="addExercise" variant="tonal">
              Dodaj ćwiczenie
            </v-btn>
          </v-container>
  </v-container>
</template>

<style scoped></style>
