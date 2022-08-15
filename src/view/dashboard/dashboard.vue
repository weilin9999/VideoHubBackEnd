<template>
    <div class="main__box__scoller__bar">
        <div class="dashboard-list-box">
        <VH-Box width="40%" height="420px" description="磁盘空间占用">
            <div id="drivesData"></div>
        </VH-Box>
        <VH-Box width="23%" height="420px" description="详细信息 / 操作" style="margin-left: 20px;">
            <div class="vh_box_strong_box">
                <div class="vh_box_group">
                    <p style="padding-bottom: 15px;">存储磁盘总位置：{{store.strongData.path}}</p>
                </div>
                <div class="vh_box_group">
                    <p>存储磁盘总空间：{{Math.round(store.strongData.total/1073741824)}} GB</p>
                </div>
                <div class="vh_box_group">
                    <p>存储磁盘已使用空间：{{Math.round(store.strongData.used/1073741824)}} GB</p>
                </div>
                <div class="vh_box_group">
                    <p>存储磁盘剩余空间：{{Math.round(store.strongData.free/1073741824)}} GB</p>
                </div>

                <div class="vh_box_group_switch">
                    <p>存储视频时是否二次编码</p>
                    <VH-Switch class="switch_box" activeValue="2" inactiveValue="1" v-model="store.isSecondSwitch" @switch="changeReCodeStatus"></VH-Switch>
                </div>

            </div>
        </VH-Box>
        <VH-Box width="34%" height="420px" style="margin-left: 20px;">
            <template #header>
                <div class="diy__vh__box_header">
                    <p>登录日志 / 管理</p>
                    <VH-Confirm width="100px" height="35px" :offset="10" color="#f56c6c" style="margin-right: 20px;" icon="iconfont icon-cs-jg-1" desc="是否清空全部登录日志" @confirm="deleteLogs">
                        <VH-Button height="35px" width="100px"><span class="iconfont icon-shanchu" style="padding-right: 5px;"></span> 清空日志</VH-Button>
                    </VH-Confirm>
                </div>
            </template>
            <div class="logs__table__box">
                <VH-Table :list-data="store.logsData" :mult-select="false">
                    <VH-Table-Column prop="username" label="用户名"></VH-Table-Column>
                    <VH-Table-Column prop="ip" label="登录IP"></VH-Table-Column>
                    <VH-Table-Column label="登录时间" opname="createtime"></VH-Table-Column>
                    <template v-slot:createtime="{ index,item }">
                        {{retTimeDate(item.create_time)}}
                    </template>
                </VH-Table>
            </div>
        </VH-Box>
        <Alert-Msg ref="alertMsg"></Alert-Msg>
    </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import appStore from '@/store';
import VHConfirm from '@/components/VH-Confirm/VH-Confirm.vue';

document.title = "VideoHub 后台管理 - 控制台 - 守护无价数据 ~";
const store = appStore.dashboard;
store.getStrongInfo();
store.getReCodeInfo();
store.getLoginLogs();

const alertMsg = ref();

async function changeReCodeStatus(e : any) {
    let result : any = await store.changeReCodeInfo(e);
    if (result != null) {
        if (result.type == 1) {
            alertMsg.value.addMsg(2, "异常错误：" + result.data);
        }
        else if (result.type == 2) {
            alertMsg.value.addMsg(1, result.data);
        }
        else if (result.type == 3) {
            alertMsg.value.addMsg(2, "未知错误：" + result.data);
        }
    }
}
function retTimeDate(e : any){
    return new Date(e).toLocaleString()
}
async function deleteLogs() {
    let result : any = await store.deleteLogs()
    if(result != null){
        if(result.type == 1){
            alertMsg.value.addMsg(
                1,result.data
            )
        }else{
            alertMsg.value.addMsg(
                2,"未知错误："+result.data
            )
        }
    }
}
</script>

<style scoped>
@import '@/assets/css/dashboard.css';
</style>
