<template>
    <div class="dialog-box" :style="'position: '+position+';'">
        <div :class="closeBox ? 'black-box dialog____anmin___colse__back__bord':'black-box dialog____anmin___come__back__bord'"  :style="'position: '+position+';'" @click="closeBg"></div>
        <div :style="'width:'+width+'px;height:'+height+'px;'" :class="closeBox ? 'dialog dialog____anmin___colse':'dialog dialog____anmin___come'">
            <div class="dialog__box___title">
                <p>{{titleText}}</p>
                <span class="closebtn iconfont icon-guanbi" @click="close"></span>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'VH-Dialog',
    data () {
        return {
            closeBox: false
        }
    },
    props:{
        width:{
			type: String,
			default: '800' 
		},
        height:{
			type: String,
			default: '460' 
		},
        position:{
            type: String,
			default: 'fixed'
        },
        bgClose:{
            type: Boolean,
			default: true
        },
        titleText:{
            type: String,
			default: '标题'
        }
    },
    methods:{
        close(){
            setTimeout(()=>{this.closeBox = true},50)
			setTimeout(()=>{this.$emit('close',true)},250)
        },
        closeBg(){
            if(this.bgClose){
                setTimeout(()=>{this.closeBox = true},50)
			    setTimeout(()=>{this.$emit('close',true)},250)
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
.dialog-box{
    width: 100%;
    height: 100%;
    z-index: 200;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
}
.black-box{
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 201;
}
.dialog-box .dialog{
    background-color: #fff;
    border-radius: 4px;
    z-index: 202;
}
.closebtn{
    float: right;
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    user-select: none;
    cursor: pointer;
}
.closebtn:hover{
    color: #409eff;
}
.dialog__box___title{
    width: 100%;
    height: 35px;
    border-bottom: 1px solid #E3E5E7;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.dialog__box___title p{
    margin-left: 15px;
    font-weight: 400;
    font-size: 14px;
}
.dialog____anmin___come{
    animation: openDiv 0.2s ease-in;
}
.dialog____anmin___come__back__bord{
    animation: openDivBg 0.2s ease-in;
}
.dialog____anmin___colse{
    animation: disDiv 0.3s ease-out;
}
.dialog____anmin___colse__back__bord{
    animation: disDivBg 0.3s ease-out;
}
@keyframes openDiv {
    0%{
        opacity: 0;
        transform: translateY(-2%);
    }
    50%{
        opacity: 0.5;
        transform: translateY(-1%);
    }
    100%{
        opacity: 1;
        transform: translateY(0%);
    }
}
@keyframes openDivBg {
    0%{
        opacity: 0;
    }
    50%{
        opacity: 0.5;
    }
    100%{
        opacity: 1;
    }
}
@keyframes disDiv {
    0%{
        opacity: 1;
        transform: translateY(0%);
        
    }
    50%{
        opacity: 0.5;
        transform: translateY(-1%);
    }
    100%{
        opacity: 0;
        transform: translateY(-2%);
    }
}
@keyframes disDivBg {
    0%{
        opacity: 1;
    }
    50%{
        opacity: 0.5;
    }
    100%{
        opacity: 0;
    }
}
</style>
