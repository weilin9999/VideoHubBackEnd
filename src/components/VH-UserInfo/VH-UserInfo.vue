<template>
    <div @mouseenter="showUserInfo=true;closeBox=true;pasue = true;isFirstStart=false" @mouseleave="disableInfo()" class="user-box">
        <div :class="isFirstStart ? 'user-img': closeBox ? 'user-img showImg':'user-img disImg'">
            <img :src="avatar">
        </div>
        <div @mouseenter="showUserInfo=true;closeBox=true;pasue = true;" v-if="showUserInfo" :class="closeBox ? 'drop-down-box showInfo':'drop-down-box closeInfo'">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'VH-UserInfo',
    data () {
        return {
            showUserInfo:false,
            showImg:false,
            closeBox:false,
            isFirstStart:true,
        }
    },
    props:{
        avatar: {
            type: String,
            default:'/src/assets/img/avatar.png'
        },
    },
    methods:{
        disableInfo(){
            this.closeBox=false
            this.pasue = false
            setTimeout(() => {
                if(this.pasue == false){
                    this.showUserInfo=false
                }
            }, 200);
        }
    },
})
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
    background-color: #fff;
    box-shadow: 0 0 30px rgb(0 0 0 / 10%);
    border-radius: 8px;
    border: 1px solid #E3E5E7;
    color: #18191c;
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
