<template>
  <div @click="$emit('close')"
       class="absolute inset-0 z-40 bg-opacity-70 bg-black flex items-center justify-center h-screen"
  >
    <div
        class="bg-gray-800 py-4 px-2 w-full max-w-xl rounded-xl flex flex-col items-end justify-items-end">

      <div
          @click.stop
          class="grid grid-cols-4 row-auto  bg-gray-800 py-4 px-2 w-full rounded-xl gap-2 "
      >
        <div class="row-start-1">Name:</div>
        <div class="row-start-1 col-span-2">{{ person.name }}</div>
        <div class="row-start-2">Gender:</div>
        <div class="row-start-2">{{ sex(person.gender) }}</div>
        <div class="row-start-3">Birthday:</div>
        <div class="row-start-3">{{ convertDate(person.birthday) }}</div>
        <div class="row-start-4">IMDB:</div>
        <div class="row-start-4 text-pink-600 hover:text-green-500 "><a
            :href="'https://www.imdb.com/name/'+person.imdb_id" target="_blank">link</a>
        </div>
        <div class="row-start-5">Place of Birth:</div>
        <div class="row-start-5 col-span-2">{{ person.place_of_birth ? person.place_of_birth : 'no data' }}
        </div>
        <div class="col-start-4 row-start-1 row-end-6">
          <img class="h-auto row-start-1 row-end-6 object-cover col-start-4 col-span-8 " :src="imgLink" alt="">
        </div>
        <div class="row-start-6 text-yellow-500 mt-2">Movies</div>
        <transition-group tag="div" name="fade"
                          class="row-start-7 row-end-7 inline-block col-span-5 inline-flex space-x-4 mt-2">
          <img class="w-[138px] h-28 object-cover " :src="getImage(i, 'poster_path')" :alt="i.original_title"
               v-for="i in personMovies" :key="i.id">
        </transition-group>
      </div>

    </div>
  </div>
</template>

<script>

import {personAxios} from "../../api";
import {getImage} from "../../utils";
import {convertDate} from "../../utils";

export default {
  name: 'MovieActorModal',
  emits: ['close'],
  props: {
    actor: {
      type: Number,
      required: true,
      default: {}
    }
  },
  data() {
    return {
      person: [],
      personMovies: [],
    }

  },
  methods: {
    convertDate,
    getImage,
    sex(value) {
      if (value === 2) {
        return 'Male'
      } else if (value === 1) {
        return 'Female'
      }
      return 'no data'

      return value === 2 ? 'Male' : 'Female'
    }
  },
  computed: {
    imgLink() {
      return getImage(this.person, 'profile_path')
    },
  },
  async created() {
    this.person = (await personAxios.get(`
    ${this.actor}?api_key=${import.meta.env.VITE_APP_MOVIE_API_KEY}&language=en-US
    `)).data
    this.personMovies = (await personAxios.get(`
    ${this.actor}/movie_credits?api_key=${import.meta.env.VITE_APP_MOVIE_API_KEY}&language=en-US
    `)).data.cast
    this.personMovies = this.personMovies.length > 5 ? this.personMovies.slice(0, 5) : this.personMovies
    console.log(this.person)
    console.log(this.personMovies)
  }
}

</script>
