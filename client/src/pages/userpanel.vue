<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { ref } from "vue";

const name = ref("");
const surname = ref("");
const email = ref("");
const mobile = ref("");
const joindate = ref("");
const lastonline = ref("");

onMounted(async () => {
  const res = await axios.get("http://localhost:3000/api/users/userpanel", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  console.log(res.data.user);
  name.value = res.data.user.Name;
  surname.value = res.data.user.Surname;
  email.value = res.data.user.Email;
  mobile.value = res.data.user.Phone;
  joindate.value = res.data.user.JoinDate;
  lastonline.value = res.data.user.LastOnline;
});
</script>

<template>
  <div>
    <div class="row">
      <div class="card mx-auto">
        <div class="card-header text-white bg-primary">
          <h1>TWOJE KONTO</h1>
        </div>
        <div class="card-body">
          <!-- <img class="card-img-top" src="..." alt="Twój avatar"> -->
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Imie: {{ name }}</li>
            <li class="list-group-item">Nazwisko: {{ surname }}</li>
            <li class="list-group-item">Email: {{ email }}</li>
            <li class="list-group-item">Nr telefonu: {{ mobile }}</li>
            <li class="list-group-item">Data rejestracji: {{ joindate }}</li>
            <li class="list-group-item">Ostatnio Online: {{ lastonline }}</li>
          </ul>
          <router-link to="/usermodify" class="card-button tor">
            EDYTUJ
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
