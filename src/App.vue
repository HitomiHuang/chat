<template>
  <div id="app">
    <Navbar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from "./components/NavBar.vue";
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  name: "App",
  components: { Navbar },
};
</script>

<style>
  main{
    height: calc(100vh - 50px);
    background: #191718;
  }

</style>
