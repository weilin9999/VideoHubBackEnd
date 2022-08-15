<template>
    <div class="vh-menu-box">
        <div :style="'width:'+data.openWidth+'px;'" class="vh-menu-main-box">
            <div class="top-title">
                <div class="text-box" v-if="data.showDetailBox">
                    <p class="name-bule">Vide<span class="iconfont icon-shipin"></span></p><p class="name-ye">Hub 后台管理</p>
                </div>
                <span :class="data.showDetailBox ? 'tab-close iconfont icon-caidanshouqi': 'tab-close iconfont icon-caidanzhankai'" @click="openClose" :title="data.showDetailBox ? '收起':'展开'"></span>
            </div>
            <ul class="list-box">
                <li v-for="(item,index) in props.listData" :key="index" :class="data.cSelect == index ? 'menu-list active':'menu-list'" @click="goRoute(item.path,index)">
                    <div :style="!data.showDetailBox ? 'margin-left: 5px;':''" class="menu-inner-box">
                        <span :class="'menu-icon '+item.icon"></span> <p v-if="data.showDetailBox">{{item.name}}</p> 
                    </div>
                    <span v-if="data.showDetailBox" class="iconfont icon-xiangyou2"></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue';
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';

const router = useRouter();
const route = useRoute();

const data = reactive({
    showDetailBox: true,
    openWidth: 270,
    cSelect:0
});
const props = defineProps({
    listData: {
        type: Array
    }
});

const emit = defineEmits(['change']);

const routePath = route.path
let tempIndex = -1;
props.listData.filter(function(value,index){
    if(value.path==routePath){
        tempIndex = index
    }
})
data.cSelect = tempIndex;

onBeforeRouteUpdate((to: any) => {
    const routePath = to.path
    let tempIndex = -1;
    props.listData.filter(function(value,index){
        if(value.path==routePath){
            tempIndex = index
        }
    })
    data.cSelect = tempIndex
});

function openClose(){
    if(data.showDetailBox){
        data.showDetailBox=false
        data.openWidth=70
    }else{
        data.showDetailBox=true
        data.openWidth=270
    }
}
function goRoute(e : any,c : number){
    data.cSelect = c
    emit('change',props.listData[c])
    router.push({ path: e })
}
</script>

<style  scoped>
*{
    margin: 0;
    padding: 0;
}
.vh-menu-box{
    width: auto;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin: 16px 0 16px 16px;
    animation: showBox 0.3s ease-out;
}

@keyframes showBox {
    0%{
        opacity: 0;
        transform: translateX(-5%);
        
    }
    100%{
        opacity: 1;
        transform: translateX(0%);
    }
}

.vh-menu-box .vh-menu-main-box{
    height: 95%;
    background-color: var(--menu-box-background);
    user-select: none;
    transition: width .3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 6px;
    overflow: hidden;
}
.vh-menu-box .vh-menu-main-box .top-title{
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
}
.vh-menu-box .vh-menu-main-box .top-title .text-box{
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    width: 201px;
}
.vh-menu-box .vh-menu-main-box .top-title .text-box .name-bule{
    padding: 3px;
    border-radius: 4px;
    background-color: var(--menu-box-bule-background);
    color: var(--menu-box-vh-color);
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.vh-menu-box .vh-menu-main-box .top-title .text-box .name-bule span{
    padding: 1px 1px 0;
}
.vh-menu-box .vh-menu-main-box .top-title .text-box .name-ye{
    margin-left: 3px;
    color: var(--menu-box-bule-background);
    width: 200px;
}
.vh-menu-box .vh-menu-main-box .top-title .text-box .name-ye-ye{
    color: var(--menu-box-bule-background);
    margin-left: 5px;
    width: 80px;
}
.vh-menu-box .vh-menu-main-box .top-title .tab-close{
    color: var(--menu-box-bule-background);
    font-size: 25px;
    cursor: pointer;
}
.tab-close:hover{
    color: var(--menu-box-bule-background-hover);
}
.vh-menu-box .vh-menu-main-box .list-box{
    width: 100%;
    height: calc(100% - 65px);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    color: var(--menu-box-list);
}
.vh-menu-box .vh-menu-main-box .list-box .menu-list{
    width: 100%;
    height: 50px;
    background-color: fff;
    list-style-type: none;
    display: flex;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 6px;
    font-size: 17px;
    cursor: pointer;
    margin-bottom: 10px;
}
.vh-menu-box .vh-menu-main-box .list-box .menu-list:hover{
    box-shadow: 0 5px 12px var(--menu-box-list-shadow);
    transform: scale(1.05);
    color: var(--menu-box-list-hover);
}
.vh-menu-box .vh-menu-main-box .list-box .menu-list .menu-inner-box{
    width: 175px;
    width: 100%;
    display: flex;
    align-items: center;
}
.vh-menu-box .vh-menu-main-box .list-box .menu-list .menu-inner-box p{
    min-width: 175px;
    font-size: 17px;
    transition: border-color .3s,background-color .3s,color .3s;
}
.vh-menu-box .vh-menu-main-box .list-box .menu-list .menu-icon{
    font-size: 20px;
    margin-right: 10px;
}
.active{
    color: var(--menu-box-active);
}
</style>
