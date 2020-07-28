<template>
  <!-- https://stackoverflow.com/questions/45000510/vue-js-error-component-template-should-contain-exactly-one-root-element -->
  <!-- Root needs only one component: one div -->

  <body id="login-page">
      <img id= "logo" alt="potatologo" src="@/assets/home_Artwork.png" width=500> 
      <h1>
        Potato Timer
      </h1>
      <div id="loginButton">
        <div class="loginfor">
    <button v-google-signin-button="clientId" class="google-signin-button" v-if="!isHidden">
            <img class= "google-signin-button" alt="Google sign-in" src="../assets/icons/btn_google_signin_dark_normal_web.png" />
    </button>
    <br>
    <button v-google-signout-button="clientId" class="google-signout-button" v-if="isSignOutButtonHidden"> Sign out
    </button>
    <br>
    <br>
    <br>
    <div v-if="isHidden"> Welcome, {{this.userFirstName}}</div>
    <br>
    <img v-if="isHidden" v-bind:src="this.imgURL" />
    <br>
    <br>
    <div v-if="isHidden"> Your Name: {{this.userFullName}}</div>
    <div v-if="isHidden"> Your Email: {{this.userEmail}}</div>
		<div v-if="isHidden"> Your Reward: {{this.userReward}}</div>
   </div><!--  .loginfor -->


    <!-- Timer -->
    <div v-if="isHidden">

      <div v-if="!isTaskChosen"> Start a potato session by clicking a task name </div>
      <div v-else>
        <p> To switch between tasks, just click task name </p>
        <p style="font-weight: bold"> Selected task: {{selectedTask}}  <button @click="onTimesUp()" >Mark as completed</button> </p>
        <p> Remaining time total: {{taskRemDisplay}} </p>
      </div>
      <div v-if="!timerStarted && isTaskChosen">
        Set {{isTask}} session span (mins)
        <input v-model="timerInput" placeholder="edit me">
        <button @click="startTimer()" v-bind:disabled="timerInput < 1">Start</button>
        <br>
      </div>

      <div v-if="timerStarted">
        <div>{{timeDisplay}}</div>
        <button @click="pauseTimer()"> Pause/Resume </button>
        <!-- <button @click="skip()"> Skip </button> -->
      </div>
      <div v-if="isTaskChosen">
        <button @click="skip()"> Skip </button>
      </div>
    </div>

    <!-- Category and task list -->
    <br> <br>
    <div v-if="isHidden">
      <h2>Your categories: </h2>
      <p> Click category name to add or show tasks</p>
      <br>
      <ul v-for="(catgItem, index) in categoryList" :key="catgItem">
        <li @click="showTask(catgItem, index)" style="font-weight: bold">{{catgItem}}</li>

        <!-- Show clicked category's task list -->
        <div v-if="index==clickedCatgIndex">
          <ul v-for="taskItem in taskList" :key="taskItem">
            <li @click="selectTask(taskItem, catgItem)"> {{taskItem}} </li>
          </ul>
          <!-- Send Ajax request to add tasks -->
          <button v-if="showAddTaskButton" @click="showTaskInput()">Add Task</button>
          <input v-if="showTaskInputForm" v-model="taskName" placeholder="task name">
          <input v-if="showTaskInputForm" v-model="taskSpan" placeholder="task span">
          <p v-if="showTaskInputForm">New task name is: {{ taskName }}</p>
          <p v-if="showTaskInputForm">New task span is: {{ taskSpan }} minutes </p>
          <button v-if="!showAddTaskButton" @click="addTask(catgItem)" v-bind:disabled="taskName.length < 1 || taskSpan < 1">Submit</button>
        </div>
      </ul>
    </div>
      </div><!-- #loginButton -->
  </body>

</template>


<script>

  // API request module
  import axios from 'axios'
  const keys = require('../../config/keys')

  export default {
    data: () => ({
      clientId: keys.googleClientID,
      isHidden: false,
      isSignOutButtonHidden: false,
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
        this.isSignOutButtonHidden = true
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
      },
      OnGoogleAuthSignOut() {
        console.log("You have signed out")
        this.isHidden = false
        this.isSignOutButtonHidden = false
      }

    }
  }

</script>