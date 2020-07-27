<template>
<!-- https://stackoverflow.com/questions/45000510/vue-js-error-component-template-should-contain-exactly-one-root-element -->
<!-- Root needs only one component: one div -->

<body>
    <h1>Timer</h1>
    <div class="timer">
        <svg class="timer-svg" viewBox="0 0 100 100">
            <g class="timer-circle">
                <circle class="timer-path-elapsed" cx="50" cy="50" r="45"></circle>
                <path id="timer-path-remaining" stroke-dasharray="100, 283" class="timer-path-remaining" d="
                          M 50, 50 m -45, 0
                          a 45,45 0 1,0 90,0
                          a 45,45 0 1,0 -90,0
                        "></path>
            </g>
        </svg>
        <span id="timer-countdown" class="timer-countdown">00:05</span>
    </div>
    <h1>Buttons</h1>
    <div class="timer-button-group">
        <button type="button" class="timer-button"><i class="fa fa-play"></i> Start</button>
        <button type="button" class="timer-button"><i class="fa fa-pause"></i> Pause/Resume</button>
        <button type="button" class="timer-button"><i class="fa fa-stop"></i> Stop</button>
        <button type="button" class="timer-button"><i class="fa fa-remove"></i> Cancel</button>
    </div>

    <h1>Input box</h1>
    <div>
        <Input class="input" />
    </div>
    <h1>List</h1>
    <div>
        <ul class="category-list">
            <li>Cat 1</li>
            <ul class="task-list">
                <li>Cat 1 Task 1</li>
                <li>Cat 1 Task 2</li>
            </ul>
            <li>Cat 2</li>
            <li>Cat 3</li>
        </ul>
    </div>
</body>
</template>

<script>
export default {
    name: "CSSTesting"
}
</script>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
</style>
