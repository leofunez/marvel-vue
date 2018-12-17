<template>
    <section class="hero-fold w-100 h-100-vh relative bg-dark">
        <div class="wrapper d-flex flex-middle h-100 relative z-index-2 color-white">
            <div class="hero-fold--content m-auto align-center max-w-680">
                <span class="font-fugaz-one color-red font-14 d-block mb-20 uppercase" v-html="category" v-if="category"></span>
                
                <h1 class="hero-fold--title font-62 m-0 mb-10 md-font-40" v-html="title"></h1>
                <p class="hero-fold--subtitle font-18 lh-14 m-0 mb-40 pl-10 md-font-16" v-html="subtitle"></p>

                <div class="button" v-html="'Learn more'"></div>
            </div>
        </div>

        <!-- Social -->
            <div class="social absolute pos-left absolute-v-center d-flex flex-column flex-center md-d-none">
                <a href="#" class="youtube"></a>
                <a href="#" class="twitter"></a>
                <a href="#" class="instagram"></a>
                <span class="follow-text color-white font-12 font-weight-600 mt-20" v-html="'Follow us'"></span>
            </div>
        <!-- .Social -->

        <!-- Pager -->
            <div class="pager absolute d-flex z-index-2" v-if="prev_page || next_page">
                <router-link :to="'/' + prev_page" class="w-60-p h-50-p bg-white c-pointer previous" tag="div"></router-link>
                <router-link :to="'/' + next_page" class="w-60-p h-50-p bg-white c-pointer next" tag="div"></router-link>
            </div>
        <!-- .Pager -->

        <!-- Backgrounds -->
            <div
                class="hero-fold--bg absolute pos-right absolute-v-center z-index-1 md-opacity-7"
                :class="{'circled-photo w-500-p h-500-p' : circled_photo, 'w-700-p h-700-p' : !circled_photo}"
                :style="{'background' : 'url(' + bg_small + ') no-repeat 150% center / 90% transparent'}">
            </div>
            <div
                class="hero-fold--bg-overlay w-100 h-100 absolute pos-left pos-top opacity-04"
                :style="{'background' : 'url(' + bg_big + ') no-repeat center / cover transparent'}">
            </div>
        <!-- .Backgrounds -->
    </section>
</template>

<script>
    export default {
        props: ['bg_big', 'bg_small', 'circled_photo', 'title', 'subtitle', 'prev_page', 'next_page', 'category']
    }
</script>


<style lang="scss" scoped>
    .hero-fold{
        &::after{
            content: "";
            background: url("../assets/images/borders/white.svg") no-repeat center 101% / 101%;
            position: absolute;
            width: 100%;
            height: 50%;
            bottom: 0;
            left: 0;
        }

        .hero-fold--content{
            .hero-fold--title{
                font-family: 'Kaushan Script', Helvetica, Arial, sans-serif;
                text-shadow: 0 0 6px black;
            }
            .hero-fold--subtitle{
                text-shadow: 0 0 6px black;
            }
        }
        
        .hero-fold--bg{
            &.circled-photo{
                border-radius: 50%;
                background-size: cover !important;
                right: 60px;
                &:after,
                &:before,{
                    content: "";
                    border: 1px solid red;
                    width: 500px;
                    height: 500px;
                    border-radius: 50%;
                    position: absolute;
                    right: -20px;
                    top: 20px;
                }
                &:before{
                    right: 20px;
                    top: -10px;
                    border: 1px solid white;
                }
            }
        }

        .pager{
            bottom: 40px;
            right: 20px;
            div{
                background: url("../assets/images/arrows/right_white.svg") no-repeat center / 20px #ff0036;
                margin: 1px;
                &.previous{
                    transform: rotate(-180deg)
                }
                &:active,
                &:focus{
                    background-size: 18px;
                }
            }
        }
    }
</style>

