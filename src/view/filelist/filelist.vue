<template>
    <div class="main__box__scoller__bar">
        <div class="file-list-box">
            <div class="file__option__box">
                <div class="option__group">
                    <p>操作</p>
                    <VH-Select :close-event="false" width="150" style="height: 32px;font-size: 14px;" placeholder="请选择" @change="store.changeModel" v-model="store.select" :itemData="store.siteList" label="item" vh-key="key"></VH-Select>
                </div>
                <div v-if="store.upBox" class="option__group__bot">
                    <VH-Button :disabled="store.isUpload" width="80px" height="32px" button-type="success" @click="selectFile">预选文件</VH-Button>
                    <VH-Button :disabled="store.isUpload" style="margin-left: 5px;" width="80px" height="32px" button-type="primary" @click="uploadFileFunc">上传文件</VH-Button>
                    <input ref="fileRef" type="file" class="file" multiple @change="upload"/>
                </div>
                <div v-if="!store.upBox" class="option__group__bot">
                    <VH-Button v-if="store.select != 3" @click="refushData" width="40px" height="32px" button-type="success" style="margin-right: 5px;" title="刷新"><span class="iconfont icon-shuaxin"></span></VH-Button>
                    <VH-Confirm :disabled="store.isDelete" width="80px" height="32px" desc="是否删除全部文件" @confirm="deleteAllTempFile">
                        <VH-Button :disabled="store.isDelete" width="80px" height="32px" button-type="danger">全部删除</VH-Button>
                    </VH-Confirm>
                </div>
                <div class="option__right__box" v-if="store.select == 1">
                    <VH-Confirm :disabled="store.isDelete" width="80px" height="32px" color="#67c23a" style="margin-right: 10px;" icon="iconfont icon-cunchu" desc="是否存入所有图片到数据库" @confirm="savePhotoEnter">
                        <VH-Button :disabled="store.isDelete" width="80px" height="32px" button-type="primary" >图片存入</VH-Button>
                    </VH-Confirm>
                    <VH-Confirm :disabled="store.isDelete" width="80px" height="32px" color="#67c23a" icon="iconfont icon-cunchu" desc="是否存入所有视频到数据库" @confirm="saveVideoCodeEnter">
                        <VH-Button :disabled="store.isDelete" width="80px" height="32px" button-type="success" >视频存入</VH-Button>
                    </VH-Confirm>
                </div>
            </div>
            <div class="file__read__loading" v-if="store.isReadFile">
                <div class="file__read__inner__box">
                    <div class="file__read__file__name">
                        <p>正在加载文件：</p>
                        <p>{{store.loadFileName}}</p>
                    </div>
                    <div class="file__read__percent">
                        <progress class="read__file__loading" max="100" :value="store.readPercent"></progress>
                        <p>{{ Math.trunc(store.readPercent)}}%</p>
                    </div>
                </div>
            </div>
            <VH-FileBox :is-waste="store.select==2" :dis-delete="store.isDelete" :up-box="store.upBox" :item-data="store.fileList" @delete="deleteFunc" @recovery="recoveryFile"></VH-FileBox>
            <Alert-Msg ref="AlertMsg"></Alert-Msg>
            <VH-Notification height="70px" :desc="store.descMsg" @close="closeNote" v-if="store.noteDiv"></VH-Notification>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import appStore from '@/store';


