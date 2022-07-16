<template>
    <div class="main-box">
        <div class="login-box"></div>
        <div class="form-box">
            <div class="form-title">
                <p>后台登录</p>
            </div>
            <form class="form-inner-box">
                <VH-Input width="70%" @keyup.enter="login" :tip="store.errForm.account" :msg="store.errForm.accountmsg" v-model="store.userForm.account" input-type="text" icon="iconfont icon-supplier-ship" placeholder="请输入账号"></VH-Input>
                <VH-Input width="70%" @keyup.enter="login" :tip="store.errForm.password" :msg="store.errForm.passwordmsg" v-model="store.userForm.password" input-type="password" icon="iconfont icon-icomima" placeholder="请输入密码"></VH-Input>
            </form>
            <div class="bottom-box">
                <VH-Button @click="login" width="120px" button-type="primary">登录</VH-Button>
            </div>
        </div>
        <Alert-Msg ref="AlertMsg"></Alert-Msg>
    </div>
</template>

<script lang="ts">
import appStore from '@/store';
import { defineComponent } from 'vue'
import VueCookies from 'vue-cookies';
document.title = 'VideoHub 后台登录 ~'

export default defineComponent({
    setup(){
        const store = appStore.loginStore;
        return { store }
    },
    mounted(){
        let origin = VueCookies.get('origin')
        if(origin != null){
            this.$router.push({ path: '/admin/dashboard' })
        }
    },
    methods: {
        async login() {
            let result = await this.store.onLogin()
            if(result != null){
                if(result.type == 1){
                    this.$refs.AlertMsg.addMsg(
                        2,"未知错误："+result.data
                    )
                }else if(result.type == 2){
                    this.$refs.AlertMsg.addMsg(
                        2,"异常错误："+result.data
                    )
                }else if(result.type == 3){
                    this.$refs.AlertMsg.addMsg(
                        2,result.data
                    )
                }else if(result.type == 4){
                    VueCookies.set('origin',result.data,60 * 60 * 23)
                    this.$router.go(0)
                }
            }
        }
    }
})
</script>

<style scoped>
@import '@/assets/css/login.css';
</style>
