import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueI18n from 'vue-i18n'
import messages from "@/lang";
import locale from 'element-ui/lib/locale'
import router from '@/router';
import {Message} from 'element-ui';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueI18n)

const lang = navigator.language || navigator.userLanguage;

if (lang.indexOf('zh') > -1) {
    Vue.config.lang = 'zh-cn'
} else {
    Vue.config.lang = 'en'
}
const i18n = new VueI18n({
    locale: Vue.config.lang,
    messages
})
Vue.prototype.$message = Message;

locale.use(Vue.config.lang)
new Vue({
    el: "#app",
    i18n,
    router,
    render: h => h(App),
}).$mount('#app')
