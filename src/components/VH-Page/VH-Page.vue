<template>
    <div class="page-bar">
        <ul>
            <li v-if="data.cur>1"><a @click="data.cur--,pageClick()" style="padding: 10px;width:32px;" class="iconfont icon-zuo"></a></li>
    
            <li v-if="data.cur==1"><a style="padding: 10px;" class=" banclick iconfont icon-zuo"></a></li>
    
            <li v-for="(index,key) in indexs" :key="key" v-bind:class="{ 'active': data.cur == index}">
                <a @click="btnClick(index)">{{ index }}</a>
            </li>
    
            <li v-if="data.cur!=all"><a @click="data.cur++;pageClick()" style="padding: 10px;"  class=" iconfont icon-youxiang"></a></li>
    
            <li v-if="data.cur == all"><a style="padding: 9px;"  class=" banclick iconfont icon-youxiang"></a></li>
    
            <li style="display: flex; align-items: center;margin-left: 30px;float: right;
            padding: 0 2px;font-size: 12px;color: #99a2aa;line-height: 32px;height: 32px;">
            共<i>{{all}}</i>页，跳转至<input @keyup.enter="goWhere" type="text" onkeyup = "value=value.replace(/[^\d]/g,'')"  v-model="data.page" />页</li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { reactive, watch, computed } from 'vue'

const props = defineProps({
	all:{
		type: Number,
		default: 1
	},
	curpage:{
		type: Number,
		default: 1
	}
});

const emit = defineEmits(['gowhere','page']);

const data = reactive({
	cur: props.curpage,
	page:null
});

watch(()=>props.curpage,(newp)=>{
	if(newp==1){
		data.cur = newp
	}	
});

function goWhere(){
	if(data.page <= props.all ){
		if(data.cur != parseInt(data.page) && parseInt(data.page) > 0 && parseInt(data.page) != null){
			data.cur = parseInt(data.page)
			let json={'where':parseInt(data.page)}
			emit('gowhere',json);
		}else if(parseInt(data.page) == 0){
			let json={'where':'zero'}
			emit('gowhere',json);
		}else{
			let json={'where':'error'}
			emit('gowhere',json);
		}
		data.page = ''
	}else{
		let json={'where':'nosearch'}
		emit('gowhere',json);
	}
}
function btnClick(site : number){//页码点击事件
	if(site != data.cur){
		data.cur = site;
		emit('page',site);
	}
}
function pageClick(){
	//console.log('现在在'+this.cur+'页');
	emit('page',data.cur);
}

const indexs = computed(()=>{
	// 定义开始的数字
	var left = 1;
	// 定义结束的数字
	var right = props.all;

	// 存储返回值
	var ar = [];

	// 前提条件：每次都显示condition条页码
	// 最好是个单数
	var condition = 10;

	// 向上取整->就能获取到中间的数字
	var middle = Math.ceil(condition/2);

	// 要分清情况
	//1、在最左边或者在middle的前面
	//2、在中间
	//3、最右边的情况

	// 当总页数超过condition时，需要判断分页情况
	if(props.all>= condition){	
		// 中间的时候
		// 左右都加上（middle-1)
		if(data.cur > middle && data.cur < props.all-(middle-1)){
				left = data.cur - (middle-1)
				right = data.cur + (middle-1)
		}else{
			//最左边或者在condition的中间
			if(data.cur<=middle){
				left = 1
				right = condition
			// 最右边的情况
			// 结束是总条数，开始是condition减去1
			}else{
				right = props.all
				left = props.all -(condition-1)
			}
		}
	}
	while (left <= right){
		ar.push(left)
		left ++
	}
	return ar
})
</script>

<style  scoped>
*{
    margin: 0;
    padding: 0;
    user-select: none;
}

.page-bar{
	width: auto;
	display: flex;
}
ul,li{
    margin: 0px;
    padding: 0px;
	display: flex;
}
li{
    list-style: none
}
.page-bar li:first-child>a {
   margin-left: 0px
}
.page-bar a{
	color: var(--page-bar-a-color);
	cursor: pointer;
	outline: none;
	text-align: center;
	border-radius: 4px;
	background-color: var(--page-bar-a-background);
	border: 1px solid  var(--page-bar-a-border);
	background-image: none;
	transition: all .2s;
	font-size: 14px;
	min-width: 15px;
	margin: 0 2px;
	padding: 0 13px;
	float: left;
	display: block;
	height: 32px;
	display: flex;
    align-items: center;
	box-sizing: border-box;
}
.page-bar a:hover{
    background: var(--page-bar-a-hover-background);
	color: var(--page-bar-a-hover-color);
	border: 1px solid var(--page-bar-a-hover-border);
}
.page-bar a.banclick{
    cursor:not-allowed;
	width: 32px;
}
.page-bar .active a{
    cursor: default;
    background: var(--page-bar-a-active-background);
    color: var(--page-bar-a-active-color);
    border: 1px solid var(--page-bar-a-active-border);
}
.page-bar i{
    font-style:normal;
    color: var(--page-bar-i);
    margin: 0px 4px;
    font-size: 12px;
}

.page-bar input{
	padding: 0 10px;
	width: 50px;
	height: 24px;
	line-height: 24px;
	font-size: 12px;
	box-shadow: none;
	color: var(--page-bar-input-color);
	text-align: center;
	margin: 0 5px;
	border: 1px solid var(--page-bar-input-broder);
	border-radius: 4px;
    outline-style: none;
}
.page-bar input:hover{
    border: 1px solid var(--page-bar-input-hover);
}
.page-bar input:focus{
    border: 1px solid var(--page-bar-input-focus);
}
</style>
