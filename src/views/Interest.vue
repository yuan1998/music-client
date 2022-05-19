<template>
  <div class="middle-container">
    <el-card v-loading="loading">
      <template v-if="currentOption">
        <h2>
          {{ currentOption.title }}
        </h2>
        <div class="questions">
          <el-checkbox-group v-model="formData.question[index]">
            <el-checkbox v-for="(item , i) in currentOption.questions"
                         :key="i"
                         :label="item"
                         size="large" border/>
          </el-checkbox-group>
        </div>
      </template>
      <div class="questions-footer">
        <el-button type="primary"
                   @click="handleSelect"
                   size="large">
          {{ hasNextOption ? "下一个" : "完成" }}
        </el-button>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import {ref, computed, onMounted} from 'vue';
import {ElNotification} from 'element-plus'
import {HttpManager} from "@/api";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {HOME} from "@/enums";

const store = useStore();
const router = useRouter();
const userId = computed(() => store.getters.userId);
const user = computed(() => store.getters.user);

const loading = ref(false);
const formData = ref({
  question: {}
});
const index = ref(0);

const currentOption = computed(() => {
  return options[index.value];
})
const hasNextOption = computed(() => {
  return !!options[index.value + 1];
})

const handleSelect = async () => {
  if (!formData.value.question?.[index.value]?.length) {
    ElNotification({
      title: '请选择选项',
      type: 'warning'
    })
    return;
  }
  if (hasNextOption.value) {
    index.value++;
    return;
  }
  loading.value = true;
  let res = await HttpManager.updateUserInterest({
    id: userId.value,
    interest: formData.value.question
  });
  loading.value = false;
  if (res.code === 1) {
    ElNotification({
      title: '设置兴趣成功',
      type: 'success'
    })
    setTimeout(() => {
      router.push({
        path: HOME,
      })
    }, 500)
  }
}

onMounted(() => {
  if (user.value?.interest)
    router.push({
      path: HOME,
    });
})

const options = [
  {
    title: '你喜欢男歌手还是女歌手(多选)',
    questions: [
      "男",
      "女",
    ]
  },
  {
    title: '你喜欢什么风格的歌曲(多选)',
    questions: [
      "Pop（流行）",
      "Rock（摇滚）",
      "Folk（民谣）",
      "Electronic（电子）",
      "Jazz（爵士）",
      "Absolute Music（纯音乐）",
      "Rap（说唱）",
      "Metal（金属）",
      "World Music（世界音乐）",
      "New Age（新世纪）",
      "Classical（古典）",
      "Indie（独立）",
      "Ambient Music（氛围音乐）",
    ]
  },

]
</script>
<style scoped lang="scss">
.middle-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  //background: #fff;
  height: 100%;
  padding: 10px;
}

.questions {
  padding-top: 20px;
}

.el-checkbox {
  margin-bottom: 15px;
}

.questions-footer {
  text-align: right;
}

</style>
