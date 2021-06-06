<template>
  <div
      class="absolute inset-0 z-40 bg-opacity-70 bg-black flex items-center justify-center"
  >
    <div
        @click.stop
        class="max-h-full flex items-center justify-center bg-gray-800 py-10 px-4 sm:px-6 lg:px-8 w-full max-w-xl rounded-xl"
    >
      <div class="max-w-md w-full">
        <div class="flex justify-between text-gray-300 items-center  ">
          <h2 class="-mt-2 text-center text-3xl font-extrabold text-gray-300">
            {{ actor }}
          </h2>
          <svg @click="$emit('close')"
               class="w-8 h-8 cursor-pointer text-red-300"
               fill="none"
               stroke="currentColor"
               viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="4"
                d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MovieModal',
  emits: ['close'],
  props: {
    actor: {
      type: Number,
      required: true,
      default: {}
    }
  },
  created() {
    console.log(this.movie)
  }
}

</script>
