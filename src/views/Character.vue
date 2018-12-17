<template>
    <section class="page-detail">
        <HeroFold
            :title="character_name" 
            :subtitle="character_description" 
            :bg_big="character_image" 
            :bg_small="character_image" 
            :circled_photo="true" 
            category="Character"
        />

        <!-- Like button -->
            <div class="wrapper pt-100">
                <div class="d-inline-block">
                    <div class="like-this d-flex flex-middle bg-dark color-white rounded ml-20 c-pointer p-10 pl-20 pr-10" @click="likeThis(character_id)">
                        <div class="lh-14 font-12 pr-10 font-fugaz-one uppercase" v-html="'I like this!'"></div>
                        <div class="like-button" :class="{'like-button--active' : characters_liked.includes(character_id)}"></div>
                    </div>
                </div>
            </div>
        <!-- .Like button -->

        <!-- Add to Team button -->
            <div class="wrapper pt-100">
                <h2 class="fold-title mb-20" v-html="'Teams'"></h2>
                <div class="team-item d-flex flex-wrap pl-20">
                    <div class="checkbox mr-30 mt-10 mb-10 sm-w-100"
                        v-for="(team, index) in teams[0]" :key="index"
                        v-if="teams.length > 0"
                        :class="{'checkbox--active' : teams[0][index].includes(character_id)}"
                        @click="addToTeam(index)">
                        <div class="checkbox--checkmark"></div>
                        <span class="checkbox--label" v-html="index"></span>
                    </div>
                </div>
            </div>
        <!-- .Add to Team button -->

        <!-- Comics -->
            <section class="fold-content pt-100">
                <div class="wrapper">
                    <h2 class="fold-title mb-20" v-html="'Comics'"></h2>
                    <div class="font-14 font-weight-600 pl-20 pt-10 pr-20" v-html="'There are no comics related to this character :('" v-if="!loading_comics && character_comics[0].length === 0"></div>

                    <div class="fold-loader" v-html="'Loading characters...'" v-if="loading_comics"></div>

                    <div class="d-flex flex-wrap" v-if="!loading_comics">
                        <Card 
                            v-for="(comic, index) in character_comics[0]" 
                            :key="index" 
                            :title="comic.title" 
                            :image="comic.thumbnail.path + '.' + comic.thumbnail.extension" 
                            type="comics" 
                            :id="comic.id" 
                            v-if="!comic.thumbnail.path.includes('not_available')"
                        />
                    </div>
                </div>
            </section>
        <!-- .Comics -->

        <!-- Series -->
            <section class="fold-content pt-100">
                <div class="wrapper">
                    <h2 class="fold-title mb-20" v-html="'Series'"></h2>
                    <div class="font-14 font-weight-600 pl-20 pt-10 pr-20" v-html="'There are no series related to this character :('" v-if="!loading_series && character_series[0].length === 0"></div>

                    <div class="fold-loader" v-html="'Loading characters...'" v-if="loading_series"></div>

                    <div class="d-flex flex-wrap" v-if="!loading_series">
                        <Card
                            v-for="(serie, index) in character_series[0]"
                            :key="index" 
                            :title="serie.title" 
                            :image="serie.thumbnail.path + '.' + serie.thumbnail.extension" 
                            type="series" 
                            :id="serie.id" 
                            v-if="!serie.thumbnail.path.includes('not_available')"
                        />
                    </div>
                </div>
            </section>
        <!-- .Series -->
    </section>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    import ApiMarvel from '@/config/api'
    import HeroFold from '@/components/HeroFold'
    import Card from '@/components/Card'
    
    export default {
        components: {
            HeroFold,
            Card
        },

        data() {
            return{
                character_id: this.$route.params.id,
                character_name: '',
                character_description: '',
                character_image: '',
                
                character_obj: [],
                character_comics: [],
                character_series: [],
                characters_liked: [],

                loading_character: true,
                loading_comics: true,
                loading_series: true,

                teams: []
            }
        },

        created(){
            this.getCharacter()
            this.getCharacterComics()
            this.getCharacterSeries()
            this.getCharactersLiked()

            this.teams = this.GET_MY_TEAMS
            console.log(this.teams[0])
        },

        methods: {
            async getCharacter(){
                const character = await ApiMarvel.getCharacter(this.character_id)
                const results = character.data.data.results
                
                this.character_obj = [...this.character_obj, results]
                this.character_name = results[0].name
                this.character_description = results[0].description
                this.character_image = results[0].thumbnail.path + '.' + results[0].thumbnail.extension
				
				setTimeout( () => {
					this.loading_character = false
				}, 1000)
            },
            
            async getCharacterComics(){
                const characterComics = await ApiMarvel.getCharacterComics(this.character_id, 10)
                const results = characterComics.data.data.results
                this.character_comics = [...this.character_comics, results]

                setTimeout( () => {
					this.loading_comics = false
				}, 1000)
            },

            async getCharacterSeries(){
                const characterSeries = await ApiMarvel.getCharacterSeries(this.character_id, 10)
                const results = characterSeries.data.data.results
                this.character_series = [...this.character_series, results]

                setTimeout( () => {
					this.loading_series = false
				}, 1000)
            },

            // Like Character
                ...mapActions(['SET_CHARACTERS_LIKED']),

                getCharactersLiked(){
                    if( this.GET_CHARACTERS_LIKED.length !== 0 ){
                        this.characters_liked = []
                        this.characters_liked = this.GET_CHARACTERS_LIKED[0]
                    }
                },

                likeThis(character_id){
                    if( this.characters_liked.includes(character_id) ){
                        let indexItem = this.characters_liked.indexOf(character_id)
                        this.characters_liked.splice(indexItem, 1)
                    }else{
                        this.characters_liked = [...this.characters_liked, character_id]
                    }
                    
                    this.SET_CHARACTERS_LIKED(this.characters_liked)
                },
            // .Like Character

            // Add Character to team
                addToTeam(team){
                    let index_character = this.teams[0][team].indexOf(this.character_id)
                    if( index_character === -1 ){
                        this.teams[0][team].push(this.character_id)
                    }else{
                        this.teams[0][team].splice(index_character, 1)
                    }
                }
            // .Add Character to team
        },

        computed: {
            ...mapGetters(['GET_CHARACTERS_LIKED', 'GET_MY_TEAMS']),
        }
    }
</script>

