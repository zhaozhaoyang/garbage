import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Login from '@/components/login'
import Rank from '@/components/rank'
import My from '@/components/my'
import Fenlei from '@/components/fenlei'
import identity from '@/components/identity'
import Xunhe2 from '@/components/xunhe2'
import Upok from '@/components/upok'
import Saoysao from '@/components/saoysao'
import pingfen from '@/components/pingfen'
import news from '@/components/news'
import changeNick from '@/components/changeNick'
import myscore from '@/components/myscore'
import set from '@/components/set'
import suggest from '@/components/suggest'
import aboutUs from '@/components/aboutUs'
import webview from '@/components/webview'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/login',
			redirect: '/'
		},
		{
			path: '/index',
			name: 'index',
			component: Index
		},
		{
			path: '/',
			name:'login',
			component: Login
		},
		{
			path: '/rank',
			name:'rank',
			component: Rank
		},
		{
			path: '/my',
			name:'my',
			component: My
		},
		{
			path: '/fenlei',
			name:'fenlei',
			component: Fenlei
		},
		{
			path: '/identity',
			name:'identity',
			component: identity
		},
		{
			path: '/xunhe2',
			name:'xunhe2',
			component: Xunhe2
		},
		{
			path: '/upok',
			name:'upok',
			component: Upok
		},
		{
			path: '/saoysao',
			name:'saoysao',
			component: Saoysao
		},
		{
			path: '/pingfen',
			name:'pingfen',
			component: pingfen
		},
		{
			path: '/news',
			name:'news',
			component: news
		},
		{
			path: '/changeNick',
			name:'changeNick',
			component: changeNick
		},
		{
			path: '/myscore',
			name:'myscore',
			component: myscore
		},
		{
			path: '/set',
			name:'set',
			component: set
		},
		{
			path: '/aboutUs',
			name:'aboutUs',
			component: aboutUs
		},
		{
			path: '/suggest',
			name:'suggest',
			component: suggest
		},
		{
			path: '/webview',
			name:'webview',
			component: webview
		}		
		
	]
})
