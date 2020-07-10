<template>
  <!-- https://stackoverflow.com/questions/45000510/vue-js-error-component-template-should-contain-exactly-one-root-element -->
  <!-- Root needs only one component: one div -->
<body>
<div id="about">
<div id="smile"> 
<img alt="a smile potato" src="@/assets/chooseme.jpeg" width=300> 
</div>
<h1>About Potato Timer</h1>

<p>If you have heard the Pomodoro Technique, you probably know what this project is about…</p>

<p>Potato Timer allows you to set tasks and timer to help you boost efficiency.</p>

<h3>How to use Potato Timer</h3>
<ul>
<li>Use google account to log in</li>
<li>Set task and timer</li>
<li>Work on task until timer is complete</li>
</ul>
<p>You could take a break any time during the task, but we want you to be focused…</p>
<p>Once you complete the task within the time you set, you will get one point reward. 
The more points you obtain means the more you have accomplished. 
Let’s start and be a productive person from today ( :</p>

</div>
</body>
</template>

<script>
	export default {
		name: "About"
	}
</script>


<style scoped>
  @import '../assets/styles/test.css';
</style>
