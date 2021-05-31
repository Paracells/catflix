<template>
  <div
      @click="close"
      class="absolute inset-0 z-40 bg-opacity-70 bg-black flex items-center justify-center"
  >
    <div
        @click.stop
        class="max-h-full flex items-center justify-center bg-gray-800 py-12 px-4 sm:px-6 lg:px-8 w-full max-w-xl rounded-xl"
    >
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-300">
            Sign in to your account
          </h2>
        </div>
        <Form class="mt-8 space-y-6" action="#" method="POST" @submit="close" :validation-schema="loginForm">
          <input type="hidden" name="remember" value="true"/>
          <div class="rounded-md shadow-sm ">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <Field
                  id="email-address"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required=""
                  class="input mb-4"
                  placeholder="Email address"
              />
              <div class="text-red-400 mb-2">
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
                  required=""
                  class="input"
                  placeholder="Password"
              />
              <div class="text-red-400 mt-2">
                <error-message name="password"/>
              </div>
            </div>

          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  checked
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label for="remember_me" class="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a
                  href="#"
                  class="font-medium text-indigo-200 hover:text-indigo-400"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button type="submit" class="btn btn-primary w-full">
              Sign in
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import {Form, Field, ErrorMessage} from "vee-validate";
import {object, string} from 'yup'

export default {
  components: {Form, Field, ErrorMessage},
  emits: ["close"],
  data() {

    const loginForm = object({
      email: string().required().email(),
      password: string().required().min(8)
    })

    return {
      loginForm
    }
  },
  methods: {
    close() {
      console.log(this.loginForm)
      this.$emit("close");
    },
  },
};
</script>
