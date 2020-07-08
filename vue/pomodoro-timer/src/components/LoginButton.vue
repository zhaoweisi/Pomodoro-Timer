<template>
  <button v-google-signin-button="clientId" class="google-signin-button" v-if="!isHidden" v-on:click= "isHidden = true"> Sign in with Google</button>
  
</template>

<script>
  const keys = require('../../config/keys');

export default {
  data: () => ({
    clientId: keys.googleClientID,
    isHidden: false
  }),
  methods: {
    OnGoogleAuthSuccess (user) {
      console.log(user)
      console.log("You have signed in")
    },

    OnGoogleAuthFail (error) {
      console.log(error)
    }
  }
}
</script>

<style>
.google-signin-button {
  display: inline-block;
  padding: 8px 40px;
  border-radius: 8px;
  background-color: #4285F4;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
  vertical-align: middle;
  font-size: 14px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
  border: blue;
}
</style>