<script setup>
import router from "@/router";
import { useUserStore } from "../stores/user";
import { ref } from "vue";
import { onMounted } from "vue";
import axios from "axios";

const users = ref("")

onMounted(async () => {
  const res = await axios.get("http://127.0.0.1:4000/api/users/users", {})
  users.value = res.data.users
})
</script>

<template>
  <h1>Users</h1>
  <v-table>
    <thead>
        <tr>
            <th>
                Imię
            </th>
            <th>
                Nazwisko
            </th>
            <th>
                Telefon
            </th>
            <th>
                Email
            </th>
            <th>
                Data dołączenia
            </th>
            <th>
                Ostatnio Online
            </th>
            <th>
                Admin
            </th>
            <th>
                Zablokowany
            </th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="user in users" :key="user._id"> 
            <td>
                {{ user.name }}
            </td>
            <td>
                {{ user.surname }}
            </td>
            <td>
                {{ user.phone }}
            </td>
            <td>
                {{ user.email }}
            </td>
            <td>
                {{ user.joinDate }}
            </td>
            <td>
                {{ user.lastOnline }}
            </td>
            <td>
                <v-checkbox v-model="user.isAdmin">
                </v-checkbox>
            </td>
            <td>
                <v-checkbox v-model="user.blocked">
                </v-checkbox>
            </td>
        </tr>
    </tbody>
  </v-table>
</template>

<style scoped></style>
