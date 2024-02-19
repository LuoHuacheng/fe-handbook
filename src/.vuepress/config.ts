import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/fe-handbook/",

  lang: "zh-CN",
  title: "HC的前端手册",
  description: "HC的前端手册",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
