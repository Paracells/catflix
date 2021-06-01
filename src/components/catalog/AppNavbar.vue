<template>
  <header
      class="border-b md:flex md:items-center md:justify-between p-4 pb-0 md:pb-4 bg-gray-700 bg-opacity-80"
  >
    <nav>
      <ul class="list-reset md:flex md:items-center">
        <li class="md:ml-4">
          <a
              class="text-white block no-underline py-2 text-grey-darkest hover:text-indigo-500 md:border-none md:p-0"
              href="#"
          >
            Home
          </a>
        </li>
        <li class="md:ml-4">
          <a
              class="text-white border-t block no-underline py-2 text-grey-darkest hover:text-indigo-500 md:border-none md:p-0"
              href="#"
          >
            My Favorites
          </a>
        </li>
      </ul>
    </nav>

    <!-- Search field -->
    <form class="mb-4 w-full md:mb-0 md:w-1/4">
      <input
          class="bg-grey-lightest border-2 focus:border-orange p-2 rounded-lg shadow-inner w-full bg-gray-700 placeholder-white text-white"
          placeholder="Search a movie..."
          type="text"
      />
      <button class="hidden">Submit</button>
    </form>

    <div>
      <button @click="showModal = true" class="btn-header">Login</button>
      <button @click="showSignup = true" class="btn-header hover:bg-blue-400">Signup</button>
      <transition name="fade">
        <app-login v-if="showModal" @close="showModal = false"/>
      </transition>
      <transition name="fade">
        <app-signup v-if="showSignup" @close="showSignup = false"/>
      </transition>
    </div>
  </header>

</template>

<script>
import AppLogin from "@/components/auth/AppLogin.vue";
import AppSignup from "@/components/auth/AppSignup.vue";

export default {
  components: {AppLogin, AppSignup},
  data() {
    return {
      showModal: false,
      showSignup: false,
    };
  },
  methods: {
    loginModal() {
      this.showModal = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
