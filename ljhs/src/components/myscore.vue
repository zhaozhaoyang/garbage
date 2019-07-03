<template>
    <div class="c1">
        <myheader tit="我的评分" showL="true"></myheader>
        <ul class="list">
            <li v-for="i in 20">
                <div class="b1">
                    <img src="@/assets/images/touxiang.png" alt="">
                </div>
                <div class="b2">
                    <div class="men">张三</div>
                    <div class="phone">联系方式：15518789654</div>
                </div>
                <div class="b3 color6">
                    <div class="tm">2019-6-1 15:30:12</div>
                    <div class="blong">评分：3组</div>
                </div>
            </li>
        </ul>
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
        
    }
}
</script>
<style scoped>
.color6{color: #999;}
.c1{background: #fff;height: 100vh;}
.list{
    width: 100%;
}
.list li{
    display: flex;
    flex-flow: row;
    border-bottom:1px solid #f7f7f7;
    height: 1.9rem;
    align-items: center;
    box-sizing: border-box;
}
.b1{
    width: 1.173rem;
    height: 1.173rem;
    border-radius: 50%;
    width: 20%;
    text-align: center;
}
.b2,.b3{width: 40%;}
.b1 img{height: 45px;width: 45px;border-radius: 50%;}
.men{font-size:16px;color: #111;font-weight: bold;margin-bottom: .28rem;}
.phone{font-size:13px;color: #999;}
.tm{font-size: 12px;margin-bottom: .33rem;letter-spacing: 2px;}
.b3{font-size: 13px;text-align: right;padding-right: 10px;}
</style>
