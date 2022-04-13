<template>
  <div class='play-list'>
    <div class='section-title' v-if='title'>{{ title }}</div>
    <ul class='section-content'>
      <el-row :gutter="10">
        <el-col v-if="showDayPush" :span="6" :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
          <li class='content-item'>
            <div class='kuo' @click='goAblum("everday")'>
              <div class="push-item">
                <div class="push-day">{{ toDay }}</div>
                <div class="push-title">每日推荐</div>
              </div>
              <div class='mask' @click='goAblum("everday")'>
                <yin-icon :icon="BOFANG"></yin-icon>
              </div>
            </div>
            <p class='item-name'></p>
          </li>
        </el-col>
        <el-col :span="6" :xs="12" :sm="8" :md="6" :lg="6" :xl="6"
                v-for='(item, index) in playList' :key='index'>
          <li class='content-item'>
            <div class='kuo' @click='goAblum(item)'>
              <img class='item-img' :src='attachImageUrl(item.pic)' alt=''>
              <div class='mask' @click='goAblum(item)'>
                <yin-icon :icon="BOFANG"></yin-icon>
              </div>
            </div>
            <p class='item-name'>{{ item.name || item.title }}</p>
          </li>
        </el-col>
      </el-row>

    </ul>
  </div>
</template>

<script>
import YinIcon from '@/components/layouts/YinIcon'
import mixin from '@/mixins'
import {ICON} from '@/enums'

export default {
  name: 'PlayList',
  mixins: [mixin],
  components: {
    YinIcon
  },
  props: {
    title: String,
    playList: Array,
    path: String,
    showDayPush: {
      type: Boolean,
      default: () => false,
    }
  },
  data() {
    let toDay = new Date().getDate();
    return {
      BOFANG: ICON.BOFANG,
      toDay,
    }
  },
  methods: {
    goAblum(item) {
      let id = item === 'everday' ? item : 'item.id';
      this.$store.commit('setSongDetails', item)
      this.routerManager(this.path, {path: `/${this.path}/${id}`})
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/play-list.scss';

</style>
