import axios from "axios";
import router from "@/router";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    user: {},
    status: "",
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    authState: (state) => state.status,
    user: (state) => state.user,
  },
  actions: {
    async login(Login, Pass) {
      const res = await axios.post("http://127.0.0.1:3000/api/users/login", {
        Login: Login,
        Pass: Pass,
      });
      localStorage.setItem("token", res.data.token);
      this.token = res.data.token;
      console.log(res.data.token);
    },
    logout() {
      this.token = "";
      localStorage.removeItem("token");
    },
    async register(Login, Pass, PassConfirm, Name, Surname, Email, Phone) {
      const res = await axios.post("http://127.0.0.1:3000/api/users/register", {
        Login: Login,
        Pass: Pass,
        PassConfirm: PassConfirm,
        Name: Name,
        Surname: Surname,
        Email: Email,
        Phone: Phone,
      });
      console.log(res.data.msg);
    },
  },
});
