<template>
  <div id='app'>
    <router-view/>
  </div>
</template>
<script setup>
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();
if (sessionStorage.getItem("dataStore")) {
  proxy.$store.replaceState(
      Object.assign(
          {},
          proxy.$store.state,
          JSON.parse(sessionStorage.getItem("dataStore"))
      )
  );
}

// 页面刷新时将 vuex 里的信息保存到 sessionStorage
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("dataStore", JSON.stringify(proxy.$store.state));
});
</script>