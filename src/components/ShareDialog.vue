<template>
  <el-dialog
      v-model="modelValue"
      :title="title"
      width="30%"
      @close="closeDialog"
  >
    <div class='info-box' style="padding-bottom: 1rem;">
      <div class='song-bar-img'>
        <img style="width: 100%;object-fit: cover;" :src='songPic' alt=''>
      </div>
      <div>
        <div style="font-size: 1rem;" class='song-info'>
          {{ songTitle }}
        </div>
      </div>
    </div>
    <el-select
        v-model="value"
        filterable
        remote
        style="width:100%"
        reserve-keyword
        placeholder="请选择分享的用户"
        :remote-method="remoteMethod"
        :loading="loading"
    >
      <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.username"
          :value="item.id"
      />
    </el-select>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">
          取消
        </el-button>
        <el-button type="primary"
                   @click="handleShare">
          分享
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import {ref, toRefs, onMounted, defineProps, defineEmits} from 'vue'
import {useStore} from 'vuex'
import {HttpManager} from "@/api";
import {ElNotification} from "element-plus";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: () => false,
  },
  title: {
    type: String,
    default: '分享'
  },
  songPic: String,
  songTitle: String,
  url: String,
})
const emit = defineEmits(['update:modelValue'])

const {modelValue, title} = toRefs(props);
const loading = ref(false)
const value = ref('')
const options = ref([])

onMounted(async () => {
  let a = await HttpManager.searchUser();
  console.log("a", a);
  if (a.code === 1) {
    options.value = a.data;
  }
})

const closeDialog = () => {
  emit('update:modelValue', false);
}

const handleShare = () => {
  closeDialog();
  ElNotification({
    title: 'Success',
    message: '分享成功',
    type: 'success',
  })
}

const remoteMethod = async (query) => {
  if (!loading.value) {
    loading.value = true
    let a = await HttpManager.searchUser(query);
    loading.value = false

    if (a.code === 1) {
      options.value = a.data;
    }
  }
}
</script>
<style scoped lang="less">

</style>
