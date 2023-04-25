<script setup>
import { useUserStore } from "../stores/user";
import { ref } from "vue";

const userStore = useUserStore();

const login = ref("")
const phone = ref("")
const email = ref("")
const name = ref("")
const surname = ref("")
const joinDate = ref("")
const lastOnline = ref("")

const u = JSON.parse(userStore.loggedInUser)
//console.log(u)
login.value = u.login
name.value = u.name
surname.value = u.surname
phone.value = u.phone
email.value = u.email
joinDate.value = u.joinDate.substring(11, 16) + " " + u.joinDate.substring(0,10)
lastOnline.value = u.lastOnline.substring(11, 16) + " " + u.lastOnline.substring(0,10)
</script>

<template>
  <div>
    <div class="row">
      <div class="card mx-auto">
        <div class="card-header text-white bg-primary">
          <h1>Moje konto</h1>
        </div>
        <div class="card-body">
          <!-- <img class="card-img-top" src="..." alt="Twój avatar"> -->
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Login: {{ login }}</li>
            <li class="list-group-item">Imie: {{ name }}</li>
            <li class="list-group-item">Nazwisko: {{ surname }}</li>
            <li class="list-group-item">Email: {{ email }}</li>
            <li class="list-group-item">Nr telefonu: {{ phone }}</li>
            <li class="list-group-item">Data rejestracji: {{ joinDate }}</li>
            <li class="list-group-item">Ostatnio Online: {{ lastOnline }}</li>
          </ul>
          <router-link to="/usermodify" class="card-button tor">
            Edytuj
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
