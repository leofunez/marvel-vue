<template>
	<div class="home">
		<HeroFold
			:title="title" 
			:subtitle="subtitle" 
			:bg_big="top_big_bg" 
			:bg_small="top_small_bg" 
			prev_page="" 
			next_page="comics"
		/>

		<!-- Characters -->
			<section class="fold-content pt-100">
				<div class="wrapper">
					<div class="fold-content--top d-flex flex-between flex-middle mb-10">
						<h2 class="fold-title" v-html="'Characters'"></h2>
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
							v-if="!character.thumbnail.path.includes('not_available')"
						/>
					</div>
				</div>
			</section>
		<!-- .Characters -->
	</div>
</template>

<script>
	import ApiMarvel from '@/config/api'
	import HeroFold from '@/components/HeroFold'

	import Card from '@/components/Card'

	import TopSmallBG from '@/assets/images/hero_fold/characters.png'
	import TopBigBG from '@/assets/images/hero_fold/characters_overlay.jpg'

	export default {
		name: "home",
		components: {
			HeroFold,
			Card
		},

		data() {
			return {
				title: 'Characters collection',
				subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor metus nisl, a ultrices sapien dictum consectetur.',
				top_small_bg: TopSmallBG,
				top_big_bg: TopBigBG,
				characters: [],
				loading_characters: true,
			}
		},

		created() {
			this.getCharacters()
		},

		methods: {
			async getCharacters(){
				const characters = await ApiMarvel.getCharacters(90)
				this.characters = [...this.characters, characters.data.data.results]
				
				setTimeout( () => {
					this.loading_characters = false
				}, 1000)
			},
		}
	};
</script>
