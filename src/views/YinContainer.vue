<template>
  <yin-header></yin-header>
  <router-view />
  <yin-current-play></yin-current-play>
  <yin-play-bar></yin-play-bar>
  <yin-scroll-top></yin-scroll-top>
  <yin-footer></yin-footer>
  <yin-audio></yin-audio>
</template>

<script setup>
import YinHeader from "@/components/layouts/YinHeader";
import YinCurrentPlay from "@/components/layouts/YinCurrentPlay";
import YinPlayBar from "@/components/layouts/YinPlayBar";
import YinScrollTop from "@/components/layouts/YinScrollTop";
import YinFooter from "@/components/layouts/YinFooter";
import YinAudio from "@/components/layouts/YinAudio";
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";
@import "@/assets/css/global.scss";

#app {
  @include layout(flex-start, stretch, column);
}
</style>
