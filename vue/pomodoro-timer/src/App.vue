<template>
	<!-- https://stackoverflow.com/questions/45000510/vue-js-error-component-template-should-contain-exactly-one-root-element -->
	<!-- Root needs only one component: one div -->
	<div>
		<div id="app">
	    <img alt="Vue logo" src="./assets/logo.png">
	    <h1>
	      Pomodoro Timer
	    </h1>
	    <LoginButton/>
	  </div>

		<div id="hyperlink">
			<router-link to='/home' tag="button">Home Page</router-link>
			<router-link to='/about' tag="button">About Page</router-link>
			<router-view></router-view>
		</div>

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

.router-link-active {
	color: #f00;
}
</style>
