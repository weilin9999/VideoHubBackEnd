<template>
    <div :style="'width:'+width+';height:'+height+';'" class="vh-box-main">
        <slot name="header">
            <div v-if="description != ''" class="vh-box-title"><p>{{description}}</p></div>
        </slot>
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
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
});
</script>

<style  scoped>
*{
    margin: 0;
    padding: 0;
}
.vh-box-main{
    background-color: var(--box-background);
    border-radius: 4px;
    transition: .3x;
}
.vh-box-main:hover{
    box-shadow: 0px 0px 12px var(--box-shadow);
}

.vh-box-title{
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    border-bottom: 1px solid var(--box-title);
}
</style>
