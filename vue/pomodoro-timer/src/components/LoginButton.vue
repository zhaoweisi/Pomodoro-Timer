<template>
  <div>
  <button v-google-signin-button="clientId" class="google-signin-button" v-if="!isHidden" > Sign in with Google</button>
  <div v-if="isHidden"> Welcome, {{this.userFirstName}}</div>
  <br>
  <div v-if="isHidden"> Your Name: {{this.userFullName}}</div>
  <div v-if="isHidden"> Your Email: {{this.userEmail}}</div> 
  </div>
</template>

<script>
  const keys = require('../../config/keys');

export default {
  data: () => ({
    clientId: keys.googleClientID,
    isHidden: false,
    userFirstName: '',
    userFullName : '',
    userEmail: ''
  }),
  methods: {
    OnGoogleAuthSuccess (user) {
      console.log(user)
      this.userFirstName = user.nW
      this.userFullName = user.Bd
      this.userEmail = user.Au
      console.log("You have signed in")
      this.isHidden = true
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