<template>
	<div ref="selectDoc" :style="[data.isShow ? 'border: 1px solid #409eff;':'','width: '+props.width+'px;']" :class="data.outOfSide ? 'vh_dropdown_out_of_side':'vh-dropdown'">
		<div @mouseenter="data.showColse=true" @mouseleave="data.showColse=false" class="cur-name" ><p @click="timeOutClose" style="width: 100%;" :class="data.select>-1 ? 'select-p-text':''">{{data.current}}</p> <span v-if="data.select != -1 && data.showColse && closeEvent" @click="cleanSearch" class="onSelect iconfont icon-close-o"></span> <span v-else @click="timeOutClose" :class="data.isShow ? 'onSelect iconfont icon-31xiala':'driSelect iconfont icon-31xiala'"></span> </div>
		<div :class="[data.isShow?'on':'',data.isopen ? 'openSelect':'disSelect',data.outOfSide ? 'list-and-search_out_of_side':'list-and-search' ]" :style="'width:'+props.width+'px'">
			<div :class="data.outOfSide ? 'squerSpen_out_of_side':'squerSpen'"></div>
			<div class="search-module clearfix" v-show="props.isNeedSearch">
				<input class="search-text" @input='search' :placeholder="props.placeholder" />
			</div>
			<ul class="list-module">
				<li :title="labelFunc(item)" v-for ="(item,index) in data.datalist" @click="clickItem(item,index)" :key="index">
					<span :class="data.select == index ? 'list-item-text select-text':'list-item-text'">{{labelFunc(item)}}</span>
				</li>
			</ul>
			<div class="tip-nodata" v-show="data.searchValue.length && !data.datalist.length">未找到数据</div>
		</div>
	</div>
</template>
 
<script lang="ts" setup>
import { reactive, watch, ref } from 'vue'

const selectDoc = ref();

const props = defineProps({
	modelValue:null,
	label:null,
	vhKey:null,
	curData:String,
	itemData:Array,
	isNeedSearch:{
		type: Boolean,
		default: true
	},
	placeholder:{
		type: String,
		default: '搜索' 
	},
	width:{
		type: String,
		default: '150' 
	},
	placeholder:{
		type: String,
		default: '请选择' 
	},
	closeEvent:{
		type: Boolean,
		default: true
	}
});

const emit = defineEmits(['update:modelValue','change']);

const data = reactive({
	isopen:false,
	searchValue: '',
	current: props.curData,
	datalist:[],
	isShow:false,
	select:-1,
	showColse:false,
	outOfSide:false
})

document.addEventListener('click', (e) => {
	if(selectDoc.value){
		if (!selectDoc.value.contains(e.target)){
			data.isopen = false;
			setTimeout(()=>{data.isShow = false},100)
		}
	}
}, false)

data.datalist = props.itemData;
for (let index = 0; index < data.datalist.length; index++) {
	let key = data.datalist[index][props.vhKey]
	if(props.modelValue == key){
		data.current = data.datalist[index][props.label]
		data.select = index
		break
	}else{
		data.current = '请选择'
		data.select = -1
	}
}
if(!data.current){
	data.current = '请选择'
	data.select = -1
}

watch(()=>props.itemData,(news)=>{
	data.datalist = news
});

watch(()=>props.modelValue,(news)=>{
	if(news == ''){
		data.current = '请选择'
		data.select = -1
		return
	}
	for (let index = 0; index < data.datalist.length; index++) {
		let key = data.datalist[index][props.vhKey]
		if(props.modelValue == key){
			data.current = data.datalist[index][props.label]
			data.select = index
			break
		}else{
			data.current = '请选择'
			data.select = -1
		}
	}
});

function labelFunc(item : any){
	return item[props.label]
}

function search(e : any){
	data.searchValue = e.target.value;
	data.datalist = props.itemData.filter((item)=>{
		return item[props.label].indexOf(data.searchValue) != -1;
	});
}

function clickItem(item : any,index : number){
	data.isShow = false;
	let value = item[props.label]
	let key = item[props.vhKey]
	data.current = value;
	data.select = index;
	emit('update:modelValue',key);
	emit('change',key);
}

function timeOutClose(){
	if(data.isShow == false){
		var windowTop = window.innerHeight
		var scrollTops = document.body.scrollTop
		var windowHeight = windowTop+scrollTops
		let documtTop = selectDoc.value.getClientRects()
		if((documtTop[0].top+200) > windowHeight){
			data.outOfSide=true
			data.isopen = true;
			data.isShow = true;
		}else{
			data.isopen = true;
			data.isShow = true;
		}
	}else{
		data.isopen = false;
		setTimeout(()=>{data.isShow = false},100)
	}
}
function cleanSearch(){
	data.isShow = false
	data.isopen = false
	data.current = '';
	data.select = -1;
	emit('update:modelValue','');
	emit('change','');
}

</script>
 
