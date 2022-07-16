import { defineStore } from 'pinia';
import { postRequest } from '@/api';
import config from '@/api/config';

export const photoList = defineStore('photoList',{
   state: () => {
       return {
            photoUrl: config.baseUrl.url,
            listData:[],
            pageListData:[
                {item:'10条/每页',key:10},{item:'20条/每页',key:20},{item:'50条/每页',key:50},{item:'100/条每页',key:100}
            ],
            pageSize: 10,
            pageAll: 1,
            curPage:1,
            multData:[],
            imgViewSrc:'',
            showImgView:false,
        };
    },
   actions: {
        async getPhotoData(page,size){
            let json = {
                "page": parseInt(page),
                "size": parseInt(size)
            }
            await postRequest('/photo/list',json).then(res => {
                this.listData = res.data.list
                this.listData.reverse()
                if(res.data.count != 0){
                    this.pageAll = Math.ceil(parseInt(res.data.count) / parseInt(this.pageSize))
                }
            })
        },
        async deleteMultFunc(){
            let array = []
            for (let index = 0; index < this.multData.length; index++) {
                const element = this.multData[index];
                let temp = {'pid':element.pid}
                array.push(temp)
            }
            let json = {'group': array}
            let alert = {}
            await postRequest('/admin/delete/group/photo/information',json).then(res => {
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
            let json = {'pid': e}
            let alert = {}
            await postRequest('/admin/delete/photo/information',json).then(res => {
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
        resFush(){
            this.curPage = 1
            this.getPhotoData(this.curPage,this.pageSize)
        },
        resFushNowPage(){
            this.getPhotoData(this.curPage,this.pageSize)
        },
        goWhere(e){
            this.curPage = parseInt(e.where)
            this.getPhotoData(this.curPage,this.pageSize)
        },
        onPage(e){
            this.curPage = parseInt(e)
            this.getPhotoData(this.curPage,this.pageSize)
        },
        pageMore(){
            this.getPhotoData(this.curPage,this.pageSize)
        },
        viewImg(e){
            this.showImgView=true
            this.imgViewSrc=e
        },
    },
   getters: {
        
    }
})