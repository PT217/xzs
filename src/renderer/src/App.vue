<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus'
import localeZH from 'element-plus/es/locale/lang/zh-cn'
const locale = localeZH
</script>

<template>
  <el-config-provider :locale="locale">
    <div id="nav">
      <router-view />
    </div>
  </el-config-provider>
</template>

<style>
#app {
  font-family: 'MicrosoftYaHei', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100vh;
}
body {
  margin: 0;
}
#nav {
  height: 100%;
}
@font-face {
  font-family: 'DingTalkJinBuTi';
  src: url('@renderer/assets/font/DingTalkJinBuTi.ttf');
}
</style>
