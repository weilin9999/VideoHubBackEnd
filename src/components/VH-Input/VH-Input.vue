<template>
    <div :style="'width:'+width+';'" :class="retClass()">
        <span :class="icon=='' ? '': isAvative ? 'col-right avtive-color '+icon : 'col-right '+icon "></span>
        <!-- textarea -->
        <textarea :style="'height:'+rowHeight+'px'" ref="textarea" v-if="inputType == 'textarea'" :rows="row" tabindex="0" autocomplete="off"  class="textarea__box__vh" :disabled="disabled" autoComplete='true' v-model="valuee"  @input="changeInput" :placeholder="placeholder" @focus="isAvative=true" @blur="isAvative=false"></textarea>
        <!-- input -->
        <input v-else :disabled="disabled" class="input-inner" autoComplete='true' v-model="valuee"  @input="changeInput" :type="inputType" :placeholder="placeholder" @focus="isAvative=true" @blur="isAvative=false">
        <p v-if="tipShow" class="info-box danger-text">{{msg}}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'VH-Input',
    data () {
        return {
            isAvative:false,
            valuee:this.modelValue,
            border_class:'',
            tipShow: this.tip,
            rowHeight: this.textHeight,
        }
    },
    props:{
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
    },
    watch: {
        tip(news,old){
            this.tipShow=news
        },
        modelValue(news,old){
            this.valuee = news
        }
    },
    created(){

    },
    mounted(){
        
    },
    methods:{
        changeInput(){
            if(this.inputEvent == 'onlynumber'){
                let temp = this.valuee
                try {
                    this.valuee = Number(temp.replace(/^(0+)|[^\d]+/g,''))
                } catch (error) {
                    this.valuee = Number(temp.toString().replace(/^(0+)|[^\d]+/g,''))
                }
            }
            if(this.inputType == 'textarea'){
                this.getHeight()
            }
            this.tipShow=false
            this.$emit('update:modelValue',this.valuee);
        },
        retClass(){
            if(this.isAvative){
                if(this.tipShow){
                    if(this.inputType == 'textarea'){
                        this.border_class = 'input-box-normal-textarea danger'
                    }else{
                        this.border_class = 'input-box-normal danger'
                    }
                }else{
                    if(this.inputType == 'textarea'){
                        this.border_class = 'input-box-textarea avtive'
                    }else{
                        this.border_class = 'input-box avtive'
                    }
                }
            }else{
                if(this.tipShow){
                    if(this.inputType == 'textarea'){
                        this.border_class = 'input-box-normal-textarea danger'
                    }else{
                        this.border_class = 'input-box-normal danger'
                    }
                }else{
                    if(this.inputType == 'textarea'){
                        this.border_class = 'input-box-textarea'
                    }else{
                        this.border_class = 'input-box'
                    }
                }
            }
            return this.border_class
        },
        getHeight() {
            let textArea = this.$refs.textarea;
            textArea.style.height = textArea.scrollHeight + "px";
            // if (textArea.scrollHeight < 100) {
            //     textArea.style.height = textArea.scrollHeight + "px";
            // } else {
            //     textArea.style.height = 100 + "px";
            // }
        }
    },
})
</script>

<style  scoped>
*{
    margin: 0;
    padding: 0;
}
.input-box{
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    padding: 0 15px;
    display: flex;
    align-items: center;
    flex-direction: row;
    position: relative;
    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46),outline .25s cubic-bezier(.71,-.46,.29,1.46);
}
.input-box:hover{
    border: 1px solid #409eff;
}
.input-box-textarea{
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    display: flex;
    align-items: center;
    flex-direction: row;
    position: relative;
    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46),outline .25s cubic-bezier(.71,-.46,.29,1.46);
}
.input-box-textarea:hover{
    border: 1px solid #409eff;
}
.input-box-normal{
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    padding: 0 15px;
    display: flex;
    align-items: center;
    flex-direction: row;
    position: relative;
}
.input-box-normal-textarea{
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    display: flex;
    align-items: center;
    flex-direction: row;
    position: relative;
}
.avtive{
    border: 1px solid #409eff;
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
    color: #000;
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
    color: #a8abb2;
}
.col-right{
    margin-right: 8px;
    color: var(--color-regular);
}
.avtive-color{
    color: #409eff;
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
    color: #606266;
    background-color: #fff;
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
