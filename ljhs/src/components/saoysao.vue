<template>
    <div class="c1">
        <myheader tit="扫一扫" showL="true"></myheader>
        <div>
            <van-cell-group>
                <van-field v-model="stype"  label="所属分类：" disabled />
                <van-field v-model="fuserInfo.name"  label="负责人：" disabled />
                <van-field v-model="fuserInfo.vilname"  label="所属地域：" disabled />
                <van-field v-model="fuserInfo.group"  label="所属组：" disabled />
                <van-field v-model="fuserInfo.phone"  label="联系方式：" disabled />
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
            uid:this.$store.state.uid || window.sessionStorage.getItem("uid"),            
            fid:"",
            fuserInfo:{},
            stype:"垃圾回收"
		}
    },
    created(){        
        // console.log(JSON.stringify(res))
        // {"fid":"50976a52930c4bdf80cf5742397e5f89","phone":"15926264848","vilname":"小岗村","name":"赵六","group":"3组"}
        // console.log(this.$route.params.dataObject)
        // localStorage.getItem('dataObject')
        this.fuserInfo = JSON.parse(localStorage.getItem('dataObject'))
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
.van-field__control:disabled{color: #666!important;}
</style>
