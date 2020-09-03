import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/common.scss";
import { Loading } from 'element-ui';
Vue.use(Loading.directive);
Vue.config.productionTip = false;
import 'element-ui/lib/theme-chalk/index.css';
import http from "@/utils/HttpRequest"
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios)
Vue.prototype.$loading = Loading.service;
Vue.prototype.$http = http; // ajax请求方法
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
