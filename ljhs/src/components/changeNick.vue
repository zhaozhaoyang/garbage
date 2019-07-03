<template>
    <div class="c1">
        <myheader tit="修改昵称" showL="true"></myheader>
        <van-cell-group>
            <van-field v-model="value" autofocus/>
        </van-cell-group>
        <div style="margin-top:4.5rem;">
            <m-ybutton @click="doIt" text="提交"></m-ybutton>
        </div>        
    </div>
</template>
<script>
import myheader  from './component/header.vue'
import { Toast } from 'vant';
export default {
    components:{myheader},
    data() {
		return {			
            value:"阿里科技时代"
		}
    },
    methods:{
        doIt(){
            Toast.success('提交成功');
            this.$router.push('/my')
        }
    }
}
</script>
<style scoped>
.flex{display: flex;flex-flow: row;align-items: center;justify-content: space-between;}
.font1{font-size: .43rem;font-weight: bold;color:#111; }
.font2{font-size: .32rem;color:#999; }
.color9{color: #999;}
.c1{width: 100%;height: 100vh;background: #fff;}
.list{padding: .4rem .3rem;}
.list li{height: 1.8rem;width: 100%;border-bottom: 1px solid #fafafa;box-sizing: border-box;}
.lf{display: flex;flex-flow: column;}
.sp1{margin-bottom: .3rem;}
.rt{letter-spacing: 1px;align-self: flex-start;margin-top: 15px;}

</style>
