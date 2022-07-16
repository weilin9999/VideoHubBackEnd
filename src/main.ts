import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router';
import { createPinia } from 'pinia';
import { registerStore } from '@/store';
import VueCookies from 'vue-cookies';
import VHSelect from '@/components/VH-Select/VH-Select.vue';
import VHInput from '@/components/VH-Input/VH-Input.vue';
import VHButton from '@/components/VH-Button/VH-Button.vue';
import AlertMsg from '@/components/AlertMsg/AlertMsg.vue';
import VHUserInfo from '@/components/VH-UserInfo/VH-UserInfo.vue';
import VHBox from '@/components/VH-Box/VH-Box.vue';
import VHTable from '@/components/VH-Table/VH-Table.vue';
import VHTag from '@/components/VH-Tag/VH-Tag.vue';
import VHTableColumn from '@/components/VH-Table/VH-Table-Column.vue';
import VHConfirm from '@/components/VH-Confirm/VH-Confirm.vue';
import VHPage from '@/components/VH-Page/VH-Page.vue';
import VHDialog from '@/components/VH-Dialog/VH-Dialog.vue';
import VHSwitch from '@/components/VH-Switch/VH-Switch.vue';
import VHFileBox from '@/components/VH-FileBox/VH-FileBox.vue';
import VHLoading from '@/components/VH-Loading/VH-Loading.vue';
import VHNotification from '@/components/VH-Notification/VH-Notification.vue';
import VHPhoto from '@/components/VH-Photo/VH-Photo.vue';
import "default-passive-events";


const app = createApp(App)
app.use(router)
app.use(createPinia());
app.use(VueCookies);
registerStore();
app.component("VHSelect",VHSelect);
app.component("VHInput",VHInput);
app.component("VHButton",VHButton);
app.component("AlertMsg",AlertMsg);
app.component("VHBox",VHBox);
app.component("VHTable",VHTable);
app.component("VHUserInfo",VHUserInfo);
app.component("VHTag",VHTag);
app.component("VHTableColumn",VHTableColumn);
app.component("VHConfirm",VHConfirm);
app.component("VHPage",VHPage);
app.component("VHDialog",VHDialog);
app.component("VHSwitch",VHSwitch);
app.component("VHFileBox",VHFileBox);
app.component("VHLoading",VHLoading);
app.component("VHNotification",VHNotification);
app.component("VHPhoto",VHPhoto);
app.mount('#app')
