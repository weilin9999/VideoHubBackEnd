<template>
    <div class="phtoto__view__box">
        <div class="close" @click="close"><span class="close_btn iconfont icon-guanbi"></span></div>
        <img class="img__box" :src="props.imgSrc" ref="dragWrap" @mousemove="dragMousemove" @mousedown="dragMousedown" @mouseup.stop="data.isMousedown = false" :style="data.transform+'transform: scale('+data.scale+') rotate('+data.rotate+'deg) translate('+data.translate.x+'px, '+data.translate.y+'px)'">
        <div class="control__view__photo__box">
            <div class="control__left">
                <span class="btn iconfont icon-24gl-zoomIn" @click="bigPhoto"></span>
                <span class="btn iconfont icon-24gl-zoomOut" @click="smallPhoto"></span>
            </div>
            <div class="control__center">
                <span class="btn iconfont icon-24gl-fullScreenEnter" @click="normal"></span>
            </div>
            <div class="control__right">
                <span class="btn iconfont icon-24gl-undo3" @click="turnLeft"></span>
                <span class="btn iconfont icon-24gl-redo3" @click="turnRight"></span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive,onBeforeUnmount } from 'vue'

const data = reactive({
    scale:1,
    rotate:0,
    isMousedown: false,
    moveStart: {x: 0, y: 0},
    translate: {x: 0, y: 0},
    scale: 1,
    transform: 'transition: transform 0.3s ease 0s;'
});

const props = defineProps({
    imgSrc:{
        type:String,
        default:''
    }
});

const emit = defineEmits(['close']);

window.addEventListener('mousewheel',handleScroll,false)

function bigPhoto(){
    if(data.scale <= 4){
        data.scale += 0.5
    }
}
function smallPhoto(){
    if(data.scale > 0.5){
        data.scale -= 0.5
    }
}
function normal(){
    data.scale = 1
    data.rotate = 0
}
function turnLeft(){
    data.rotate -= 90
}
function turnRight(){
    data.rotate += 90
}
function dragMousedown(event) {
    data.transform = ''
    data.isMousedown = true
    data.moveStart.x = event.clientX
    data.moveStart.y = event.clientY
}

function dragMousemove(event) {
    if(data.isMousedown) {
        data.translate.x += (event.clientX - data.moveStart.x) / data.scale
        data.translate.y += (event.clientY - data.moveStart.y) / data.scale
        data.moveStart.x = event.clientX
        data.moveStart.y = event.clientY
    }else{
        data.transform = 'transition: transform 0.3s ease 0s;'
    }
}

function handleScroll(e : any){
    let speed = e.wheelDelta/120
    if(e.wheelDelta > 0) {
        bigPhoto()
    }else if(e.wheelDelta < 0){
        smallPhoto()
    }
}
function close(){
    emit('close','');
}
    
onBeforeUnmount(()=> {
    window.removeEventListener('mousewheel', handleScroll)
})
</script>

<style  scoped>
*{
    margin: 0;
    padding: 0;
}
.phtoto__view__box{
    top: 0;
    right: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: var(--photo-view-box-background);
    z-index: 200;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    user-select: none;
    animation: openDiv 0.2s ease-in;
}
@keyframes openDiv {
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
.control__view__photo__box{
    width: 320px;
    height: 45px;
    background-color: var(--photo-view-box-control-background);
    border-radius: 22px;
    position: absolute;
    bottom: 150px;
    color: var(--photo-view-box-control-color);
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
}
.close{
    width: 45px;
    height: 45px;
    top: 50px;
    right: 50px;
    border-radius: 50%;
    color: var(--photo-view-box-close-color);
    position: absolute;
    background-color: var(--photo-view-box-colose-background);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.close_btn{
    font-size: 25px;
}
.img__box{
    position: absolute;
    user-select: none;
    user-drag: none;
    -webkit-user-drag:none;
}
.btn{
    font-size: 25px;
    cursor: pointer;
    user-select: none;
    padding: 0 8px;
}
.control__left{
    padding-right: 0px
}
.control__center{
    padding: 0 30px;
}
.control__right{
    padding-left: 0px;
}
</style>
