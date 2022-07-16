<template>
    <slot></slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'VH-Table-Column',
    data () {
        return {
            
        }
    },
    props:{
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
</style>
