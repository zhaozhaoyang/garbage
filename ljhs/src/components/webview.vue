<template>
    <div style="width:100%;height:100vh">
        <myheader tit="链接页面" showL="true"></myheader>
        <iframe :src="src" frameborder="0" height="90%"  width="100%" class="ifram"></iframe>
    </div>
</template>
<script>
import myheader  from './component/header.vue'
export default {
    components:{myheader},
    data(){
        return{
            src:""
        }
    },
    created(){
        this.src = this.$route.params.src
    }
}
</script>
<style scope>
</style>