<script lang="ts" setup>
import Header from "@renderer/components/header.vue";

import { onMounted, ref } from "vue";
import * as THREE from "three";

const container = ref<any>(null);

onMounted(() => {
  // 场景
  const scene = new THREE.Scene();

  // 相机
  const camera = new THREE.PerspectiveCamera(
    75,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // 渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  container.value.appendChild(renderer.domElement);

  // 几何体
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // 动画
  function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();

  // 自适应窗口变化
  window.addEventListener("resize", () => {
    camera.aspect = container.value.clientWidth / container.value.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  });
});
</script>

<template>
  <div class="index-page">
    <Header :online="true" />
    <div class="main-container">
      <div ref="container" class="canvas-container"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.index-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  .main-container {
    flex: 1;
    overflow: hidden;
    background-color: #ffffff;
    background-image: url("@renderer/assets/main-background.png");
    background-size: cover;
    .canvas-container {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      background-color: #000;
    }
  }
}
</style>
