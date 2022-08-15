<template>
    <div class="header-box">
        <div class="header-inner-box">
            <div class="history-list-box">
                <div class="hide-box-somly" v-if="data.hisData[0] != null" :style="'transform: translateX('+data.tabSite+'px);'"></div>
                <div class="history-btn-box" v-for="(item,index) in data.hisData">
                    <p @click="goSite(index,item.path)">{{item.name}}</p>
                    <span v-if="data.hisData[1] != null" class="iconfont icon-guanbi" @click="colseSite(index)"></span>
                </div>
            </div>
            <VH-UserInfo class="col-right-ot" :avatar="data.avatar" >
                <div class="username">{{data.username}}</div>
                <a  class="user-btn" @click="loginOut"><div class="user-btn-inner"><span class="col-right-6 iconfont icon-tuichu"></span><p>退出登录</p></div><span class="iconfont icon-youxiang"></span></a>
            </VH-UserInfo>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import cookies from 'vue-cookies';
import config from '@/api/config';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const data = reactive({
    indexSite:0,
    tabSite:0,
    hisData: [],
    avatar:'',
    username:'管理员'
});
const props = defineProps({
    listData: {
        type: Array
    }
});


//获取当前的路由位置插入到History中
const routePath = route.path
let temp = null;
props.listData.filter(function(value,index){
    if(value.path==routePath){
        temp = value
        return
    }
})
data.hisData.push(temp)

//个人信息赋值
const origin = cookies.get('origin');
data.username = origin.username;
data.avatar = config.baseUrl.url +'/file/avatar/'+origin.avatar;

function goSite(e : number){
    const site = ((e-1) * 10) + (e * 100) + 7
    data.tabSite= site
    data.indexSite=e
    router.push({ path: data.hisData[e].path })
}

function pushHistory(imData : any){
    let tempIndex = -1
    data.hisData.filter(function(value,index){
        if(value==imData){
            tempIndex = index
        }
    })
    if(tempIndex != -1){
        goSite(tempIndex)
    }else{
        data.hisData.push(imData)
        goSite(data.hisData.length-1)
    }
}

function colseSite(index : number){
    if(index==data.indexSite){
        data.hisData.splice(index,1)
        goSite(data.hisData.length-1)
    }else{
        let tempIndex = 0
        let tempData = data.hisData[data.indexSite]
        data.hisData.splice(index,1)
        data.hisData.filter((value,index)=>{
            if(value==tempData){
                tempIndex = index
            }
        })
        data.indexSite = tempIndex;
        const site = (tempIndex * 10) + (tempIndex * 100)
        data.tabSite= site
    }
}

function loginOut(){
    cookies.remove('origin');
    router.push({ path: 'login' });
}

defineExpose({pushHistory})

</script>

<style  scoped>
*{
    margin: 0;
    padding: 0;
}
.header-box{
    margin-top: 22px;
    width: 100%;
    height: 65px;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 22px;
}
.header-inner-box{
    width: 98%;
    height: 65px;
    background-color: var(--header-background);
    border-radius: 4px;
    box-shadow: 0 5px 12px var(--header-shadow);
    animation: showBox 0.3s ease-out;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 10px;
}
.col-right-ot{
    margin-right: 0px;
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
.username{
    margin-left: 40px;
    padding: 30px 0;
}
.user-btn{
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
    background-color: transparent;
    margin-bottom: 2px;
    padding: 10px 14px;
    border-radius: 8px;
    color: var(--header-use-btn);
    font-size: 14px;
    cursor: pointer;
    transition: background-color .3s;
    user-select: none;
}
.user-btn:hover{
    background-color: var(--header-use-btn-hover);
}
.user-btn .user-btn-inner{
    display: flex;
    align-items: center;
}
.col-right-6{
    margin-right: 16px;
}
.history-list-box{
    width: 100%;
    height: 65px;
    display: flex;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;
}
.history-list-box .history-btn-box{
    min-width: 100px;
    width: 100px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    margin-right: 10px;
    border-radius: 6px;
    z-index: 2;
    color: var(--header-list-btn);
}
.history-list-box .history-btn-box:hover{
    color: var(--header-list-btn-hover);
}
.history-list-box .history-btn-box p{
    cursor: pointer;
}
.history-list-box .history-btn-box span{
    margin-left: 5px;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 10px;
    font-weight: 100;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;
}
.history-list-box .history-btn-box span:hover{
    background-color: var(--danger-color);
    color: var(--header-background);
}
.hide-box-somly{
    position: absolute;
    z-index: 1;
    width: 100px;
    height: 45px;
    border-radius: 6px;
    background-color: var(--header-background);
    box-shadow: 0px 0px 12px var(--header-somly);
    transition: all .2s;
    -webkit-transition: all .2s;
}
</style>
