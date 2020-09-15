import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/common.scss";
import { Loading ,Message, Drawer, Dialog,Image} from 'element-ui';
Vue.use(Loading.directive);
Vue.config.productionTip = false;
import 'element-ui/lib/theme-chalk/index.css';
import http from "@/utils/HttpRequest"
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios)
Vue.use(Drawer);
Vue.use(Dialog);
Vue.use(Image);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.prototype.$http = http; // ajax请求方法
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
