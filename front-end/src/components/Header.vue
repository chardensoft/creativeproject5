<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link to="/">Teams</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/Bracket">Bracket</router-link>
      </li>
      <li class="nav-item" v-if="user">
        <router-link to="/Create">Create</router-link>
      </li>
      <li class="nav-item" v-else>
        <router-link to="/Login">Login</router-link>
      </li>
      <li class="nav-item" v-if="user">
        <button @click="logout()">Logout</button>
      </li>
    </ul>
  </div>

  <h1>March Madness Bracket</h1>

  </nav>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Header',
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
        this.$router.push({
          name: "Login"
        });
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
  },
}
</script>

<style>

h1 {
  color: orange;
}

li {
  padding: 10px;
  font-size: 30px;
}

h6 {
  text-align: center;
  padding: 100px;
  margin-top: 50px;
}

a {
  text-align: center;
}

</style>
