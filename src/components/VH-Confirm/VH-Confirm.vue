<template>
    <div ref="confirm" :style="'width: '+width+';height: '+height+';'" class="vh-confirm-box" @click="clickConfirm">
        <slot></slot>
        <teleport to="body">
            <div ref="childconfirm" v-if="data.showIs" :style="'transform: translate('+data.posLeft+'px, '+data.posTop+'px);position: absolute;z-index: 999;margin: 0px;'" class="confirm-inner-box">
                <span class="confirm__icon___up"></span>
                <div :class="data.anminStart ? 'confirm___inner__sure__box confirm____anmin___come':'confirm___inner__sure__box confirm____anmin___colse'">
                    <div class="confirm__inner__box">
                        <span :style="'color:'+color+';'" :class="icon+' confirm__col-right'"></span>
                        <p>{{desc}}</p>
                    </div>
                    <div class="confirm___bottom___box">
                        <VH-Button width="50px" height="25px" button-type="primary" style="font-size:12px" @click="confirmClick">确认</VH-Button>
                        <VH-Button width="50px" height="25px" style="font-size:12px;margin-right: 5px;" @click="closeBox">取消</VH-Button>
                    </div>
                </div>
            </div>
        </teleport>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, nextTick } from 'vue'
const data = reactive({
    anminStart:true,
    showIs:false,
    posLeft:0,
    posTop:0
});

const confirm = ref();
const childconfirm = ref();

document.addEventListener('click', (e) => {
    if(confirm.value){
        if (!confirm.value.contains(e.target)){
            closeBox()
        }
    }
}, false)
window.addEventListener('scroll', handleScroll)

const props = defineProps({
    width:{
        type:String,
        default: 'auto'
    },
    height:{
        type:String,
        default: 'auto'
    },
    desc:{
        type:String,
        default: '是否删除该条数据 ？'
    },
    icon:{
        type:String,
        default: 'iconfont icon-cs-jg-1'
    },
    color:{
        type:String,
        default: '#f56c6c'
    },
    disabled:{
        type:Boolean,
        default: false
    },
    offset:{
        type:Number,
        default:0
    }
});
const emit = defineEmits(['confirm']);

function clickConfirm(){
    if(!props.disabled){
        data.showIs=true
        data.anminStart=true
        nextTick(() => {
            let pos = confirm.value.getBoundingClientRect()
            let posChild = childconfirm.value.getBoundingClientRect()
            data.posLeft= (pos.left - (posChild.width - pos.width))
            data.posTop= pos.top + props.offset
        });
    }
}
function closeBox(){
    setTimeout(()=>{data.anminStart = false},50)
    setTimeout(()=>{data.showIs = false},250)
}
function confirmClick(){
    emit('confirm','yes')
    closeBox()
}
function handleScroll(){
    console.log('--- handle listener is install ---')
}
</script>

<style  scoped>
*{
    margin: 0;
    padding: 0;
}
.vh-confirm-box{
    position: relative;
    display: flex;
    flex-direction: column;
}
.confirm-inner-box{
    min-width: 150px;
    position: fixed;
    width: auto;
    height: auto;
    padding: 10px;
    top: 35px;
    background-color: var(--confirm-background);
    z-index: 10;
    display: flex;
    flex-direction: row-reverse;
    border: 1px solid var(--confirm-border);
    border-radius: 4px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
}
.confirm__icon___up{
    user-select: none;
    position: fixed;
    border-bottom-color: transparent!important;
    border-right-color: transparent!important;
    top: -5px;
    width: 10px;
    height: 10px;
    z-index: 1;
    content: " ";
    transform: rotate(45deg);
    background: var(--confirm-background);
    box-sizing: border-box;
    border: 1px solid var(--confirm-border);
}
.confirm___inner__sure__box{
    width: 100%;
    display: flex;
    flex-direction: column;
}
.confirm__inner__box{
    display: flex;
    word-break: break-all;
    align-items: center;
}
.confirm__col-right{
    margin-right: 5px;
}
.confirm___bottom___box{
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    font-size: 12px;
}
.confirm____anmin___come{
    animation: openDiv 0.2s ease-in;
}
.confirm____anmin___colse{
    animation: disDiv 0.4s ease-out;
}
@keyframes openDiv {
    0%{
        opacity: 0;
        transform: translateY(-5%);
        
    }
    100%{
        opacity: 1;
        transform: translateY(0%);
    }
}
@keyframes disDiv {
    0%{
        opacity: 1;
        transform: translateY(0%);
        
    }
    100%{
        opacity: 0;
        transform: translateY(-5%);
    }
}
</style>
