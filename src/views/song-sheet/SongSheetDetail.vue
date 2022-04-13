<template>
  <div class="song-sheet-detail">
    <div class="album-slide">
      <div class="album-img">
        <img v-if="!isEverDay" :src="attachImageUrl(songDetails.pic)" alt="">
        <div v-else class="push-item">
          <div class="push-day">{{ toDay }}</div>
          <div class="push-title">每日推荐</div>
        </div>
      </div>
      <div class="album-info">
        <h2>简介：</h2>
        <span> {{ isEverDay ? '又是开心的一天' : songDetails.introduction }} </span>
      </div>
    </div>
    <div class="song-list">
      <div class="album-title">
        <p>{{ isEverDay ? `每日个性推荐` : songDetails.title }}</p>
      </div>
      <!--评分-->
      <div v-if="!isEverDay" class="album-score">
        <div>
          <h3>歌单评分：</h3>
          <div>
            <el-rate v-model="rank" disabled></el-rate>
          </div>
        </div>
        <span>{{ rank }}</span>
        <div>
          <h3>评价：</h3>
          <div @click="pushValue()">
            <el-rate v-model="score" show-text allow-half></el-rate>
          </div>
        </div>
      </div>
      <!--歌曲-->
      <div class="songs-body">
        <song-list :songList="currentSongList"></song-list>
        <comment v-if="!isEverDay" :playId="songListId" :type="1"></comment>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import mixin from '@/mixins'
import SongList from '@/components/SongList'
import Comment from '@/components/Comment'
import {HttpManager} from '@/api'

export default {
  name: 'song-sheet-detail',
  mixins: [mixin],
  components: {
    SongList,
    Comment
  },
  data() {
    let toDay = new Date().getDate();
    return {
      currentSongList: [], // 存放的音乐
      songListId: '', // 歌单 ID
      score: 0,
      rank: 0,
      isEverDay: false,
      toDay
    }
  },
  computed: {
    ...mapGetters([
      'songDetails', // 单个歌单信息
      'userPic' // 用户头像
    ])
  },
  created() {
    try {
      this.isEverDay = this.$route.params?.id === 'everday';
      console.log("this.$route", this.isEverDay, this.songDetails);

      this.songListId = this.songDetails.id // 给歌单ID赋值
      !this.isEverDay && this.getRank(this.songListId) // 获取评分
      this.getSongId(this.isEverDay ? 'everday' : this.songListId) // 获取歌单里面的歌曲ID
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    // 收集歌单里面的歌曲
    async getSongId(id) {
      const result = await HttpManager.getListSongOfSongId(id)
      // 获取歌单里的歌曲信息
      for (const item of result) {
        // 获取单里的歌曲
        // const resultSong = await HttpManager.getSongOfId(item.songId)
        this.currentSongList.push(item)
      }
    },
    // 获取评分
    async getRank(id) {
      const result = await HttpManager.getRankOfSongListId(id)
      let val = Math.round(result);
      this.rank = !isNaN(val) ? val : 0;
      // console.log("this.rank",result,this.rank);
    },
    // 提交评分
    async pushValue() {
      if (!this.checkStatus()) return

      const params = new URLSearchParams()
      params.append('songListId', this.songListId)
      params.append('consumerId', this.userId)
      params.append('score', this.score * 2)

      try {
        const result = await HttpManager.setRank(params)
        if (result.code === 1) {
          this.getRank(this.songListId)
          this.$notify({
            title: '评分成功',
            type: 'success'
          })
        } else {
          this.$notify({
            title: '评分失败',
            type: 'error'
          })
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/song-sheet-detail.scss';

.push-item {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #F4C382;
}

.push-day {
  font-size: 120px;
  color: #fefefe;
}
.push-title {
  font-size: 25px;
}
</style>
