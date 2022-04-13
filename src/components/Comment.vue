<template>
  <div>
    <div class='comment'>
      <h2>
        <span>评论</span>
        <span class='part__tit_desc'>共 {{ commentList.length }} 条评论</span>
      </h2>
      <div class='comment-msg'>
        <el-input
            class='comment-input'
            type='textarea'
            placeholder='期待您的精彩评论...'
            :rows='2'
            v-model='textarea'>
        </el-input>
      </div>
      <el-button type='primary' class='sub-btn' @click='submitComment()'>发表评论</el-button>
    </div>
    <ul class='popular' v-for='(item, index) in commentList' :key='index'>
      <li>
        <div class='popular-img'>
          <img :src='item.avator' alt=''>
        </div>
        <div class='popular-msg'>
          <ul>
            <li class='name'>{{ item.username }}</li>
            <li class='time'>{{ item.createTime }}</li>
            <li class='content'>{{ item.content }}</li>
          </ul>
        </div>
        <div class='up' ref='up' @click='setSupport(item.id,  index)'>
          <yin-icon :icon="iconList.ZAN"></yin-icon>
          {{ item.up }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import YinIcon from '@/components/layouts/YinIcon'
import {mapGetters} from 'vuex'
import mixin from '../mixins'
import {HttpManager} from '../api'
import {ICON} from '../enums'

export default {
  name: 'Comment',
  mixins: [mixin],
  components: {
    YinIcon
  },
  props: {
    playId: Number, // 歌曲ID或歌单ID
    type: Number // 歌单（1）/歌曲（0）
  },
  data() {
    return {
      commentList: [], // 存放评论内容
      userPicList: [], // 保存评论用户头像
      userNameList: [], // 保存评论用户名字
      textarea: '', // 存放输入内容
      iconList: {
        ZAN: ICON.ZAN
      }
    }
  },
  computed: {
    ...mapGetters([
      'songId',
      'BASE_URL'
    ])
  },
  watch: {
    songId() {
      this.getComment()
    }
  },
  mounted() {
    this.getComment()
  },
  methods: {
    // 获取所有评论
    async getComment() {
      const result = await HttpManager.getAllComment(this.type, this.playId)
      this.commentList = result.map((item) => {
        let avator = item.user.avator;
        item['username'] = item.user.username;
        item['avator'] = /http(s)?:/.test(avator) ? avator : `${this.BASE_URL}/storage${avator}`;
        return item;
      })

    },
    // 提交评论
    async submitComment() {
      if (!this.checkStatus()) return

      // 0 代表歌曲， 1 代表歌单
      const params = new URLSearchParams()
      if (this.type === 1) {
        params.append('song_list_id', this.playId)
      } else if (this.type === 0) {
        params.append('song_id', this.playId)
      }
      params.append('user_id', this.userId)
      params.append('type', this.type)
      params.append('content', this.textarea)

      const result = await HttpManager.setComment(params)
      if (result.code === 1) {
        this.textarea = ''
        this.$notify({
          title: '评论成功',
          type: 'success'
        })
        await this.getComment()
      } else {
        this.$notify({
          title: '评论失败',
          type: 'error'
        })
      }
    },
    // 点赞
    async setSupport(id) {
      if (!this.checkStatus()) return

      let type = this.isThumb(id);
      console.log("type", type);

      const params = new URLSearchParams()
      params.append('id', id)
      params.append('type', type ? 0 : 1)

      const result = await HttpManager.setSupport(params)
      if (result.code === 1) {
        this.thumbStatus(type, id);
        // this.$refs.up[index].children[0].style.color = '#2796dd'
        await this.getComment()
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/css/comment.scss';
</style>
