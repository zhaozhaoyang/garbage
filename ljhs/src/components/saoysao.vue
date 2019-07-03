<template>
    <div class="c1">
        <myheader tit="扫一扫" showL="true"></myheader>
        <div>
            <van-cell-group>
                <van-field v-model="stype"  label="所属分类：" disabled />
                <van-field v-model="stype"  label="负责人：" disabled />
                <van-field v-model="stype"  label="所属分类：" disabled />
                <van-field v-model="stype"  label="所属分类：" disabled />
                <van-field v-model="stype"  label="所属分类：" disabled />
            </van-cell-group>
        </div>
        <m-ybutton @click="pingfen" text="评分"></m-ybutton>
    </div>
</template>
<script>
import myheader  from './component/header.vue'
export default {
    components:{myheader},
    data() {
		return {
			stype:"垃圾回收"
		}
    },
    methods:{
        pingfen(){
            this.$router.push({
                name:'pingfen',
                params:{}
            })
        }
    }
}
</script>
<style scoped>
.c1{width: 100%;height: 100vh;background: #fff;}
</style>
