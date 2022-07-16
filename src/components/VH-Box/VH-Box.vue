<template>
    <div :style="'width:'+width+';height:'+height+';'" class="vh-box-main">
        <slot name="header">
            <div v-if="description != ''" class="vh-box-title"><p>{{description}}</p></div>
        </slot>
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'VH-Box',
    data () {
        return {
            
        }
    },
    props:{
        width:{
            type: String,
            default: "420px"
        },
        height:{
            type: String,
            default: "320px"
        },
        description:{
            type: String,
            default: ''
        }
    },
    methods:{
        
    },
})
</script>

<style  scoped>
*{
    margin: 0;
    padding: 0;
}
.vh-box-main{
    background-color: #fff;
    border-radius: 4px;
    transition: .3x;
}
.vh-box-main:hover{
    box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);;
}

.vh-box-title{
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #E3E5E7;
}
</style>
