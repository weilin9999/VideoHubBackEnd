<template>
    <div class="vh-menu-box">
        <div :style="'width:'+openWidth+'px;'" class="vh-menu-main-box">
            <div class="top-title">
                <div class="text-box" v-if="showDetailBox">
                    <p class="name-bule">Vide<span class="iconfont icon-shipin"></span></p><p class="name-ye">Hub 后台管理</p>
                </div>
                <span :class="showDetailBox ? 'tab-close iconfont icon-caidanshouqi': 'tab-close iconfont icon-caidanzhankai'" @click="openClose" :title="showDetailBox ? '收起':'展开'"></span>
            </div>
            <ul class="list-box">
                <li v-for="(item,index) in listData" :key="index" :class="cSelect == index ? 'menu-list active':'menu-list'" @click="goRoute(item.path,index)">
                    <div :style="!showDetailBox ? 'margin-left: 5px;':''" class="menu-inner-box">
                        <span :class="'menu-icon '+item.icon"></span> <p v-if="showDetailBox">{{item.name}}</p> 
                    </div>
                    <span v-if="showDetailBox" class="iconfont icon-xiangyou2"></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'VH-Menu',
    data () {
        return {
            showDetailBox: true,
            openWidth: 270,
            cSelect:0,
        }
    },
    props:{
        listData: {
            type: Array
        }
    },
    created() {
        const routePath = this.$route.path
        let tempIndex = -1;
        this.listData.filter(function(value,index){
            if(value.path==routePath){
                tempIndex = index
            }
        })
        this.cSelect = tempIndex
    },
    watch: {
        $route:{
        handler(to,from){
            const routePath = to.path
            let tempIndex = -1;
            this.listData.filter(function(value,index){
                if(value.path==routePath){
                    tempIndex = index
                }
            })
            this.cSelect = tempIndex
        }
      }
    },
    methods:{
        openClose(){
            if(this.showDetailBox){
                this.showDetailBox=false
                this.openWidth=70
            }else{
                this.showDetailBox=true
                this.openWidth=270
            }
        },
        goRoute(e,c){
            this.cSelect = c
            this.$emit('change',this.listData[c])
            this.$router.push({ path: e })
        },
    },
})
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
    background-color: #fff;
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
    background-color: #03A9F4;
    color: #fff;
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
    color: #03A9F4;
    width: 200px;
}
.vh-menu-box .vh-menu-main-box .top-title .text-box .name-ye-ye{
    color: #03A9F4;
    margin-left: 5px;
    width: 80px;
}
.vh-menu-box .vh-menu-main-box .top-title .tab-close{
    color: #03A9F4;
    font-size: 25px;
    cursor: pointer;
}
.tab-close:hover{
    color: #a0cfff;
}
.vh-menu-box .vh-menu-main-box .list-box{
    width: 100%;
    height: calc(100% - 65px);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    color: #303133;
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
    box-shadow: 0 5px 12px rgb(0 36 153 / 10%);
    transform: scale(1.05);
    color: #409eff;
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
    color: #03A9F4;
}
</style>
