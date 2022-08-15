<template>
    <div :style="'width:'+props.width+';'" :class="retClass()">
        <span :class="props.icon=='' ? '': data.isAvative ? 'col-right avtive-color '+props.icon : 'col-right '+props.icon "></span>
        <!-- textarea -->
        <textarea :style="'height:'+data.rowHeight+'px'" ref="textarea" v-if="props.inputType == 'textarea'" :rows="props.row" tabindex="0" autocomplete="off"  class="textarea__box__vh" :disabled="props.disabled" autoComplete='true' v-model="data.valuee"  @input="changeInput" :placeholder="props.placeholder" @focus="data.isAvative=true" @blur="data.isAvative=false"></textarea>
        <!-- input -->
        <input v-else :disabled="props.disabled" class="input-inner" autoComplete='true' v-model="data.valuee"  @input="changeInput" :type="props.inputType" :placeholder="props.placeholder" @focus="data.isAvative=true" @blur="data.isAvative=false">
        <p v-if="data.tipShow" class="info-box danger-text">{{props.msg}}</p>
    </div>
</template>

<script lang="ts" setup>
import { reactive, watch, ref } from 'vue'

const textarea = ref();

const props = defineProps({
    width: {
        type: String,
        default: '220px'
    },
    inputType: {
        type: String,
        default: 'text'  
    },
    placeholder: {
        type: String,
        default: ''  
    },
    icon: {
        type: String,
        default: ''
    },
    modelValue:{
        type: null,
        default: ''
    },
    msg: {
        type: String,
        default: ''
    },
    tip: {
        type: Boolean,
        default: false
    },
    inputEvent:{
        type: String,
        default: ''
    },
    disabled:{
        type: Boolean,
        default: false
    },
    row:{
        type: String,
        default: '1'
    },
    textHeight:{
        type: String,
        default: '34'
    }
});

const emit = defineEmits(['update:modelValue'])

const data = reactive({
    isAvative:false,
    valuee:props.modelValue,
    border_class:'',
    tipShow: props.tip,
    rowHeight: props.textHeight
});

watch(() => props.tip, (newValue) => {
    data.tipShow=newValue
});
watch(() => props.modelValue, (newValue) => {
    data.valuee=newValue
});

function changeInput(){
    if(props.inputEvent == 'onlynumber'){
        let temp = data.valuee
        try {
            data.valuee = Number(temp.replace(/^(0+)|[^\d]+/g,''))
        } catch (error) {
            data.valuee = Number(temp.toString().replace(/^(0+)|[^\d]+/g,''))
        }
    }
    if(props.inputType == 'textarea'){
        getHeight()
    }
    data.tipShow=false
    emit('update:modelValue',data.valuee);
}

function retClass(){
    if(data.isAvative){
        if(data.tipShow){
            if(props.inputType == 'textarea'){
                data.border_class = 'input-box-normal-textarea danger'
            }else{
                data.border_class = 'input-box-normal danger'
            }
        }else{
            if(props.inputType == 'textarea'){
                data.border_class = 'input-box-textarea avtive'
            }else{
                data.border_class = 'input-box avtive'
            }
        }
    }else{
        if(data.tipShow){
            if(props.inputType == 'textarea'){
                data.border_class = 'input-box-normal-textarea danger'
            }else{
                data.border_class = 'input-box-normal danger'
            }
        }else{
            if(props.inputType == 'textarea'){
                data.border_class = 'input-box-textarea'
            }else{
                data.border_class = 'input-box'
            }
        }
    }
    return data.border_class
}

function getHeight() {
    let textArea = textarea;
    textArea.value.style.height = textArea.value.scrollHeight + "px";
    // if (textArea.scrollHeight < 100) {
    //     textArea.style.height = textArea.scrollHeight + "px";
    // } else {
    //     textArea.style.height = 100 + "px";
    // }
}
</script>

<style  scoped>
*{
    margin: 0;
    padding: 0;
}
.input-box{
    border-radius: 4px;
    border: 1px solid var(--input-box-border);
    padding: 0 15px;
    display: flex;
    align-items: center;
    flex-direction: row;
    position: relative;
    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46),outline .25s cubic-bezier(.71,-.46,.29,1.46);
}
.input-box:hover{
    border: 1px solid var(--input-box-border-hover);
}
.input-box-textarea{
    border-radius: 4px;
    border: 1px solid var(--input-box-border);
    display: flex;
    align-items: center;
    flex-direction: row;
    position: relative;
    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46),outline .25s cubic-bezier(.71,-.46,.29,1.46);
}
.input-box-textarea:hover{
    border: 1px solid var(--input-box-border-hover);
}
.input-box-normal{
    border-radius: 4px;
    border: 1px solid var(--input-box-border);
    padding: 0 15px;
    display: flex;
    align-items: center;
    flex-direction: row;
    position: relative;
}
.input-box-normal-textarea{
    border-radius: 4px;
    border: 1px solid var(--input-box-border);
    display: flex;
    align-items: center;
    flex-direction: row;
    position: relative;
}
.avtive{
    border: 1px solid  var(--input-box-border-hover);
}
.danger{
    border: 1px solid var(--danger);
}
.danger-text{
    color: var(--danger);
}
.info-box{
    font-size: 5px;
    position: absolute;
    left: 5px;
    bottom: -20px;
}
.input-inner{
    width: 100%;
    flex-grow: 1;
    -webkit-appearance: none;
    color: var(--input-box-text-color);
    font-size: inherit;
    height: 40px;
    line-height: 29px;
    padding: 0;
    outline: 0;
    border: none;
    background: 0 0;
    box-sizing: border-box;
    font-size: 14px;
}
.input-inner::placeholder{
    color: var(--input-box-placeholder);
}
.col-right{
    margin-right: 8px;
    color: var(--color-regular);
}
.avtive-color{
    color: var(--input-box-avtive);
}
.textarea__box__vh{
    position: relative;
    display: block;
    resize: vertical;
    padding: 5px 11px;
    line-height: 1.5;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    font-family: inherit;
    color: var(--input-box-vh);
    background-color: var(--input-box-vh-background);
    background-image: none;
    -webkit-appearance: none;
    border-radius: 4px;
    border: none;
    touch-action: manipulation;
    overflow: auto;
    min-height: 34px;
}
.textarea__box__vh:focus{
    outline: none;
}
</style>
