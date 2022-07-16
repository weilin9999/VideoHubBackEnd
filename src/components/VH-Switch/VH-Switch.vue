<template>
    <div class="vh__switch__box">
        <p :style="isSwitch ? '':'color:#409eff;'">否</p> <input type="checkbox" class="switch" v-model="isSwitch" @change="selectCheck" > <p :style="isSwitch ? 'color:#409eff;':''">是</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'VH-Switch',
    data () {
        return {
            isSwitch:false
        }
    },
    props:{
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
    },
    created(){
        if(this.modelValue != this.activeValue){
            this.isSwitch = false
        }else{
            this.isSwitch= true
        }
    },
    watch:{
        modelValue(news,olds){
            if(news != this.activeValue){
                this.isSwitch = false
            }else{
                this.isSwitch= true
            }
        }
    },
    methods:{
        selectCheck(){
            if(this.isSwitch){
                this.$emit('switch',this.activeValue)
            }else{
                this.$emit('switch',this.inactiveValue)
            }
        }
    },
})
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
    background: #ccc;
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
    background: #fff;
    box-shadow: 0, 0, 2px, #999;
    transition: .4s;
    top: 2px;
    position: absolute;
    left: 2px;
}

input[type='checkbox'].switch:checked {
    background: rgb(19, 206, 102);
}

input[type='checkbox'].switch:checked::after {
    content: '';
    position: absolute;
    left: 55%;
    top: 2px;
}

</style>
