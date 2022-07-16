<template>
    <div class="phtoto__view__box">
        <div class="close" @click="close"><span class="close_btn iconfont icon-guanbi"></span></div>
        <img class="img__box" :src="imgSrc" ref="dragWrap" @mousemove="dragMousemove" @mousedown="dragMousedown" @mouseup.stop="isMousedown = false" :style="transform+'transform: scale('+scale+') rotate('+rotate+'deg) translate('+translate.x+'px, '+translate.y+'px)'">
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

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'VH-Photo',
    data () {
        return {
            scale:1,
            rotate:0,
            isMousedown: false,
            moveStart: {x: 0, y: 0},
            translate: {x: 0, y: 0},
            scale: 1,
            transform: 'transition: transform 0.3s ease 0s;',
        }
    },
    props:{
        imgSrc:{
            type:String,
            default:''
        }
    },
    mounted(){
        window.addEventListener('mousewheel',this.handleScroll,false)
    },
    methods:{
        bigPhoto(){
            if(this.scale <= 4){
                this.scale += 0.5
            }
        },
        smallPhoto(){
            if(this.scale > 0.5){
                this.scale -= 0.5
            }
        },
        normal(){
            this.scale = 1
            this.rotate = 0
        },
        turnLeft(){
            this.rotate -= 90
        },
        turnRight(){
            this.rotate += 90
        },
        dragMousedown() {
            this.transform = ''
            this.isMousedown = true
            this.moveStart.x = event.clientX
            this.moveStart.y = event.clientY
        },
        dragMousemove() {
            if(this.isMousedown) {
                this.translate.x += (event.clientX - this.moveStart.x) / this.scale
                this.translate.y += (event.clientY - this.moveStart.y) / this.scale
                this.moveStart.x = event.clientX
                this.moveStart.y = event.clientY
            }else{
                this.transform = 'transition: transform 0.3s ease 0s;'
            }
        },
        handleScroll(e){
            let speed = e.wheelDelta/120
            if(e.wheelDelta > 0) {
                this.bigPhoto()
            }else if(e.wheelDelta < 0){
                this.smallPhoto()
            }
        },
        close(){
            this.$emit('close','')
        },
    },
    destroyed: function () {
        window.removeEventListener('mousewheel', this.handleScroll)
    }
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
    background-color: rgba(0, 0, 0, 0.5);
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
    background-color: rgba(96, 98, 102,0.8);
    border-radius: 22px;
    position: absolute;
    bottom: 150px;
    color: #fff;
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
    color: #fff;
    position: absolute;
    background-color: rgba(96, 98, 102,0.8);
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
