<template>
  
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>
      Pomodoro Timer
    </h1>
    <LoginButton/>
  </div>
</template>

<script>
import LoginButton from './components/LoginButton.vue'

export default {
  name: 'App',
  components: {
    LoginButton
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>


