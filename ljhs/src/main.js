// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import router from './router'
import Vant from 'vant'
import FastClick from 'fastclick'
FastClick.attach(document.body)
import 'vant/lib/index.css'
import './assets/styles/reset.css'
import './assets/styles/iconfont.css'
Vue.config.productionTip = false
import store from './store'
import $ from 'jquery'
import 'lib-flexible/flexible'
import mixins from './mixins'
import install from './components/commons/index';
import { Toast } from 'vant';
Vue.use(Vant).use(install).use(Toast)
Vue.mixin(mixins)

require('es6-promise').polyfill()
Es6Promise.polyfill()

new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})
