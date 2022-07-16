<template>
	<div ref="selectDoc" :style="[isShow ? 'border: 1px solid #409eff;':'','width: '+width+'px;']" :class="outOfSide ? 'vh_dropdown_out_of_side':'vh-dropdown'">
		<div @mouseenter="showColse=true" @mouseleave="showColse=false" class="cur-name" ><p @click="timeOutClose" style="width: 100%;" :class="select>-1 ? 'select-p-text':''">{{retValue()}}</p> <span v-if="select != -1 && showColse && closeEvent" @click="cleanSearch" class="onSelect iconfont icon-close-o"></span> <span v-else @click="timeOutClose" :class="isShow ? 'onSelect iconfont icon-31xiala':'driSelect iconfont icon-31xiala'"></span> </div>
		<div :class="[isShow?'on':'',isopen ? 'openSelect':'disSelect',outOfSide ? 'list-and-search_out_of_side':'list-and-search' ]" :style="'width:'+width+'px'">
			<div :class="outOfSide ? 'squerSpen_out_of_side':'squerSpen'"></div>
			<div class="search-module clearfix" v-show="isNeedSearch">
				<input class="search-text" @input='search' :placeholder="placeholder" />
			</div>
			<ul class="list-module">
				<li :title="labelFunc(item)" v-for ="(item,index) in datalist" @click="clickItem(item,index)" :key="index">
					<span :class="select == index ? 'list-item-text select-text':'list-item-text'">{{labelFunc(item)}}</span>
				</li>
			</ul>
			<div class="tip-nodata" v-show="searchValue.length && !datalist.length">未找到数据</div>
		</div>
	</div>
</template>
 
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name:"VH-Select",
  data(){
		return {
			isopen:false,
			searchValue: '',
			current: this.curData,
			datalist:[],
			isShow:false,
			select:-1,
			showColse:false,
			outOfSide:false,
		}
 	},
  props:{
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
  	},
  watch:{
        itemData(news,olds){
            this.datalist = news
        },
		modelValue(news,olds){
			if(news == ''){
				this.current = '请选择'
				this.select = -1
				return
			}
			for (let index = 0; index < this.datalist.length; index++) {
				let key = this.datalist[index][this.vhKey]
				if(this.modelValue == key){
					this.current = this.datalist[index][this.label]
					this.select = index
					return
				}else{
					this.current = '请选择'
					this.select = -1
				}
			}
		}
    },
  created(){
		this.datalist = this.itemData;
		document.addEventListener('click', (e) => {
			if (!this.$el.contains(e.target)){
				this.isopen = false;
				setTimeout(()=>{this.isShow = false},100)
			}
		}, false)
  	},
  mounted(){
		for (let index = 0; index < this.datalist.length; index++) {
			let key = this.datalist[index][this.vhKey]
			if(this.modelValue == key){
				this.current = this.datalist[index][this.label]
				this.select = index
				return
			}else{
				this.current = '请选择'
				this.select = -1
			}
		}
    },
  methods:{
		retValue(){
			if(this.current == ''){
				return this.placeholder
			}else{
				return this.current
			}
		},
		labelFunc(item){
			return item[this.label]
		},
		search(e){
			this.searchValue = e.target.value;
			this.datalist = this.itemData.filter((item)=>{
				return item[this.label].indexOf(this.searchValue) != -1;
			});
		},
		clickItem(item,index){
			this.isShow = false;
			let value = item[this.label]
			let key = item[this.vhKey]
			this.current = value;
			this.select = index;
			this.$emit('update:modelValue',key);
			this.$emit('change',key);
		},
		timeOutClose(){
			if(this.isShow == false){
				var windowTop = window.innerHeight
                var scrollTops = document.body.scrollTop
				var windowHeight = windowTop+scrollTops
				let documtTop = this.$refs.selectDoc.getClientRects()
				if((documtTop[0].top+200) > windowHeight){
					this.outOfSide=true
					this.isopen = true;
					this.isShow = true;
				}else{
					this.isopen = true;
					this.isShow = true;
				}
			}else{
				this.isopen = false;
				setTimeout(()=>{this.isShow = false},100)
			}
		},
		cleanSearch(){
			this.isShow = false
			this.isopen = false
			this.current = '';
			this.select = -1;
			this.$emit('update:modelValue','');
			this.$emit('change','');
		}
	}
})
</script>
 
<style scoped>
	*{
		margin: 0;
		padding: 0;
	}
	.vh-dropdown {
		z-index:10;
        background-color: #fff;
		cursor: pointer;
		user-select:none;
		-webkit-user-select:none; 
		position: relative;
		border-radius: 4px;
		border: 1px solid #dcdfe6 ;
		display: flex;
		flex-direction: column;
  		align-items: center;
		box-sizing: border-box;
		padding: 0px 0px 0px;
		transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46),outline .25s cubic-bezier(.71,-.46,.29,1.46);
	}
	.vh_dropdown_out_of_side{
		z-index:10;
        background-color: #fff;
		cursor: pointer;
		user-select:none;
		-webkit-user-select:none; 
		position: relative;
		border-radius: 4px;
		border: 1px solid #dcdfe6 ;
		display: flex;
  		align-items: center;
		box-sizing: border-box;
		padding: 0px 0px 0px;
		transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46),outline .25s cubic-bezier(.71,-.46,.29,1.46);
		flex-direction: column-reverse;
	}
	.vh-dropdown:hover{
		border: 1px solid #409eff;
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
		-webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
		border-radius:10px;
	}
	
	.list-module::-webkit-scrollbar-thumb {
		border-radius:10px;
		background:rgba(0,0,0,0.1);
		-webkit-box-shadow:inset006pxrgba(0,0,0,0.5);
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
        color: #fff;
        background: #d9ecff;
    }
	.list-item-text{
		width: 100%;
		color: #606266;
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
		border-bottom: 1px solid #ccc;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
    }
	.search-text:hover{
		border-bottom: 1px solid #409eff;
	}
    .search-icon {
        position: absolute;
        top: 24%;
        right: 0.5em;
        color: #aaa;
    }
	.list-and-search{
		display: none;
		background: #fff;
		border: 1px solid #e4e7ed;
		position: absolute;
		border-radius: 8px;
		margin-top: 40px;
		box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
		padding: 0px 0px 5px;
	}
	.list-and-search_out_of_side{
		display: none;
		background: #fff;
		border: 1px solid #e4e7ed;
		position: absolute;
		border-radius: 8px;
		margin-bottom: 40px;
		box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
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
		background: #ffffff;
		box-sizing: border-box;
		border: 1px solid #e4e7ed;
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
		background: #ffffff;
		box-sizing: border-box;
		border: 1px solid #e4e7ed;
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
		color: #a8abb2;
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
		color: #409eff;
	}
	.select-p-text{
		color: #606266;
	}
</style>