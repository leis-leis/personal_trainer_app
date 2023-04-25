<script setup>
import { useUserStore } from "../stores/user";
import { ref } from "vue";

const userStore = useUserStore();

const login = ref("")
const phone = ref("")
const email = ref("")
const newPass = ref("")
const confirmPass = ref("")
const pass = ref("")

const u = JSON.parse(userStore.loggedInUser)
//console.log(u)
login.value = u.login
phone.value = u.phone
email.value = u.email


function onPost(){
  
}
</script>

<template>
  <div>
    <div class="row">
      <div class="card mx-auto">
        <div class="card-header text-white bg-primary">
          <h1>Edytuj konto</h1>
        </div>
        <div class="card-body">
          <form>
            <div class="form-group">
              <label for="login">Login</label>
              <input
                id="login"
                type="text"
                placeholder="Login"
                name="login"
                v-model="login"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="phone">Telefon</label>
              <input
                id="phone"
                type="text"
                placeholder="telefon"
                name="phone"
                v-model="phone"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                id="email"
                type="text"
                placeholder="Email"
                name="email"
                v-model="email"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="password">Nowe Hasło</label>
              <input
                type="password"
                class="form-control"
                placeholder="Nowe hasło"
                name="newPass"
                id="new_password"
                v-model="newPass"
              />
            </div>
            <div class="form-group">
              <label for="confirmPass">Potwierdź Hasło</label>
              <input
                type="password"
                class="form-control"
                placeholder="Potwierdź Hasło"
                name="confirmPass"
                id="confirmPass"
                v-model="confirmPass"
              />
            </div>

            <div class="form-group">
              <label for="password">Hasło</label>
              <input
                type="password"
                class="form-control"
                placeholder="Hasło"
                name="pass"
                id="password"
                v-model="pass"
              />
            </div>
            <br />
            <button @click="onPost" type="submit">Edytuj</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
