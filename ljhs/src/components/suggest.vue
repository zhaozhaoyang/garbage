<template>
    <div class="c1">
        <myheader tit="意见反馈" showL="true"></myheader>
        <div class="box">
            <div class="sec1">
                <p class="font1">您的建议</p>
                <textarea class="board" name="" id="" cols="30" rows="10" placeholder="请描述你的问题" v-model="content">

                </textarea>
            </div>
        </div>
        <m-ybutton @click="doIt" text="提交"></m-ybutton>
           
    </div>
</template>
<script>
import myheader  from './component/header.vue'
import { Toast } from 'vant';
export default {
    components:{myheader},
    data() {
		return {			
            uid:this.$store.state.uid || window.sessionStorage.getItem("uid"),
            content:""
		}
    },
    created(){
        
    },
    mounted(){
        var first = null
        var that = this
        mui.back = function() {
            if (!first) {
                that.$router.push('/set')
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
        doIt(){
            if(this.content.length==0||this.content.length>100){
                Toast('建议内容不能为空')
                return;
            }
            var that = this
            this.postRequest({"cmd":"subFeedback",uid:this.uid,content:this.content})
            .then(res =>{
                console.log(res)
                Toast.success({
                    message:'提交成功'
                })
                this.content = ''
                 
            })
            
        }
    }
}
</script>
<style scoped>
.c1{width: 100vw;height: 100vh;background: #fff;}
.sec1 p{height: .99rem;line-height: .99rem;}
.font1{font-size:0.427rem ;color: #111111;font-weight: bold;}
.board{background:rgba(247,247,247,1);height: 4.053rem;width: 9.28rem;padding: .3rem;border-radius: 3px;font-size: 14px;}
.box{padding: .4rem;}
</style>
