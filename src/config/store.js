import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		characters_liked: [],
		comics_liked: [],
		series_liked: [],
		
		my_teams: [{
			'Avengers': [],
			'Fantastic 4': [],
			'Invaders': [],
			'X-Men': [],
			'Other': [],
		}],
	},

	getters: {
		GET_CHARACTERS_LIKED: (state) => state.characters_liked,
		GET_COMICS_LIKED: (state) => state.comics_liked,
		GET_SERIES_LIKED: (state) => state.series_liked,
		
		GET_MY_TEAMS: (state) => state.my_teams,
	},

	mutations: {
		set_characters_liked: (state, data) => {
			state.characters_liked = []
			state.characters_liked = [...state.characters_liked, data]
		},

		set_comics_liked: (state, data) => {
			state.comics_liked = []
			state.comics_liked = [...state.comics_liked, data]
		},

		set_series_liked: (state, data) => {
			state.series_liked = []
			state.series_liked = [...state.series_liked, data]
		},

		set_my_teams: (state, data) => {
			state.my_teams = []
			state.my_teams = [...state.my_teams, data]
		},
	},
	
	actions: {
		SET_CHARACTERS_LIKED: (context, data) => context.commit('set_characters_liked', data),
		SET_COMICS_LIKED: (context, data) => context.commit('set_comics_liked', data),
		SET_SERIES_LIKED: (context, data) => context.commit('set_series_liked', data),
		
		SET_MY_TEAMS: (context, data) => context.commit('set_my_teams', data),
	}
})
