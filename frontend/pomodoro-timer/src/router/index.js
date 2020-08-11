// Router related info
import VueRouter from 'vue-router'
import Vue from 'vue'
// import Home from '../components/Home'
import About from '../components/About'
import Login from '../components/Login'
// import App from '../App.vue'

// 1. install VueRouter plugin
Vue.use(VueRouter)

// 2. Create VueRouter instance
const routes = [
	// Routes map and redirect test
	// {
	// 	// Set landing page as home page
	// 	path: '/',
	// 	redirect: '/home'
	// },
	// {
	// 	path: '/home',
	// 	component: Home
	// },

	// Landing page, load App component
	{
		path: '/',
		component: Login
	},
	{
		path: '/about',
		component: About
	},
]

const router = new VueRouter({
	// map routes to components
	routes,
	// remove # in url
	mode: 'history'
})

// pass vue router instance to vue instance
export default router
