<template>
  <!-- https://stackoverflow.com/questions/45000510/vue-js-error-component-template-should-contain-exactly-one-root-element -->
  <!-- Root needs only one component: one div -->

  <body>
 
  <nav id="nav-main">
  <ul>
  <li><router-link to='/' >Home</router-link></li>
  <li><router-link to='/about' >About</router-link></li>
  </ul>
  </nav><!-- /#nav-main -->
  <router-view></router-view>
  <!-- <div id="app">
      <img id= "logo" alt="potatologo" src="./assets/logo.png"> 
      <h1>
        Potato Timer
      </h1>
      <div id="loginButton">
      <LoginButton/>
      </div>
      <!~~ #loginButton ~~>
  </div> -->
  
  <!-- #app -->
   

		<!-- Routes test -->
    <!-- <div id="hyperlink">
      <router-link to='/home' tag="button">Home Page</router-link>
      <router-link to='/about' tag="button">About Page</router-link>
      <router-view></router-view>
    </div> -->

<footer id="footer">
<p class="copyright">&copy;2020 Potato Timer &bull; Site design by Team15 &bull; All Rights Reserved</p>
</footer>

</body>

</template>


<script>

  // import LoginButton from './components/LoginButton.vue'

  export default {
    name: 'App',
    components: {
      // LoginButton
    }
  }

</script>


<style>
  @import './assets/styles/test.css';
  @import url('https://fonts.googleapis.com/css?family=Chilanka');
</style>
