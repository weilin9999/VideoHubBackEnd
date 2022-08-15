<template>
    <div :style="'font-size: '+props.fontSize+';width: '+props.width+';height: '+props.height+';'" :class="retStyle()">
        {{props.desc}}
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
const data = reactive({
    classStyle:'VH-Tag-primary-box'
});
const props = defineProps({
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
});

function retStyle(){
    if(props.type == 'primary'){
        data.classStyle='VH-Tag-primary-box'
    }else if(props.type == 'danger'){
        data.classStyle='VH-Tag-danger-box'
    }else if(props.type == 'waring'){
        data.classStyle='VH-Tag-waring-box'
    }else if(props.type == 'success'){
        data.classStyle='VH-Tag-success-box'
    }else{
        data.classStyle='VH-Tag-info-box'
    }
    return data.classStyle
}
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
    color: var(--info-background);
    border-color: var(--info-tag-broder);
    background-color: var(--info-tag-background);
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
    color: var(--success-color);
    border-color: var(--success-border);
    background-color: var(--success-background);
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
    color: var(--waring-color);
    border-color: var(--waring-border);
    background-color: var(--waring-background);
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
    color: var(--danger-color);
    border-color: var(--danger-border);
    background-color: var(--danger-background);
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
    color: var(--primary-background);
    border-color: var(--primary-tag-border);
    background-color: var(--primary-color);
}
</style>
