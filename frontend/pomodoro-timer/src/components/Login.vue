<template>
  <!-- https://stackoverflow.com/questions/45000510/vue-js-error-component-template-should-contain-exactly-one-root-element -->
  <!-- Root needs only one component: one div -->

  <div id="login">
      <img id= "logo" alt="potatologo" src="@/assets/home_Artwork.png" width=500> 
      <h1>
        Potato Timer
      </h1>
      <div id="loginButton">
      <LoginButton/>
      </div><!-- #loginButton -->
  </div>

</template>


<script>

  import LoginButton from '@/components/LoginButton.vue'

  export default {
    name: 'Login',
    components: {
      LoginButton
    }
  }

</script>

<style>
  @import '../assets/styles/test.css';
</style>