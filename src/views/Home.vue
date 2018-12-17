<template>
	<div class="home">
		<HeroFold 
			:title="title" 
			:subtitle="subtitle" 
			:bg_big="top_big_bg" 
			:bg_small="top_small_bg" 
			prev_page="teams" 
			next_page="characters"
		/>

		<!-- Characters -->
			<section class="fold-content pt-100">
				<div class="wrapper">
					<div class="fold-content--top d-flex flex-between flex-middle mb-10">
						<h2 class="fold-title" v-html="'Characters'"></h2>
						<router-link to="/characters" class="view-more color-red font-14 font-weight-600 mr-20" v-html="'View more'" tag="div"></router-link>
					</div>

					<div class="fold-loader" v-html="'Loading characters...'" v-if="loading_characters"></div>

					<div class="d-flex flex-wrap" v-if="!loading_characters">
						<Card 
							v-for="(character, index) in characters[0]" 
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

		<div class="divider divider--dark-bottom"></div>

		<!-- Comics -->
			<section class="fold-content bg-dark pt-100 pb-100">
				<div class="wrapper">
					<div class="fold-content--top d-flex flex-between flex-middle mb-10">
						<h2 class="fold-title color-white" v-html="'Comics'"></h2>
						<router-link to="/comics" class="view-more color-red font-14 font-weight-600 mr-20" v-html="'View more'" tag="div"></router-link>
					</div>

					<div class="fold-loader color-white" v-html="'Loading comics...'" v-if="loading_comics"></div>

					<div class="d-flex flex-wrap" v-if="!loading_comics">
						<Card 
							v-for="(comic, index) in comics[0]" 
							:key="index" 
							:title="comic.title" 
							:image="comic.thumbnail.path + '.' + comic.thumbnail.extension" 
							type="comics" 
							:id="comic.id" 
							skin="white"
						/>
					</div>
				</div>
			</section>
		<!-- .Comics -->

		<div class="divider divider--dark-top"></div>

		<!-- Series -->
			<section class="fold-content pb-100">
				<div class="wrapper">
					<div class="fold-content--top d-flex flex-between flex-middle mb-10">
						<h2 class="fold-title" v-html="'Series'"></h2>
						<router-link to="/series" class="view-more color-red font-14 font-weight-600 mr-20" v-html="'View more'" tag="div"></router-link>
					</div>

					<div class="fold-loader" v-html="'Loading series...'" v-if="loading_series"></div>

					<div class="d-flex flex-wrap" v-if="!loading_series">
						<Card 
							v-for="(serie, index) in series[0]" 
							:key="index" 
							:title="serie.title" 
							:image="serie.thumbnail.path + '.' + serie.thumbnail.extension" 
							type="series" 
							:id="serie.id"
						/>
					</div>
				</div>
			</section>
		<!-- .Series -->
	</div>
</template>

<script>
	import ApiMarvel from '@/config/api'
	import HeroFold from '@/components/HeroFold'

	import Card from '@/components/Card'

	import TopSmallBG from '@/assets/images/hero_fold/home.png'
	import TopBigBG from '@/assets/images/hero_fold/home_overlay.jpg'

	export default {
		name: "home",
		components: {
			HeroFold,
			Card
		},

		data() {
			return {
				title: 'Welcome to Marvel world!',
				subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor metus nisl, a ultrices sapien dictum consectetur.',
				top_small_bg: TopSmallBG,
				top_big_bg: TopBigBG,
				
				characters: [],
				loading_characters: true,
				comics: [],
				loading_comics: true,
				series: [],
				loading_series: true,
			}
		},

		created() {
			this.getCharacters()
			this.getComics()
			this.getSeries()
		},

		methods: {
			async getCharacters(){
				const characters = await ApiMarvel.getCharacters(10)
				this.characters = [...this.characters, characters.data.data.results]
				
				setTimeout( () => {
					this.loading_characters = false
				}, 1000)
			},

			async getComics(){
				const comics = await ApiMarvel.getComics(10)
				this.comics = [...this.comics, comics.data.data.results]

				setTimeout( () => {
					this.loading_comics = false
				}, 1000)
			},

			async getSeries(){
				const series = await ApiMarvel.getSeries(10)
				this.series = [...this.series, series.data.data.results]

				setTimeout( () => {
					this.loading_series = false
				}, 1000)
			}
		}
	};
</script>
