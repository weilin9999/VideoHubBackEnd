<template>
    <div :style="'font-size: '+fontSize+';width: '+width+';height: '+height+';'" :class="retStyle()">
        {{desc}}
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'VH-Tag',
    data () {
        return {
            classStyle:'VH-Tag-primary-box'
        }
    },
    props:{
        desc:{
            type:null,
            default: '无标签'
        },
        width:{
            type:String,
            default: 'auto'
        },
        height:{
            type:String,
            default: '24px'
        },
        fontSize:{
            type:String,
            default: '12px'
        },
        type:{
            type:String,
            default: ''
        }
    },
    methods:{
        retStyle(){
            if(this.type == 'primary'){
                this.classStyle='VH-Tag-primary-box'
            }else if(this.type == 'danger'){
                this.classStyle='VH-Tag-danger-box'
            }else if(this.type == 'waring'){
                this.classStyle='VH-Tag-waring-box'
            }else if(this.type == 'success'){
                this.classStyle='VH-Tag-success-box'
            }else{
                this.classStyle='VH-Tag-info-box'
            }
            return this.classStyle
        }
    },
})
</script>

<style  scoped>
*{
    margin: 0;
    padding: 0;
}
.VH-Tag-info-box{
    width: auto;
    height: 24px;
    padding: 0 9px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    line-height: 1;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    box-sizing: border-box;
    color: #909399;
    border-color: #e9e9eb;
    background-color: #f4f4f5;
}
.VH-Tag-success-box{
    width: auto;
    height: 24px;
    padding: 0 9px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    line-height: 1;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    box-sizing: border-box;
    color: #67c23a;
    border-color: #e1f3d8;
    background-color: #f0f9eb;
}
.VH-Tag-waring-box{
    width: auto;
    height: 24px;
    padding: 0 9px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    line-height: 1;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    box-sizing: border-box;
    color: #e6a23c;
    border-color: #faecd8;
    background-color: #fdf6ec;
}
.VH-Tag-danger-box{
    width: auto;
    height: 24px;
    padding: 0 9px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    line-height: 1;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    box-sizing: border-box;
    color: #f56c6c;
    border-color: #fde2e2;
    background-color: #fef0f0;
}
.VH-Tag-primary-box{
    width: auto;
    height: 24px;
    padding: 0 9px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    line-height: 1;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    box-sizing: border-box;
    color: #409eff;
    border-color: #d9ecff;
    background-color: #ecf5ff;
}
</style>
