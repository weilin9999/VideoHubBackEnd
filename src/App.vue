<template>
  <div class="app-main-box">
    <div class="inner-box-login">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import '@/components/banner.ts'
import { defineComponent } from 'vue'

export default defineComponent({
    setup(){
      
    },
    components:{
      
    },
    created(){
      
    },
    mounted(){
      
    },
    watch:{
      
    },
    methods: {
      
    }
})
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
  -webkit-box-shadow: inset006px rgba(0,0,0,0.5);
  border-radius:3px;
}

::-webkit-scrollbar-thumb {
  background:#999;
  border-radius: 7px;
  outline: 2px solid #fff;
  outline-offset: -2px;
  border: 2px solid #fff;
  -webkit-box-shadow: inset006px rgba(0,0,0,0.5);
}
::-webkit-scrollbar-thumb:hover{
  background:#b8b8b8;
}
</style>
