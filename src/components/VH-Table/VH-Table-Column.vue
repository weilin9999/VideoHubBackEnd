<template>
    <slot></slot>
</template>

<script lang="ts" setup>
const props = defineProps({
    prop:{
        type: String
    },label:{
        type: String
    },width:{
        type: String
    },
    opname:{
        type: String
    },
});
</script>

<style  scoped>
*{
    margin: 0;
    padding: 0;
}
</style>
