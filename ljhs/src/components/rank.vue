<template>
    <div style="width:100%;height:100vh;">
        <div class="header">
            <div>分值排行</div> 
        </div>    
        <van-tabs v-model="active" swipeable color="#157FCA"  :line-height="2">
            <van-tab  title="总排行" >
               <div class="c1" ref="wrapper">
                   <ul>
                    <li v-for="(i,index) in 20">
                        <div class="medal">
                            <img src="@/assets/images/one.jpg" alt="" v-if="index==0">
                            <img src="@/assets/images/two.jpg" alt="" v-if="index==1">
                            <img src="@/assets/images/tree.jpg" alt="" v-if="index==2">
                            <span v-if="index>2" class="font1">{{index}}</span>
                        </div>                       
                        <div class="who">
                            <img src="@/assets/images/touxiang.png" alt="">
                            <span>战三</span>
                        </div>
                        <span class="score">
                            3214
                        </span>
                    </li>
                   </ul>
               </div>
            </van-tab>
            <van-tab  title="日排行" >
                内容 2
            </van-tab>
            <van-tab  title="月排行" >
                内容 3
            </van-tab>
            <van-tab  title="年排行" >
                内容 4
            </van-tab>
            </van-tabs>      
        <btmbar @goIndex="goto"  :actived='actnum'></btmbar>
    </div>
</template>
<script>
import btmbar  from './component/btmbar.vue'
import Bscroll from 'better-scroll'
export default {
    components:{btmbar,Bscroll},
	data() {
		return {
			codeUrl: '',
            showsao:false,
            active:0,
            actnum:1
		}
    },
    mounted(){
        this.$nextTick(() => {
      	  this.scroll = new Bscroll(this.$refs.wrapper, {})
      	})
    },
    methods:{
        
    }
}
</script>
<style scoped>
.header{background: #fff;height: 1.17rem;line-height: 1.17rem;text-align: center;font-size: .48rem;font-weight: bold;}
.c1{width: 9.31rem;margin: .3rem auto 0;background: #fff;height: 14rem;overflow-y: hidden;border-radius: 5px;}
.c1 li{height: 1.17rem;width: 100%;display: flex;flex-flow: row;align-content: center;line-height: 1.17rem;border-bottom: 1px solid#f7f7f7;}
.medal{flex: 1;text-align: center;}
.medal img{width:.45rem;height:.56rem;}
.who{flex: 3;font-size: .4rem;}
.who img{width: .8rem;height: .8rem;border-radius: 50%;margin-right: .2rem;}
.score{flex:1;text-align: center;color: #157FCA;font-size: .35rem;}
.font1{font-size: 14px;}

</style>

