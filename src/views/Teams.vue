<template>
    <section class="page-favorites">
        <HeroFold 
            :title="title"
            :subtitle="subtitle" 
            :bg_big="hero_big_bg" 
            :bg_small="hero_small_bg" 
            prev_page="series" 
            next_page=""
        />

        <!-- Teams -->
            <section class="fold-content pt-100">
                <div class="wrapper">
                    <div class="team-list">
                        <div class="team-content" v-for="(team, index) in teams[0]" :key="index">
                            <h2 class="fold-title mb-20" v-html="index"></h2>

                            <!-- Avengers -->
                                <div class="d-flex flex-wrap mb-60" v-if="index === 'Avengers'">
                                    <div class="font-14 font-weight-600 pl-20 pt-10" v-html="'You have no members in this team yet :('" v-if="team_avengers.length === 0"></div>
                                    <Card
                                        v-for="(character, index) in team_avengers"
                                        :key="index"
                                        :title="character.name"
                                        :image="character.thumbnail.path + '.' + character.thumbnail.extension"
                                        type="characters"
                                        :id="character.id"
                                    />
                                </div>

                            <!-- Fantastic 4 -->
                                <div class="d-flex flex-wrap mb-60" v-if="index === 'Fantastic 4'">
                                    <div class="font-14 font-weight-600 pl-20 pt-10" v-html="'You have no members in this team yet :('" v-if="team_fantastic_4.length === 0"></div>
                                    <Card
                                        v-for="(character, index) in team_fantastic_4"
                                        :key="index"
                                        :title="character.name"
                                        :image="character.thumbnail.path + '.' + character.thumbnail.extension"
                                        type="characters"
                                        :id="character.id"
                                    />
                                </div>

                            <!-- Invaders -->
                                <div class="d-flex flex-wrap mb-60" v-if="index === 'Invaders'">
                                    <div class="font-14 font-weight-600 pl-20 pt-10" v-html="'You have no members in this team yet :('" v-if="team_invaders.length === 0"></div>
                                    <Card
                                        v-for="(character, index) in team_invaders"
                                        :key="index"
                                        :title="character.name"
                                        :image="character.thumbnail.path + '.' + character.thumbnail.extension"
                                        type="characters"
                                        :id="character.id"
                                    />
                                </div>

                            <!-- X-Men -->
                                <div class="d-flex flex-wrap mb-60" v-if="index === 'X-Men'">
                                    <div class="font-14 font-weight-600 pl-20 pt-10" v-html="'You have no members in this team yet :('" v-if="team_x_men.length === 0"></div>
                                    <Card
                                        v-for="(character, index) in team_x_men"
                                        :key="index"
                                        :title="character.name"
                                        :image="character.thumbnail.path + '.' + character.thumbnail.extension"
                                        type="characters"
                                        :id="character.id"
                                    />
                                </div>
                            
                            <!-- Other -->
                                <div class="d-flex flex-wrap" v-if="index === 'Other'">
                                    <div class="font-14 font-weight-600 pl-20 pt-10" v-html="'You have no members in this team yet :('" v-if="team_other.length === 0"></div>
                                    <Card
                                        v-for="(character, index) in team_other"
                                        :key="index"
                                        :title="character.name"
                                        :image="character.thumbnail.path + '.' + character.thumbnail.extension"
                                        type="characters"
                                        :id="character.id"
                                    />
                                </div>
                        </div>
                    </div>
                </div>
            </section>
        <!-- .Teams -->
    </section>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    
    import ApiMarvel from '@/config/api'

    import HeroFold from '@/components/HeroFold'
    import Card from '@/components/Card'

    import HeroSmallBG from '@/assets/images/hero_fold/teams.png'
	import HeroBigBG from '@/assets/images/hero_fold/teams_overlay.jpg'

    export default {
        components: {
            HeroFold,
            Card
        },

        data(){
            return{
                title: 'My teams',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor metus nisl, a ultrices sapien dictum consectetur.',
                hero_big_bg: HeroBigBG,
                hero_small_bg: HeroSmallBG,

                teams: [],
                team_avengers: [],
                team_fantastic_4: [],
                team_invaders: [],
                team_x_men: [],
                team_other: [],

                loading_teams: true,
            }
        },

        created() {
            this.teams = this.GET_MY_TEAMS
            this.getCharacters()
        },

        methods: {
            ...mapActions(['SET_SHOW_NEW_TEAM_FORM']),
            
            newTeam(){
                this.SET_SHOW_NEW_TEAM_FORM(true)
                document.querySelector('body').classList.add('overflow-h')
            },

            getCharacters(){
                const params = ApiMarvel.getParams()

                // Avengers
                    let avengers = this.teams[0]['Avengers']
                    if( avengers.length > 0 ){
                        avengers.map( character_id => {
                            fetch(`https://gateway.marvel.com:443/v1/public/characters/${character_id}?${params}`)
                            .then( response => response.json() )
                            .then( response => {
                                let character = response.data.results[0]
                                this.team_avengers = [...this.team_avengers, character]
                            })
                            .catch( error => console.log(error) )
                        })
                    }
                // .Avengers

                // Fantastic 4
                    let fantastic_4 = this.teams[0]['Fantastic 4']
                    if( fantastic_4.length > 0 ){
                        fantastic_4.map( character_id => {
                            fetch(`https://gateway.marvel.com:443/v1/public/characters/${character_id}?${params}`)
                            .then( response => response.json() )
                            .then( response => {
                                let character = response.data.results[0]
                                this.team_fantastic_4 = [...this.team_fantastic_4, character]
                            })
                            .catch( error => console.log(error) )
                        })
                    }
                // .Fantastic 4

                // Invaders
                    let invaders = this.teams[0]['Invaders']
                    if( invaders.length > 0 ){
                        invaders.map( character_id => {
                            fetch(`https://gateway.marvel.com:443/v1/public/characters/${character_id}?${params}`)
                            .then( response => response.json() )
                            .then( response => {
                                let character = response.data.results[0]
                                this.team_invaders = [...this.team_invaders, character]
                            })
                            .catch( error => console.log(error) )
                        })
                    }
                // .Invaders

                // X-Men
                    let x_men = this.teams[0]['X-Men']
                    if( x_men.length > 0 ){
                        x_men.map( character_id => {
                            fetch(`https://gateway.marvel.com:443/v1/public/characters/${character_id}?${params}`)
                            .then( response => response.json() )
                            .then( response => {
                                let character = response.data.results[0]
                                this.team_x_men = [...this.team_x_men, character]
                            })
                            .catch( error => console.log(error) )
                        })
                    }
                // .X-Men

                // Other
                    let other = this.teams[0]['Other']
                    if( other.length > 0 ){
                        other.map( character_id => {
                            fetch(`https://gateway.marvel.com:443/v1/public/characters/${character_id}?${params}`)
                            .then( response => response.json() )
                            .then( response => {
                                let character = response.data.results[0]
                                this.team_other = [...this.team_other, character]
                            })
                            .catch( error => console.log(error) )
                        })
                    }
                // .Other
            }
		},

		computed: {
			...mapGetters(['GET_MY_TEAMS', 'GET_SHOW_NEW_TEAM_FORM']),
		}
    }
</script>