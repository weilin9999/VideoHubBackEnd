import { defineStore } from 'pinia';
import { postRequest } from '@/api';
import config from '@/api/config';

export const classList = defineStore('classList',{
   state: () => {
       return {
            listData:[],
            pageListData:[
                {item:'10条/每页',key:10},{item:'20条/每页',key:20},{item:'50条/每页',key:50},{item:'100/条每页',key:100}
            ],
            pageSize: 10,
            pageAll: 1,
            curPage:1,
            editForm:{},
            addForm:{},
            form: {
                cid: null,
                classname:'',
            },
            multData:[],
            multSite:0,
            multLength:0,
            editBoxShow:false,
            editMultBoxShow:false,
            addBoxShow:false,
        };
    },
   actions: {
        async getClassData(cid,classname,page,size){
            let json = {
                "cid": parseInt(cid),
                "classname": String(classname),
                "page": parseInt(page),
                "size": parseInt(size)
            }
            await postRequest('/admin/search/class/list',json).then(res => {
                this.listData = res.data.list
                if(res.data.count != 0){
                    this.pageAll = Math.ceil(parseInt(res.data.count) / parseInt(this.pageSize))
                }
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
        closeAddBox(){
            this.addBoxShow=false
            this.addForm = {}
        },
        openAddBox(){
            this.addBoxShow=true
            this.addForm = {}
        },
        openEditMultFunc(){
            this.multSite = 0
            this.editMultBoxShow=true
            this.editForm = this.multData[this.multSite]
        },
        async editSure(){
            let json = {
                cid: parseInt(this.editForm.cid),
                classname: String(this.editForm.classname)
            }
            let alert = {}
            await postRequest('/admin/edit/class/information',json).then(res => {
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
                this.resFushNowPage()
            })
            return alert
        },
        async addSure(){
            let json = {
                classname: String(this.addForm.classname)
            }
            if(json.classname.length < 1 || json.classname == 'undefined'){
                return {'type':5,'data': '请输入正确的分类名称'}
            }
            let alert = {}
            await postRequest('/admin/created/class',json).then(res => {
                switch (res.code) {
                    case 201:
                        alert = {'type':1,'data':'在操作插入新视频分类更新时产生异常'}
                        break
                    case 202:
                        alert = {'type':2,'data':'在操作插入新视频分类创建时产生异常'}
                        break
                    case 200:
                        alert = {'type':3,'data': '修改信息成功'}
                        break
                    default:
                        alert = {'type':4,'data':res.msg}
                }
                this.resFushNowPage()
            })
            return alert
        },
        async editMultSure(){
            let json = {
                cid: parseInt(this.editForm.cid),
                classname: String(this.editForm.classname)
            }
            let alert = {}
            await postRequest('/admin/edit/class/information',json).then(res => {
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
                let temp = {'cid':element.cid}
                array.push(temp)
            }
            let json = {'group': array}
            let alert = {}
            await postRequest('/admin/delete/group/class/information',json).then(res => {
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
            let json = {'cid': e}
            let alert = {}
            await postRequest('/admin/delete/class/information',json).then(res => {
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
        resetSearch(){
            this.form= {
                cid: null,
                classname:'',
            }
        },
        goSeach(){
            this.curPage = 1
            this.getClassData(this.form.cid,this.form.classname,this.curPage,this.pageSize)
        },
        resFush(){
            this.curPage = 1
            this.getClassData(this.form.cid,this.form.classname,this.curPage,this.pageSize)
        },
        resFushNowPage(){
            this.getClassData(this.form.cid,this.form.classname,this.curPage,this.pageSize)
        },
        goWhere(e){
            this.curPage = parseInt(e.where)
            this.getClassData(this.form.cid,this.form.classname,this.curPage,this.pageSize)
        },
        onPage(e){
            this.curPage = parseInt(e)
            this.getClassData(this.form.cid,this.form.classname,this.curPage,this.pageSize)
        },
        pageMore(){
            this.getClassData(this.form.cid,this.form.classname,this.curPage,this.pageSize)
        },
    },
   getters: {
        
    }
})