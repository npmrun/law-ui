---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
    name: 'LAW-UI'
    text: 'antv3.x plus'
    tagline: 基于ant-design-vue 3.x，构建符合业务的组件
    image:
        src: /logo.png
        alt: LAW-UI
    actions:
        - theme: brand
          text: 开始
          link: /0.home
        - theme: alt
          text: 组件
          link: /1.components/0.nav
        - theme: alt
          text: Hooks
          link: /2.hooks/0.nav
        - theme: alt
          text: Github
          link: https://github.com/npmrun/law-ui

features:
    - title: 体验
      details: 增强antv3.x使用体验
    - title: 组件
      details: 符合国内业务场景
    - title: Hook
      details: 通用Hook,简化页面逻辑
---

<style>
    .VPFeatures.VPHomeFeatures .items .item{
        width: 100%;
    }
    @media (min-width: 640px){
        .VPFeatures.VPHomeFeatures .items .item{
            width: calc(100% / 2);
        }
    }
    @media (min-width: 768px){
        .VPFeatures.VPHomeFeatures .items .item{
            width: calc(100% / 3);
        }
    }

    :root {
        --vp-home-hero-name-color: transparent;
        --vp-home-hero-name-background: linear-gradient(120deg, #bd34fe, #41d1ff);

        --vp-home-hero-image-background-image: url(/favicon.svg);
        --vp-home-hero-image-filter: blur(40px)
    }
    @media (min-width: 640px) {
        :root {
            --vp-home-hero-image-filter: blur(56px)
        }
    }

    @media (min-width: 960px) {
        :root {
            --vp-home-hero-image-filter: blur(72px)
        }
    }
</style>
