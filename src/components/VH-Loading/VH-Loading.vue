<template>
    <div class="loading__box__showing">
        <svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none"></circle></svg>
    </div>
</template>

<script lang="ts" setup>
</script>

<style  scoped>
*{
    margin: 0;
    padding: 0;
}
.loading__box__showing{
    width:50px;
    height:50px;
    user-select: none;
}
.circular {
    display: inline;
    height: 50px;
    width: 50px;
    animation: loading-rotate 2s linear infinite;
    -webkit-animation: loading-rotate 2s linear infinite;
}
.path {
    animation: loading-dash 1.5s ease-in-out infinite;
    -webkit-animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90,150;
    stroke-dashoffset: 0;
    stroke-width: 5;
    stroke: var(--loadding-path);
    stroke-linecap: round;
}
@keyframes loading-rotate{to{transform:rotate(360deg)}}
@-webkit-keyframes loading-rotate{to{transform:rotate(360deg)}}
@keyframes loading-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-40px}to{stroke-dasharray:90,150;stroke-dashoffset:-120px}}
@-webkit-keyframes loading-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-40px}to{stroke-dasharray:90,150;stroke-dashoffset:-120px}}
</style>
