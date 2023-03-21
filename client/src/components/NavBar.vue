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
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto">
        <li class="nav-item" v-if="userStore.isLoggedIn">
          <a class="nav-link" href="/userpanel"><Label>TWOJE KONTO</Label></a>
        </li>
        <li class="nav-item" v-if="!userStore.isLoggedIn">
          <a class="nav-link" href="/register">ZAREJESTRUJ SIĘ</a>
        </li>
        <li class="nav-item" v-if="!userStore.isLoggedIn">
          <a class="nav-link" href="/login"><Label>ZALOGUJ SIĘ</Label></a>
        </li>
        <li class="nav-item" v-if="userStore.isLoggedIn">
          <a class="nav-link" @click="logout" href="/login"
            ><Label>WYLOGUJ</Label></a>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style></style>
