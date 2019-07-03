<template>
    <div class="c1">
        <myheader tit="关于我们" showL="true"></myheader>
        <div class="say">
            <p>如果你无法简洁的表达你的想法，那只说明你还不够了解它。</p>
            <p>-- 阿尔伯特·爱因斯坦</p>
        </div>
    </div>
</template>
<script>
import myheader  from './component/header.vue'
export default {
    components:{myheader},
    created(){
        this.postRequest({"cmd":"abouttus"})
        .then(res =>{
            console.log(res)
            
        })
    }
}
</script>
<style scoped>
.c1{width: 100%;height: 100vh;background: #fff;}
.say{padding: .6rem;margin: 0 auto;font-size: 15px;color: #111;font-weight: bold;line-height: 20px;}
.say p{margin-bottom: 10px;}
</style>
