import { defineStore } from 'pinia';
import { postRequest } from '@/api';
import config from '@/api/config';

export const userList = defineStore('userList',{
   state: () => {
       return {
            listData:[],
            pageListData:[
                {item:'10条/每页',key:10},{item:'20条/每页',key:20},{item:'50条/每页',key:50},{item:'100/条每页',key:100}
            ],
            pageSize: 10,
            pageAll: 1,
            avatarUrl: config.baseUrl.url,
            curPage:1,
            editForm:{},
            form: {
                uid: null,
                account:'',
                username: '',
            },
            multData:[],
            multSite:0,
            multLength:0,
            editBoxShow:false,
            editMultBoxShow:false,
            userAvatarTemp: null,
            userAvatarData: null,
            imgViewSrc:'',
            showImgView:false,
        };
    },
   actions: {
        async getUserData(cid,account,username,page,size){
            let json = {
                "uid": parseInt(cid),
                "account": String(account),
                "username": String(username),
                "page": parseInt(page),
                "size": parseInt(size)
            }
            await postRequest('/admin/search/user/list',json).then(res => {
                this.listData = res.data.list
                if(res.data.count != 0){
                    this.pageAll = Math.ceil(parseInt(res.data.count) / parseInt(this.pageSize))
                }
            })
        },
        editFunc(data){
            this.userAvatarData = null
            this.userAvatarTemp = null
            let temp = JSON.parse(JSON.stringify(data))
            this.editForm=temp
            this.editBoxShow=true
        },
        closeEditBox(){
            this.editBoxShow=false
        },
        openEditMultFunc(){
            this.userAvatarData = null
            this.userAvatarTemp = null
            this.multSite = 0
            this.editMultBoxShow=true
            this.editForm = this.multData[this.multSite]
        },
        async editSure(){
            let json = {
                uid: parseInt(this.editForm.uid),
                account: String(this.editForm.account),
                username: String(this.editForm.username),
                password: String(this.editForm.password),
            }
            let alert = {}
            await postRequest('/admin/edit/user/information',json).then(res => {
                switch (res.code) {
                    case 201:
                        alert = {'type':1,'data':'修改途中出现异常'}
                        break
                    case 202:
                        alert = {'type':4,'data':'修改密码时出错'}
                        break
                    case 200:
                        alert = {'type':2,'data': '修改信息成功'}
                        break
                    default:
                        alert = {'type':3,'data':res.msg}
                }
                this.resFushNowPage()
            })
            return alert
        },
        async uploadUserAvatar(){
            let formFile = new FormData
            formFile.append('file',this.userAvatarData)
            formFile.append('uid',parseInt(this.editForm.uid))
            let alert = {}
            postRequest('/admin/upload/user/avatar',formFile).then(res => {
                switch (res.code) {
                    case 201:
                        alert = {'type':1,'data':"未上传文件"}
                        break
                    case 202:
                        alert = {'type':2,'data':"文件大于2M"}
                        break
                    case 203:
                        alert = {'type':3,'data':"文件类型不符合要求"}
                        break
                    case 204:
                        alert = {'type':4,'data':"在存储头像时出现了异常"}
                        break
                    case 200:
                        alert = {'type':5,'data':"头像修改成功"}
                        break
                    default:
                        alert = {'type':6,'data':"未知错误："+res.msg}
                }
            })
        },
        async editMultSure(){
            let json = {
                uid: parseInt(this.editForm.uid),
                account: String(this.editForm.account),
                username: String(this.editForm.username),
                password: String(this.editForm.password),
            }
            let alert = {}
            await postRequest('/admin/edit/user/information',json).then(res => {
                switch (res.code) {
                    case 201:
                        alert = {'type':1,'data':'修改途中出现异常'}
                        break
                    case 202:
                        alert = {'type':4,'data':'修改密码时出错'}
                        break
                    case 200:
                        alert = {'type':2,'data': '修改信息成功'}
                        break
                    default:
                        alert = {'type':3,'data':res.msg}
                }
            })
            return alert
        },
        editMultNextFunc(){
            this.multSite ++
            this.editForm = this.multData[this.multSite]
            this.userAvatarData = null
            this.userAvatarTemp = null
        },
        closeMultEditBox(){
            this.editMultBoxShow=false
        },
        async deleteMultFunc(){
            let array = []
            for (let index = 0; index < this.multData.length; index++) {
                const element = this.multData[index];
                let temp = {'uid':element.uid}
                array.push(temp)
            }
            let json = {'group': array}
            let alert = {}
            await postRequest('/admin/delete/group/user/information',json).then(res => {
                switch (res.code) {
                    case 201:
                        alert = {'type':1,'data':'批量删除途中出现异常'}
                        break
                    case 200:
                        alert = {'type':2,'data': '批量删除成功'}
                        break
                    default:
                        alert = {'type':3,'data':res.msg}
                }
                this.resFushNowPage()
            })
            return alert
        },
        async deleteFunc(e){
            let json = {'uid': e}
            let alert = {}
            await postRequest('/admin/delete/user/information',json).then(res => {
                switch (res.code) {
                    case 201:
                        alert = {'type':1,'data':'删除途中出现异常'}
                        break
                    case 200:
                        alert = {'type':2,'data': '删除该视频成功'}
                        break
                    default:
                        alert = {'type':3,'data':res.msg}
                }
                this.resFushNowPage()
            })
            return alert
        },
        multSelect(e){
            let temp = JSON.parse(JSON.stringify(e));
            this.multData = temp
            this.multLength = this.multData.length-1
        },
        clickSelect(e) {
            console.log(e)
        },
        resetSearch(){
            this.form= {
                uid: null,
                account:'',
                username: '',
            }
        },
        async changeIsAdmin(uid,e){
            let json = {'uid': parseInt(uid),'isadmin': parseInt(e)}
            let alert = {}
            await postRequest('/admin/authority/user/isadmin',json).then(res => {
                switch (res.code) {
                    case 201:
                        alert = {'type':1,'data':'修改权限途中出现异常'}
                        break
                    case 200:
                        alert = {'type':2,'data': '修改成功'}
                        break
                    default:
                        alert = {'type':3,'data':res.msg}
                }
                this.resFushNowPage()
            })
            return alert
        },
        async changeIsUploader(uid,e){
            let json = {'uid': parseInt(uid),'isuploader': parseInt(e)}
            let alert = {}
            await postRequest('/admin/authority/user/isuploader',json).then(res => {
                switch (res.code) {
                    case 201:
                        alert = {'type':1,'data':'修改权限途中出现异常'}
                        break
                    case 200:
                        alert = {'type':2,'data': '修改成功'}
                        break
                    default:
                        alert = {'type':3,'data':res.msg}
                }
                this.resFushNowPage()
            })
            return alert
        },
        goSeach(){
            this.curPage = 1
            this.getUserData(this.form.uid,this.form.account,this.form.username,this.curPage,this.pageSize)
        },
        resFush(){
            this.curPage = 1
            this.getUserData(this.form.uid,this.form.account,this.form.username,this.curPage,this.pageSize)
        },
        resFushNowPage(){
            this.getUserData(this.form.uid,this.form.account,this.form.username,this.curPage,this.pageSize)
        },
        goWhere(e){
            this.curPage = parseInt(e.where)
            this.getUserData(this.form.uid,this.form.account,this.form.username,this.curPage,this.pageSize)
        },
        onPage(e){
            this.curPage = parseInt(e)
            this.getUserData(this.form.uid,this.form.account,this.form.username,this.curPage,this.pageSize)
        },
        pageMore(){
            this.getUserData(this.form.uid,this.form.account,this.form.username,this.curPage,this.pageSize)
        },
        viewImg(e){
            this.showImgView=true
            this.imgViewSrc=e
        },
    },
   getters: {
        
    }
})