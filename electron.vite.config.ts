import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    server: {
      proxy: {
        "/api": {
          target: "http://bimgis-boot-backend.dev.192.167.5.39.sslip.io", // 替换为你的实际API地址
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@renderer/assets/styles/mixin.scss";',
        },
      },
    },
    plugins: [vue()],
  },
});
