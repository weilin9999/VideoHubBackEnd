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
                    <VH-Confirm :disabled="store.isDelete" width="80px" height="32px" :offset="7" desc="是否删除全部文件" @confirm="deleteAllTempFile">
                        <VH-Button :disabled="store.isDelete" width="80px" height="32px" button-type="danger">全部删除</VH-Button>
                    </VH-Confirm>
                </div>
                <div class="option__right__box" v-if="store.select == 1">
                    <VH-Confirm :disabled="store.isDelete" width="80px" height="32px" :offset="7" color="#67c23a" style="margin-right: 10px;" icon="iconfont icon-cunchu" desc="是否存入所有图片到数据库" @confirm="savePhotoEnter">
                        <VH-Button :disabled="store.isDelete" width="80px" height="32px" button-type="primary" >图片存入</VH-Button>
                    </VH-Confirm>
                    <VH-Confirm :disabled="store.isDelete" width="80px" height="32px" :offset="7" color="#67c23a" icon="iconfont icon-cunchu" desc="是否存入所有视频到数据库" @confirm="saveVideoCodeEnter">
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
            <Alert-Msg ref="alertMsg"></Alert-Msg>
            <VH-Notification height="70px" :desc="store.descMsg" @close="closeNote" v-if="store.noteDiv"></VH-Notification>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import appStore from '@/store';

document.title = 'VideoHub 后台管理 - 文件列表 - 守护无价数据 ~'
const store = appStore.fileList
store.upBox=false
store.select=1
store.getFileList()

const fileRef = ref();
const alertMsg = ref();

