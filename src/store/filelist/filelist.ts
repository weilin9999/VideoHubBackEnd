import { defineStore } from 'pinia';
import { postRequest, uploadRequest } from '@/api';
import config from '@/api/config';

export const fileList = defineStore('fileList',{
   state: () => {
       return {
            siteList:[{item:'临时文件夹',key:1},{item:'文件回收站',key:2},{item:'上传文件/处理',key:3}],
            select: 1,
            upBox:false,
            fileList:[],
            isUpload:false,
            isDelete:false,
            isReadFile:false,
            loadFileName:'',
            readPercent:0,
            noteDiv:false,
            descMsg:'',
            isOnce: false,
            timeTick:null
        };
    },
   actions: {
        async getFileList(){
            await postRequest('/admin/get/temp/file/list','').then(res => {
                if(res.data.list != null){
                    this.fileList = res.data.list
                }
            })
        },
        async getWasteFileList(){
            await postRequest('/admin/get/waste/file/list','').then(res => {
                if(res.data.list != null){
                    this.fileList = res.data.list
                }
            })
        },
        changeModel(){
            let e = this.select
            if(e == 3){
                this.upBox = true
                this.fileList=[]
            }else if(e == 1){
                this.upBox = false
                this.fileList=[]
                this.getFileList()
            }else if(e == 2){
                this.upBox = false
                this.fileList=[]
                this.getWasteFileList()
            }
        },
        async uploadFile(data,index){
            let formData = new FormData();
            formData.append('file', data)
            let alert = {}
            await uploadRequest('/admin/upload/file',formData,progressEvent => {
                if (progressEvent.lengthComputable) {
                    let upLoadProgress = Math.trunc(progressEvent.loaded / progressEvent.total * 100)
                    this.fileList[index].progress=true
                    this.fileList[index].percent=upLoadProgress
                }
            }).then(res =>{
                switch (res.code) {
                    case 201:
                        alert = {'type':1,'data':'读取文件流失败'}
                        break
                    case 202:
                        alert = {'type':2,'data':'文件上传出现异常'}
                        break
                    case 203:
                        alert = {'type':3,'data':'文件存储过程出现异常'}
                        break
                    case 200:
                        alert = {'type':4,'data': '文件上传成功'}
                        break
                    default:
                        alert = {'type':5,'data':res.msg}
                }
            })
            return alert
        },
        async deleteTempFile(name){
            this.isDelete=true
            let json = {'name': String(name)}
            let alert = {}
            await postRequest('/admin/delete/temp/file',json).then(res => {
                switch (res.code) {
                    case 201:
                        alert = {'type':1,'data':'删除文件失败'}
                        this.isDelete=false
                        break
                    case 200:
                        alert = {'type':2,'data': '删除文件成功'}
                        this.isDelete=false
                        break
                    default:
                        alert = {'type':3,'data':res.msg}
                        this.isDelete=false
                }
            })
            return alert
        },
        async deleteWasteFile(name){
            this.isDelete=true
            let json = {'name': String(name)}
            let alert = {}
            await postRequest('/admin/delete/waste/file',json).then(res => {
                switch (res.code) {
                    case 201:
                        alert = {'type':1,'data':'删除文件失败'}
                        this.isDelete=false
                        break
                    case 200:
                        alert = {'type':2,'data': '删除文件成功'}
                        this.isDelete=false
                        break
                    default:
                        alert = {'type':3,'data':res.msg}
                        this.isDelete=false
                }
            })
            return alert
        },
        async recoveryWasteFile(name){
            this.isDelete=true
            let json = {'name': String(name)}
            let alert = {}
            await postRequest('/admin/recovery/waste/file',json).then(res => {
                switch (res.code) {
                    case 201:
                        alert = {'type':1,'data':'恢复文件失败'}
                        this.isDelete=false
                        break
                    case 200:
                        alert = {'type':2,'data': '恢复文件成功'}
                        this.isDelete=false
                        break
                    default:
                        alert = {'type':3,'data':res.msg}
                        this.isDelete=false
                }
            })
            return alert
        },
        async saveVideoCode(){
            this.isDelete=true
            let alert = null
            await postRequest('/admin/save/video','').then(res => {
                if(this.isOnce){
                    switch (res.code) {
                        case 201:
                            alert = {'type':1,'data':'视频存储失败'}
                            this.isDelete=false
                            break
                        case 200:
                            this.descMsg = '视频存储成功'
                            alert = {'type':2,'data': '视频存储成功'}
                            this.isDelete=false
                            break
                        case 400:
                            break
                        default:
                            alert = {'type':3,'data':res.msg}
                            this.isDelete=false
                    }
                }
                this.isOnce = true
            })
            return alert
        },
        async savePhoto(){
            this.isDelete=true
            let alert = null
            await postRequest('/admin/save/photo','').then(res => {
                if(this.isOnce){
                    switch (res.code) {
                        case 201:
                            alert = {'type':1,'data':'图片存储失败'}
                            this.isDelete=false
                            break
                        case 200:
                            this.descMsg = '图片存储成功'
                            alert = {'type':2,'data': '图片存储成功'}
                            this.isDelete=false
                            break
                        case 400:
                            break
                        default:
                            alert = {'type':3,'data':res.msg}
                            this.isDelete=false
                    }
                }
                this.isOnce = true
            })
            return alert
        },
    },
   getters: {
        
    }
})