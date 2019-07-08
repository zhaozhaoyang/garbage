<template>
    <div class="c1">
        <myheader tit="请选择身份" showL="true"></myheader>
        <ul class="ubox">
            <li :class="[identity1?'bg1':'bg2']" @click="huan(1)">
                <span>河长</span>
                <img :src="src1" alt="">
            </li>
            <li :class="[identity2?'bg1':'bg2']" @click="huan(2)">
                <span>巡河员</span>
                <img :src="src2" alt="">
            </li>
        </ul>
        <m-ybutton @click="next" text="知道了" size="3"></m-ybutton>
    </div>
</template>
<script>
import myheader  from './component/header.vue'
import { Toast } from 'vant';
export default {
    components:{myheader},
    data() {
		return {
            identity1:true,
            identity2:true,
            src1:require('../assets/images/nok.png'),
            src2:require('../assets/images/nok.png'),
            identy:this.$store.state.userInfo || window.sessionStorage.getItem("userInfo"),
            idFlag:''
            
		}
    },
    created(){

    },
    mounted(){
        var first = null
        var that = this
        mui.back = function() {
            if (!first) {
                that.$router.push('/index')
                first = new Date().getTime() 
                setTimeout(function() { 
                    first = null
                }, 1000)
            } else {
                if (new Date().getTime() - first < 1000) { 
                    plus.runtime.quit() 
                }
            }
        }
    },
    methods:{
        next(){
            if(this.identity1 && this.identity2){
                Toast('请选择身份');
                return;                
            }
            
            console.log(this.identy.identity)
            if(this.idFlag !=this.identy.identity){
                Toast('身份选择不正确！');
                return;    
            }

            this.$router.push('/xunhe2')
                     
        },
        huan(num){
            if(num == '1'){
                this.identity2=true
                this.identity1=false
                this.src1 = require('../assets/images/ok.png')
                this.src2 = require('../assets/images/nok.png')
                this.idFlag = 2
            }else if(num == '2'){
                this.identity2=false
                this.identity1=true
                this.src1 = require('../assets/images/nok.png')
                this.src2 = require('../assets/images/ok.png')
                this.idFlag = 1
            }
        }
    }
}
</script>
<style scoped>
.c1{height: 100vh;background: #fff;}
.bg1{background: #F6F7F9;border: 1px solid #F6F7F9;}
.bg2{background: #ebf5fc;border: 1px solid #157FCA;}
.bg2 span,.bg1 span{font-size: 18px;font-weight: bold;}
.sbd{border:1px solid #157FCA;}
.ubox{width: 90%;box-sizing: border-box;margin: 1.2rem auto 1.4rem;}
.ubox li{height: 1.573rem;width:8.933rem;border-radius: 5px;margin-bottom: .5rem;line-height: 1.573rem;position: relative;}
.ubox li span{padding-left: .88rem;}
.ubox img{width: 20px;height: 20px;position: absolute;right: .88rem;top: .5rem;}

</style>
