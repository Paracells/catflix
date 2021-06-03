<template>
  <div class="notification">
    <div class="notification__content bg-indigo-500" v-for="message in messages" :key="message.id">
      <div class="content__text">
        <span>{{ message.name }}</span>
      </div>
      <div class="content__buttons">
        <button v-if="rightButton.length">{{ rightButton }}</button>
        <button v-if="leftButton.length">{{ leftButton }}</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Notification.vue",
  props: {
    messages: {
      type: Array,
      default: () => []
    },
    rightButton: {
      type: String,
      default: ''
    },
    leftButton: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.notification {
  position: fixed;
  top: 80px;
  right: 16px;
  z-index: 10;
}

.notification__content {
  padding: 16px;
  border-radius: 4px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin-bottom: 16px;
}
</style>
