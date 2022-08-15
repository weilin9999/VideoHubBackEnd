<template>
    <div :style="'width:'+props.width+';height:'+props.height+';'" class="notification__box__note note__open">
        <div class="notification__box__note__close"><span class="closebtn iconfont icon-guanbi" @click="close"></span></div>
        <div class="note__inner__box__text">
            <span :style="'color:'+props.color+';'" :class="'iconmr '+props.icon"></span>
            <p>{{props.desc}}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    width:{
        type:String,
        default:'260px'
    },
    height:{
        type:String,
        default:'100px'
    },
    desc:{
        type:String,
        default:''
    },
    icon:{
        type:String,
        default:'iconfont icon-lijiqueren'
    },
    color:{
        type:String,
        default: '#67c23a'
    }
});

const emit = defineEmits(['close']);

function close(){
    emit('close','')
}
</script>

<style  scoped>
*{
    margin: 0;
    padding: 0;
}
.notification__box__note{
    background-color: var(--notifty-box-background);
    box-shadow: 0px 0px 12px var(--notifty-box-shadow);
    position: fixed;
    right: 20px;
    top: 120px;
    border-radius: 12px;
    box-sizing: border-box;
}
.notification__box__note__close{
    width: 100%;
    text-align: right;
    padding-top: 5px;
}
.closebtn{
    padding-right: 10px;
    user-select: none;
    cursor: pointer;
}
.closebtn:hover{
    color: var(--notifty-box-close-hover);
}
.note__inner__box__text{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 15px;
}
.iconmr{
    margin-right: 10px;
}

.note__open{
    animation: openDiv 0.2s ease-in;
}
.note__close{
    animation: disDiv 0.3s ease-out;
}

@keyframes openDiv {
    0%{
        opacity: 0;
        transform: translateX(-5%);
    }
    50%{
        opacity: 0.5;
        transform: translateX(-1%);
    }
    100%{
        opacity: 1;
        transform: translateX(0%);
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
</style>
