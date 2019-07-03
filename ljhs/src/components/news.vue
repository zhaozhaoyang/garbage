<template>
    <div class="c1">
        <myheader tit="消息" showL="true"></myheader>
        <ul class="list">
            <li class="flex" v-for="i in 20">
                <div class="lf">
                    <span class="font1 sp1">系统消息</span>
                    <span class="font2">系统消息</span>
                </div>
                <div class="rt color9 font2">
                    2019-6-1  15：20：12
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
