import { defineStore } from 'pinia';
import { postRequest } from '@/api';
import config from '@/api/config';

export const loginStore = defineStore('loginStore',{
   state: () => {
       return {
            userForm: {
                account: '',
                password: '',
            },
            errForm: {
                account:false,
                accountmsg:'',
                password:false,
                passwordmsg:'',
            },
            apiUrl : config.baseUrl.url,
        };
    },
   actions: {
        async onLogin() {
            if(this.userForm.account.length < 1){
				this.errForm.accountmsg = "请输入正确的账号"
				this.errForm.account=true
			}else if(this.userForm.password.length < 1){
				this.errForm.passwordmsg = "请输入正确的密码"
				this.errForm.password=true
			}else{
                let json = {}
				await postRequest('/user/login/admin',this.userForm).then(res => {
					switch (res.code) {
						case 201:
							this.errForm.accountmsg = "请输入正确的账号"
							this.errForm.account=true
							this.errForm.passwordmsg = "请输入正确的密码"
							this.errForm.password=true
							break
                        case 202:
                            json = {'type':3,'data':'无效会话'}
                            break
						case 200:
                            json = {'type':4,'data':res.data}
							break
						default:
                            json = {'type':1,'data':res.msg}
					}
				}).catch(err => {
					json = {'type':2,'data':err}
				})
                return json
			}
        },
    },
   getters: {

    }
})