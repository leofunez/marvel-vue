<template>
    <section class="page-favorites">
        <HeroFold 
            :title="title" 
            :subtitle="subtitle" 
            :bg_big="hero_big_bg" 
            :bg_small="hero_small_bg"
        />

        <!-- Characters -->
			<section class="fold-content pt-100">
				<div class="wrapper">
					<h2 class="fold-title" v-html="'Characters'"></h2>
                    <div class="font-14 font-weight-600 pl-20 pt-10" v-html="'You have no favorite characters yet :('" v-if="!loading_characters && characters_list.length === 0"></div>

                    <div class="fold-loader" v-html="'Loading characters...'" v-if="loading_characters"></div>

					<div class="d-flex flex-wrap" v-if="!loading_characters">
						<Card 
                            v-for="(character, index) in characters_list" 
                            :key="index" 
                            :title="character.name" 
                            :image="character.thumbnail.path + '.' + character.thumbnail.extension" 
                            type="characters" 
                            :id="character.id"
                        />
					</div>
				</div>
			</section>
		<!-- .Characters -->

        <!-- Comics -->
			<section class="fold-content pt-100">
				<div class="wrapper">
					<h2 class="fold-title" v-html="'Comics'"></h2>
                    <div class="font-14 font-weight-600 pl-20 pt-10" v-html="'You have no favorite comics yet :('" v-if="!loading_comics && comics_list.length === 0"></div>

                    <div class="fold-loader" v-html="'Loading comics...'" v-if="loading_comics"></div>

					<div class="d-flex flex-wrap" v-if="!loading_comics">
						<Card 
                            v-for="(comic, index) in comics_list" 
                            :key="index" 
                            :title="comic.title" 
                            :image="comic.thumbnail.path + '.' + comic.thumbnail.extension" 
                            type="comics" 
                            :id="comic.id"
                        />
					</div>
				</div>
			</section>
		<!-- .Comics -->

        <!-- Comics -->
			<section class="fold-content pt-100">
				<div class="wrapper">
					<h2 class="fold-title" v-html="'Series'"></h2>
                    <div class="font-14 font-weight-600 pl-20 pt-10" v-html="'You have no favorite series yet :('" v-if="!loading_series && series_list.length === 0"></div>

                    <div class="fold-loader" v-html="'Loading comics...'" v-if="loading_series"></div>

					<div class="d-flex flex-wrap" v-if="!loading_series">
						<Card 
                            v-for="(serie, index) in series_list" 
                            :key="index" 
                            :title="serie.name" 
                            :image="serie.thumbnail.path + '.' + serie.thumbnail.extension" 
                            type="series" 
                            :id="serie.id"
                        />
					</div>
				</div>
			</section>
		<!-- .Comics -->
    </section>
</template>

<script>
    import { mapGetters } from 'vuex'
    
    import ApiMarvel from '@/config/api'

    import HeroFold from '@/components/HeroFold'
    import Card from '@/components/Card'

    import HeroSmallBG from '@/assets/images/hero_fold/favorites.png'
	import HeroBigBG from '@/assets/images/hero_fold/favorites_overlay.jpg'

    export default {
        components: {
            HeroFold,
            Card
        },

        data(){
            return{
                title: 'Favorites',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor metus nisl, a ultrices sapien dictum consectetur.',
                hero_small_bg: HeroSmallBG,
                hero_big_bg: HeroBigBG,
                
                loading_characters: true,
                loading_comics: true,
                loading_series: true,
                
                characters_map: [],
                characters_list: [],
                comics_map: [],
                comics_list: [],
                series_map: [],
                series_list: []
            }
        },

        created(){
            this.characters_map = this.GET_CHARACTERS_LIKED
            this.comics_map = this.GET_COMICS_LIKED
            this.series_map = this.GET_SERIES_LIKED
            
            this.getFavorites()
        },

        methods: {
            getFavorites(){
                const params = ApiMarvel.getParams()
                
                // Characters
                    if( this.characters_map.length !== 0 ){
                        this.characters_map[0].map( character_id => {
                            fetch(`https://gateway.marvel.com:443/v1/public/characters/${character_id}?${params}`)
                            .then( response => response.json() )
                            .then( response => {
                                let character = response.data.results[0]
                                this.characters_list = [...this.characters_list, character]
                            })
                            .catch( error => console.log(error) )
                        })
                    }

                    setTimeout( () => {
                        this.loading_characters = false
                    }, 1000)
                // .Characters

                // Comics
                    if( this.comics_map.length !== 0 ){
                        this.comics_map[0].map( comic_id => {
                            fetch(`https://gateway.marvel.com:443/v1/public/comics/${comic_id}?${params}`)
                            .then( response => response.json() )
                            .then( response => {
                                let comic = response.data.results[0]
                                this.comics_list = [...this.comics_list, comic]
                            })
                            .catch( error => console.log(error) )
                        })
                    }

                    setTimeout( () => {
                        this.loading_comics = false
                    }, 1000)
                // .Comics

                // Series
                    if( this.series_map.length !== 0 ){
                        this.series_map[0].map( comic_id => {
                            fetch(`https://gateway.marvel.com:443/v1/public/series/${comic_id}?${params}`)
                            .then( response => response.json() )
                            .then( response => {
                                let serie = response.data.results[0]
                                this.series_list = [...this.series_list, serie]
                            })
                            .catch( error => console.log(error) )
                        })
                    }

                    setTimeout( () => {
                        this.loading_series = false
                    }, 1000)
                // .Series
            },
        },

        computed: {
            ...mapGetters(['GET_CHARACTERS_LIKED', 'GET_COMICS_LIKED', 'GET_SERIES_LIKED']),
        }
    }
</script>
