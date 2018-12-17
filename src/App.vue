<template>
	<div id="app" :class="'page--' + router_name">
		<Header />
		<router-view/>
		<Footer />
	</div>
</template>

<script>
	import Header from '@/components/Header'
	import Footer from '@/components/Footer'
	export default {
		components: { 
			Header, 
			Footer
		},

		data(){
			return{
				router_name: this.$route.name
			}
		}
	}
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Fugaz+One|Kaushan+Script|Open+Sans:100,200,300,400,500,600,700,800');
@import './assets/css/normalize.css';
@import './assets/css/slick.css';
@import './assets/css/layout.css';

*{
	box-sizing: border-box;
	&:focus,
	&:active{
		outline: 0;
	}
}

#app {
	font-family: "Open Sans", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #051023;
	background: white;

	&.page--404{
		footer{
			.divider{
				display: none;
			}
		}
	}
}

#nav {
	div{
		border-bottom: 1px solid transparent;
		&.router-link-exact-active {
			border-bottom: 1px solid white;
		}
	}
	&.nav-menu--active{

	}
}

.wrapper{
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
}

.fold-title{
	font-family: 'Kaushan Script', Helvetica, Arial, sans-serif;
	font-size: 40px;
	margin: 0;
	padding-left: 15px;
}

.fold-loader{
	background: url(./assets/images/loaders/blue.svg) no-repeat 0 center / 40px;
	padding: 10px 0 10px 45px;
	margin-left: 20px;
	font-weight: 600;
	font-size: 14px;
}

.view-more{
	padding-right: 30px;
	background: url(./assets/images/arrows/right_red.svg) no-repeat 100% center / 20px;
	cursor: pointer;
}

.menu-button{
	.line{
		transition: all 0.2s ease-in-out;
		right: 0;
	}
	&.menu-button--active{
		.line{
			&:nth-child(1){
				transform: rotate(40deg);
				top: 4px;
			}
			&:nth-child(2){
				opacity: 0;
				right: -20px;
			}
			&:nth-child(3){
				transform: rotate(-40deg);
				top: -4px;
			}
		}
	}
}

// Dividers
	.divider{
		background: url(./assets/images/borders/divider.svg) no-repeat center / 100%;
		width: 100%;
		height: 300px;
		&.divider--dark-bottom{
			background: url(./assets/images/borders/fold_dark_bottom.svg) no-repeat center 100% / 104%;
			position: relative;
			top: 8px;
			&:after{
				content: "";
				background: #051123;
				position: absolute;
				width: 100%;
				height: 2px;
				left: 0;
				bottom: 0;
			}
		}
		&.divider--dark-top{
			background: url(./assets/images/borders/fold_dark_top.svg) no-repeat center -10px / 104%;
		}
	}
// .Dividers

// Social icons
	.follow-text{
		transform: rotate(-90deg);
		bottom: 70px;
		left: 22px;
	}

	.social{
		a{
			width: 100px;
			height: 40px;
			display: block;
			&.twitter{
				background: url('./assets/images/social/twitter.svg') no-repeat center / 15px;
			}
			&.youtube{
				background: url('./assets/images/social/youtube.svg') no-repeat center / 15px;
			}
			&.instagram{
				background: url('./assets/images/social/instagram.svg') no-repeat center / 15px;
			}
		}
	}
// .Social icons

// ******** MEDIA *********
	@media screen and (max-width: 780px){
		#nav{
			right: -100%;
			transition: all 0.2s ease-in-out;
			&.nav-menu--active{
				right: 0;
			}
		}

		.divider{
			height: 200px;
			&.divider--dark-top{
				background-size: 300%;
			}
			&.divider--dark-bottom{
				background-size: 250%;
			}
		}
	}

	@media screen and (max-width: 480px){
		.fold-title{
			font-size: 30px;
		}

		.hero-fold{
			.hero-fold--bg{
				&.circled-photo{
					right: -50px;
				}
			}
		}
	}
// ******** MEDIA *********
</style>
