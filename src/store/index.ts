import { Application } from './application/application';
import { loginStore } from './login/login';
import { dashboard } from './dashboard/dashboard';
import { videoList } from './videolist/videolist';
import { classList } from './classlist/classlist';
import { userList } from './userlist/userlist';
import { fileList } from './filelist/filelist';
import { photoList } from './photolist/photolist';

export interface IAppStore {
    loginStore: ReturnType<typeof loginStore>;
    Application: ReturnType<typeof Application>;
    dashboard: ReturnType<typeof dashboard>;
    videoList: ReturnType<typeof videoList>;
    classList: ReturnType<typeof classList>;
    userList: ReturnType<typeof userList>;
    fileList: ReturnType<typeof fileList>;
    photoList: ReturnType<typeof photoList>;
}

const appStore: IAppStore = {} as IAppStore;

/**
 * 注册app状态库
 */
export const registerStore = () => {
  appStore.loginStore = loginStore();
  appStore.Application = Application();
  appStore.dashboard = dashboard();
  appStore.videoList = videoList();
  appStore.classList = classList();
  appStore.userList = userList();
  appStore.fileList = fileList();
  appStore.photoList = photoList();
};

export default appStore;