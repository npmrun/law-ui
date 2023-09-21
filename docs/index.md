---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
    name: 'LAW-UI'
    text: 'antv plus'
    tagline: 基于ant-design-vue，构建符合业务的组件
    actions:
        - theme: brand
          text: 开始
          link: /start/
        - theme: alt
          text: Github
          link: /

features:
    - title: 结构
      details: 项目基于element-plus结构
    - title: 体验
      details: 增强antv使用体验
    - title: 业务
      details: 符合国内业务场景
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
        --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
    }
</style>
