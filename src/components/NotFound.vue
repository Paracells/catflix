<template>
  <div class="">
    <div class="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
      <div class="bg-gray-800 shadow overflow-hidden sm:rounded-lg pb-8">
        <div class="border-gray-200 text-center pt-8">
          <h1 class="text-9xl font-bold text-purple-400">404</h1>
          <h1 class="text-6xl font-medium py-8 text-gray-300">oops! Page not found</h1>
          <p class="text-2xl pb-8 px-12 font-medium text-gray-200">Oops! The page you are looking for does not exist. It
            might have
            been moved or deleted.</p>
          <router-link :to="{name:'AppCatalog'}" replace>

            <button
                class="w-60 font-normal btn btn-primary">
              HOME
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>

</style>
