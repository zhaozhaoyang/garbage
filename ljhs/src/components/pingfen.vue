<template>
    <div class="c1 bgcolor">
        <myheader tit="评分" showL="true"></myheader>
        <div>
            <van-cell-group>
                <van-field v-model="stype"  label="所属分类：" disabled />
                <van-field v-model="stype"  label="负责人：" disabled />
                <van-field v-model="stype"  label="所属分类：" disabled />
                <van-field v-model="stype"  label="所属分类：" disabled />
                <van-field v-model="stype"  label="所属分类：" disabled />
            </van-cell-group>
        </div>
        <div class="bgcolor mrate">
            <div class="mstart">
                <span>评分：</span>
                <div>
                    <van-rate v-model="score" color="#157FCA" size="16"/>
                </div>   
            </div> 
            <div class="liuyan">
                <textarea class="board" name="" id="" cols="30" rows="10" placeholder="请输入您的评分理由"></textarea>
            </div>        
        </div>
        <div class="sec1">
            <p class="font1">上传图片：</p>
            <div>
                <van-uploader  v-model="fileList" multiple :max-count="5" capture="camera" preview-size="50">
                    <div class="camera">
                        <!-- <van-button icon="photo" ></van-button> -->
                        <img src="../assets/images/upcamera.jpg" alt="" style="">
                    </div>                        
                </van-uploader>
            </div>
            
        </div>

        <m-ybutton @click="pingfen" text="提交"></m-ybutton>
    </div>
</template>
<script>
import myheader  from './component/header.vue'
import { Toast } from 'vant';
export default {
    components:{myheader},
    data() {
		return {
            stype:'垃圾回收',
            score:0,
            fileList:[]
		}
    },
    methods:{
        pingfen(){
            Toast.success('提交成功');
            this.$router.push('/index')
        }
    }
}
</script>
<style scoped>
.c1{width: 100vw;height: 100vh;}
.bgcolor{background: #fff;}
.mrate{margin: .3rem 0;}
.mstart{display: flex;flex-flow: row;height: 1.1rem; padding: 0rem 0.4rem;align-items: center;}
.mrate span{font-size: 0.373333rem;}
.liuyan{width: 100%;text-align: center;}
.board{background:rgba(247,247,247,1);height: 3.8rem;width: 9.1rem;padding: .3rem;border-radius: .1rem;}
.sec1{padding: 0 .4rem;}
.sec1 p{height: .88rem;line-height: .88rem;}
.font1{font-size:0.4rem ;color: #111111;font-weight: bold;}
.camera img{height:46px;width:46px;position: relative;top:4px;}
</style>