function selectFile(){
    fileRef.value.dispatchEvent(new MouseEvent('click'))
}
function upload(e : any){
    for(let item of e.target.files){
        let reader = new FileReader();
        reader.readAsDataURL(item);
        reader.addEventListener('load',function(){
            // console.log(item);
            let json = {'name':item.name,'size':item.size,'date':item.lastModifiedDate,'progress':false,'percent':'0','data':item}
            let tempIndex = -1
            store.fileList.filter(function(value,index){
                if(value.name==json.name){
                    tempIndex = index
                }
            })
            if(tempIndex == -1){
                store.fileList.push(json)
            }else{
                alertMsg.value.addMsg(
                    1,"排除了已有同样名称的文件"
                )
            }
        })
        reader.onprogress = function (evt){
            // console.log(evt)
            store.isReadFile=true
            store.readPercent=0
            store.loadFileName=item.name
            store.readPercent= evt.loaded/evt.total*100;
            if(store.readPercent==100){
                store.isReadFile=false
            }
        }
    }
}
async function deleteFunc(e : any){
    let site = store.select
    if(site == 3){
        store.fileList.splice(e, 1)
    }else if(site == 1){
        let result : any =  await store.deleteTempFile(e)
        if(result != null){
            if(result.type == 1){
                alertMsg.value.addMsg(
                    2,result.data
                )
            }else if(result.type == 2){
                alertMsg.value.addMsg(
                    1,result.data
                )
                store.fileList=[]
                store.getFileList()
            }else if(result.type == 3){
                alertMsg.value.addMsg(
                    2,result.data
                )
            }
        }
    }else if(site == 2){
        let result : any =  await store.deleteWasteFile(e)
        if(result != null){
            if(result.type == 1){
                alertMsg.value.addMsg(
                    2,result.data
                )
            }else if(result.type == 2){
                alertMsg.value.addMsg(
                    1,result.data
                )
                store.fileList=[]
                store.getWasteFileList()
            }else if(result.type == 3){
                alertMsg.value.addMsg(
                    2,result.data
                )
            }
        }
    }
}
async function uploadFileFunc(){
    store.isUpload=true
    for (let index = 0; index < store.fileList.length; index++) {
        const element = store.fileList[index];
        let result : any =  await store.uploadFile(element.data,index)
        if(result != null){
            if(result.type == 1){
                alertMsg.value.addMsg(
                    2,result.data
                )
            }else if(result.type == 2){
                alertMsg.value.addMsg(
                    2,result.data
                )
            }else if(result.type == 3){
                alertMsg.value.addMsg(
                    2,result.data
                )
            }else if(result.type == 4){
                alertMsg.value.addMsg(
                    1,result.data
                )
            }else if(result.type == 5){
                alertMsg.value.addMsg(
                    2,result.data
                )
            }
        }
    }
    store.isUpload=false
}
async function deleteAllTempFile(){
    let err = 0
    let msg = ''
    for (let index = 0; index < store.fileList.length; index++) {
        const element = store.fileList[index];
        let result : any =  await store.deleteTempFile(element.name)
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
        alertMsg.value.addMsg(
            2,msg
        )
    }else{
        alertMsg.value.addMsg(
            1,msg
        )
        store.fileList=[]
        store.getFileList()
    }
}
async function deleteAllWasteFile(){
    let err = 0
    let msg = ''
    for (let index = 0; index < store.fileList.length; index++) {
        const element = store.fileList[index];
        let result : any =  await store.deleteWasteFile(element.name)
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
        alertMsg.value.addMsg(
            2,msg
        )
    }else{
        alertMsg.value.addMsg(
            1,msg
        )
        store.fileList=[]
        store.getWasteFileList()
    }
}
async function deleteSiteFunc(){
    let site = store.select
    if(site == 1){
        await deleteAllTempFile()
    }else if(site == 2){
        await deleteAllWasteFile()
    }
}
async function refushData(){
    let site = store.select
    if(site == 1){
        await store.getFileList()
    }else if(site == 2){
        await store.getWasteFileList()
    }
}
async function recoveryFile(e : any){
    let result : any =  await store.recoveryWasteFile(e)
    if(result != null){
        if(result.type == 1){
            alertMsg.value.addMsg(
                2,result.data
            )
        }else if(result.type == 2){
            alertMsg.value.addMsg(
                1,result.data
            )
            store.fileList=[]
            store.getWasteFileList()
        }else if(result.type == 3){
            alertMsg.value.addMsg(
                2,result.data
            )
        }
    }
}
function closeNote(){
    store.noteDiv=false
}
async function saveVideoCodeEnter(){
    if(store.timeTick == null){
        let time = 3000
        if(store.fileList.length > 5){
            time = 6000
        }
        store.timeTick = setInterval(async ()=>{
            let result : any =  await store.saveVideoCode()
            if(result != null){
                if(result.type == 1){
                    alertMsg.value.addMsg(
                        2,result.data
                    )
                }else if(result.type == 2){
                    alertMsg.value.addMsg(
                        1,result.data
                    )
                    clearInterval(store.timeTick)
                    clearInterval(store.timeTick)
                    store.timeTick = null
                    store.isOnce = false
                    store.noteDiv=true
                    store.fileList=[]
                    store.getFileList()
                }else if(result.type == 3){
                    alertMsg.value.addMsg(
                        2,result.data
                    )
                }
            }
        },time)
    }
}
async function savePhotoEnter(){
    if(store.timeTick == null){
        let time = 1000
        if(store.fileList.length > 5){
            time = 3000
        }
        store.timeTick = setInterval(async ()=>{
            let result : any =  await store.savePhoto()
            if(result != null){
                if(result.type == 1){
                    alertMsg.value.addMsg(
                        2,result.data
                    )
                }else if(result.type == 2){
                    alertMsg.value.addMsg(
                        1,result.data
                    )
                    clearInterval(store.timeTick)
                    clearInterval(store.timeTick)
                    store.timeTick = null
                    store.isOnce = false
                    store.noteDiv=true
                    store.fileList=[]
                    store.getFileList()
                }else if(result.type == 3){
                    alertMsg.value.addMsg(
                        2,result.data
                    )
                }
            }
        },time)
    }
}
</script>

<style scoped>
@import '@/assets/css/filelilst.css';
</style>
