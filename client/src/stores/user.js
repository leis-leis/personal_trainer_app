import axios from "axios";
import router from "@/router";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    loggedInUser: localStorage.getItem("loggedInUser") || "",
    status: "",
    admin: JSON.parse(localStorage.getItem("loggedInUser"))?.isAdmin || false,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    authState: (state) => state.status,
    isAdmin: (state) => state.admin,
  },
  actions: {
    async login(login, pass) {
      const res = await axios.post("http://127.0.0.1:3000/api/users/login", {
        login: login,
        pass: pass,
      });
      if(res.data.token && res.data.user){
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("loggedInUser", JSON.stringify(res.data.user))
      this.token = res.data.token
      this.loggedInUser = res.data.user
      this.admin = res.data.user.isAdmin
      }
      return res.data
    },

    logout() {
      this.token = ""
      this.loggedInUser = ""
      this.status = ""
      this.admin = ""
      localStorage.removeItem("token")
      localStorage.removeItem("loggedInUser")
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
      if(!res.data.success){
        return res.data
      }else{
        this.login(login, pass)
      }
    },

    async modify(login, name, surname, phone, email, newPass = "", confirmPass = "", pass){
      const res = await axios.post("http://127.0.0.1:3000/api/users/modify", {
        login: login,
        name: name,
        surname: surname,
        phone: phone,
        email: email,
        newPass: newPass,
        confirmPass: confirmPass,
        pass: pass,
        user: this.loggedInUser,
      });
      if(!res.data.success){
        return res.data
      }else{
        let l = res?.data?.login
        let p = res?.data?.password

        await this.logout()
        await this.login(l, p)
        return res.data
      }
    },

    show(){
      console.log(this.admin)
    }
  },
});
