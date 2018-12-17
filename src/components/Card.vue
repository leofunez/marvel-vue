<template>
    <router-link class="card p-15 w-20 c-pointer no-decoration color-dark relative lg-w-50 sm-w-100" :to="'/' + type + '/' + id">
        <div class="photo w-100 h-200-p mb-15 rounded-20 overflow-h relative md-h-250-p" :class="{'shadow' : skin !== 'white'}" :style="{'background' : 'url(' + image + ') no-repeat center / cover'}">
            <div class="like-button absolute" :class="{ 'like-button--active' : is_liked }"></div>
        </div>
        <h2 class="font-14 m-0 mb-5 lh-14" :class="{'color-white' : skin === 'white'}" v-html="title"></h2>
    </router-link>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        props: ['title', 'image', 'type', 'id', 'skin'],

        data(){
            return{
                characters_liked: [],
                comics_liked: [],
                series_liked: [],
                is_liked: false,
            }
        },

        created(){
            this.getAllLiked()
            this.isLiked()
        },

        methods: {
            getAllLiked(){
                this.GET_CHARACTERS_LIKED.length !== 0 ? this.characters_liked = this.GET_CHARACTERS_LIKED[0] : this.characters_liked = []
                this.GET_COMICS_LIKED.length !== 0 ? this.comics_liked = this.GET_COMICS_LIKED[0] : this.comics_liked = []
                this.GET_SERIES_LIKED.length !== 0 ? this.series_liked = this.GET_SERIES_LIKED[0] : this.series_liked = []
            },

            isLiked(){
                if( this.type === 'characters' ){
                    if( this.characters_liked.length !== 0 ){
                        if( this.characters_liked.includes( this.id.toString() ) ){
                            this.is_liked = true
                        }
                    }
                }

                if( this.type === 'comics' ){
                    if( this.comics_liked.length !== 0 ){
                        if( this.comics_liked.includes( this.id.toString() ) ){
                            this.is_liked = true
                        }
                    }
                }

                if( this.type === 'series' ){
                    if( this.series_liked.length !== 0 ){
                        if( this.series_liked.includes( this.id.toString() ) ){
                            this.is_liked = true
                        }
                    }
                }
            }
        },

        computed: {
            ...mapGetters(['GET_CHARACTERS_LIKED', 'GET_COMICS_LIKED', 'GET_SERIES_LIKED']),
        }
    }
</script>

<style lang="scss" scoped>
    .card{
        .photo{
            &:after{
                content: "";
                position: absolute;
                width: 100%;
                height: 50%;
                left: 0;
                top: 0;
                border-radius: 18px;
                background-image: linear-gradient(#051124, transparent)
            }
        }
    }
</style>


