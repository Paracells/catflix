<template>
  <div class="">
    <Switch
        v-model="enabled"
        :class="enabled ? 'bg-green-900' : 'bg-yellow-700'"
        class="relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      <span class="sr-only">Use setting</span>
      <span
          aria-hidden="true"
          :class="enabled ? 'translate-x-9' : 'translate-x-0'"
          class="pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200"
      />
    </Switch>
  </div>
</template>

<script>
import {Switch} from '@headlessui/vue'

export default {
  components: {Switch},
  name: 'SwitchTheme',
  data() {
    return {
      enabled: false
    }
  },
  watch: {
    enabled(value) {
      if (value) {
        localStorage.setItem('theme', 'dark')
        document.documentElement.classList.add('dark')
        document.body.classList.toggle('bg-gray-900', 'text-white')
      } else {
        localStorage.setItem('theme', 'light')
        document.documentElement.classList.contains('dark') ? document.documentElement.classList.remove('dark') : ''

        document.body.classList.toggle('bg-gray-100', 'text-black')
      }
    }
  },
  created() {
    this.enabled = true
    console.log(localStorage.getItem('theme') === 'dark')
  }

}
</script>
