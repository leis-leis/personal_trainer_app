import axios from "axios";
import router from "@/router";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    loggedInUser: localStorage.getItem("loggedInUser") || "",
    status: "",
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    authState: (state) => state.status,
    user: (state) => state.user,
  },
  actions: {
    async login(login, pass) {
      const res = await axios.post("http://127.0.0.1:3000/api/users/login", {
        login: login,
        pass: pass,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("loggedInUser", JSON.stringify(res.data.user));
      this.token = res.data.token;
      //console.log(res.data.token);
      //console.log(res.data.user)
      this.loggedInUser = res.data.user;
      console.log(this.loggedInUser)
    },
    logout() {
      this.token = "";
      localStorage.removeItem("token");
    },
    async register(login, pass, passConfirm, name, surname, email, phone) {
      const res = await axios.post("http://127.0.0.1:3000/api/users/register", {
        login: login,
        pass: pass,
        passConfirm: passConfirm,
        name: name,
        surname: surname,
        email: email,
        phone: phone,
      });
      console.log(res.data.msg);
    },
  },
});
