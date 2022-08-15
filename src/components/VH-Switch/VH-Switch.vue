<template>
    <div class="vh__switch__box">
        <p :style="data.isSwitch ? '':'color:#409eff;'">否</p> <input type="checkbox" class="switch" v-model="data.isSwitch" @change="selectCheck" > <p :style="data.isSwitch ? 'color:#409eff;':''">是</p>
    </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
const data = reactive({
    isSwitch:false
});

const props = defineProps({
    activeValue:{
        type:String,
        default:'1'
    },
    inactiveValue:{
        type:String,
        default:'0'
    },
    modelValue:{
        type:null,
        default: '0'
    },
});

const emit = defineEmits(['switch']);
   
if(props.modelValue != props.activeValue){
    data.isSwitch = false
}else{
    data.isSwitch= true
}

watch(()=>props.modelValue,(news)=>{
    if(news != props.activeValue){
        data.isSwitch = false
    }else{
        data.isSwitch= true
    }
});

function selectCheck(){
    if(data.isSwitch){
        emit('switch',props.activeValue)
    }else{
        emit('switch',props.inactiveValue)
    }
}
</script>

<style  scoped>
*{
    margin: 0;
    padding: 0;
}
.vh__switch__box{
    display: flex;
    align-items: center;
    transition: color .3s;
}
.vh__switch__box p{
    padding: 0 5px;
    box-sizing: border-box;
}
input[type='checkbox'].switch {
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    position: relative;
    width: 40px;
    height: 20px;
    background: var(--switch-background);
    border-radius: 10px;
    transition: border-color .3s, background-color .3s;
    cursor: pointer;
}

input[type='checkbox'].switch::after {
    content: '';
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: var(--switch-after-background);
    box-shadow: 0, 0, 2px, var(--switch-after-border);
    transition: .4s;
    top: 2px;
    position: absolute;
    left: 2px;
}

input[type='checkbox'].switch:checked {
    background: var(--switch-checked);
}

input[type='checkbox'].switch:checked::after {
    content: '';
    position: absolute;
    left: 55%;
    top: 2px;
}

</style>
