<template>
    <div class="main__box__scoller__bar">
        <div class="video-list-box">
            <div class="video-list-control">
                <div class="video-list___control__a">
                    <div class="video-seach-group">
                        <p>视频编号</p>
                        <VH-Input width="150px" style="height: 30px;" v-model="store.form.vid" input-type="text" placeholder="模糊查询"></VH-Input>
                    </div>
                    <div class="video-seach-group">
                        <p>视频简介</p>
                        <VH-Input width="150px" style="height: 30px;" v-model="store.form.detail" input-type="text" placeholder="模糊查询"></VH-Input>
                    </div>
                    <div class="video-seach-group">
                        <p>视频所属分类</p>
                        <VH-Select width="170" style="height: 32px;font-size: 14px;" placeholder="请选择" v-model="store.form.cid" :itemData="store.itemData" label="classname" vh-key="cid"></VH-Select>
                    </div>
                    <VH-Button width="60px" height="32px" @click="store.goSeach" style="margin-left: 20px;" button-type="primary" >查询</VH-Button>
                    <VH-Button width="60px" height="32px" @click="store.resetSearch" style="margin-left: 10px;" >重置</VH-Button>
                </div>
                <div class="video-list___control__a" style="margin-top: 20px;">
                    <VH-Button width="65px" height="32px" @click="store.resFush" style="margin-left: 10px;" button-type="success"><span class="iconfont icon-shuaxin"></span>刷新</VH-Button>
                    <VH-Button :disabled="store.multData[0]==null" @click="store.openEditMultFunc" width="65px" height="32px" style="font-size: 12px;margin-right: 10px;margin-left: 10px;" button-type="primary"><span class="mini-icon_col iconfont icon-xiugai"></span> 编辑</VH-Button>
                    <VH-Confirm :disabled="store.multData[0]==null" width="65px" height="25px" @confirm="deleteGroup" style="font-size: 12px;color:#606266;" desc="是否删除选中数据 ？">
                        <VH-Button :disabled="store.multData[0]==null" width="65px" height="32px" button-type="danger" style="font-size: 12px;" ><span class="mini-icon_col iconfont icon-shanchu"></span> 删除</VH-Button>
                    </VH-Confirm>
                    <div class="video-seach-group">
                        <p>分类</p>
                        <VH-Select width="170" style="height: 32px;font-size: 14px;" placeholder="请选择" v-model="store.selectCid" :itemData="store.itemData" label="classname" vh-key="cid"></VH-Select>
                    </div>
                    <VH-Button :disabled="store.multData[0]==null" width="75px" height="32px" @click="editVideoCidMult" style="margin-left: 10px;" button-type="primary">批量修改</VH-Button>
                    <VH-Button width="115px" height="32px" @click="store.getNoCidVideoData" style="margin-left: 10px;" button-type="success">查询未分类视频</VH-Button>
                </div>
            </div>

            <VH-Table :list-data="store.listData" @multe-select="store.multSelect">
                <VH-Table-Column prop="vid" label="视频编号"></VH-Table-Column>
                <VH-Table-Column prop="detail" label="视频简介" width="220px"></VH-Table-Column>
                <VH-Table-Column label="视频封面" opname="cover" width="65px"></VH-Table-Column>
                <VH-Table-Column prop="watch" label="视频播放量"></VH-Table-Column>
                <VH-Table-Column prop="vtime" label="视频时长"></VH-Table-Column>
                <VH-Table-Column label="视频所属分类" opname="classname"></VH-Table-Column>
                <VH-Table-Column label="创建时间" opname="createtime" width="150px"></VH-Table-Column>
                <VH-Table-Column label="视频状态" opname="state"></VH-Table-Column>
                <VH-Table-Column label="操作" opname="control"></VH-Table-Column>
                <template v-slot:control="{ index,item }">
                    <div style="display: flex;flex-direction: row;justify-content: center;">
                        <VH-Button @click="store.editFunc(item)" width="60px" height="25px" style="font-size: 12px;margin-right: 10px;" button-type="primary"><span class="mini-icon_col iconfont icon-xiugai"></span> 编辑</VH-Button>
                        <VH-Confirm width="60px" height="25px" @confirm="deleteVideo(item.vid)">
                            <VH-Button width="60px" height="25px" button-type="danger" style="font-size: 12px;" ><span class="mini-icon_col iconfont icon-shanchu"></span> 删除</VH-Button>
                        </VH-Confirm>
                    </div>
                </template>
                <template v-slot:state="{ index,item }">
                    <VH-Tag :type="item.isdelete == 0 ? 'success':'danger'" :desc="item.isdelete == 0 ? '正常':'销毁'"></VH-Tag>
                </template>
                <template v-slot:createtime="{ index,item }">
                    {{retTimeDate(item.create_time)}}
                </template>
                <template v-slot:classname="{ index,item }">
                    {{store.retClassTag(item.cid)}}
                </template>
                <template v-slot:cover="{ index,item }">
                    <img class="video__cover__box" @click="store.viewImg(store.coverUrl+'/file/cover/'+item.vid+'.png')" :src="store.coverUrl+'/file/cover/'+item.vid+'.png'">
                </template>
            </VH-Table>

            <div class="video-list-bottom" v-if="store.listData[0] != null">
                <VH-Select :close-event="false" width="110" style="height: 32px;font-size: 14px;" placeholder="请选择" @change="store.pageMore" v-model="store.pageSize" :itemData="store.pageListData" label="item" vh-key="key"></VH-Select>
                <VH-Page :all="store.pageAll" :curpage="store.curPage" @gowhere="goWhere" @page="store.onPage" ></VH-Page>
            </div>

            <!-- Dialog Edit -->
            <VH-Dialog ref="dialog_edit" title-text="编辑" width="520" height="500" :bg-close="false" v-if="store.editBoxShow" position="fixed" @close="store.closeEditBox">
                <div class="dialog__box__inner">
                    <div class="dialog__inner___interval">
                        <p style="width: 80px;text-align: right;">视频编号</p>
                        <VH-Tag type="primary" :desc="store.editForm.vid"></VH-Tag>
                    </div>
                    <div class="dialog__inner___interval">
                        <p style="width: 80px;text-align: right;">视频简介</p>
                        <VH-Input text-height="64" width="380px" style="font-size: 14px;" v-model="store.editForm.detail" input-type="textarea" placeholder="请输入视频简介"></VH-Input>
                    </div>
                    <div class="dialog__inner___interval">
                        <p style="width: 80px;text-align: right;">视频所属分类</p>
                        <VH-Select width="170" style="height: 32px;font-size: 14px;" placeholder="请选择" v-model="store.editForm.cid" :itemData="store.itemData" label="classname" vh-key="cid"></VH-Select>
                    </div>
                </div>
                <div class="dialog___bottom__box">
                    <VH-Button width="60px" height="32px" style="font-size: 14px;margin-right: 10px;" @click="coloseEdit" >取消</VH-Button>
                    <VH-Button width="60px" height="32px" button-type="primary" style="font-size: 14px;" @click="editVideoSure" >保存</VH-Button>
                </div>
            </VH-Dialog>

            <!-- Dialog Mult -->
            <VH-Dialog ref="dialog_mult_edit" title-text="编辑" width="520" height="600" :bg-close="false" v-if="store.editMultBoxShow" position="fixed" @close="store.closeMultEditBox">
                <div class="dialog__box__inner">
                    <div class="dialog__inner___interval">
                        <p style="width: 80px;text-align: right;">视频编号</p>
                        <VH-Tag type="primary" :desc="store.editForm.vid"></VH-Tag>
                    </div>
                    <div class="dialog__inner___interval">
                        <p style="width: 80px;text-align: right;">视频简介</p>
                        <VH-Input text-height="64" width="380px" style="font-size: 14px;" v-model="store.editForm.detail" input-type="textarea" placeholder="请输入视频简介"></VH-Input>
                    </div>
                    <div class="dialog__inner___interval">
                        <p style="width: 80px;text-align: right;">视频所属分类</p>
                        <VH-Select width="170" style="height: 32px;font-size: 14px;" placeholder="请选择" v-model="store.editForm.cid" :itemData="store.itemData" label="classname" vh-key="cid"></VH-Select>
                    </div>
                </div>
                <div class="dialog___bottom__box">
                    <VH-Button width="60px" height="32px" style="font-size: 14px;margin-right: 10px;" @click="coloseMultEdit" >取消</VH-Button>
                    <VH-Button v-if="store.multSite < store.multLength" @click="nextEditFun" width="140px" height="32px" button-type="primary" style="font-size: 14px;" >保存并编辑下一个</VH-Button>
                    <VH-Button v-else width="60px" @click="editVideoSureMult" height="32px" button-type="primary" style="font-size: 14px;" >保存</VH-Button>
                </div>
            </VH-Dialog>

            <!-- Alert -->
            <AlertMsg ref="AlertMsg"></AlertMsg>

            <!-- photo -->
            <VH-Photo v-if="store.showImgView" :img-src="store.imgViewSrc" @close="store.showImgView=false"></VH-Photo>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import appStore from '@/store';

