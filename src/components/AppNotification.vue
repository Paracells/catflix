<template>
  <div class="absolute w-full p-2 text-center text-3xl z-0 uppercase font-medium bg-opacity-80" :class="color"
       @mouseover="$emit('closeNotification')">
    <div>{{ message }}</div>
  </div>
</template>

<script>
let timer;
export default {
  name: "Notification",
  emits: ['closeNotification'],
  props: {
    message: {
      type: String,
      required: true,
      default: ''
    },
    color: {
      type: String,
      required: true,
      default: ''
    },

  },

  mounted() {
    timer = setTimeout(() => this.$emit('closeNotification'), 1000)
  },
  beforeUnmount() {
    clearTimeout(timer)
  }
}
</script>

<style scoped>

</style>
