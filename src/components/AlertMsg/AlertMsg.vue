<template>
    <div class="alert-box">
        <div v-for="(item,key) in data.msg" :key="key" :class="[item.ava==true ? 'anima-out':'anima-in',item.info==1 ? 'alert-msg-success':item.info==2 ? 'alert-msg-error':'alert-msg-waring']">
            <div :style="item.info==1 ? 'background-color:#67c23a;':item.info==2 ? 'background-color:#f56c6c;':'background-color:#e6a32c;'" class="alert-line-cake"></div>
            <div class="alert-left-box">
                <span style="font-size: 13px;" v-if="item.info == 1" class="iconfont icon-lijiqueren col-15"></span>
                <span style="font-size: 13px;" v-else-if="item.info == 2" class="iconfont icon-cuowu col-15"></span>
                <span style="font-size: 13px;" v-else class="iconfont icon-cs-jg-1 col-15"></span>
                {{item.msg}}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const data = reactive({
    msg:[],
    isTimeUp :false,
    timetick : null
});
    
const addMsg = (info : number,msg : string)=>{
    let temp = {info:info,msg:msg,ava:false}
    data.msg.unshift(temp)
    timeDelMsg()
}
function timeDelMsg(){
        if(data.isTimeUp == false){
        data.isTimeUp = true
        data.timetick = window.setInterval(
        ()=>{
            let lenTemp = data.msg.length
            data.msg[lenTemp-1].ava = true
            // console.log(lenTemp)
            setTimeout(()=>{
                if(lenTemp >= 1){
                    data.msg.pop()
                }
                // console.log(this.msg[lenTemp-2])
                if(data.msg[lenTemp-2]==undefined){
                    data.isTimeUp = false
                    window.clearInterval(data.timetick)
                    window.clearInterval(data.timetick)
                }
            }, 100 )
        },2000
        )
    }

    if(data.msg[0]==undefined){
        window.clearInterval(data.timetick)
        window.clearInterval(data.timetick)
        data.timetick = null
        data.isTimeUp = false
    }
}

defineExpose ({ addMsg })

</script>

<style scoped>
.alert-box{
    left: 0;
    width: 100%;
    height: auto;
    position: fixed;
    z-index: 9000;
    top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 1s;
    font-size: 14px;
}
.alert-msg-success{
    width: auto;
    min-width: 300px;
    background-color: var(--success-background);
    border: 1px var(--success-border) solid;
    color: var(--success-color);
    border-radius: 4px;
    overflow: hidden;
    opacity: 1;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
}
.alert-msg-error{
    width: auto;
    min-width: 300px;
    background-color: var(--danger-background);
    border: 1px var(--danger-border) solid;
    color: var(--danger-color);
    border-radius: 4px;
    overflow: hidden;
    opacity: 1;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
}
.alert-msg-waring{
    width: auto;
    min-width: 300px;
    background-color: var(--waring-background);
    border: 1px var(--waring-border) solid;
    color: var(--waring-color);
    border-radius: 4px;
    overflow: hidden;
    opacity: 1;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
}
.col-15{
    margin-right: 5px;
}

.anima-in{
    animation: openDiv 0.2s ease-in;
}
.anima-out{
    animation: disDiv 0.2s ease-out;
}

@keyframes disDiv {
    0% {
        opacity: 1;
        transform: translateY(0);
    }

    100% {
        opacity: 0;
        transform: translateY(-100%)
    }
}
@keyframes openDiv {
    0% {
        opacity: 0;
        transform: translateY(-100%)
    }

    100% {
        opacity: 1;
        transform: translateY(0)
    }
}
.alert-line-cake{
    position: absolute;
    width: 5px;
    height: 43px;
    margin-left: -11px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}
.alert-left-box{
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>
