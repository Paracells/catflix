
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
            Create your CatFlix account
          </h2>
        </div>
        <Form class="mt-8 space-y-6" action="#" method="POST" @submit="close">
          <input type="hidden" name="remember" value="true" />
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="name" class="sr-only">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                class="input mb-4"
                placeholder="Name"
              />
            </div>
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required=""
                class="input mb-4"
                placeholder="Email address"
              />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required=""
                class="input"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button @click="close" type="button" class="btn btn-primary w-full">
              Sign up
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field } from "vee-validate";
export default {
  emits: ["close"],
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>