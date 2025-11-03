<script lang="ts" setup>
import { defineProps, computed } from "vue";
// props
interface PropsType {
  online: boolean;
}
const props = defineProps<PropsType>();
// 关闭
const closeWin = () => {
  window.api.closeWindow();
};
// 缩小
const minWin = () => {
  window.api.minWindow();
};

// 连接状态名称
const connectStateName = computed(() => {
  return props.online ? "设备已连接" : "设备未连接";
});
// 连接状态class
const connectStateClass = computed(() => {
  return props.online ? "connected" : "unconnected";
});
</script>

<template>
  <div class="top-header">
    <div class="left drag-header">
      <img class="logo-img" src="~@renderer/assets/electron.svg" alt="" />
      <span class="system-name">Electron</span>
      <div class="status" :class="connectStateClass">
        <span class="img" :class="connectStateClass"></span>
        <span class="word">{{ connectStateName }}</span>
      </div>
    </div>
    <div class="right">
      <div class="min" @click="minWin">
        <span></span>
      </div>
      <div class="close" @click="closeWin">
        <span></span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.drag-header {
  -webkit-app-region: drag;
}
.top-header {
  width: 100%;
  height: 56px;
  background-image: url("@renderer/assets/header-background.png");
  background-size: cover;
  display: flex;
  justify-content: space-between;
  margin-bottom: -11px;
  .left {
    margin-left: 10px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    flex: 1;
    overflow: hidden;
    .logo-img {
      width: 64px;
      height: 26px;
    }
    .system-name {
      line-height: 40px;
      margin-left: 10px;
      font-family: "DingTalkJinBuTi";
      font-size: 22px;
      color: #ffffff;
    }
    .system-version {
      margin-left: 5px;
      font-family: "DingTalkJinBuTi";
      font-size: 14px;
      color: #ffffff;
    }
  }
  .right {
    display: flex;
  }
  .line {
    font-size: 12px;
    color: #fff;
    display: inline-block;
    padding: 1px 3px;
    border-radius: 4px;
    margin: 11px;
  }
  .unconnected {
    background-color: #ff8d13;
  }
  .connected {
    background-color: #04cea1;
  }
  .status {
    margin-left: 10px;
    padding: 0 12px;
    border-radius: 11px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    .img {
      display: inline-block;
      background-size: cover;
    }
    .unconnected {
      width: 16px;
      height: 15px;
      background: url("@renderer/assets/unconnected.png");
    }
    .connected {
      width: 16px;
      height: 15px;
      background: url("@renderer/assets/connected.png");
    }
    .word {
      margin-left: 5px;
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #ffffff;
    }
  }
  .success-line {
    background-color: #05b75d;
    span {
      width: 14px;
      height: 14px;
      background: url("@renderer/assets/success-kb.png");
      float: left;
      margin: 1px;
    }
  }
  .close {
    width: 45px;
    height: 45px;
    span {
      display: inline-block;
      width: 15px;
      height: 15px;
      margin: 15px;
      background: url("@renderer/assets/close.png");
    }
    &:hover {
      border-top-right-radius: 10px;
      cursor: pointer;
      background: rgba(0, 0, 0, 0.2);
    }
  }
  .min {
    width: 45px;
    height: 45px;
    span {
      display: inline-block;
      width: 17px;
      height: 3px;
      margin: 21px 13px;
      background: url("@renderer/assets/min.png");
    }
    &:hover {
      cursor: pointer;
      background: rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
