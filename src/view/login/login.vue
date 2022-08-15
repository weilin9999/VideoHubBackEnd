<template>
    <div class="main-box">
        <div class="login-box"></div>
        <div class="form-box">
            <div class="form-title">
                <p>后台登录</p>
            </div>
            <form class="form-inner-box">
                <VH-Input width="70%" @keyup.enter="login" :tip="errForm.account" :msg="errForm.accountmsg" v-model="userForm.account" input-type="text" icon="iconfont icon-supplier-ship" placeholder="请输入账号"></VH-Input>
                <VH-Input width="70%" @keyup.enter="login" :tip="errForm.password" :msg="errForm.passwordmsg" v-model="userForm.password" input-type="password" icon="iconfont icon-icomima" placeholder="请输入密码"></VH-Input>
            </form>
            <div class="bottom-box">
                <VH-Button @click="login" width="120px" button-type="primary">登录</VH-Button>
            </div>
        </div>
        <Alert-Msg ref="alertMsg"></Alert-Msg>
    </div>
</template>

<script lang="ts" setup>

import appStore from '@/store';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import VueCookies from 'vue-cookies';
document.title = 'VideoHub 后台登录 ~';

const store = appStore.loginStore;
const router = useRouter();
const { errForm, userForm } = store;
const alertMsg = ref();

onMounted( ()=> {
    let origin = VueCookies.get('origin');
    if(origin != null){
        router.push({ path: '/admin/dashboard' });
    }
});

async function login() {
    let result:any = await store.onLogin();
    if(result != null){
        if(result.type == 1){
            alertMsg.value.addMsg(
                2,"未知错误："+result.data
            );
        }else if(result.type == 2){
           alertMsg.value.addMsg(
                2,"异常错误："+result.data
            );
        }else if(result.type == 3){
            alertMsg.value.addMsg(
                2,result.data
            );
        }else if(result.type == 4){
            VueCookies.set('origin',result.data,60 * 60 * 23);
            router.go(0);
        }
    }
}
</script>

<style scoped>
@import '@/assets/css/login.css';
</style>
