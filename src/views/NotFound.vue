<template>
    <section class="hero-fold w-100 h-100-vh relative bg-dark">
        <div class="wrapper d-flex flex-middle h-100 relative z-index-2 color-white">
            <div class="hero-fold--content m-auto align-center max-w-680">
                <span class="font-fugaz-one color-red font-14 d-block mb-10 uppercase" v-html="'Page not found'"></span>
                
                <h1 class="hero-fold--title font-150 m-0 mb-10 font-kaushan-script" v-html="title"></h1>
                <p class="hero-fold--subtitle font-18 lh-14 m-0 mb-40 pl-10" v-html="subtitle"></p>

                <router-link to="/" class="button no-decoration" v-html="'Go Home'"></router-link>
            </div>
        </div>

        <div class="social absolute pos-left absolute-v-center d-flex flex-column flex-center">
            <a href="#" class="youtube"></a>
            <a href="#" class="twitter"></a>
            <a href="#" class="instagram"></a>
            <span class="follow-text color-white font-12 font-weight-600 mt-20" v-html="'Follow us'"></span>
        </div>

        <div class="hero-fold--bg w-700-p h-700-p absolute pos-right absolute-v-center z-index-1" :style="{'background' : 'url(' + hero_small_bg + ') no-repeat 150% center / 90% transparent'}"></div>
        <div class="hero-fold--bg-overlay w-100 h-100 absolute pos-left pos-top opacity-04" :style="{'background' : 'url(' + hero_big_bg + ') no-repeat center / cover transparent'}"></div>
    </section>
</template>

<script>
    import HeroFold from '@/components/HeroFold'

    import HeroSmallBG from '@/assets/images/hero_fold/404.png'
    import HeroBigBG from '@/assets/images/hero_fold/404_overlay.jpg'

    export default {
        components: {
            HeroFold
        },

        data(){
            return{
                title: '404',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor metus nisl, a ultrices sapien dictum consectetur.',
                hero_big_bg: HeroBigBG,
                hero_small_bg: HeroSmallBG,
            }
        }
    }
</script>
