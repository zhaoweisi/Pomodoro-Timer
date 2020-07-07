<template>
	<div>

	<div id="signin-button">
  <button v-google-signin-button="clientId" class="google-signin-button"> Sign in with Google</button>
	</div>

	<div id="hyperlink">
		<router-link to='/home'>Home Page</router-link>
		<router-link to='/about'>About Page</router-link>
		<router-view></router-view>
	</div>

	</div>
</template>

<script>
  const keys = require('../config/keys');

export default {
	name: 'App',
  data: () => ({
    clientId: keys.googleClientID
  }),
  methods: {
    OnGoogleAuthSuccess (idToken) {
      console.log(idToken)
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
