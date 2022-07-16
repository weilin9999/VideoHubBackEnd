<template>
    <div class="main__box__scoller__bar">
        <div class="user-list-box">
            <div class="user-list-control">
                <div class="user-list___control__a">
                    <div class="user-seach-group">
                        <p>用户编号</p>
                        <VH-Input width="150px" style="height: 30px;" v-model="store.form.uid" input-type="text" placeholder="模糊查询"></VH-Input>
                    </div>
                    <div class="user-seach-group">
                        <p>用户账号</p>
                        <VH-Input width="150px" style="height: 30px;" v-model="store.form.account" input-type="text" placeholder="模糊查询"></VH-Input>
                    </div>
                    <div class="user-seach-group">
                        <p>用户名称</p>
                        <VH-Input width="150px" style="height: 30px;" v-model="store.form.username" input-type="text" placeholder="模糊查询"></VH-Input>
                    </div>
                    <VH-Button width="60px" height="32px" @click="store.goSeach" style="margin-left: 20px;" button-type="primary" >查询</VH-Button>
                    <VH-Button width="60px" height="32px" @click="store.resetSearch" style="margin-left: 10px;" >重置</VH-Button>
                </div>
                <div class="user-list___control__a" style="margin-top: 20px;">
                    <VH-Button width="65px" height="32px" @click="store.resFush" style="margin-left: 10px;" button-type="success"><span class="iconfont icon-shuaxin"></span>刷新</VH-Button>
                    <VH-Button :disabled="store.multData[0]==null" @click="store.openEditMultFunc" width="65px" height="32px" style="font-size: 12px;margin-right: 10px;margin-left: 10px;" button-type="primary"><span class="mini-icon_col iconfont icon-xiugai"></span> 编辑</VH-Button>
                    <VH-Confirm :disabled="store.multData[0]==null" width="65px" height="25px" @confirm="deleteGroup" style="font-size: 12px;color:#606266;" desc="是否删除选中数据 ？">
                        <VH-Button :disabled="store.multData[0]==null" width="65px" height="32px" button-type="danger" style="font-size: 12px;" ><span class="mini-icon_col iconfont icon-shanchu"></span> 删除</VH-Button>
                    </VH-Confirm>
                </div>
            </div>

            <VH-Table :list-data="store.listData" @multe-select="store.multSelect">
                <VH-Table-Column prop="uid" label="用户编号"></VH-Table-Column>
                <VH-Table-Column prop="account" label="用户账号" width="220px"></VH-Table-Column>
                <VH-Table-Column prop="username" label="用户名称" width="220px"></VH-Table-Column>
                <VH-Table-Column label="用户头像" opname="avatar"></VH-Table-Column>
                <VH-Table-Column label="管理员权限" opname="isadmin"></VH-Table-Column>
                <VH-Table-Column label="上传者权限" opname="isuploader"></VH-Table-Column>
                <VH-Table-Column label="创建时间" opname="createtime" width="170px"></VH-Table-Column>
                <VH-Table-Column label="用户状态" opname="state"></VH-Table-Column>
                <VH-Table-Column label="操作" opname="control"></VH-Table-Column>
                <template v-slot:control="{ index,item }">
                    <div style="display: flex;flex-direction: row;justify-content: center;">
                        <VH-Button @click="store.editFunc(item)" width="60px" height="25px" style="font-size: 12px;margin-right: 10px;" button-type="primary"><span class="mini-icon_col iconfont icon-xiugai"></span> 编辑</VH-Button>
                        <VH-Confirm width="60px" height="25px" @confirm="deleteUser(item.uid)">
                            <VH-Button width="60px" height="25px" button-type="danger" style="font-size: 12px;" ><span class="mini-icon_col iconfont icon-shanchu"></span> 删除</VH-Button>
                        </VH-Confirm>
                    </div>
                </template>
                <template v-slot:state="{ index,item }">
                    <VH-Tag :type="item.isdelete == 0 ? 'success':'danger'" :desc="item.isdelete == 0 ? '正常':'销毁'"></VH-Tag>
                </template>
                <template v-slot:avatar="{ index,item }">
                    <img class="user__avatar__box" v-if="item.avatar != '' && item.avatar != null" @click="store.viewImg(store.avatarUrl+'/file/avatar/'+item.avatar)" :src="store.avatarUrl+'/file/avatar/'+item.avatar" onerror="javascript:this.src='/src/assets/img/avatar.png'">
                    <img class="user__avatar__box" v-else @click="store.viewImg('/src/assets/img/avatar.png')" src="@/assets/img/avatar.png">
                </template>
                <template v-slot:isadmin="{ index,item }">
                    <VH-Switch activeValue="1" inactiveValue="0" v-model="item.isadmin" @switch="authorityUserIsadmin(item.uid,$event)"></VH-Switch>
                </template>
                <template v-slot:isuploader="{ index,item }">
                    <VH-Switch activeValue="1" inactiveValue="0" v-model="item.isuploader" @switch="authorityUserIsuploader(item.uid,$event)"></VH-Switch>
                </template>
                <template v-slot:createtime="{ index,item }">
                    {{retTimeDate(item.create_time)}}
                </template>
            </VH-Table>

            <div class="user-list-bottom" v-if="store.listData[0] != null">
                <VH-Select :close-event="false" width="120" style="height: 32px;font-size: 14px;" placeholder="请选择" @change="store.pageMore" v-model="store.pageSize" :itemData="store.pageListData" label="item" vh-key="key"></VH-Select>
                <VH-Page :all="store.pageAll" :curpage="store.curPage" @gowhere="goWhere" @page="store.onPage" ></VH-Page>
            </div>

            <!-- Dialog Edit -->
            <VH-Dialog ref="dialog_edit" title-text="编辑" width="420" height="370" :bg-close="false" v-if="store.editBoxShow" position="fixed" @close="store.closeEditBox">
                <div class="dialog__box__inner">
                    <div class="dialog__inner___interval">
                        <p style="width: 80px;text-align: right;">用户账号</p>
                        <VH-Input width="150px" style="height: 30px;" v-model="store.editForm.account" input-type="text" placeholder="请输入用户账号"></VH-Input>
                    </div>
                    <div class="dialog__inner___interval">
                        <p style="width: 80px;text-align: right;">用户名称</p>
                        <VH-Input width="150px" style="height: 30px;" v-model="store.editForm.username" input-type="text" placeholder="请输入用户名称"></VH-Input>
                    </div>
                    <div class="dialog__inner___interval">
                        <p style="width: 80px;text-align: right;">用户密码</p>
                        <VH-Input width="150px" style="height: 30px;" v-model="store.editForm.password" input-type="text" placeholder="留空则为不更改"></VH-Input>
                    </div>
                    <div class="dialog__inner___interval">
                        <p style="width: 80px;text-align: right;">用户头像</p>
                        <div class="user__avater___box__input">
                            <img v-if="store.editForm.avatar != '' && store.editForm.avatar != null && store.userAvatarTemp == null" class="imageFileInput" :src="store.avatarUrl+'/file/avatar/'+store.editForm.avatar" onerror="javascript:this.src='/src/assets/img/avatar.png'" >
                            <img v-else-if="store.userAvatarTemp == null" class="imageFileInput" src="@/assets/img/avatar.png" >
                            <img v-else class="imageFileInput" :src="store.userAvatarTemp" >
                            <input class="fileInput" type="file" id="file" @change="upload" accept=".jpg,.png,.jpeg">
                        </div>
                    </div>
                </div>
                <div class="dialog___bottom__box">
                    <VH-Button width="60px" height="32px" style="font-size: 14px;margin-right: 10px;" @click="coloseEdit" >取消</VH-Button>
                    <VH-Button width="60px" height="32px" button-type="primary" style="font-size: 14px;" @click="editUserSure">保存</VH-Button>
                </div>
            </VH-Dialog>

            <!-- Dialog Mult -->
            <VH-Dialog ref="dialog_mult_edit" title-text="编辑" width="420" height="370" :bg-close="false" v-if="store.editMultBoxShow" position="fixed" @close="store.closeMultEditBox">
                <div class="dialog__box__inner">
                    <div class="dialog__inner___interval">
                        <p style="width: 80px;text-align: right;">用户账号</p>
                        <VH-Input width="150px" style="height: 30px;" v-model="store.editForm.account" input-type="text" placeholder="请输入用户账号"></VH-Input>
                    </div>
                    <div class="dialog__inner___interval">
                        <p style="width: 80px;text-align: right;">用户名称</p>
                        <VH-Input width="150px" style="height: 30px;" v-model="store.editForm.username" input-type="text" placeholder="请输入用户名称"></VH-Input>
                    </div>
                    <div class="dialog__inner___interval">
                        <p style="width: 80px;text-align: right;">用户密码</p>
                        <VH-Input width="150px" style="height: 30px;" v-model="store.editForm.password" input-type="text" placeholder="留空则为不更改"></VH-Input>
                    </div>
                    <div class="dialog__inner___interval">
                        <p style="width: 80px;text-align: right;">用户头像</p>
                        <div class="user__avater___box__input">
                            <img v-if="store.editForm.avatar != '' && store.editForm.avatar != null && store.userAvatarTemp == null" class="imageFileInput" :src="store.avatarUrl+'/file/avatar/'+store.editForm.avatar" onerror="javascript:this.src='/src/assets/img/avatar.png'" >
                            <img v-else-if="store.userAvatarTemp == null" class="imageFileInput" src="@/assets/img/avatar.png" >
                            <img v-else class="imageFileInput" :src="store.userAvatarTemp" >
                            <input class="fileInput" type="file" id="file" @change="upload" accept=".jpg,.png,.jpeg">
                        </div>
                    </div>
                </div>
                <div class="dialog___bottom__box">
                    <VH-Button width="60px" height="32px" style="font-size: 14px;margin-right: 10px;" @click="coloseMultEdit" >取消</VH-Button>
                    <VH-Button v-if="store.multSite < store.multLength" @click="nextEditFun" width="140px" height="32px" button-type="primary" style="font-size: 14px;" >保存并编辑下一个</VH-Button>
                    <VH-Button v-else width="60px" @click="editUserSureMult" height="32px" button-type="primary" style="font-size: 14px;" >保存</VH-Button>
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
        document.title = 'VideoHub 后台管理 - 用户管理 - 守护无价数据 ~'
        const store = appStore.userList
        store.getUserData('','','',store.curPage,store.pageSize)
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
            this.store.resFushNowPage()
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
        async deleteUser(e) {
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
        async editUserSure() {
            if(this.store.userAvatarData != null){
                this.uploadAvatar()
            }
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
                }else if(result.type == 4){
                    this.$refs.AlertMsg.addMsg(
                        2,"异常出错："+result.data
                    )
                }
            }
        },
        async editUserSureMult(){
            if(this.store.userAvatarData != null){
                this.uploadAvatar()
            }
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
                }else if(result.type == 4){
                    this.$refs.AlertMsg.addMsg(
                        2,"异常出错："+result.data
                    )
                }
            }
        },
        async nextEditFun() {
            if(this.store.userAvatarData != null){
                this.uploadAvatar()
            }
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
                }else if(result.type == 4){
                    this.$refs.AlertMsg.addMsg(
                        2,"异常出错："+result.data
                    )
                }
            }
        },
        async authorityUserIsadmin(uid,e){
            let result = await this.store.changeIsAdmin(uid,e)
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
        async authorityUserIsuploader(uid,e){
            let result = await this.store.changeIsUploader(uid,e)
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
        upload(e){
            let item = e.target.files[0]
            this.store.userAvatarData = item
            //正则表达式，判断每个元素的type属性是否为图片形式，如图
            if (item.type !== 'image/png' && item.type !== 'image/jpeg') {
                // 提示只能是图片，return
                this.$refs.AlertMsg.addMsg(
                    2,"只能选择图片类型为jpg,png格式"
                )
                return;
            }else if(item.type==undefined){
                this.$refs.AlertMsg.addMsg(
					2,"只能选择图片类型为jpg,png格式"
				)
                return;
            }
            // 保存下当前 this ，就是vue实例
            var _this = this;
            _this.filename = item.name
            // 创建一个FileReader()对象，它里面有个readAsDataURL方法
            let reader = new FileReader();
            // readAsDataURL方法可以将上传的图片格式转为base64,然后在存入到图片路径, 
            //这样就可以上传电脑任意位置的图片                            
            reader.readAsDataURL(item);
            //文件读取成功完成时触发
            reader.addEventListener('load',function(){
            //  reader.result返回文件的内容。
            //只有在读取操作完成后，此属性才有效，返回的数据的格式取决于是使用哪种读取方法来执行读取操作的。
                //给数组添加这个文件也就是图片的内容
                _this.store.userAvatarTemp=reader.result
            })
        },
        async uploadAvatar(){
            let result = await this.store.uploadUserAvatar()
            if(result != null){
                if(result.type == 1){
                    this.$refs.AlertMsg.addMsg(
                        2,result.data
                    )
                }else if(result.type == 2){
                    this.$refs.AlertMsg.addMsg(
                        2,result.data
                    )
                }else if(result.type == 3){
                    this.$refs.AlertMsg.addMsg(
                        2,result.data
                    )
                }else if(result.type == 4){
                    this.$refs.AlertMsg.addMsg(
                        2,result.data
                    )
                }else if(result.type == 5){
                    this.$refs.AlertMsg.addMsg(
                        1,result.data
                    )
                }else if(result.type == 6){
                    this.$refs.AlertMsg.addMsg(
                        2,result.data
                    )
                }
            }
        },
    }
})
</script>

<style  scoped>
@import '@/assets/css/userlist.css';
</style>
