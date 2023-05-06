<script setup>
import { useUserStore } from "../stores/user";
import {ref} from "vue";
import router from "@/router";

const userStore = useUserStore();

const u = ref("")
const name = ref("")
const surname = ref("")

if(userStore.loggedInUser){
  u.value = JSON.parse(userStore?.loggedInUser)
}
if(u){
  name.value = u.value.name
  surname.value = u.value.surname
}

const logout = () => {
  userStore.logout();
  router.push("/")
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    
        <v-container style="display: flex; flex-direction: row; align-items: center; color: #EEEEEE;">
          <v-container>
            <router-link class="navbarbrand" to="/">Home</router-link>
          </v-container>
          <v-container style="display: flex; justify-content: right; align-items: center;">
            <span style="padding-right: 1em;">
              {{ name }} {{ surname }}
            </span>
            
            <v-menu :open-on-hover=true>
              <template v-slot:activator="{ props }">
                <v-btn icon="'/src/assets/uploads/default.png'" v-bind="props"></v-btn>
              </template>

              <v-list>
                <v-list-item v-if="!userStore.isLoggedIn">
                  <a class="nav-link" href="/register"><v-list-item-title>Zarejestruj się</v-list-item-title></a>
                </v-list-item>
                <v-list-item v-if="!userStore.isLoggedIn">
                  <a class="nav-link" href="/login"><v-list-item-title>Zaloguj się</v-list-item-title></a>
                </v-list-item>
                <v-list-item v-if="userStore.isLoggedIn">
                  <a class="nav-link" href="/userpanel"><v-list-item-title>Moje konto</v-list-item-title></a>
                </v-list-item>
                
                <!-- <v-list-item v-if="userStore.user.isAdmin">
                  <a class="nav-link" href="/adminPanel"><v-list-item-title>Panel Administracyjny</v-list-item-title></a>
                </v-list-item> -->
                <v-list-item v-if="userStore.isLoggedIn">
                  <a class="nav-link" @click="logout" href="/login"
                    ><v-list-item-title>Wyloguj się</v-list-item-title></a>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-container>
        </v-container>



  </nav>
</template>

<style></style>
