<template>
    <div>
        <table :width="width" class="table">
            <thead>
                <tr>
                    <th style="width:10px;" v-if="props.multSelect">
                        <div class="check-box">
                            <input type="checkbox" v-model="data.allCheck" @click="selectCheck">
                        </div>
                    </th>
                    <th v-for="(item,index) in data.labelData" :key="index">
                        {{item.label}}
                    </th>
                </tr>
            </thead>
            <tr v-for="(item,index) in props.listData" :key="index">
                <td v-if="multSelect">
                    <div class="check-box">
                        <input type="checkbox" v-model="data.checkList[index].isCheck" @change="checkIsAll(data.checkList[index].isCheck,item)">
                    </div>
                </td>
                <td rowspan="1" colspan="1" v-for="( lab, key ) in data.labelData" :key="key" :style="retWidthAvacite(lab) ? '':'width:'+lab.width+';'">
                    {{retLableValue(item,lab.prop)}}
                    <slot v-if="retSlotName(lab) == false" :name="lab.opname" :index="index" :item="item"></slot>
                </td>
            </tr>
        </table>
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import { reactive, useSlots, watch } from 'vue'

const slots = useSlots();

const data = reactive({
    allCheck:false,
    checkList:[],
    labelData:[],
    tempList:[]
});

const props = defineProps({
    width:{
        type: String,
        default: '100%'
    },
    listData:{
        type: Array
    },
    multSelect:{
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['multeSelect']);

for (let index = 0; index < props.listData.length; index++) {
    let json = {'isCheck':false,'data':props.listData[index]}
    data.checkList.push(json)
}

let listData = slots.default()
for (let index = 0; index < listData.length; index++) {
    const element : any = listData[index];
    if(element.type.__name == 'VH-Table-Column'){
        data.labelData.push(listData[index].props)
    }
}

watch(()=>props.listData,(news)=>{
    data.checkList=[]
    data.tempList=[]
    data.allCheck = false
    emit('multeSelect',data.tempList)
    for (let index = 0; index < props.listData.length; index++) {
        let json = {'isCheck':false,'data':props.listData[index]}
        data.checkList.push(json)
    }
});

function retLableValue(item : any,label : any){
    return item[label]
}
function retWidthAvacite(label : any){
    return !label.width
}
function retSlotName(label : any){
    return !label.opname
}
function selectCheck(){
    if(data.allCheck == true){
        for (let index = 0; index < data.checkList.length; index++) {
            data.checkList[index].isCheck = false
        }
        data.tempList=[]
    }else{
        data.tempList=[]
        for (let index = 0; index < data.checkList.length; index++) {
            data.checkList[index].isCheck = true
            data.tempList.push(props.listData[index])
        }
    }
    emit('multeSelect',data.tempList)
}
function checkIsAll(c :any,e : any){
    if(!c){
        deleteTempList(e)
    }else{
        data.tempList.push(e)
    }
    emit('multeSelect',data.tempList)
    let temp = true
    for (let index = 0; index < data.checkList.length; index++) {
        if(data.checkList[index].isCheck == false){
            data.allCheck = false
            return
        }
    }
    if(temp){
        data.allCheck = true
    }
}
function deleteTempList(ImData : any){
    var index = data.tempList.indexOf(ImData)
    if (index !== -1) {
        data.tempList.splice(index, 1)
    }
}
</script>

<style  scoped>
*{
    margin: 0;
    padding: 0;
}
table{
    border-spacing: 0;
    margin: 0 auto;
    text-align: center;
    font-size: 14px;
    position: relative;
    box-sizing: border-box;
    border-color: var(--table-border);
    color: var(--table-color);
    border-collapse: collapse;
    text-indent: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    line-height: 23px;
    padding: 0 12px;
}
table td, table th{
    border: 1px solid var(--table-td-th-color);
}
table thead{
    color: var(--table-thead-color);
    font-weight: 500;
}
table thead th{
    background-color: var(--table-thead-th-background);
}
th{
    color: var(--table-th-color);
}
table tr:nth-child(odd){
    background: var(--table-tr-background-odd);
}
table tr:nth-child(even){
    background: var(--table-tr-background-even);
}
table tr:hover{
    background: var(--table-tr-background-hover);
}
table th,table td{
    padding: 8px 12px;
}

.check-box input[type=checkbox] {
  margin-right: 5px;
  cursor: pointer;
  font-size: 14px;
  width: 15px;
  height: 12px;
  position: relative;
}

.check-box input[type=checkbox]:after {
  position: absolute;
  width: 10px;
  height: 15px;
  top: 0;
  content: " ";
  background-color: var(--table-check-box-after-background);
  color: var(--table-check-box-after-color);
  display: inline-block;
  visibility: visible;
  padding: 0px 3px;
  border-radius: 2px;
  border: 1px solid var(--table-check-box-after-border);
  transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46),outline .25s cubic-bezier(.71,-.46,.29,1.46);
}

.check-box input[type=checkbox]:checked:after {
    background-color: var(--table-check-box-checked-after-background);
    border: 1px solid var(--table-check-box-checked-after-border);
    color: var(--table-check-box-checked-after-color);
    content: "✓";
    font-size: 12px;
}
.check-box:hover input[type=checkbox]:after{
    border: 1px solid var(--table-check-box-checked-after-hover-border);
}
</style>
