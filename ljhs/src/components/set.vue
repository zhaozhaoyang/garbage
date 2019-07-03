<template>
    <div class="c1">
        <myheader tit="设置" showL="true"></myheader>
        <div>
             <van-cell title="意见反馈" is-link to="suggest"/>
             <van-cell title="关于我们" is-link to="aboutUs"/>
             <van-cell title="" />
        </div>   
        <div style="margin-top:1.8rem;">    
            <m-ybutton @click="logout" text="退出登录"></m-ybutton>
        </div>
    </div>
</template>
<script>
import myheader  from './component/header.vue'
export default {
    components:{myheader},
    data() {
		return {			
		}
    },
    methods:{
        logout(){
            // this.$store.commit('setuid',"");
            // window.sessionStorage.setItem("uid","")
            this.$router.push("/login")
        }
    }
}
</script>
<style scoped>
.c1{width: 100%;height: 100vh;background: #fff;}

</style>
