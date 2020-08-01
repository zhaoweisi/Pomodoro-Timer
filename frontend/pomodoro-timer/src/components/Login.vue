<template>
  <!-- https://stackoverflow.com/questions/45000510/vue-js-error-component-template-should-contain-exactly-one-root-element -->
  <!-- Root needs only one component: one div -->

<body>
  <div id="login-page">
    <div id="login">
      <button v-google-signin-button="clientId" class="google-signin-button" v-if="!isHidden">
      <img id= "login-button-img" alt="Google sign-in" src="../assets/icons/btn_google_signin_dark_normal_web.png" />
      </button>
      
      <button v-google-signout-button="clientId" class="google-signout-button" v-if="isSignOutButtonHidden"> Sign out
      </button>

      <img id= "logo" alt="potatologo" src="@/assets/home_Artwork.png" width=500> 
      <h1>
        Potato Timer
      </h1>
    
    <div class="welcome-infor">
    <div v-if="isHidden"> Welcome, {{this.userFirstName}}</div>
    <br>
    <img v-if="isHidden" v-bind:src="this.imgURL" />
    <br>
    <br>
    <div v-if="isHidden"> Your Name: {{this.userFullName}}</div>
    <div v-if="isHidden"> Your Email: {{this.userEmail}}</div>
		<div v-if="isHidden"> Your Reward: {{this.userReward}}</div>
    </div><!--  #welcome-infor -->
    <br><br>

    <!-- Timer -->
    <div class="setting-task" v-if="isHidden">

      <div v-if="!isTaskChosen"> Start a potato session by clicking a task name &#128512; </div>
      <div v-else>
        <p> To switch between tasks, just click task name  </p>
        <p> Selected task: {{selectedTask}}  <button @click="onTimesUp()" >Mark as completed</button> </p>
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
      <h2> Your categories: </h2>
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
          <button id="taskButton" v-if="showAddTaskButton" @click="showTaskInput()">Add Task</button>
          <input v-if="showTaskInputForm" v-model="taskName" placeholder="task name">
          <input v-if="showTaskInputForm" v-model="taskSpan" placeholder="task span">
          <p v-if="showTaskInputForm">New task name is: {{ taskName }}</p>
          <p v-if="showTaskInputForm">New task span is: {{ taskSpan }} minutes </p>
          <button v-if="!showAddTaskButton" @click="addTask(catgItem)" v-bind:disabled="taskName.length < 1 || taskSpan < 1">Submit</button>
        </div>
  
      </ul>

      <!-- Send Ajax request to add categories -->
      <button id="categoryButton" v-if="showAddCatgButton" @click="showCatgInput()">Add categories</button>
      <button v-else @click="addCategory()" v-bind:disabled="catgName.length < 1">Submit</button>
      <input v-if="showCatgInputForm" v-model="catgName" placeholder="edit me">
      <p v-if="showCatgInputForm">New catg name is: {{ catgName }}</p>
      <br>
    </div>
      </div><!-- #loginButton -->
  </div><!-- #login-page -->
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
			showAddCatgButton: true,
			showCatgInputForm: false,
			showAddTaskButton: true,
			showTaskInputForm: false,
      userFirstName: '',
      userFullName: '',
      userEmail: '',
      imgURL: '',
			userReward: null,
      // Ajax
      userID: '',
      catgName: '', // for addCategory()
      taskName: '', // for addTask()
      taskSpan: null, // User input for addTask (mins)
      taskRemTotal: null, // Data pulled from DB (converted to secs)
      taskRemDisplay: null, // for display
      clickedCatgIndex: 0,
      categoryList: [],
      taskList: [],
      // Timer
      timerInput: 0, // timer session span input (mins)
      timerStarted: false,
      isTaskChosen: false,
      selectedTask: '', // pull selected task time data from DB
      selectedCatg: '', // pull selected task time data from DB
      isTask: 'task',
      timeDisplay: '', // timer session display
      timeTotal: 5, // timer session span, converted to seconds
      timePassed: 0, // +1 every update, sec
      timeRemaining: 0, // -1 every update, sec, init to timeTotal
      interval: null,
      isPaused: false
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
        // Upon user login, add user to db and load categories
        this.addUserID()
      },

      OnGoogleAuthFail(error) {
        console.log(error)
      },

      //Upon user login, add user to db and load user's categories and reward
      addUserID() {
        // promise production
        axios
          .post('http://localhost:5000/api/user', { userID: this.userEmail })
          // promise comsumption
          .then(res => {
            console.log('In addUserID load categories and reward')
            console.log(res.data)
						// Parse response and show on page
						this.userReward = res.data[0]
            this.categoryList = res.data.slice(1,)
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
            console.log('In add Category')
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

      OnGoogleAuthSignOut() {
        console.log('You have signed out')
        this.isHidden = false
        this.isSignOutButtonHidden = false
      },

      //
      addTask(catgItem) {
        // promise production
        axios
          .post('http://localhost:5000/api/task', {
            userID: this.userEmail,
            categName: catgItem,
            taskName: this.taskName,
            taskSpan: parseInt(this.taskSpan * 60, 10),
						taskStatus: "ongoing"
          })
          // promise comsumption
          .then(res => {
            console.log('In add task')
            console.log(res.data)
            // Show updated tasks
            this.taskList = res.data
          })
          .then(
            (this.showAddTaskButton = true),
            (this.showTaskInputForm = false)
            // this.taskName = ""     //   clear input doesn't work ????????????????????
          )
      }, //addTask() bracket

      //
      selectTask(taskItem, catgItem) {
        if (!this.timerStarted) {
          // Show current selected task remaining time total
          axios({
            method: 'get',
            url: 'http://localhost:5000/api/taskSpan',
            params: {
              userID: this.userEmail,
              categName: catgItem,
              taskName: taskItem
            }
          }).then(res => {
						console.log("In select task. Print task candidate.")
            // console.log(res.data)
						// Check task status. If ongoing, start timer. If depleted or finished, alert
						if (res.data.status == "ongoing") {
							// Show timer
							this.isTaskChosen = true
							// Prep data for timer
							this.taskRemTotal = res.data.taskSpan
							this.taskRemDisplay = this.timeToString(this.taskRemTotal)
							// Show task name above timer
							this.selectedTask = taskItem
							this.selectedCatg = catgItem
							// console.log(taskItem)
						}
						// Task already ended. Hide timer
						else {
							this.isTaskChosen = false
							alert("Task already ended! Choose another one.")
						}
          })
        }
      },

      //
      onTimesUp() {
        clearInterval(this.interval)
        this.timerStarted = false
				console.log('In time is up, show time passed.')
				console.log(this.timePassed)
				axios
					.post('http://localhost:5000/api/taskSpan', {
						userID: this.userEmail,
						categName: this.selectedCatg,
						taskName: this.selectedTask,
						subtraction: this.timePassed
					})
					// promise comsumption
					.then(res => {
						console.log('In time is up promise then')
						console.log(res.data)
					})
					// Ask user if task is finished or not
					.then(() => {
						// Finished, increment reward
						if (confirm("Mark task as finished?") == true) {
							this.userReward = this.userReward+1;
							// Add visualization...
							// Update reward in database
							axios
								.post('http://localhost:5000/api/reward', {
									userID: this.userEmail,
								})
								// promise comsumption
								.then(res => {
									console.log('In updated reward response')
									console.log(res.data)
								})
						}
						else {
							alert("Tips: Set more realistic task span next time!")
						}
					})
					// Hide timer and go back to choose task
					.then(() => {
						// Change task status in db
						axios
							.post('http://localhost:5000/api/status', {
								userID: this.userEmail,
								categName: this.selectedCatg,
								taskName: this.selectedTask,
								taskStatus: "ended"
							})
						// Hide timer
						this.isTaskChosen = false
					})
      },

      //
      reset() {
        clearInterval(this.interval)
        this.timePassed = 0
        this.timeRemaining = this.timeTotal
        this.isPaused = false
        // this.update()
      },

      //
      update() {
        this.timeRemaining = this.timeTotal - this.timePassed
        this.timeDisplay = this.timeToString(this.timeRemaining)
        // console.log("taskRemTotal")
        // console.log(this.taskRemTotal)
				if (this.isTask == "task") {
					this.taskRemDisplay = this.timeToString(this.taskRemTotal - this.timePassed)
				}
      },

      //
      startTimer() {
        // Request to get current task's time data
        axios({
          method: 'get',
          url: 'http://localhost:5000/api/taskSpan',
          params: {
            userID: this.userEmail,
            categName: this.selectedCatg,
            taskName: this.selectedTask
          }
        }).then(res => {
          // console.log(res.data)
          this.taskRemTotal = res.data.taskSpan
          this.timeTotal = this.timerInput * 60
					if (this.isTask == "task" && this.taskRemTotal <= this.timeTotal) {
						this.timeTotal = this.taskRemTotal
					}
          this.timerStarted = true
          this.reset()
          this.interval = setInterval(() => {
            if (this.isPaused) return
            this.timePassed += 1
            this.update()
						//
            if (this.timeRemaining === 0) {
              this.onTimesUp()
            }
          }, 1000)
        })
      },

      // Switch between task and rest
      skip() {
        if (this.timerStarted && this.isTask == "task") {
          console.log('In skip')
          console.log(this.timePassed)
          axios
            .post('http://localhost:5000/api/taskSpan', {
              userID: this.userEmail,
              categName: this.selectedCatg,
              taskName: this.selectedTask,
              subtraction: this.timePassed
            })
            // promise comsumption
            .then(res => {
              console.log('In skip promise then')
              console.log(res.data)
            })
        }
        this.reset() // clear interval
        this.timerStarted = false
        // this.isRest = !this.isRest
        if (this.isTask == 'rest') {
          this.isTask = 'task'
        } else {
          this.isTask = 'rest'
        }
      },

      //
      stopTimer() {
        clearInterval(this.interval)
      },

      //
      pauseTimer() {
        this.isPaused = !this.isPaused
        console.log('Rem')
        console.log(this.timeRemaining)
        console.log('Used')
        console.log(this.timePassed)
      },

      //
      pad(time) {
        if (time < 10) return `0${time}`
        return `${time}`
      },

      //
      timeToString(time) {
        let minutes = Math.floor(time / 60)
        let seconds = time % 60

        seconds = this.pad(seconds)
        minutes = this.pad(minutes)

        return `${minutes}:${seconds}`
      }

    } // methods bracket
  } // export bracket

</script>


