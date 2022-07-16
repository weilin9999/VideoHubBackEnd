<template>
    <div>
        <table :width="width" class="table">
            <thead>
                <tr>
                    <th style="width:10px;" v-if="multSelect">
                        <div class="check-box">
                            <input type="checkbox" v-model="allCheck" @click="selectCheck">
                        </div>
                    </th>
                    <th v-for="(item,index) in labelData" :key="index">
                        {{item.label}}
                    </th>
                </tr>
            </thead>
            <tr v-for="(item,index) in listData" :key="index">
                <td v-if="multSelect">
                    <div class="check-box">
                        <input type="checkbox" v-model="checkList[index].isCheck" @change="checkIsAll(checkList[index].isCheck,item)">
                    </div>
                </td>
                <td rowspan="1" colspan="1" v-for="( lab, key ) in labelData" :key="key" :style="retWidthAvacite(lab) ? '':'width:'+lab.width+';'">
                    {{retLableValue(item,lab.prop)}}
                    <slot v-if="retSlotName(lab) == false" :name="lab.opname" :index="index" :item="item"></slot>
                </td>
            </tr>
        </table>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'VH-Table',
    data () {
        return {
            allCheck:false,
            checkList:[],
            labelData:[],
            tempList:[],
        }
    },
    props:{
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
    },
    created(){
        for (let index = 0; index < this.listData.length; index++) {
            let json = {'isCheck':false,'data':this.listData[index]}
            this.checkList.push(json)
        }
    },
    mounted(){
        let listData = this.$slots.default()
        for (let index = 0; index < listData.length; index++) {
            const element = listData[index];
            if(element.type.name == 'VH-Table-Column'){
                this.labelData.push(listData[index].props)
            }
        }
    },
    watch:{
        listData(news,olds){
            this.checkList=[]
            this.tempList=[]
            this.allCheck = false
            this.$emit('multeSelect',this.tempList)
            for (let index = 0; index < this.listData.length; index++) {
                let json = {'isCheck':false,'data':this.listData[index]}
                this.checkList.push(json)
            }
        }
    },
    methods:{
        retLableValue(item,label){
            return item[label]
        },
        retWidthAvacite(label){
           return !label.width
        },
        retSlotName(label){
           return !label.opname
        },
        selectCheck(){
            if(this.allCheck == true){
                for (let index = 0; index < this.checkList.length; index++) {
                    this.checkList[index].isCheck = false
                }
                this.tempList=[]
            }else{
                this.tempList=[]
                for (let index = 0; index < this.checkList.length; index++) {
                    this.checkList[index].isCheck = true
                    this.tempList.push(this.listData[index])
                }
            }
            this.$emit('multeSelect',this.tempList)
        },
        checkIsAll(c,e){
            if(!c){
                this.deleteTempList(e)
            }else{
                this.tempList.push(e)
            }
            this.$emit('multeSelect',this.tempList)
            let temp = true
            for (let index = 0; index < this.checkList.length; index++) {
                if(this.checkList[index].isCheck == false){
                    this.allCheck = false
                    return
                }
            }
            if(temp){
                this.allCheck = true
            }
        },
        deleteTempList(data){
            var index = this.tempList.indexOf(data)
            if (index !== -1) {
                this.tempList.splice(index, 1)
            }
        },
    },
})
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
    border-color: grey;
    color: #606266;
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
    border: 1px solid #f6f6f6;
}
table thead{
    color: #909399;
    font-weight: 500;
}
table thead th{
    background-color: #fff;
}
th{
    color: #909399;
}
table tr:nth-child(odd){
    background: #fafafa;
}
table tr:nth-child(even){
    background: #fff;
}
table tr:hover{
    background: #f5f7fa;
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
  background-color: #fff;
  color: #000;
  display: inline-block;
  visibility: visible;
  padding: 0px 3px;
  border-radius: 2px;
  border: 1px solid #dcdfe6;
  transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46),outline .25s cubic-bezier(.71,-.46,.29,1.46);
}

.check-box input[type=checkbox]:checked:after {
    background-color: #409eff;
    border: 1px solid #409eff;
    color: #fff;
    content: "✓";
    font-size: 12px;
}
.check-box:hover input[type=checkbox]:after{
    border: 1px solid #409eff;
}
</style>
