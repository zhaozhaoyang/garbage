import axios from 'axios'
import { Toast } from 'vant';
// 环境的切换
// if (process.env.NODE_ENV == 'development') {
// 	axios.defaults.baseURL = 'http://122.114.48.61'
// } else if (process.env.NODE_ENV == 'debug') {
// 	axios.defaults.baseURL = '';
// } else if (process.env.NODE_ENV == 'production') {
// 	axios.defaults.baseURL = 'http://112.35.113.88'
// }

axios.defaults.timeout = 10000

export default{
    methods:{
        goto(data){
			if(data == '0'){
				this.$router.push({ name: 'index', params: {}})
			}else if(data == '1'){
				this.$router.push({ name: 'rank', params: {}})
			}else if(data == '2'){
				this.$router.push({ name: 'my', params: {}})
			}			
			
		},
		back(){
            this.$router.back(-1)
		},
		postRequest(data = {}, method = 'post') {
			return new Promise((resolve, reject) => {
				axios({
						// url: url,
						url: encodeURI("http://122.114.48.61:8080/garbage/api/service?json="+JSON.stringify(data)),
						method: method,
						headers: {
							'Content-Type': 'application/json'
						}
						
					})
					.then(res => {
						//成功
						if(res.data.result == '0'){
							resolve(res)
						}else{
							Toast(res.data.resultNote);
						}
						
					})
					.catch(res => {
						//失败
						reject(res)
					})
			})
		},
    }
}