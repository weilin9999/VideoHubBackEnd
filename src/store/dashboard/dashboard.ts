import { defineStore } from 'pinia';
import * as echarts from 'echarts';
import { option } from './driversData.ts';
import { postRequest } from '@/api';
import config from '@/api/config';

export const dashboard = defineStore('dashboard',{
   state: () => {
       return {
            optionData: option,
            strongData:{
                "path": "",
                "fstype": "",
                "total": 0,
                "free": 0,
                "used": 0,
                "usedPercent": 0,
                "inodesTotal": 0,
                "inodesUsed": 0,
                "inodesFree": 0,
                "inodesUsedPercent": 0
            },
            logsData:[],
            usePercent:0,
            isSecondSwitch:false,
        };
    },
   actions: {
        async getStrongInfo(){
            await postRequest('/admin/get/strong','').then(res => {
                this.usePercent = Math.round(res.data.strong.usedPercent)
                this.strongData=res.data.strong
                this.draw()
            })
        },
        async getReCodeInfo(){
            await postRequest('/admin/get/recode','').then(res => {
                this.isSecondSwitch=res.data.recode
            })
        },
        async changeReCodeInfo(e){
            let json = {'re_code': parseInt(e)}
            let alert = {}
            await postRequest('/admin/change/recode',json).then(res => {
                switch (res.code) {
                    case 201:
                        alert = {'type':1,'data':'修改途中出现异常'}
                        break
                    case 200:
                        alert = {'type':2,'data': '修改成功'}
                        break
                    default:
                        alert = {'type':3,'data':res.msg}
                }
            })
            return alert
        },
        draw() {
            const domMap = document.getElementById('drivesData')
            domMap.removeAttribute("_echarts_instance_");
            var myChart = echarts.init(domMap)
            this.optionData.series[0].max=100
            this.optionData.series[0].data[0].value=this.usePercent
            myChart.clear()
            myChart.setOption(this.optionData,true)
        },
        async getLoginLogs(){
            await postRequest('/admin/get/login/logs','').then(res => {
                this.logsData = res.data.list
            })
        },
        async deleteLogs(){
            let alert = {}
            await postRequest('/admin/clean/login/logs','').then(res => {
                switch (res.code) {
                    case 200:
                        alert = {'type':1,'data': res.msg}
                        break
                    default:
                        alert = {'type':2,'data':res.msg}
                }
                this.getLoginLogs()
            })
            return alert
        },
    },
   getters: {
        
    }
})