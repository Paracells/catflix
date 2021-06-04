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
            Sign in to your account
          </h2>
          <svg @click="exitForm"
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
        <VeeForm v-slot="{handleSubmit}" :validation-schema="loginForm">
          <form class="mt-8 space-y-6" action="#" @submit="handleSubmit($event, close)">
            <input type="hidden" name="remember" value="true"/>
            <div class="rounded-md shadow-sm ">
              <div>
                <label for="email-address" class="sr-only">Email address</label>
                <Field
                    id="email-address"
                    name="email"
                    type="email"
                    autocomplete="email"
                    class="input mb-4"
                    placeholder="Email address"
                />
                <div class="text-red-400 mb-4">
                  <error-message name="email"/>
                </div>
              </div>
              <div>
                <label for="password" class="sr-only">Password</label>
                <Field
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    class="input"
                    placeholder="Password"
                />
                <div class="text-red-400 mt-4">
                  <error-message name="password"/>
                </div>
              </div>
            </div>
            <div>
              <button type="submit" class="btn btn-primary w-full mt-6">
                Sign in
              </button>
              <div v-if="getError.status" class="text-red-500 mt-6">{{ getError.text }}
              </div>
            </div>
          </form>
        </VeeForm>
      </div>
    </div>
  </div>
</template>

<script>
import {Form as VeeForm, Field, ErrorMessage} from "vee-validate";
import {object, string} from 'yup'
import {mapGetters} from 'vuex'

export default {
  components: {VeeForm, Field, ErrorMessage},
  emits: ["close"],
  data() {

    const loginForm = object({
      email: string().required().email(),
      password: string().required().min(6)
    })

    return {
      loginForm,
    }
  },
  computed: {
    ...mapGetters('user', ['getError', 'getUserName'])
  },
  methods: {
    async close(values) {
      await this.$store.dispatch('user/loadUser', values)
      if (!this.getError.status) {


        this.$emit("close", this.getUserName);
      }

    },
    exitForm() {
      this.$store.commit('user/setError', {status: false, text: false})
      this.$emit('close')
    }
  }
}

</script>
