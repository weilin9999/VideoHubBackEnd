<template>
    <button type="button" aria-disabled="false" :disabled="disabled" :style="'width:'+width+'; height:'+height+';'" :class="buttonStyle()">
        <slot></slot>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'VH-Button',
    data () {
        return {
            buttonClass:'',
        }
    },
    props:{
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
    },
    methods:{
        buttonStyle(){
            if(this.buttonType==''){
                if(this.disabled==true){
                    this.buttonClass = 'button-box-norl default-disable'
                }else{
                    this.buttonClass = 'button-box'
                }
            }else if(this.buttonType=='primary'){
                if(this.disabled==true){
                    this.buttonClass = 'button-box-norl primary-disable'
                }else{
                    this.buttonClass = 'button-box primary'
                }
            }else if(this.buttonType=='success'){
                if(this.disabled==true){
                    this.buttonClass = 'button-box-norl success-disable'
                }else{
                    this.buttonClass = 'button-box success'
                }
            }else if(this.buttonType=='info'){
                if(this.disabled==true){
                    this.buttonClass = 'button-box-norl info-disable'
                }else{
                    this.buttonClass = 'button-box info'
                }
            }else if(this.buttonType=='waring'){
                if(this.disabled==true){
                    this.buttonClass = 'button-box-norl waring-disable'
                }else{
                    this.buttonClass = 'button-box waring'
                }
            }else if(this.buttonType=='danger'){
                if(this.disabled==true){
                    this.buttonClass = 'button-box-norl danger-disable'
                }else{
                    this.buttonClass = 'button-box danger'
                }
            }
            return this.buttonClass
        },
    },
})
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
    background-color: #fff;
    border: 1px solid #dcdfe6;
    border-color: #dcdfe6;
    padding: 8px 15px;
    font-size: 14px;
    border-radius: 4px;
}
.button-box:hover, .button-box:focus, .button-box:active {
    color: #409EFF;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
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
    background-color: #fff;
    border: 1px solid #dcdfe6;
    border-color: #dcdfe6;
    padding: 8px 15px;
    font-size: 14px;
    border-radius: 4px;
}
.default-disable{
    color: #a8abb2;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #e4e7ed;
}
.primary{
    color: #fff;
    background-color: #409eff;
    border: 1px solid #dcdfe6;
    border-color: #409eff; 
}
.primary:hover, .primary:focus, .primary:active{
    color: #fff;
    border-color: #79bbff;
    background-color: #79bbff;
    outline: none;
}
.primary-disable{
    color: #fff;
    cursor: not-allowed;
    background-image: none;
    background-color: #a0cfff;
    border-color: #a0cfff;
}
.success{
    color: #fff;
    background-color: #67c23a;
    border: 1px solid #dcdfe6;
    border-color: #67c23a; 
}
.success:hover, .success:focus, .success:active{
    color: #fff;
    border-color: #95d475;
    background-color: #95d475;
    outline: none;
}
.success-disable{
    color: #fff;
    cursor: not-allowed;
    background-image: none;
    background-color: #b3e19d;
    border-color: #b3e19d;
}
.info{
    color: #fff;
    background-color: #909399;
    border: 1px solid #dcdfe6;
    border-color: #909399; 
}
.info:hover, .info:focus, .info:active{
    color: #fff;
    border-color: #b1b3b8;
    background-color: #b1b3b8;
    outline: none;
}
.info-disable{
    color: #fff;
    cursor: not-allowed;
    background-image: none;
    background-color: #c9c9cc;
    border-color: #c9c9cc;
}
.waring{
    color: #fff;
    background-color: #e6a23c;
    border: 1px solid #dcdfe6;
    border-color: #e6a23c; 
}
.waring:hover, .waring:focus, .waring:active{
    color: #fff;
    border-color: #eebe77;
    background-color: #eebe77;
    outline: none;
}
.waring-disable{
    color: #fff;
    cursor: not-allowed;
    background-image: none;
    background-color: #f3d19c;
    border-color: #f3d19c;
}
.danger{
    color: #fff;
    background-color: #f56c6c;
    border: 1px solid #dcdfe6;
    border-color: #f56c6c; 
}
.danger:hover, .danger:focus, .danger:active{
    color: #fff;
    border-color: #f89898;
    background-color: #f89898;
    outline: none;
}
.danger-disable{
    color: #fff;
    cursor: not-allowed;
    background-image: none;
    background-color: #fab6b6;
    border-color: #fab6b6;
}
</style>