export default defineComponent({
    setup(){
        document.title = 'VideoHub 后台管理 - 文件列表 - 守护无价数据 ~'
        const store = appStore.fileList
        store.upBox=false
        store.select=1
        store.getFileList()
        return { store }
    },
    mounted() {
        
    },
    methods: {
        selectFile(){
            this.$refs.fileRef.dispatchEvent(new MouseEvent('click'))
        },
        upload(e){
            for(let item of e.target.files){
                var _this = this;
                let reader = new FileReader();
                reader.readAsDataURL(item);
                reader.addEventListener('load',function(){
                    // console.log(item);
                    let json = {'name':item.name,'size':item.size,'date':item.lastModifiedDate,'progress':false,'percent':'0','data':item}
                    let tempIndex = -1
                    _this.store.fileList.filter(function(value,index){
                        if(value.name==json.name){
                            tempIndex = index
                        }
                    })
                    if(tempIndex == -1){
                        _this.store.fileList.push(json)
                    }else{
                        _this.$refs.AlertMsg.addMsg(
                            1,"排除了已有同样名称的文件"
                        )
                    }
                })
                reader.onprogress = function (evt){
                    // console.log(evt)
                    _this.store.isReadFile=true
                    _this.store.readPercent=0
                    _this.store.loadFileName=item.name
                    _this.store.readPercent= evt.loaded/evt.total*100;
                    if(_this.store.readPercent==100){
                        _this.store.isReadFile=false
                    }
                }
            }
        },
        async deleteFunc(e){
            let site = this.store.select
            if(site == 3){
                this.store.fileList.splice(e, 1)
            }else if(site == 1){
                let result =  await this.store.deleteTempFile(e)
                if(result != null){
                    if(result.type == 1){
                        this.$refs.AlertMsg.addMsg(
                            2,result.data
                        )
                    }else if(result.type == 2){
                        this.$refs.AlertMsg.addMsg(
                            1,result.data
                        )
                        this.store.fileList=[]
                        this.store.getFileList()
                    }else if(result.type == 3){
                        this.$refs.AlertMsg.addMsg(
                            2,result.data
                        )
                    }
                }
            }else if(site == 2){
                let result =  await this.store.deleteWasteFile(e)
                if(result != null){
                    if(result.type == 1){
                        this.$refs.AlertMsg.addMsg(
                            2,result.data
                        )
                    }else if(result.type == 2){
                        this.$refs.AlertMsg.addMsg(
                            1,result.data
                        )
                        this.store.fileList=[]
                        this.store.getWasteFileList()
                    }else if(result.type == 3){
                        this.$refs.AlertMsg.addMsg(
                            2,result.data
                        )
                    }
                }
            }
        },
        async uploadFileFunc(){
            this.store.isUpload=true
            for (let index = 0; index < this.store.fileList.length; index++) {
                const element = this.store.fileList[index];
                let result =  await this.store.uploadFile(element.data,index)
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
                            1,result.data
                        )
                    }else if(result.type == 5){
                        this.$refs.AlertMsg.addMsg(
                            2,result.data
                        )
                    }
                }
            }
            this.store.isUpload=false
        },
        async deleteAllTempFile(){
            let err = 0
            let msg = ''
            for (let index = 0; index < this.store.fileList.length; index++) {
                const element = this.store.fileList[index];
                let result =  await this.store.deleteTempFile(element.name)
                if(result != null){
                    if(result.type == 1){
                        err ++
                        msg = result.data
                    }else if(result.type == 2){
                        msg = result.data
                    }else if(result.type == 3){
                        err ++
                        msg = result.data
                    }
                }
            }
            if(err != 0){
                this.$refs.AlertMsg.addMsg(
                    2,msg
                )
            }else{
                this.$refs.AlertMsg.addMsg(
                    1,msg
                )
                this.store.fileList=[]
                this.store.getFileList()
            }
        },
        async deleteAllWasteFile(){
            let err = 0
            let msg = ''
            for (let index = 0; index < this.store.fileList.length; index++) {
                const element = this.store.fileList[index];
                let result =  await this.store.deleteWasteFile(element.name)
                if(result != null){
                    if(result.type == 1){
                        err ++
                        msg = result.data
                    }else if(result.type == 2){
                        msg = result.data
                    }else if(result.type == 3){
                        err ++
                        msg = result.data
                    }
                }
            }
            if(err != 0){
                this.$refs.AlertMsg.addMsg(
                    2,msg
                )
            }else{
                this.$refs.AlertMsg.addMsg(
                    1,msg
                )
                this.store.fileList=[]
                this.store.getWasteFileList()
            }
        },
        async deleteSiteFunc(){
            let site = this.store.select
            if(site == 1){
                await this.deleteAllTempFile()
            }else if(site == 2){
                await this.deleteAllWasteFile()
            }
        },
        async refushData(){
            let site = this.store.select
            if(site == 1){
                await this.store.getFileList()
            }else if(site == 2){
                await this.store.getWasteFileList()
            }
        },
        async recoveryFile(e){
            let result =  await this.store.recoveryWasteFile(e)
            if(result != null){
                if(result.type == 1){
                    this.$refs.AlertMsg.addMsg(
                        2,result.data
                    )
                }else if(result.type == 2){
                    this.$refs.AlertMsg.addMsg(
                        1,result.data
                    )
                    this.store.fileList=[]
                    this.store.getWasteFileList()
                }else if(result.type == 3){
                    this.$refs.AlertMsg.addMsg(
                        2,result.data
                    )
                }
            }
        },
        closeNote(){
            this.store.noteDiv=false
        },
        async saveVideoCodeEnter(){
            if(this.store.timeTick == null){
                let time = 3000
                if(this.store.fileList.length > 5){
                    time = 6000
                }
                this.store.timeTick = setInterval(async ()=>{
                    let result =  await this.store.saveVideoCode()
                    if(result != null){
                        if(result.type == 1){
                            this.$refs.AlertMsg.addMsg(
                                2,result.data
                            )
                        }else if(result.type == 2){
                            this.$refs.AlertMsg.addMsg(
                                1,result.data
                            )
                            clearInterval(this.store.timeTick)
                            clearInterval(this.store.timeTick)
                            this.store.timeTick = null
                            this.store.isOnce = false
                            this.store.noteDiv=true
                            this.store.fileList=[]
                            this.store.getFileList()
                        }else if(result.type == 3){
                            this.$refs.AlertMsg.addMsg(
                                2,result.data
                            )
                        }
                    }
                },time)
            }
        },
        async savePhotoEnter(){
            if(this.store.timeTick == null){
                let time = 1000
                if(this.store.fileList.length > 5){
                    time = 3000
                }
                this.store.timeTick = setInterval(async ()=>{
                    let result =  await this.store.savePhoto()
                    if(result != null){
                        if(result.type == 1){
                            this.$refs.AlertMsg.addMsg(
                                2,result.data
                            )
                        }else if(result.type == 2){
                            this.$refs.AlertMsg.addMsg(
                                1,result.data
                            )
                            clearInterval(this.store.timeTick)
                            clearInterval(this.store.timeTick)
                            this.store.timeTick = null
                            this.store.isOnce = false
                            this.store.noteDiv=true
                            this.store.fileList=[]
                            this.store.getFileList()
                        }else if(result.type == 3){
                            this.$refs.AlertMsg.addMsg(
                                2,result.data
                            )
                        }
                    }
                },time)
            }
        },
    }
})
</script>

<style scoped>
@import '@/assets/css/filelilst.css';
</style>
