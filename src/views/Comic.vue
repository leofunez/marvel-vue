<template>
    <section class="page-detail">
        <HeroFold
            :title="comic_title" 
            subtitle="" 
            :bg_big="comic_image" 
            :bg_small="comic_image" 
            :circled_photo="true" 
            category="Comic"
        />

        <!-- Like button -->
            <div class="wrapper pt-100">
                <div class="d-inline-block">
                    <div class="like-this d-flex flex-middle bg-dark color-white rounded ml-20 c-pointer p-10 pl-20 pr-10" @click="likeThis(comic_id)">
                        <div class="lh-14 font-12 pr-10 font-fugaz-one uppercase" v-html="'I like this!'"></div>
                        <div class="like-button" :class="{'like-button--active' : comics_liked.includes(comic_id)}"></div>
                    </div>
                </div>
            </div>
        <!-- .Like button -->

        <!-- Characters -->
			<section class="fold-content pt-100">
				<div class="wrapper">
                    <h2 class="fold-title mb-20" v-html="'Description'"></h2>
                    <div class="description max-w-680 lh-14 mb-100 pl-20 pr-20" v-html="comic_description"></div>

					<h2 class="fold-title" v-html="'Characters'"></h2>
                    <div class="font-14 font-weight-600 pl-20 pr-20 pt-10" v-html="'There are no characters related to this comic :('" v-if="!loading_characters && comic_characters[0].length === 0"></div>

					<div class="fold-loader" v-html="'Loading characters...'" v-if="loading_characters"></div>

					<div class="d-flex flex-wrap" v-if="!loading_characters">
						<Card 
                            v-for="(character, index) in comic_characters[0]" 
                            :key="index" 
                            :title="character.name" 
                            :image="character.thumbnail.path + '.' + character.thumbnail.extension" 
                            type="characters" 
                            :id="character.id"/>
					</div>
				</div>
			</section>
		<!-- .Characters -->
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
                comic_id: this.$route.params.id,
                comic_title: '',
                comic_description: '',
                comic_image: '',
                
                comic_obj: [],
                comic_characters: [],
                comics_liked: [],

                loading_comic: true,
                loading_characters: true,
            }
        },

        created(){
            this.getComic()
            this.getCharacters()
            this.getComicsLiked()
        },

        methods: {
            async getComic(){
                const comic = await ApiMarvel.getComic(this.comic_id)
                const results = comic.data.data.results
                
                this.comic_obj = [...this.comic_obj, results]
                this.comic_title = results[0].title
                this.comic_description = results[0].description
                this.comic_image = results[0].thumbnail.path + '.' + results[0].thumbnail.extension
				
				setTimeout( () => {
					this.loading_comic = false
				}, 1000)
            },
            
            async getCharacters(){
                const characters = await ApiMarvel.getComicCharacters(this.comic_id)
                const results = characters.data.data.results
                this.comic_characters = [...this.comic_characters, results]

                setTimeout( () => {
					this.loading_characters = false
				}, 1000)
            },

            // Like Comic
                ...mapActions(['SET_COMICS_LIKED']),

                getComicsLiked(){
                    if( this.GET_COMICS_LIKED.length !== 0 ){
                        this.comics_liked = []
                        this.comics_liked = this.GET_COMICS_LIKED[0]
                    }
                },

                likeThis(comic_id){
                    if( this.comics_liked.includes(comic_id) ){
                        let indexItem = this.comics_liked.indexOf(comic_id)
                        this.comics_liked.splice(indexItem, 1)
                    }else{
                        this.comics_liked = [...this.comics_liked, comic_id]
                    }
                    
                    this.SET_COMICS_LIKED(this.comics_liked)
                }
            // .Like Comic
        },

        computed: {
            ...mapGetters(['GET_COMICS_LIKED']),
        }
    }
</script>
