import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/Home.vue'
import Characters from '../views/Characters.vue'
import Character from '../views/Character.vue'
import Comics from '../views/Comics.vue'
import Comic from '../views/Comic.vue'
import Series from '../views/Series.vue'
import Serie from '../views/Serie.vue'
import Teams from '../views/Teams.vue'
import Favorites from '../views/Favorites.vue'

import NotFound from '../views/NotFound.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/characters',
			name: 'characters',
			component: Characters
		},
		{
			path: '/characters/:id',
			name: 'character',
			component: Character
		},
		{
			path: '/comics',
			name: 'comics',
			component: Comics
		},
		{
			path: '/comics/:id',
			name: 'comic',
			component: Comic
		},
		{
			path: '/series',
			name: 'series',
			component: Series
		},
		{
			path: '/series/:id',
			name: 'serie',
			component: Serie
		},
		{
			path: '/teams',
			name: 'teams',
			component: Teams
		},
		{
			path: '/favorites',
			name: 'favorites',
			component: Favorites
		},

		{ 
			path: '/404', 
			name: '404',
			component: NotFound
		},  
  		{ 
			path: '*', 
			redirect: '/404'
		},
	]
})
