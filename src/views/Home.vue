<template>
  <div class="bg__video">
    <video
        class="video"
        src="../assets/video-bg.mp4"
        loop
        muted
        autoplay
    ></video>
  </div>

  <div class="flex items-center justify-evenly h-screen">
    <div class="text-white text-7xl font-semibold w-90">
      For A Good <br/><span class="text-indigo-400">mood</span>
      <div class="text-white max-w-lg mt-8 text-xl">
        Discover the world of cinema with US
      </div>

      <router-link :to="{ name: 'AppCatalog' }" replace>
        <button class="px-10 btn btn-primary w-60">.enter</button>
      </router-link>
    </div>

    <div class="col-start-4 col-span-3">
      <img class="logo__img" src="../assets/logo.png" alt=""/>
    </div>
  </div>
</template>


<style scoped>
.video {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -100;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.logo__img {
  width: 500px;
  height: 500px;
  object-fit: cover;
}

.bg__video::before {
  content: "";
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -90;
}
</style>
