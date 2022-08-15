<template>
    <div @mouseenter="data.showUserInfo=true;data.closeBox=true;data.pasue = true;data.isFirstStart=false" @mouseleave="disableInfo()" class="user-box">
        <div :class="data.isFirstStart ? 'user-img': data.closeBox ? 'user-img showImg':'user-img disImg'">
            <img :src="props.avatar">
        </div>
        <div @mouseenter="data.showUserInfo=true;data.closeBox=true;data.pasue = true;" v-if="data.showUserInfo" :class="data.closeBox ? 'drop-down-box showInfo':'drop-down-box closeInfo'">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
const data = reactive({
    showUserInfo:false,
    showImg:false,
    closeBox:false,
    isFirstStart:true,
    pasue: false
});

const props = defineProps({
    avatar: {
        type: String,
        default:'/src/assets/img/avatar.png'
    }
})

function disableInfo(){
    data.closeBox=false
    data.pasue = false
    setTimeout(() => {
        if(data.pasue == false){
            data.showUserInfo=false
        }
    }, 200);
}
</script>

<style  scoped>
*{
    margin: 0;
    padding: 0;
}
.user-box{
    width: 50px;
    height: 50px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 50%;
}

.user-box .user-img{
    width: 50px;
    height: 50px;
    z-index: 102;
    user-select: none;
}
.user-img img{
    border-radius: 50%;
    width: 50px;
    height: 50px;
}

.drop-down-box{
    position: absolute;
    z-index: 101;
    padding: 30px 24px 18px;
    width: 263px;
    box-sizing: border-box;
    margin-top: -10px;
    margin-right: 192px;
    background-color: var(--user-info-drop-down-box-background);
    box-shadow: 0 0 30px var(--user-info-drop-down-box-shadow);
    border-radius: 8px;
    border: 1px solid var(--user-info-drop-down-box-broder);
    color: var(--user-info-drop-down-box-color);
}

.showInfo{
    animation: showDropUp .5s;
}
.closeInfo{
    animation: closeDropUp .5s;
}
.showImg{
    animation: showImagepUp .5s;
    animation-fill-mode: forwards;
}
.disImg{
    animation: disImagepUp .5s;
}


@keyframes showDropUp{
	0%{
		opacity: 0;
		transform:translateY(-5px);
	}
	100%{
		opacity: 1;
		transform:translateY(0px);
	}
}

@keyframes showImagepUp{
	0%{
		transform:scale(1) translateX(0px) translateY(0px);
	}
	100%{
		transform:scale(1.5) translateX(-20px) translateY(20px);
	}
}
@keyframes disImagepUp{
	0%{
		transform:scale(1.5) translateX(-20px) translateY(20px);
	}
	100%{
		transform:scale(1) translateX(0px) translateY(0px);
	}
}
@keyframes closeDropUp{
	0%{
		opacity: 1;
		transform:translateY(0px);
	}
	100%{
		opacity: 0;
		transform:translateY(-5px);
	}
}

</style>
