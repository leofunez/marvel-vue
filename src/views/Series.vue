<template>
	<div class="home">
		<HeroFold
			:title="title" 
			:subtitle="subtitle" 
			:bg_big="top_big_bg" 
			:bg_small="top_small_bg" 
			prev_page="comics" 
			next_page="teams"
		/>

		<!-- Series -->
			<section class="fold-content pt-100">
				<div class="wrapper">
					<div class="fold-content--top d-flex flex-between flex-middle mb-10">
						<h2 class="fold-title" v-html="'Series'"></h2>
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
							v-if="!serie.thumbnail.path.includes('not_available')"/>
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

	import TopSmallBG from '@/assets/images/hero_fold/series.png'
	import TopBigBG from '@/assets/images/hero_fold/series_overlay.jpg'

	export default {
		name: "home",
		components: {
			HeroFold,
			Card
		},

		data() {
			return {
				title: 'Series on TV',
				subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor metus nisl, a ultrices sapien dictum consectetur.',
				top_small_bg: TopSmallBG,
				top_big_bg: TopBigBG,
				series: [],
				loading_series: true
			}
		},

		created() {
			this.getSeries()
		},

		methods: {
			async getSeries(){
				const series = await ApiMarvel.getSeries(90)
				this.series = [...this.series, series.data.data.results]

				setTimeout( () => {
					this.loading_series = false
				}, 1000)
			}
		}
	};
</script>
