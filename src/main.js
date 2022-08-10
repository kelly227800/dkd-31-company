import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en"; // lang i18n

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";

import "@/icons"; // icon
import "@/permission"; // permission control
import * as directives from "@/directives";

import moment from "moment";
<<<<<<< HEAD

Vue.prototype.$moment = moment;

=======
Vue.prototype.$moment = moment;
>>>>>>> 47f76e8df6ad36f5238e301e88388eeacbbb5eb0
moment.locale("zh-cn");
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

// set ElementUI lang to EN
<<<<<<< HEAD
Vue.use(ElementUI, { locale });
=======
// Vue.use(ElementUI, { locale });
>>>>>>> 47f76e8df6ad36f5238e301e88388eeacbbb5eb0
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI);

Vue.config.productionTip = false;

for (const key in directives) {
  Vue.directive(key, directives[key]);
}

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
