<template>
  <div class="app-main-box">
    <div class="inner-box">
      <VH-Menu :list-data="menu" @change="changeRouter"></VH-Menu>
      <div class="right-box">
        <VH-Header ref="header" :list-data="menu"></VH-Header>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import '@/components/banner.ts'
import appStore from '@/store';
import { ref } from 'vue'
import VHMenu from '@/components/VH-Menu/VH-Menu.vue';
import VHHeader from '@/components/VH-Header/VH-Header.vue';

const store = appStore.Application;

const { menu } = store;

const header = ref();

function changeRouter(e : any){
  header.value.pushHistory(e);
}
</script>

<style scoped>
.app-main-box{
  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
}
.inner-box{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.inner-box-login{
  width: 100%;
  height: 100%;
}
.right-box{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  position: relative;
}
</style>

<style>
@import '@/assets/iconfont/iconfont.css';
@import '@/assets/css/root.css';
body,html,#app{
  font-family: var(--font-family-normal);
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
}
::-webkit-scrollbar {
  width:12px;
  height: 12px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset006px var(--admin-app-scrollbar-shadow);
  border-radius:3px;
}

::-webkit-scrollbar-thumb {
  background: var(--admin-app-scrollbar-thumb-background);
  border-radius: 7px;
  outline: 2px solid var(--admin-app-scrollbar-thumb-border);
  outline-offset: -2px;
  border: 2px solid var(--admin-app-scrollbar-thumb-border);
  -webkit-box-shadow: inset006px var(--admin-app-scrollbar-shadow);
}
::-webkit-scrollbar-thumb:hover{
  background:var(--admin-app-scrollbar-thumb-hover);
}
</style>
