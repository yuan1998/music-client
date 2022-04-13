<template>
  <!--轮播图-->
  <el-carousel v-if="bannerList.length" class="swiper-container" type="card" height="20vw" :interval="4000">
    <el-carousel-item v-for="(item, index) in bannerList"
                      @click="handleClickBanner(item)"
                      :key="index"
    >
      <img :src="item.path"/>
    </el-carousel-item>
  </el-carousel>
  <!--热门歌单-->
  <play-list class="section" title="歌单" path="song-sheet-detail" :playList="songList" showDayPush></play-list>
  <!--热门歌手-->
  <play-list class="section" title="歌手" path="singer-detail" :playList="singerList"></play-list>
</template>

<script setup>
import {ref, onMounted} from "vue";
import PlayList from "@/components/PlayList";
import {HttpManager} from "@/api";

const songList = ref([]); // 歌单列表
const singerList = ref([]); // 歌手列表
const bannerList = ref([]);

const handleClickBanner = (item) => {
  if (item.url)
    window.location.href = item.url;
}


onMounted(() => {
  try {
    HttpManager.getBannerList().then((res) => {
      bannerList.value = res;

    })

    HttpManager.getSongList().then((res) => {
      songList.value = res;
    });

    HttpManager.getAllSinger().then((res) => {
      singerList.value = res;
    });
  } catch (error) {
    console.error(error);
  }
})


</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";

.swiper-container {
  width: 90%;
  margin: auto;
  padding-top: 100px;

  img {
    width: 100%;
  }
}

.section {
  width: 100%;
  margin-top: 20px;
  padding: $content-padding;
  background-color: $color-white;
  box-sizing: border-box;
}
</style>