export default defineComponent({
    setup(){
        document.title = 'VideoHub 后台管理 - 视频管理 - 守护无价数据 ~'
        const store = appStore.videoList
        store.getVideoData('','','',store.curPage,store.pageSize)
        store.getClassData()
        return { store }
    },
    mounted() {

    },
    methods: {
        goWhere(e){
			let where = e.where
			if(where == 'zero'){
				this.$refs.AlertMsg.addMsg(
					2,"搜索值只能大于1"
				)
			}else if(where == 'error'){
				this.$refs.AlertMsg.addMsg(
					2,"输入值有误"
				)
			}else if(where =='nosearch'){
				this.$refs.AlertMsg.addMsg(
					2,"输入的值大于总页数"
				)
			}else if(where >= 1 ){
				this.store.goWhere(e)
			}
		},
        coloseEdit(){
            this.$refs.dialog_edit.close()
        },
        coloseMultEdit(){
            this.$refs.dialog_mult_edit.close()
            this.store.resFushNotClass()
        },
        retTimeDate(e){
            return new Date(e).toLocaleString()
        },
        async deleteGroup() {
            let result = await this.store.deleteMultFunc()
            if(result != null){
                if(result.type == 1){
                    this.$refs.AlertMsg.addMsg(
                        2,"异常错误："+result.data
                    )
                }else if(result.type == 2){
                    this.$refs.AlertMsg.addMsg(
                        1,result.data
                    )
                }else if(result.type == 3){
                    this.$refs.AlertMsg.addMsg(
                        2,"未知错误："+result.data
                    )
                }
            }
        },
        async deleteVideo(e) {
            let result = await this.store.deleteFunc(e)
            if(result != null){
                if(result.type == 1){
                    this.$refs.AlertMsg.addMsg(
                        2,"异常错误："+result.data
                    )
                }else if(result.type == 2){
                    this.$refs.AlertMsg.addMsg(
                        1,result.data
                    )
                }else if(result.type == 3){
                    this.$refs.AlertMsg.addMsg(
                        2,"未知错误："+result.data
                    )
                }
            }
        },
        async editVideoSureMult(){
            let result = await this.store.editSure()
            if(result != null){
                if(result.type == 1){
                    this.$refs.AlertMsg.addMsg(
                        2,"异常错误："+result.data
                    )
                }else if(result.type == 2){
                    this.$refs.AlertMsg.addMsg(
                        1,result.data
                    )
                    this.coloseMultEdit()
                }else if(result.type == 3){
                    this.$refs.AlertMsg.addMsg(
                        2,"未知错误："+result.data
                    )
                }
            }
        },
        async editVideoSure() {
            let result = await this.store.editSure()
            if(result != null){
                if(result.type == 1){
                    this.$refs.AlertMsg.addMsg(
                        2,"异常错误："+result.data
                    )
                }else if(result.type == 2){
                    this.$refs.AlertMsg.addMsg(
                        1,result.data
                    )
                    this.coloseEdit()
                }else if(result.type == 3){
                    this.$refs.AlertMsg.addMsg(
                        2,"未知错误："+result.data
                    )
                }
            }
        },
        async nextEditFun() {
            let result = await this.store.editMultSure()
            if(result != null){
                if(result.type == 1){
                    this.$refs.AlertMsg.addMsg(
                        2,"异常错误："+result.data
                    )
                }else if(result.type == 2){
                    this.$refs.AlertMsg.addMsg(
                        1,result.data
                    )
                    this.store.editMultNextFunc()
                }else if(result.type == 3){
                    this.$refs.AlertMsg.addMsg(
                        2,"未知错误："+result.data
                    )
                }
            }
        },
        async editVideoCidMult() {
            let result = await this.store.batchCid()
            if(result != null){
                if(result.type == 1){
                    this.$refs.AlertMsg.addMsg(
                        2,"异常错误："+result.data
                    )
                }else if(result.type == 2){
                    this.$refs.AlertMsg.addMsg(
                        1,result.data
                    )
                }else if(result.type == 3){
                    this.$refs.AlertMsg.addMsg(
                        2,"未知错误："+result.data
                    )
                }
            }
        },
    }
})
</script>

<style  scoped>
@import '@/assets/css/videolist.css';
</style>
