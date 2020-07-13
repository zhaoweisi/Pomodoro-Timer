<template>

  <div>
    <button v-google-signin-button="clientId" class="google-signin-button" v-if="!isHidden">
      <img alt="Google sign-in" src="../assets/icons/btn_google_signin_dark_normal_web.png" />
      </button>
    <br>
    <div v-if="isHidden"> Welcome, {{this.userFirstName}}</div>
    <br>
    <img v-if="isHidden" v-bind:src="this.imgURL" />
    <br>
    <br>
    <div v-if="isHidden"> Your Name: {{this.userFullName}}</div>
    <div v-if="isHidden"> Your Email: {{this.userEmail}}</div>

    <!-- Send Ajax request for categories upon login -->
    <!-- <button v-if="isHidden" @click="getCategory()">See categories</button> -->
    <br>
    <div v-if="isHidden">
      <h2> Your categories: </h2>
      <ul>
        <li v-for="item in categoryList" :key="item">{{item}}</li>
      </ul>
    </div>
  </div>

</template>

<script>

  // API request module
  import axios from 'axios'
  const keys = require('../../config/keys')

  export default {
    data: () => ({
      clientId: keys.googleClientID,
      isHidden: false,
      userFirstName: '',
      userFullName: '',
      userEmail: '',
      imgURL: '',
      //category
      categoryList: []
    }),
    methods: {
      OnGoogleAuthSuccess(user) {
        console.log(user)
        // console.log(typeof(user))
        this.userFirstName = user.getGivenName()
        this.userFullName = user.getName()
        this.userEmail = user.getEmail()
        this.imgURL = user.getImageUrl()
        console.log('You have signed in')
        this.isHidden = true
        // Upon user login, load categories
        this.getCategory()
      },

      OnGoogleAuthFail(error) {
        console.log(error)
      },

      // send(){
      //   axios({
      //      method:'get',
      //       url:'user.json'
      //   }).then(function(res){
      //       console.log(res.data.name);
      //   });
      //        }

      // Send ajax and load categories
      getCategory() {
        // Reset list to empty before each load
        this.categoryList = []
        // Make request
        axios({
          method: 'get',
          url: 'http://localhost:5000/api/categories'
        }).then(res => {
          // console.log(res.data)
          for (let element of res.data) {
            // console.log(element.name)
            // Add a category to list
            this.categoryList.push(element.name)
          }
        })
      }
    }
  }

</script>

<style scoped>
  .google-signin-button {
    display: inline-block;
    background-color:transparent;
    vertical-align: middle;
    border-style: unset;
  }

img {
  border-radius: 0px;
}
</style>