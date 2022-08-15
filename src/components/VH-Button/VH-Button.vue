<template>
    <button type="button" aria-disabled="false" :disabled="disabled" :style="'width:'+width+'; height:'+height+';'" :class="buttonStyle()">
        <slot></slot>
    </button>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
const data = reactive({
    buttonClass:''
});
const props = defineProps({
    width: {
        type: String,
        default: '90px'
    },
    height: {
        type: String,
        default: '45px'
    },
    buttonType:{
        type: String,
        default: ''
    },
    disabled:{
        type: Boolean,
        default: false
    }
});
function buttonStyle(){
    if(props.buttonType==''){
        if(props.disabled==true){
            data.buttonClass = 'button-box-norl default-disable'
        }else{
            data.buttonClass = 'button-box'
        }
    }else if(props.buttonType=='primary'){
        if(props.disabled==true){
            data.buttonClass = 'button-box-norl primary-disable'
        }else{
            data.buttonClass = 'button-box primary'
        }
    }else if(props.buttonType=='success'){
        if(props.disabled==true){
            data.buttonClass = 'button-box-norl success-disable'
        }else{
            data.buttonClass = 'button-box success'
        }
    }else if(props.buttonType=='info'){
        if(props.disabled==true){
            data.buttonClass = 'button-box-norl info-disable'
        }else{
            data.buttonClass = 'button-box info'
        }
    }else if(props.buttonType=='waring'){
        if(props.disabled==true){
            data.buttonClass = 'button-box-norl waring-disable'
        }else{
            data.buttonClass = 'button-box waring'
        }
    }else if(props.buttonType=='danger'){
        if(props.disabled==true){
            data.buttonClass = 'button-box-norl danger-disable'
        }else{
            data.buttonClass = 'button-box danger'
        }
    }
    return data.buttonClass
}
</script>

<style  scoped>
*{
    margin: 0;
    padding: 0;
}
.button-box{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    color: var(--color-regular);
    text-align: center;
    box-sizing: border-box;
    outline: none;
    transition: .1s;
    font-weight: 500;
    user-select: none;
    vertical-align: middle;
    -webkit-appearance: none;
    background-color: var(--button-done-background);
    border: 1px solid var(--button-done-border);
    border-color: var(--button-done-border);
    padding: 8px 15px;
    font-size: 14px;
    border-radius: 4px;
}
.button-box:hover, .button-box:focus, .button-box:active {
    color: var(--primary-background);
    border-color: var(--primary-border);
    background-color: var(--primary-color);
    outline: none;
}
.button-box-norl{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    color: var(--color-regular);
    text-align: center;
    box-sizing: border-box;
    outline: none;
    transition: .1s;
    font-weight: 500;
    user-select: none;
    vertical-align: middle;
    -webkit-appearance: none;
    background-color: var(--button-done-background);
    border: 1px solid var(--button-done-border);
    border-color: var(--button-done-border);
    padding: 8px 15px;
    font-size: 14px;
    border-radius: 4px;
}
.default-disable{
    color: var(--button-disable-color);
    cursor: not-allowed;
    background-image: none;
    background-color: var(--button-done-background);
    border-color: var(--button-disable-border);
}
.primary{
    color: var(--button-text-color);
    background-color: var(--primary-background);
    border: 1px solid var(--button-done-border);
    border-color: var(--primary-background); 
}
.primary:hover, .primary:focus, .primary:active{
    color: var(--button-text-color);
    border-color: var(--primary-focus-color);
    background-color: var(--primary-focus-color);
    outline: none;
}
.primary-disable{
    color: var(--button-text-color);
    cursor: not-allowed;
    background-image: none;
    background-color: var(--primary-disable-color);
    border-color: var(--primary-disable-color);
}
.success{
    color: var(--button-text-color);
    background-color: var(--success-color);
    border: 1px solid var(--button-done-border);
    border-color: var(--success-color); 
}
.success:hover, .success:focus, .success:active{
    color: var(--button-text-color);
    border-color: var(--success-focus-color);
    background-color: var(--success-focus-color);
    outline: none;
}
.success-disable{
    color: var(--button-text-color);
    cursor: not-allowed;
    background-image: none;
    background-color: var(--success-disable-color);
    border-color: var(--success-disable-color);
}
.info{
    color: var(--button-text-color);
    background-color: var(--info-background);
    border: 1px solid var(--button-done-border);
    border-color: var(--info-background); 
}
.info:hover, .info:focus, .info:active{
    color: var(--button-text-color);
    border-color: var(--info-broder);
    background-color: var(--info-broder);
    outline: none;
}
.info-disable{
    color: var(--button-text-color);
    cursor: not-allowed;
    background-image: none;
    background-color: var(--info-disable);
    border-color: var(--info-disable);
}
.waring{
    color: var(--button-text-color);
    background-color: var(--waring-color);
    border: 1px solid var(--button-done-border);
    border-color: var(--waring-color); 
}
.waring:hover, .waring:focus, .waring:active{
    color: var(--button-text-color);
    border-color: var(--waring-focus);
    background-color: var(--waring-focus);
    outline: none;
}
.waring-disable{
    color: var(--button-text-color);
    cursor: not-allowed;
    background-image: none;
    background-color: var(--waring-disable);
    border-color: var(--waring-disable);
}
.danger{
    color: var(--button-text-color);
    background-color: var(--danger-color);
    border: 1px solid var(--button-done-border);
    border-color: var(--danger-color); 
}
.danger:hover, .danger:focus, .danger:active{
    color: var(--button-text-color);
    border-color: var(--danger-focus);
    background-color: var(--danger-focus);
    outline: none;
}
.danger-disable{
    color: var(--button-text-color);
    cursor: not-allowed;
    background-image: none;
    background-color: var(--danger-disable);
    border-color: var(--danger-disable);
}
</style>
