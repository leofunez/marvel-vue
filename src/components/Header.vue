<template>
	<div>
		<header class="d-flex flex-between flex-middle bg-gradient--overlay color-white fixed w-100 pos-top pos-left z-index-4 p-15 box-sizing-border bg-transparent md-pt-10">
			<div class="d-flex flex-middle z-index-1">
				<router-link to="/" class="logo sm-w-100-p md-mr-20"></router-link>

				<div class="menu-button relative d-none md-d-block h-100 c-pointer" :class="{'menu-button--active' : menu_button}" @click="menuButton">
					<span class="line bg-white h-2-p w-30-p d-block relative"></span>
					<span class="line bg-white h-2-p w-30-p d-block relative mt-5 mb-5"></span>
					<span class="line bg-white h-2-p w-30-p d-block relative"></span>
				</div>
			</div>
			
			<nav 
				id="nav"
				class="d-flex flex-middle uppercase font-12 font-fugaz-one md-bg-dark--opacity 
				md-fixed md-h-100 md-w-100 md-flex-column md-flex-center md-pos-top md-align-center md-font-18" 
				:class="{'nav-menu--active' : menu_button}"  @click="closeMenu">
				<router-link class="p-20 pl-0 pr-0 ml-20 mr-20 c-pointer md-mb-20 md-pb-5" to="/" tag="div">Home</router-link>
				<router-link class="p-20 pl-0 pr-0 ml-20 mr-20 c-pointer md-mb-20 md-pb-5" to="/characters" tag="div">Characters</router-link>
				<router-link class="p-20 pl-0 pr-0 ml-20 mr-20 c-pointer md-mb-20 md-pb-5" to="/comics" tag="div">Comics</router-link>
				<router-link class="p-20 pl-0 pr-0 ml-20 mr-20 c-pointer md-mb-20 md-pb-5" to="/series" tag="div">Series</router-link>
				<router-link class="p-20 pl-0 pr-0 ml-20 mr-20 c-pointer md-mb-20 md-pb-5" to="/teams" tag="div">My teams</router-link>
			</nav>
			
			<router-link to="/favorites" class="favorite box-sizing-initial w-70-p h-20-p p-20 pl-30 pr-0 pb-15 font-12 font-fugaz-one uppercase lh-14 c-pointer" v-html="'Favorites'" tag="div"></router-link>
		</header>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				menu_button: false
			}
		},

		methods: {
			menuButton(){
				this.menu_button = !this.menu_button

				if( this.menu_button === true ){
					document.querySelector("body").classList.add('overflow-h')
				}else{
					this.closeMenu()
				}
			},

			closeMenu(){
				this.menu_button = false
				document.querySelector("body").classList.remove('overflow-h')
			}
		}
	}
</script>



