<template>
	<div class="home">
		<HeroFold
			:title="title" 
			:subtitle="subtitle" 
			:bg_big="top_big_bg" 
			:bg_small="top_small_bg"
			prev_page="characters" 
			next_page="series"
		/>

		<!-- Comics -->
			<section class="fold-content pt-100">
				<div class="wrapper">
					<div class="fold-content--top d-flex flex-between flex-middle mb-10">
						<h2 class="fold-title" v-html="'Comics'"></h2>
					</div>

					<div class="fold-loader" v-html="'Loading comics...'" v-if="loading_comics"></div>

					<div class="d-flex flex-wrap" v-if="!loading_comics">
						<Card 
							v-for="(comic, index) in comics[0]" 
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
	</div>
</template>

<script>
	import ApiMarvel from '@/config/api'
	import HeroFold from '@/components/HeroFold'

	import Card from '@/components/Card'

	import TopSmallBG from '@/assets/images/hero_fold/comics.png'
	import TopBigBG from '@/assets/images/hero_fold/comics_overlay.jpg'

	export default {
		name: "home",
		components: {
			HeroFold,
			Card
		},

		data() {
			return {
				title: 'The best Comics',
				subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor metus nisl, a ultrices sapien dictum consectetur.',
				top_small_bg: TopSmallBG,
				top_big_bg: TopBigBG,
				comics: [],
				loading_comics: true
			}
		},

		created() {
			this.getComics()
		},

		methods: {
			async getComics(){
				const comics = await ApiMarvel.getComics(100)
				this.comics = [...this.comics, comics.data.data.results]

				setTimeout( () => {
					this.loading_comics = false
				}, 1000)
			}
		}
	};
</script>
