<template>
    <div class="header-box">
        <div class="header-inner-box">
            <div class="history-list-box">
                <div class="hide-box-somly" v-if="hisData[0] != null" :style="'transform: translateX('+tabSite+'px);'"></div>
                <div class="history-btn-box" v-for="(item,index) in hisData">
                    <p @click="goSite(index,item.path)">{{item.name}}</p>
                    <span v-if="hisData[1] != null" class="iconfont icon-guanbi" @click="colseSite(index)"></span>
                </div>
            </div>
            <VH-UserInfo class="col-right-ot" :avatar="avatar" >
                <div class="username">{{username}}</div>
                <a  class="user-btn" @click="loginOut"><div class="user-btn-inner"><span class="col-right-6 iconfont icon-tuichu"></span><p>退出登录</p></div><span class="iconfont icon-youxiang"></span></a>
            </VH-UserInfo>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import cookies from 'vue-cookies';
import config from '@/api/config';
export default defineComponent({
    name: 'VH-Header',
    data () {
        return {
            indexEx:0,
            tabSite:0,
            hisData: [],
            avatar:'',
            username:'管理员',
        }
    },
    props:{
        listData: {
            type: Array
        }
    },
    mounted(){
        setTimeout(() => {
            const routePath = this.$route.path
            let temp = null;
            this.listData.filter(function(value,index){
                if(value.path==routePath){
                    temp = value
                    return
                }
            })
            this.hisData.push(temp)
        }, 1000);
    },
    created() {
		const origin = cookies.get('origin');
		this.username = origin.username;
		this.avatar = config.baseUrl.url +'/file/avatar/'+origin.avatar;
	},
    methods:{
        goSite(e){
            const site = ((e-1) * 10) + (e * 100) + 7
            this.tabSite= site
            this.indexEx=e
            this.$router.push({ path: this.hisData[e].path })
        },
        pushHistory(data){
            let tempIndex = -1
            this.hisData.filter(function(value,index){
                if(value==data){
                    tempIndex = index
                }
            })
            if(tempIndex != -1){
                this.goSite(tempIndex)
            }else{
                this.hisData.push(data)
                this.goSite(this.hisData.length-1)
            }
        },
        colseSite(index){
            if(index==this.indexEx){
                this.hisData.splice(index,1)
                this.goSite(this.hisData.length-1)
            }else{
                let tempIndex = 0
                let tempData = this.hisData[this.indexEx]
                this.hisData.splice(index,1)
                this.hisData.filter((value,index)=>{
                    if(value==tempData){
                        tempIndex = index
                    }
                })
                const site = (tempIndex * 10) + (tempIndex * 100)
                this.tabSite= site
            }
        },
        loginOut(){
            cookies.remove('origin');
            this.$router.push({ path: 'login' })
        },
    },
})
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
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 5px 12px rgb(0 36 153 / 10%);
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
    color: #61666D;
    font-size: 14px;
    cursor: pointer;
    transition: background-color .3s;
    user-select: none;
}
.user-btn:hover{
    background-color: #E3E5E7;
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
    color: #6c757d;
}
.history-list-box .history-btn-box:hover{
    color: #000;
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
    background-color: #f56c6c;
    color: #fff;
}
.hide-box-somly{
    position: absolute;
    z-index: 1;
    width: 100px;
    height: 45px;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
    transition: all .2s;
    -webkit-transition: all .2s;
}
</style>