<style scoped>
	*{
		margin: 0;
		padding: 0;
	}
	.vh-dropdown {
		z-index:10;
        background-color: var(--select-dropdown-background);
		cursor: pointer;
		user-select:none;
		-webkit-user-select:none; 
		position: relative;
		border-radius: 4px;
		border: 1px solid var(--select-dropdown-border) ;
		display: flex;
		flex-direction: column;
  		align-items: center;
		box-sizing: border-box;
		padding: 0px 0px 0px;
		transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46),outline .25s cubic-bezier(.71,-.46,.29,1.46);
	}
	.vh_dropdown_out_of_side{
		z-index:10;
        background-color: var(--select-dropdown-out-background);
		cursor: pointer;
		user-select:none;
		-webkit-user-select:none; 
		position: relative;
		border-radius: 4px;
		border: 1px solid var(--select-dropdown-out-border) ;
		display: flex;
  		align-items: center;
		box-sizing: border-box;
		padding: 0px 0px 0px;
		transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46),outline .25s cubic-bezier(.71,-.46,.29,1.46);
		flex-direction: column-reverse;
	}
	.vh-dropdown:hover{
		border: 1px solid var(--select-dropdown-hover);
	}
    input::-webkit-input-placeholder{
		font-size: 14px;
	}
    .list-module {
        max-height: 200px;
		width: 100%;
        overflow-y: auto;
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 5px 0 0;
    }
	
	.list-module::-webkit-scrollbar {
		width:5px;
	}
	
	.list-module::-webkit-scrollbar-track {
		-webkit-box-shadow:inset006px var(--select-dropdown-scrollbar-track);
		border-radius:10px;
	}
	
	.list-module::-webkit-scrollbar-thumb {
		border-radius:10px;
		background:var(--select-dropdown-scrollbar-thumb);
		-webkit-box-shadow:inset006px var(--select-dropdown-scrollbar-shadow);
	}

    li {
		box-sizing: border-box;
		border-radius: 5px;
		width: 90%;
		height: 34px;
		list-style: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 5px;
		text-align: center;
    }
    li:hover {
        cursor:pointer;
        color: var(--select-li-hover);
        background: var(--select-li-background);
    }
	.list-item-text{
		width: 100%;
		color: var(--select-list-item-text);
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap
	}
    ._self-show {
		display: block!important;
	}
    .search-module {
		margin-top: 5px;
        position: relative;
    }
    .search-text {
        width: 100%;
        height: 30px;
        padding: 0 10px;
        box-shadow: none;
        outline: none;
        border: none;
        box-sizing:border-box;
        -moz-box-sizing:border-box;
        -webkit-box-sizing:border-box;
		text-align: center;
		border-bottom: 1px solid var(--select-search-text);
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
    }
	.search-text:hover{
		border-bottom: 1px solid var(--select-search-text-hover);
	}
    .search-icon {
        position: absolute;
        top: 24%;
        right: 0.5em;
        color: var(--select-search-icon);
    }
	.list-and-search{
		display: none;
		background: var(--select-list-search);
		border: 1px solid var(--select-list-search-border);
		position: absolute;
		border-radius: 8px;
		margin-top: 40px;
		box-shadow: 0px 0px 12px var(--select-list-search-shadow);
		padding: 0px 0px 5px;
	}
	.list-and-search_out_of_side{
		display: none;
		background: var(--select-list-search--out-background);
		border: 1px solid var(--select-list-search--out-border);
		position: absolute;
		border-radius: 8px;
		margin-bottom: 40px;
		box-shadow: 0px 0px 12px var(--select-list-search--out-shadow);
		padding: 0px 0px 10px;
	}
	.squerSpen{
		user-select: none;
		position: absolute;
		border-bottom-color: transparent!important;
		border-right-color: transparent!important;
		top: -5px;
		width: 10px;
		height: 10px;
		z-index: 1;
		content: " ";
		transform: rotate(45deg);
		background: var(--select-squer-spen-background);
		box-sizing: border-box;
		border: 1px solid var(--select-squer-spen-border);
	}
	.squerSpen_out_of_side{
		user-select: none;
		position: absolute;
		border-top-color: transparent!important;
		border-left-color: transparent!important;
		bottom: -5px;
		width: 10px;
		height: 10px;
		z-index: 1;
		content: " ";
		transform: rotate(45deg);
		background: var(--select-squer-spen-out-background);
		box-sizing: border-box;
		border: 1px solid var(--select-squer-spen-out-border);
	}
    .on{
        display: flex;
		flex-direction: column;
		align-items: center;
    }

	.cur-name{
        width: 100%;
		height: 32px;
		line-height: 31px;
		position: relative;
		color: var(--select-cur-name);
		box-sizing: border-box;
		-moz-box-sizing:border-box;
        -webkit-box-sizing:border-box;
   		padding: 0px 10px;
		display: flex;
    	justify-content: space-between;
	}
	.cur-name p{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap
	}
	.tip-nodata {
		font-size: 14px;
		padding: 10px;
	}
	.openSelect{
		animation: openDiv 0.2s ease-in;
	}
	.disSelect{
		animation: disDiv 0.2s ease-out;
	}
	.onSelect{
		animation: onClick 0.2s ease-out;
		animation-fill-mode: forwards;
	}
	.driSelect{
		animation: disClick 0.2s ease-out;
	}
	@keyframes openDiv {
		0%{
			opacity: 0;
			
		}
		100%{
			opacity: 1;
		}
	}
	@keyframes disDiv {
		0%{
			opacity: 1;
			
		}
		100%{
			opacity: 0;
		}
	}
	@keyframes onClick {
		0%{
			transform: rotate(0deg);
			
		}
		100%{
			transform: rotate(180deg);
		}
	}
	@keyframes disClick {
		0%{
			transform: rotate(180deg);
			
		}
		100%{
			transform: rotate(0deg);
		}
	}
	.select-text{
		color: var(--select-select-text);
	}
	.select-p-text{
		color: var(--select-p-text);
	}
</style>