<script setup></script>

<template>
  <div>
    <div class="row">
      <div class="card mx-auto">
        <div class="card-header text-white bg-primary">
          <h1>EDYTUJ KONTO</h1>
        </div>
        <div class="card-body">
          <form>
            <div class="form-group">
              <label for="username">Imie</label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                name="Name"
                v-model="name"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="username">Nazwisko</label>
              <input
                id="surname"
                type="text"
                placeholder="Surname"
                name="Surname"
                v-model="surname"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="password">Hasło</label>
              <input
                type="password"
                class="form-control"
                placeholder="Hasło"
                name="Pass"
                id="password"
                v-model="password"
              />
            </div>
            <div class="form-group">
              <label for="password">Potwierdź Hasło</label>
              <input
                type="confirm_password"
                class="form-control"
                placeholder="Potwierdź Hasło"
                name="confirm_pass"
                id="confirm_password"
                v-model="confirm_password"
              />
            </div>
            <br />
            <button @click="login" type="submit">ZAPISZ</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
