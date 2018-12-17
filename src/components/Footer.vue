<template>
    <footer>
        <div class="divider divider--dark-bottom"></div>
        <div class="bg-dark pt-100 pb-60">
            <div class="wrapper d-flex flex-middle flex-between lg-pl-20 lg-pr-20 md-d-block">
                <router-link to="/" class="logo logo--white"></router-link>

                <nav id="nav" class="d-flex flex-middle uppercase font-12 font-fugaz-one color-white md-d-inline-block md-mb-20">
                    <router-link class="p-20 pl-0 pr-0 ml-20 mr-20 c-pointer md-pb-5 md-ml-0 md-mr-40 md-mb-10 md-d-inline-block" to="/" tag="div">Home</router-link>
                    <router-link class="p-20 pl-0 pr-0 ml-20 mr-20 c-pointer md-pb-5 md-ml-0 md-mr-40 md-mb-10 md-d-inline-block" to="/characters" tag="div">Characters</router-link>
                    <router-link class="p-20 pl-0 pr-0 ml-20 mr-20 c-pointer md-pb-5 md-ml-0 md-mr-40 md-mb-10 md-d-inline-block" to="/comics" tag="div">Comics</router-link>
                    <router-link class="p-20 pl-0 pr-0 ml-20 mr-20 c-pointer md-pb-5 md-ml-0 md-mr-40 md-mb-10 md-d-inline-block" to="/series" tag="div">Series</router-link>
                    <router-link class="p-20 pl-0 pr-0 ml-20 mr-20 c-pointer md-pb-5 md-ml-0 md-mr-40 md-mb-10 md-d-inline-block" to="/teams" tag="div">My teams</router-link>
                    <router-link class="p-20 pl-30 pr-0 ml-20 mr-20 c-pointer favorite box-sizing-initial md-ml-0 md-d-inline-block" to="/favorites" tag="div">Favorites</router-link>
                </nav>
            </div>

            <div class="wrapper lg-pl-20 lg-pr-20">
                <p class="color-white font-12 m-0">
                    Designed and developed by <a class="no-decoration color-red font-weight-600" href="http://leonardofunez.com" target="_blank">Leonardo Funez</a>
                </p>
            </div>
        </div>
    </footer>
</template>

