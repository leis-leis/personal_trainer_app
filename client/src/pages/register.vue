<script setup>
import { useUserStore } from "../stores/user";
import { ref } from "vue";
const userStore = useUserStore();

const username = ref("");
const name = ref("");
const surname = ref("");
const email = ref("");
const phone = ref("");
const pass = ref("");
const passConfirm = ref("");

const visible = ref("")
const alert = ref("")

visible.value = false

const register = async () => {
  var res = await userStore.register(
    username.value,
    pass.value,
    passConfirm.value,
    name.value,
    surname.value,
    email.value,
    phone.value
  );

  if(res.success != true){
    alert.value = res.msg
    visible.value = true
  }
};
</script>

<template>
  <div>
    <div class="row">
      <div class="card mx-auto">
        <div class="card-header text-white bg-primary">
          <h1>Zarejestruj się</h1>
        </div>
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
            <v-text-field v-model="username" label="Login"></v-text-field>
          
            <v-text-field v-model="pass" type="password" label="Hasło"></v-text-field>
          
            <v-text-field v-model="passConfirm" type="password" label="Powtórz hasło"></v-text-field>
          
            <v-text-field v-model="name" label="Imię"></v-text-field>

            <v-text-field v-model="surname" label="Nazwisko"></v-text-field>

            <v-text-field v-model="email" label="Email"></v-text-field>

            <v-text-field v-model="phone" label="Telefon"></v-text-field>
          </v-container>
          <v-container class="text-center">
            <!-- https://vuetifyjs.com/en/components/buttons/ -->
            <v-btn @click="register" variant="tonal">
              Zarejestruj
            </v-btn>
          </v-container>
            <router-link to="/login" class="card-link tor"
              >Masz już konto?</router-link
            >
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 50%;
}

.form {
  margin-left: 520px;
  height: auto;
  width: 400px;
  padding: 0px 0px 25px 0px;
  border: 2px solid #303f9f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: Exo;
}

.buttonsy {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  height: 50px;
  float: left;
}

.buttonsy .btn {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  width: 100%;
  cursor: pointer;
}

#chbox:checked ~ .SignUp_form {
  display: flex;
}

#chbox:checked ~ .login_form {
  display: none;
}

#chbox:checked + .layer {
  left: 50%;
}

#chbox:checked ~ .layer2 {
  left: 50%;
}

#chbox {
  display: none;
}

.layer {
  content: "";
  height: 50px;
  width: 50%;
  background-color: transparent;
  float: right;
  position: absolute;
  left: 0px;
  top: 0px;
}

.layer2 {
  content: "";
  height: 50px;
  z-index: -1;
  width: 50%;
  background-color: #303f9f;
  float: right;
  position: absolute;
  left: 0px;
  top: 0px;
}

.form .login_form {
  display: flex;
  flex-direction: column;
}

.form .login_form input {
  border: none;
  font-family: EXO;
  border-bottom: 1px solid black;
  outline: none;
  padding: 5px;
}

.tag {
  text-align: center;
  font-size: 20px;
  margin: 7px 0px 7px 0px;
}

.submit {
  width: 175px;
  border: none;
  font-family: EXO;
  padding: 7px;
  border-radius: 5px;
  background-color: #bdbdbd;
  outline: none;
  cursor: pointer;
}

.form .SignUp_form {
  display: none;
  flex-direction: column;
}

.form .SignUp_form input {
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  padding: 5px;
  margin: 0px;
}

.checkbox {
  float: right;
  width: 30px;
  height: 30px;
}

.tor {
  float: right;
}
</style>
