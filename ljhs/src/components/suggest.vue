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
    methods:{
        doIt(){
            var that = this
            this.postRequest({"cmd":"subFeedback",uid:this.uid,content:this.content})
            .then(res =>{
                console.log(res)
                Toast.success({
                    message:'提交成功'
                })
                setTimeout(()=>{
                    that.$router.push('/my')
                },1000)
                 
            })
            
        }
    }
}
</script>
<style scoped>
.c1{width: 100vw;height: 100vh;background: #fff;}
.sec1 p{height: .99rem;line-height: .99rem;}
.font1{font-size:0.427rem ;color: #111111;font-weight: bold;}
.board{background:rgba(247,247,247,1);height: 4.053rem;width: 9.28rem;padding: .3rem;border-radius: 3px;}
.box{padding: .4rem;}
</style>
