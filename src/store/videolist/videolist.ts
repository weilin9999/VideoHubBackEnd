import { defineStore } from 'pinia';
import { postRequest } from '@/api';
import config from '@/api/config';

export const videoList = defineStore('videoList',{
   state: () => {
       return {
            coverUrl: config.baseUrl.url,
            listData:[],
			itemData: [],
            pageListData:[{item:'10条/每页',key:10},{item:'20条/每页',key:20},{item:'50条/每页',key:50},{item:'100/条每页',key:100}],
            pageSize: 10,
            pageAll: 1,
            curPage:1,
            editForm:{},
            form: {
                vid: '',
                detail:'',
                cid: '',
            },
            multData:[],
            multSite:0,
            multLength:0,
            selectCid:'',
            editBoxShow:false,
            editMultBoxShow:false,
            funcSite:0,
            imgViewSrc:'',
            showImgView:false,
        };
    },
   actions: {
        async getVideoData(vid,cid,detail,page,size){
            this.funcSite = 0
            let json = {
                "vid": String(vid),
                "cid": parseInt(cid),
                "detail": String(detail),
                "page": parseInt(page),
                "size": parseInt(size)
            }
            await postRequest('/admin/search/video/list',json).then(res => {
                this.listData = res.data.list
                if(res.data.count != 0){
                    this.pageAll = Math.ceil(parseInt(res.data.count) / parseInt(this.pageSize))
                }
            })
        },
        async getNoCidVideoData(page,size){
            this.funcSite = 1
            let json = {
                "page": parseInt(page),
                "size": parseInt(size)
            }
            await postRequest('/admin/search/video/nocid/list',json).then(res => {
                this.listData = res.data.list
                if(res.data.count != 0){
                    this.pageAll = Math.ceil(parseInt(res.data.count) / parseInt(this.pageSize))
                }
            })
        },
        async getClassData(){
            await postRequest('/class/list','').then(res => {
                this.itemData = res.data
            })
        },
        editFunc(data){
            let temp = JSON.parse(JSON.stringify(data))
            this.editForm=temp
            this.editBoxShow=true
        },
        closeEditBox(){
            this.editBoxShow=false
        },
        openEditMultFunc(){
            this.multSite = 0
            this.editMultBoxShow=true
            this.editForm = this.multData[this.multSite]
        },
        async editSure(){
            let json = {
                vid: parseInt(this.editForm.vid),
                detail: String(this.editForm.detail),
                cid: parseInt(this.editForm.cid),
            }
            let alert = {}
            await postRequest('/admin/edit/video/information',json).then(res => {
                switch (res.code) {
                    case 201:
                        alert = {'type':1,'data':'修改途中出现异常'}
                        break
                    case 200:
                        alert = {'type':2,'data': '修改信息成功'}
                        break
                    default:
                        alert = {'type':3,'data':res.msg}
                }
                this.resFushNotClass()
            })
            return alert
        },
        async editMultSure(){
            let json = {
                vid: parseInt(this.editForm.vid),
                detail: String(this.editForm.detail),
                cid: parseInt(this.editForm.cid),
            }
            let alert = {}
            await postRequest('/admin/edit/video/information',json).then(res => {
                switch (res.code) {
                    case 201:
                        alert = {'type':1,'data':'修改途中出现异常'}
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
        },
        closeMultEditBox(){
            this.editMultBoxShow=false
        },
        async deleteMultFunc(){
            let array = []
            for (let index = 0; index < this.multData.length; index++) {
                const element = this.multData[index];
                let temp = {'vid':element.vid}
                array.push(temp)
            }
            let json = {'group': array}
            let alert = {}
            await postRequest('/admin/delete/group/video/information',json).then(res => {
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
                this.resFushNotClass()
            })
            return alert
        },
        async deleteFunc(e){
            let json = {'vid': e}
            let alert = {}
            await postRequest('/admin/delete/video/information',json).then(res => {
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
                this.resFushNotClass()
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
                vid: '',
                detail:'',
                cid: '',
            }
        },
        goSeach(){
            this.curPage = 1
            this.getVideoData(this.form.vid,this.form.cid,this.form.detail,this.curPage,this.pageSize)
        },
        resFush(){
            this.curPage = 1
            if(this.funcSite == 0){
                this.getVideoData(this.form.vid,this.form.cid,this.form.detail,this.curPage,this.pageSize)
            }else{
                this.getNoCidVideoData(this.curPage,this.pageSize)
            }
            this.getClassData()
        },
        resFushNotClass(){
            if(this.funcSite == 0){
                this.getVideoData(this.form.vid,this.form.cid,this.form.detail,this.curPage,this.pageSize)
            }else{
                this.getNoCidVideoData(this.curPage,this.pageSize)
            }
        },
        async batchCid(){
            let array = []
            for (let index = 0; index < this.multData.length; index++) {
                const element = this.multData[index];
                let temp = {'vid':element.vid}
                array.push(temp)
            }
            let json = {'cid': parseInt(this.selectCid),'group': array}
            let alert = {}
            await postRequest('/admin/edit/group/video/information',json).then(res => {
                switch (res.code) {
                    case 201:
                        alert = {'type':1,'data':'批量修改视频分类途中出现异常'}
                        break
                    case 200:
                        alert = {'type':2,'data': '批量修改视频分类成功'}
                        break
                    default:
                        alert = {'type':3,'data':res.msg}
                }
                this.resFushNotClass()
            })
            return alert
        },
        goWhere(e){
            this.curPage = parseInt(e.where)
            if(this.funcSite == 0){
                this.getVideoData(this.form.vid,this.form.cid,this.form.detail,this.curPage,this.pageSize)
            }else{
                this.getNoCidVideoData(this.curPage,this.pageSize)
            }
        },
        onPage(e){
            this.curPage = parseInt(e)
            if(this.funcSite == 0){
                this.getVideoData(this.form.vid,this.form.cid,this.form.detail,this.curPage,this.pageSize)
            }else{
                this.getNoCidVideoData(this.curPage,this.pageSize)
            }
        },
        pageMore(){
            if(this.funcSite == 0){
                this.getVideoData(this.form.vid,this.form.cid,this.form.detail,this.curPage,this.pageSize)
            }else{
                this.getNoCidVideoData(this.curPage,this.pageSize)
            }
        },
        retClassTag(cid){
            let name = this.itemData.filter((item)=>{
                if(item.cid == cid){
                    return item.classname
                }
            })
            if(name[0]==null){
                return ''
            }
            return name[0].classname
        },
        viewImg(e){
            this.showImgView=true
            this.imgViewSrc=e
        },
    },
   getters: {

    }
})