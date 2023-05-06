<script setup>
import router from "@/router";
import { useUserStore } from "../stores/user";
import { ref } from "vue";
import { onMounted } from "vue";

const userStore = useUserStore();

const login = ref("")
const name = ref("")
const surname = ref("")
const phone = ref("")
const email = ref("")
const newPass = ref("")
const confirmPass = ref("")
const pass = ref("")

const alert = ref("")
const visible = ref("")
const type = ref("")
const title = ref("")

visible.value = false

onMounted(async () => {
  console.log(userStore.loggedInUser)
  if(userStore.loggedInUser){
    const u = JSON.parse(userStore.loggedInUser)
    //console.log(u)
    login.value = u.login
    name.value = u.name
    surname.value = u.surname
    phone.value = u.phone
    email.value = u.email
  }
});


async function onPost(){
  const res = await userStore.modify(login.value, name.value, surname.value, phone.value, email.value, newPass.value, confirmPass.value, pass.value)
  if(!res?.success){
    alert.value = res?.msg
    visible.value = true
    type.value = "error"
    title.value = "Błąd!"
  }else{
    alert.value = res?.msg
    visible.value = true
    type.value = "success"
    title.value = "Sukces!"
  }
}
</script>

<template>
  <div>
    <div class="row">
      <div class="card mx-auto">
        <div class="card-header text-white bg-primary">
          <h1>Edytuj konto</h1>
        </div>
        <v-container>
          <v-container>
            <!-- https://vuetifyjs.com/en/components/alerts/ -->
            <v-alert 
            v-model="visible" 
            :text="alert" 
            :title="title" 
            variant="tonal" 
            :type="type"
            icon="mdi-exclamation"
            border="top" 
            closable 
            close-text="Zamknij ostrzeżenie o błędzie"
            >
            </v-alert>
          </v-container>
          
          <!-- https://vuetifyjs.com/en/components/text-fields/ -->
          <v-container>
            <v-text-field v-model="login" label="Login"></v-text-field>
          
            <v-text-field v-model="name" label="Imię"></v-text-field>
          
            <v-text-field v-model="surname" label="Nazwisko"></v-text-field>
          
            <v-text-field v-model="phone" label="Telefon"></v-text-field>
          
            <v-text-field v-model="email" type="email" label="Email"></v-text-field>
          
            <v-text-field v-model="newPass" type="password" label="Nowe hasło"></v-text-field>
          
            <v-text-field v-model="confirmPass" type="password" label="Potwierdź nowe hasło"></v-text-field>
          </v-container>
          <v-container class="text-center">
            <v-text-field v-model="pass" type="password" label="Hasło"></v-text-field>
            <!-- https://vuetifyjs.com/en/components/buttons/ -->
            <v-btn @click="onPost" variant="tonal">
              Edytuj
            </v-btn>
          </v-container>
          
          
          
        </v-container>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
