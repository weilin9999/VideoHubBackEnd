<template>
    <div class="file__main__box">

        <!-- file header title -->
        <div class="file__title__box"><p class="file__name">文件名称</p><p class="file__inner__size">文件大小</p><p class="file__date__time">修改时间</p><p v-if="upBox" class="file__upload__box">上传进度</p><p style="margin-right:5px;" class="file__control__box">操作</p></div>

        <!-- file empty -->
        <div class="file__empty__box" v-if="itemData[0]==null">
            <span class="bigBox iconfont icon-box-empty"></span>
            <p>空文件</p>
        </div>

        <!-- file entity -->
        <div :class="item.progress ? 'file__inner__boz__up':'file__inner__boz'" v-for="(item,index) in itemData" :key="index">
            <div class="file__top__boxz">
                <div class="file__inner__header">
                    <span :class="'file_icon iconfont '+retFileIcon(item.name)"></span>
                    <p :title="item.name" >{{item.name}}</p>
                </div>
                <div class="file__inner__size">
                    <p>{{retSize(item.size)}}</p>
                </div>
                <div class="file__date__time">
                    <p>{{retTimeDate(item.date)}}</p>
                </div>
                <div v-if="upBox" class="file__upload__box">
                    <p v-if="!item.progress">待上传</p>
                    <p v-else-if="item.percent < 100">{{item.percent}}</p>
                    <p v-else style="color: #67c23a;" class="iconfont icon-lijiqueren">上传完成</p>
                </div>
                <div class="file__control__box">
                    <VH-Confirm v-if="isWaste" color="#e6a32c" icon="iconfont icon-chexiao" style="margin-right: 10px;" width="40px" height="25px" desc="是否恢复该文件" @confirm="recoveryFile(item.name)">
                        <VH-Button :disabled="item.progress || disDelete" width="40px" height="25px" button-type="success">恢复</VH-Button>
                    </VH-Confirm>
                    <VH-Confirm :disabled="item.progress || disDelete" width="40px" height="25px" desc="是否删除该文件" @confirm="deleteFile(index,item.name)">
                        <VH-Button :disabled="item.progress || disDelete" width="40px" height="25px" button-type="danger">删除</VH-Button>
                    </VH-Confirm>
                </div>
            </div>
            <div v-if="item.progress && item.percent < 100" class="file__bottom__boxz">
                <progress class="file__progress" max="100" :value="item.percent"></progress>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'VH-FileBox',
    data () {
        return {
            
        }
    },
    props:{
        upBox:{
            type:Boolean,
            default: false
        },
        itemData:{
            type:Array
        },
        disDelete:{
            type:Boolean,
            default: false
        },
        isWaste:{
            type:Boolean,
            default: false
        }
    },
    methods:{
        retTimeDate(e){
            return new Date(e).toLocaleString().replace(/\//g,"-")
        },
        retSize(e){
            let sit = 0
            let temp = (e / 1073741824)
            if(temp < 1){
                temp = (e / 1048576)
                sit ++
            }
            if(temp < 1){
                temp = (e / 1024)
                sit ++
            }
            if(sit == 0){
                let res = Math.floor(temp * 100) / 100
                return res + ' GB'
            }else if(sit == 1){
                let res = Math.floor(temp * 100) / 100
                return res + ' MB'
            }else if(sit == 2){
                let res = Math.floor(temp * 100) / 100
                return res + ' KB'
            }
        },
        deleteFile(e,name){
            if(this.upBox){
                this.$emit('delete',e)
            }else{
                this.$emit('delete',name)
            }
        },
        recoveryFile(name){
            this.$emit('recovery',name)
        },
        retFileIcon(e){
            let suffix =e.substring(e.lastIndexOf(".")+1);
            if(suffix=='mp4'){
                return 'icon-shipin1'
            }else if(suffix=='jpg' || suffix=='jpeg' || suffix=='png'){
                return 'icon-tuxiang'
            }else{
                return 'icon-wendang'
            }
        }
    },
})
</script>

<style  scoped>
*{
    margin: 0;
    padding: 0;
}
.file__main__box{
    width: 100%;
    height: auto;
    background-color: #fff;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    flex-direction: column;
}
.file__title__box{
    width: 100%;
    height: 45px;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    color: #718096;
    font-weight: bold;
    font-size: 15px;
    align-items: center;
}
.file__name{
    width: 100%; 
}
.file__inner__boz{
    width: 100%;
    height: 45px;
    display: flex;
    flex-direction: column;
    transition: 0.3s all ease-in-out;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 10px;
    margin-bottom: 5px;
    user-select: none;
    justify-content: center;
}
.file__inner__boz:hover{
    transform: scale(1.01);
    background-color: rgba(132, 133, 141, 0.18);
}
.file__inner__boz__up{
    width: 100%;
    height: 65px;
    display: flex;
    flex-direction: column;
    transition: 0.3s all ease-in-out;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 10px;
    margin-bottom: 5px;
    user-select: none;
    justify-content: center;
}
.file__inner__boz__up:hover{
    transform: scale(1.01);
    background-color: rgba(132, 133, 141, 0.18);
}
.file__top__boxz{
    width: 100%;
    display: flex;
    align-items: center;
}
.file__inner__header{
    width: 100%;
    display: flex;
    align-items: center;
}
.file__inner__header p{
    max-width: 722px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden; 
}
.file_icon{
    font-size: 25px;
    color: #409EFF;
    padding-right: 10px;
}
.file__inner__size{
    width: 13.33%;
    text-align: right;
}
.file__date__time{
    width: 33.33%;
    text-align: right;
}
.file__upload__box{
    width: 22.33%;
    text-align: right;
}
.file__control__box{
    width: 20.33%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.file__bottom__boxz{
    padding-top: 10px;
    box-sizing: border-box;
    height: 25px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
}
.file__progress{
    width: 100%;
    height: 5px;
    border-radius: 0.2rem;
    transition: all .3s;
}
 /* 表示总长度背景色 */
.file__progress::-webkit-progress-bar{     
    background-color: #ebeef5;
    border-radius: 0.2rem;
}
 /* 表示已完成进度背景色 */
.file__progress::-webkit-progress-value{
    background: #409eff;
    border-radius: 0.2rem; 
}
.file__empty__box{
    width: 100%;
    height: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;
    justify-content: center;
}
.bigBox{
    font-size: 200px;
    color: #e5e7e9;
}
.file__empty__box p{
    color: #909399;
}
</style>
