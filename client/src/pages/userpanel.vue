<script setup>
import { useUserStore } from "../stores/user";
import { ref } from "vue";
import router from "@/router";

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
joinDate.value = u.joinDate.substring(0,10) + " " + u.joinDate.substring(11, 16)

function go(){
router.push("/usermodify")
}
</script>

<template>
  <div>
    <div class="row">
      <div class="card mx-auto">
        <div class="card-header text-white bg-primary">
          <h1>Moje konto</h1>
        </div>
        <v-container >
          <v-list>
            <v-list-item rounded="xl" variant="tonal" :title="`Login: ` + login"></v-list-item>
            <v-list-item  :title="`Imię: ` + name"></v-list-item>
            <v-list-item rounded="xl" variant="tonal" :title="`Nazwisko: ` + surname"></v-list-item>
            <v-list-item  :title="`Telefon: ` + phone"></v-list-item>
            <v-list-item rounded="xl" variant="tonal" :title="`Email: ` + email"></v-list-item>
            <v-list-item :title="`Data dołączenia: ` + joinDate"></v-list-item>
          </v-list>
          <v-container class="text-center">
            <v-btn @Click="go" variant="tonal">
              Edytuj
            </v-btn>
          </v-container>
        </v-container>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
