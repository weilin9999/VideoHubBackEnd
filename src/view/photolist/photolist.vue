<template>
    <div class="main__box__scoller__bar">
        <div class="photo-list-box">
            <div class="photo-list-control">
                <div class="photo-list___control__a">
                    <VH-Button width="65px" height="32px" @click="store.resFush" style="margin-left: 10px;margin-right: 10px;" button-type="success"><span class="iconfont icon-shuaxin"></span>刷新</VH-Button>
                    <VH-Confirm :disabled="store.multData[0]==null" width="65px" height="32px" :offset="7" @confirm="deleteGroup" style="font-size: 12px;color:#606266;" desc="是否删除选中数据 ？">
                        <VH-Button :disabled="store.multData[0]==null" width="65px" height="32px" button-type="danger" style="font-size: 12px;" ><span class="mini-icon_col iconfont icon-shanchu"></span> 删除</VH-Button>
                    </VH-Confirm>
                </div>
            </div>

            <VH-Table :list-data="store.listData" @multe-select="store.multSelect">
                <VH-Table-Column prop="pid" label="图片编号"></VH-Table-Column>
                <VH-Table-Column label="图片预览" opname="photoview" width="65px"></VH-Table-Column>
                <VH-Table-Column label="图片类型" opname="sufferp"></VH-Table-Column>
                <VH-Table-Column label="创建时间" opname="createtime" width="150px"></VH-Table-Column>
                <VH-Table-Column label="操作" opname="control"></VH-Table-Column>
                <template v-slot:control="{ index,item }">
                    <div style="display: flex;flex-direction: row;justify-content: center;">
                        <VH-Confirm width="60px" height="25px" @confirm="deletePhoto(item.pid)">
                            <VH-Button width="60px" height="25px" button-type="danger" style="font-size: 12px;" ><span class="mini-icon_col iconfont icon-shanchu"></span> 删除</VH-Button>
                        </VH-Confirm>
                    </div>
                </template>
                <template v-slot:sufferp="{ index,item }">
                    <VH-Tag type="primary" :desc="item.plast"></VH-Tag>
                </template>
                <template v-slot:createtime="{ index,item }">
                    {{retTimeDate(item.create_time)}}
                </template>
                <template v-slot:photoview="{ index,item }">
                    <img class="photoview" @click="store.viewImg(store.photoUrl+'/file/photo/'+item.pid+item.plast)" :src="store.photoUrl+'/file/photo/'+item.pid+item.plast">
                </template>
            </VH-Table>

            <div class="photo-list-bottom" v-if="store.listData[0] != null">
                <VH-Select :close-event="false" width="120" style="height: 32px;font-size: 14px;" placeholder="请选择" @change="store.pageMore" v-model="store.pageSize" :itemData="store.pageListData" label="item" vh-key="key"></VH-Select>
                <VH-Page :all="store.pageAll" :curpage="store.curPage" @gowhere="goWhere" @page="store.onPage" ></VH-Page>
            </div>

            <!-- Alert -->
            <AlertMsg ref="alertMsg"></AlertMsg>

            <!-- photo -->
            <VH-Photo v-if="store.showImgView" :img-src="store.imgViewSrc" @close="store.showImgView=false"></VH-Photo>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import appStore from '@/store';

document.title = 'VideoHub 后台管理 - 分类管理 - 守护无价数据 ~'
const store = appStore.photoList
store.getPhotoData(store.curPage,store.pageSize)

const alertMsg = ref();

function goWhere(e : any){
    let where = e.where
    if(where == 'zero'){
        alertMsg.value.addMsg(
            2,"搜索值只能大于1"
        )
    }else if(where == 'error'){
        alertMsg.value.addMsg(
            2,"输入值有误"
        )
    }else if(where =='nosearch'){
        alertMsg.value.addMsg(
            2,"输入的值大于总页数"
        )
    }else if(where >= 1 ){
        store.goWhere(e)
    }
}
function retTimeDate(e : any){
    return new Date(e).toLocaleString()
}
async function deleteGroup() {
    let result : any = await store.deleteMultFunc()
    if(result != null){
        if(result.type == 1){
            alertMsg.value.addMsg(
                2,"异常错误："+result.data
            )
        }else if(result.type == 2){
            alertMsg.value.addMsg(
                1,result.data
            )
        }else if(result.type == 3){
            alertMsg.value.addMsg(
                2,"未知错误："+result.data
            )
        }
    }
}
async function deletePhoto(e : any) {
    let result : any = await store.deleteFunc(e)
    if(result != null){
        if(result.type == 1){
            alertMsg.value.addMsg(
                2,"异常错误："+result.data
            )
        }else if(result.type == 2){
            alertMsg.value.addMsg(
                1,result.data
            )
        }else if(result.type == 3){
            alertMsg.value.addMsg(
                2,"未知错误："+result.data
            )
        }
    }
}
</script>

<style  scoped>
@import '@/assets/css/photolist.css';
</style>
