<template>
    <div class="header">
        <van-icon name="arrow-left" class="leftA" size="22" v-if="showL" @click="back"/>     
        <div class="title">{{tit}}</div> 
    </div>   
</template>
<script>
export default {
    data() {
        return {
        }
    },
    props:{
        tit:{},
        showL:{
            default:false
        }
    },
    methods:{
        
    }
}
</script>
<style scoped>
.header{background: #157FCA;height: 1.17rem;line-height: 1.17rem;text-align: center;font-size: .5rem;color: #fff;position: relative;display: flex;flex-flow: row;align-content: center;justify-content: center;}
.title{font-size: .48rem;}
.leftA{position: absolute;left: .15rem;top: .3rem;}
</style>
