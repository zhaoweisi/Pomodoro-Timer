<template>

  <div>
    <button v-google-signin-button="clientId" class="google-signin-button" v-if="!isHidden"> Sign in with Google</button>
    <br>
    <div v-if="isHidden"> Welcome, {{this.userFirstName}}</div>
    <br>
    <img v-if="isHidden" v-bind:src="this.imgURL" />
    <br>
    <br>
    <div v-if="isHidden"> Your Name: {{this.userFullName}}</div>
    <div v-if="isHidden"> Your Email: {{this.userEmail}}</div>

    <br>
    <div v-if="isHidden">
      <!-- Load current user's categories -->
      <h2> Your categories: </h2>
			<br>
      <ul v-for="(catgItem, index) in categoryList" :key="catgItem">
        <li @click="showTask(catgItem, index)" style="font-weight: bold">{{catgItem}}</li>

        <!-- Show clicked category's task list -->
        <div v-if="index==clickedCatgIndex">
          <ul v-for="taskItem in taskList" :key="taskItem">
            <li> {{taskItem}} </li>
          </ul>
          <!-- Send Ajax request to add tasks -->
          <button v-if="showAddTaskButton" @click="showTaskInput()">Add Task</button>
          <button v-else @click="addTask(catgItem)" v-bind:disabled="taskName.length < 1">Submit</button>
          <input v-if="showTaskInputForm" v-model="taskName" placeholder="edit me">
          <p v-if="showTaskInputForm">New task name is: {{ taskName }}</p>
        </div>

      </ul>

      <!-- Send Ajax request to add categories -->
      <button v-if="showAddCatgButton" @click="showCatgInput()">Add categories</button>
      <button v-else @click="addCategory()" v-bind:disabled="catgName.length < 1">Submit</button>
      <input v-if="showCatgInputForm" v-model="catgName" placeholder="edit me">
      <p v-if="showCatgInputForm">New catg name is: {{ catgName }}</p>
      <br>
    </div>

  </div>

</template>

<script>

  // API request module
  import axios from 'axios'
  const keys = require('../../config/keys')
  // import axiosService from '../axiosService.js'

  export default {
    data: () => ({
      clientId: keys.googleClientID,
      isHidden: false,
      showAddCatgButton: true,
      showCatgInputForm: false,
      showAddTaskButton: true,
      showTaskInputForm: false,
      userFirstName: '',
      userFullName: '',
      userEmail: '',
      imgURL: '',
      userID: '',
      catgName: '',
      taskName: '',
      clickedCatgIndex: 0,
      categoryList: [],
      taskList: []
    }),

    methods: {
      OnGoogleAuthSuccess(user) {
        // console.log(user)
        this.userFirstName = user.getGivenName()
        this.userFullName = user.getName()
        this.userEmail = user.getEmail()
        this.imgURL = user.getImageUrl()
        console.log('You have signed in')
        this.isHidden = true
        // Upon user login, add user to db and load categories
        this.addUserID()
      },

      OnGoogleAuthFail(error) {
        console.log(error)
      },

      //Upon user login, add user to db and load user's categories
      addUserID() {
        // promise production
        axios
          .post('http://localhost:5000/api/user', { userID: this.userEmail })
          // promise comsumption
          .then(res => {
						console.log("In addUserID load categories")
            console.log(res.data)
            this.categoryList = res.data
          })
      }, //addUserID() barcket

      // Send post request to add new category
      showCatgInput() {
        this.showAddCatgButton = false
        this.showCatgInputForm = true
      }, //showInput() barcket

      // Send post request to add new task
      showTaskInput() {
        this.showAddTaskButton = false
        this.showTaskInputForm = true
      }, //showInput() barcket

			//
      addCategory() {
        // promise production
        axios
          .post('http://localhost:5000/api/category', { userID: this.userEmail, categName: this.catgName })
          // promise comsumption
          .then(res => {
						console.log("In add Category")
            console.log(res.data)
            // Show updated categories
            this.categoryList = res.data
          })
          .then(
            (this.showAddCatgButton = true),
            (this.showCatgInputForm = false),
            (this.categName = '') //   clear input doesn't work ????????????????????
          )
      }, //addCategory() bracket

      //
      showTask(categItem, index) {
        this.clickedCatgIndex = index
        this.taskList = []
        axios({
          method: 'get',
          url: 'http://localhost:5000/api/task',
          params: {
            userID: this.userEmail,
            categName: categItem
          }
        }).then(res => {
          console.log('In showtask')
          console.log(res.data)
					this.taskList = res.data
        })
      },

      //
      addTask(catgItem) {
        // promise production
        axios
          .post('http://localhost:5000/api/task', {
            userID: this.userEmail,
            categName: catgItem,
            taskName: this.taskName
          })
          // promise comsumption
          .then(res => {
						console.log("In add task")
            console.log(res.data)
            // Show updated tasks
            this.taskList = res.data
          })
          .then(
            (this.showAddTaskButton = true),
            (this.showTaskInputForm = false)
            // this.taskName = ""     //   clear input doesn't work ????????????????????
          )
      } //addTask() bracket
    } // methods bracket
  }

</script>

<style scoped>

  .google-signin-button {
    display: inline-block;
    padding: 8px 40px;
    border-radius: 8px;
    background-color: #4285f4;
    color: #fff;
    box-shadow: 0 3px 0 #0f69ff;
    vertical-align: middle;
    font-size: 14px;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
    border: blue;
  }

</style>
