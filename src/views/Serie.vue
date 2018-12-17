<template>
    <section class="page-detail">
        <HeroFold
            :title="serie_title" 
            subtitle="" 
            :bg_big="serie_image" 
            :bg_small="serie_image" 
            :circled_photo="true" 
            category="Serie"
        />

        <!-- Like button -->
            <div class="wrapper pt-100">
                <div class="d-inline-block">
                    <div class="like-this d-flex flex-middle bg-dark color-white rounded ml-20 c-pointer p-10 pl-20 pr-10" @click="likeThis(serie_id)">
                        <div class="lh-14 font-12 pr-10 font-fugaz-one uppercase" v-html="'I like this!'"></div>
                        <div class="like-button" :class="{'like-button--active' : series_liked.includes(serie_id)}"></div>
                    </div>
                </div>
            </div>
        <!-- .Like button -->

        <!-- Characters -->
			<section class="fold-content pt-100">
				<div class="wrapper">
                    <div v-if="serie_description">
                        <h2 class="fold-title mb-20" v-html="'Description'"></h2>
                        <div class="description max-w-680 lh-14 mb-100 pl-20 pr-20" v-html="serie_description"></div>
                    </div>

					<h2 class="fold-title mb-20" v-html="'Characters'"></h2>
                    <div class="font-14 font-weight-600 pl-20 pt-10 pr-20" v-html="'There are no characters related to this serie :('" v-if="!loading_characters && serie_characters[0].length === 0"></div>

					<div class="fold-loader" v-html="'Loading characters...'" v-if="loading_characters"></div>

					<div class="d-flex flex-wrap" v-if="!loading_characters">
						<Card 
                            v-for="(character, index) in serie_characters[0]" 
                            :key="index" 
                            :title="character.name" 
                            :image="character.thumbnail.path + '.' + character.thumbnail.extension" 
                            type="characters" 
                            :id="character.id"/>
					</div>
				</div>
			</section>
		<!-- .Characters -->

        <!-- Comics -->
            <section class="fold-content pt-100">
                <div class="wrapper">
                    <h2 class="fold-title mb-20" v-html="'Comics'"></h2>
                    <div class="font-14 font-weight-600 pl-20 pt-10 pr-20" v-html="'There are no comics related to this serie :('" v-if="!loading_comics && serie_comics[0].length === 0"></div>

                    <div class="fold-loader" v-html="'Loading comics...'" v-if="loading_comics"></div>

                    <div class="d-flex flex-wrap" v-if="!loading_comics">
                        <Card 
                            v-for="(comic, index) in serie_comics[0]" 
                            :key="index" 
                            :title="comic.title" 
                            :image="comic.thumbnail.path + '.' + comic.thumbnail.extension" 
                            type="comics" 
                            :id="comic.id" 
                            v-if="!comic.thumbnail.path.includes('not_available')"/>
                    </div>
                </div>
            </section>
        <!-- .Comics -->
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
                serie_id: this.$route.params.id,
                serie_title: '',
                serie_description: '',
                serie_image: '',
                
                serie_obj: [],
                serie_characters: [],
                serie_comics: [],
                series_liked: [],
                
                loading_serie: true,
                loading_characters: true,
                loading_comics: true,
            }
        },

        created(){
            this.getSerie()
            this.getSerieCharacters()
            this.getSerieComics()
            this.getSeriesLiked()
        },

        methods: {
            async getSerie(){
                const serie = await ApiMarvel.getSerie(this.serie_id)
                const results = serie.data.data.results

                this.serie_obj = [...this.serie_obj, results]
                this.serie_title = results[0].title
                this.serie_description = results[0].description
                this.serie_image = results[0].thumbnail.path + '.' + results[0].thumbnail.extension
				
				setTimeout( () => {
					this.loading_serie = false
				}, 1000)
            },
            
            async getSerieCharacters(){
                const characters = await ApiMarvel.getSerieCharacters(this.serie_id)
                const results = characters.data.data.results
                this.serie_characters = [...this.serie_characters, results]

                setTimeout( () => {
					this.loading_characters = false
                }, 1000)
            },

            async getSerieComics(){
                const comics = await ApiMarvel.getSerieComics(this.serie_id)
                const results = comics.data.data.results
                this.serie_comics = [...this.serie_comics, results]

                setTimeout( () => {
					this.loading_comics = false
				}, 1000)
            },

            // Like Serie
                ...mapActions(['SET_SERIES_LIKED']),

                getSeriesLiked(){
                    if( this.GET_SERIES_LIKED.length !== 0 ){
                        this.series_liked = []
                        this.series_liked = this.GET_SERIES_LIKED[0]
                    }
                },

                likeThis(serie_id){
                    if( this.series_liked.includes(serie_id) ){
                        let indexItem = this.series_liked.indexOf(serie_id)
                        this.series_liked.splice(indexItem, 1)
                    }else{
                        this.series_liked = [...this.series_liked, serie_id]
                    }
                    
                    this.SET_SERIES_LIKED(this.series_liked)
                }
            // .Like Serie
        },

        computed: {
            ...mapGetters(['GET_SERIES_LIKED']),
        }
    }
</script>