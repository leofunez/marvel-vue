import axios from 'axios'
import Md5 from './md5'

const timestamp = Date.now()
const public_key = '129eed2cc3b140ac9b8f89f5c8bf7a08'
const private_key = 'de4ed52bc3c45bd9d2813356a80f5422a60a9448'
const hash = Md5(timestamp + private_key + public_key)
const params = `ts=${timestamp}&apikey=${public_key}&hash=${hash}`

const apiMarvel = axios.create({
    baseURL: `https://gateway.marvel.com:443/v1/public`,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    // Get Params
        getParams(){
            return params
        },

    // Characters
        getCharacters(limit){
            return apiMarvel(`/characters?limit=${limit}&${params}`)
        },

        getCharacter(character_id){
            return apiMarvel(`/characters/${character_id}?${params}`)
        },

        getCharacterComics(character_id, limit){
            return apiMarvel(`/characters/${character_id}/comics?limit=${limit}&${params}`)
        },

        getCharacterSeries(character_id, limit){
            return apiMarvel(`/characters/${character_id}/series?limit=${limit}&${params}`)
        },
    // .Characters

    // Comics
        getComics(limit){
            return apiMarvel(`/comics?limit=${limit}&${params}`)
        },

        getComic(comic_id){
            return apiMarvel(`/comics/${comic_id}?${params}`)
        },

        getComicCharacters(comic_id){
            return apiMarvel(`/comics/${comic_id}/characters?${params}`)
        },
    // .Comics

    // Series
        getSeries(limit){
            return apiMarvel(`/series?limit=${limit}&${params}`)
        },

        getSerie(serie_id){
            return apiMarvel(`/series/${serie_id}?${params}`)
        },

        getSerieCharacters(serie_id){
            return apiMarvel(`/series/${serie_id}/characters?${params}`)
        },

        getSerieComics(serie_id){
            return apiMarvel(`/series/${serie_id}/comics?${params}`)
        },
    // .Series
}