<template>
    <div class="c1">
        <myheader tit="巡河" showL="true"></myheader>
        <div class="box">
            <div class="sec1">
                <p class="font1">巡河河段：</p>
                <van-radio-group v-model="radio"  @change="sel_he">
                    <div class="c_he">
                        <van-radio name="1" checked-color="#157FCA"><span class="font2">白坡滩</span></van-radio>
                        <van-radio name="2" checked-color="#157FCA"><span class="font2">单选框 1</span></van-radio>
                        <van-radio name="3" checked-color="#157FCA"><span class="font2">单选框 1</span></van-radio>
                    </div>
                </van-radio-group>                
            </div>
            <div class="sec1">
                <p class="font1">天气：</p>
                <van-radio-group v-model="radiow" checked-color="#157FCA" @change="sel_weather">
                    <div class="c_he">
                        <van-radio name="1" checked-color="#157FCA"><span class="font2">晴</span></van-radio>
                        <van-radio name="2" checked-color="#157FCA"><span class="font2">多云</span></van-radio>
                        <van-radio name="3" checked-color="#157FCA"><span class="font2">阴天</span></van-radio>
                    </div>
                </van-radio-group>                
            </div>
             <div class="sec1">
                <p class="font1">存在问题：</p>
                <div class="truble bd">
                   <div style="width:80%;">
                        <van-tag :plain='isplain0' type="primary" round color="#157FCA" @click="choose(0)">水域异常</van-tag>
                        <van-tag :plain='isplain1' type="primary" round color="#157FCA" @click="choose(1)">非法排污</van-tag>
                        <van-tag :plain='isplain2' type="primary" round color="#157FCA" @click="choose(2)">倾倒、堆放垃圾</van-tag>
                        <van-tag :plain='isplain3' type="primary" round color="#157FCA" @click="choose(3)">淤泥沉积</van-tag>
                    </div>
                </div>
            </div>
            <div class="sec1">
                <p class="font1">其他问题描述：</p>
                <textarea class="board" name="" id="" cols="30" rows="10" placeholder="请描述你的问题">

                </textarea>
            </div>
            <div class="sec1">
                <p class="font1">其他问题描述：</p>
                <textarea class="board" name="" id="" cols="30" rows="10" placeholder="请描述你的问题">

                </textarea>
            </div>
            <div class="sec1">
                <p class="font1">上传图片：</p>
                <div>
                    <van-uploader  v-model="fileList" multiple :max-count="5" capture="camera" preview-size="50">
                        <div class="camera">
                            <!-- <van-button icon="photo" ></van-button> -->
                            <img src="../assets/images/upcamera.jpg" alt="" style="height:50px;width:50px;position:relative;top:-3px;">
                        </div>                        
                    </van-uploader>
                </div>
                
            </div>
            <m-ybutton @click="doIt"></m-ybutton>
        </div>
        <van-dialog v-model="dg_show" :showConfirmButton="showConfirmButton">
            <div class="dg_content">
                <img src="../assets/images/bell.jpg" style="height:57px;width:88px;">
                <p> 多街道级河长每月巡河不少于2次 村级河长每月巡河不少于4次</p>
                <m-ybutton size="3" text="开始巡河" @click="close_dg"></m-ybutton>
            </div>            
        </van-dialog>
    </div>
</template>
<script>
import myheader  from './component/header.vue'
export default {
    components:{myheader},
    data() {
		return {
            radio:'0',
            radiow:'0',
            isplain0:true,
            isplain1:true,
            isplain2:true,
            isplain3:true,
            fileList:[],
            dg_show:true,
            showConfirmButton:false
		}
    },
    methods:{
        sel_he(){

        },
        sel_weather(){

        },
        choose(n){            
            this['isplain'+n] =  !this['isplain'+n];
        }, 
        close_dg(){
            this.dg_show = false;
        },
        doIt(){
            if(true){

            }
            this.$router.push('/upok')
        }
    }
}
</script>
<style scoped>
.c1{background: #fff;}
.font1{font-size:0.427rem ;color: #111111;font-weight: bold;}
.bd{border-bottom: 1px solid #C0C0C0;}
.font2{font-size:0.347rem ;color: #333;}
.box{padding: .4rem;}
.van-radio{margin-right: .2rem;}
.sec1 p{height: .99rem;line-height: .99rem;}
.c_he{display: flex;flex-flow: row;border-bottom: 1px solid #C0C0C0;height: 1.1rem;line-height: 1.1rem;}
.truble{min-width: 70px;}
.van-tag{margin: .22rem;}
.board{background:rgba(247,247,247,1);height: 4.053rem;width: 9.28rem;padding: .3rem;border-radius: 4px;}
::-webkit-input-placeholder { 
    color:    #999;
}
.camera{height: 50px;width: 50px;border-radius: 3px;margin-top: .13rem;position: relative;}

/* .camera .van-button{height: 50px;width: 50px;} */
.dg_content{display: flex;flex-flow: column;align-items: center;}
.dg_content img{margin-top: .3rem;}
.dg_content p{width: 80%;margin: .5rem 0;line-height: .5rem;color: #333;font-size: 15px;}
</style>
