<script setup>
import { useUserStore } from "../stores/user";
import {ref} from "vue";

const userStore = useUserStore();

const logout = () => {
  userStore.logout();
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbarbrand" to="/">Home</router-link>
          <v-menu style="float: right;">
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
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



  </nav>
</template>

<style></style>
