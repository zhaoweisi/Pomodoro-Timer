<template>
  <!-- https://stackoverflow.com/questions/45000510/vue-js-error-component-template-should-contain-exactly-one-root-element -->
  <!-- Root needs only one component: one div -->
<body>

    <div class="csstest"> Welcome, Test User! </div>
   <div class="csstest"> This is the testing page for CSS. It will be removed from the final release. </div>

</body>
</template>

<script>
	export default {
		name: "CSSTesting"
	}
</script>


<style scoped>
  @import '../assets/styles/test.css';
</style>
