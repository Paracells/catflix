<template>
  <div
      @click="close"
      class="absolute inset-0 z-40 bg-opacity-70 bg-black flex items-center justify-center"
  >
    <div
        @click.stop
        class="max-h-full flex items-center justify-center bg-gray-800 py-10 px-4 sm:px-6 lg:px-8 w-full max-w-xl rounded-xl"
    >
      <div class="max-w-md w-full">
        <div>
          <h2 class="mt-0 text-center text-3xl font-extrabold text-gray-300">
            Create your CatFlix account
          </h2>
        </div>
        <Form class="mt-8 space-y-6" action="#" method="POST" @submit="close" :validation-schema="signUpForm">
          <input type="hidden" name="remember" value="true"/>
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="name" class="sr-only">Name</label>
              <Field
                  id="name"
                  name="name"
                  type="text"
                  class="input mb-4"
                  placeholder="Name"
              />
              <div class="text-red-400 mb-2">
                <error-message name="name"/>
              </div>
            </div>
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
              <div class="text-red-400 mb-2">
                <error-message name="password"/>
              </div>
            </div>
          </div>

          <div>
            <button type="submit" class="btn btn-primary w-full bg-green-500">
              Sign up
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
  emits: ["close"],
  components: {Form, Field, ErrorMessage},
  data() {

    const signUpForm = object({
      name: string().required().min(3),
      email: string().required().email(),
      password: string().required().min(8)
    })

    return {
      signUpForm
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
