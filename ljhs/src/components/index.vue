<template>
	<div class="box">
		<div class="header">
			<van-icon name="scan" size="25px" @click="goscan"/>
			<div>垃圾回收APP</div>
			<!-- <van-icon name="bulb-o" size="26px" @click="gonews"/> -->
			<van-icon class-prefix="iconfont icon-iconfontzhizuobiaozhun023110" name="extra"  size="22px" @click="gonews"/>
		</div>
		<div class="saoma" v-if="showsao">
			<div class="cancelscan">
				<span class="canspan" @click="downScan">关闭</span>
			</div>
			<div id="bcid"></div>
		</div>
		<div ref="wrapper" class="wrapper">
			<div>
			<div>	
				<van-swipe :autoplay="3000" indicator-color="white">
					<van-swipe-item>
						<img src="@/assets/images/banner.jpg" alt="" style="width:100%;height:4.27rem;">						
					</van-swipe-item>
					<van-swipe-item>
						<img src="@/assets/images/banner.jpg" alt="" style="width:100%;height:4.27rem;">						
					</van-swipe-item>
				</van-swipe>
			</div>
			<div>			
				<ul class="bars">
					<li @click="gotoflei">
						<img src="@/assets/images/nav1.jpg" alt="">
						<span>垃圾分类</span>
					</li>
					<li @click="goxunhe">
						<img src="@/assets/images/nav2.jpg" alt="">
						<span>巡河</span>
					</li>
					<li @click="gorank">
						<img src="@/assets/images/nav3.jpg" alt="" >
						<span>排行</span>
					</li>
				</ul>
			</div>
			<div class="logo">
				<img src="@/assets/images/banner.jpg" alt="" >
			</div>
			</div>
		</div>
		<btmbar @goIndex="goto" :actived='actnum'></btmbar>
	</div>
</template>

<script>
import btmbar  from './component/btmbar.vue'
import { Icon,Swipe, SwipeItem} from 'vant';
import Bscroll from 'better-scroll'
let scan = null
export default {
	components:{btmbar,Bscroll},
	data() {
		return {
			codeUrl: '',
			showsao:false,
			actnum:0
		}
	},
	mounted(){
		// window.addEventListener('scroll', this.handleScroll, true);  // 监听（绑定）滚轮滚动事件
		this.$nextTick(() => {
      	  this.scroll = new Bscroll(this.$refs.wrapper, {click: true})
      	})
	},
	methods: {
		gorank(){
			this.$router.push('/rank')
		},
		goxunhe(){
			console.log(2222)
			this.$router.push({ name: 'identity', params: {}})
			
		},
		gotoflei(){
			this.$router.push('/fenlei')
		},
		gonews(){
			this.$router.push('/news')
		},
		goscan(){
			this.showsao= true;
			setTimeout(()=>{
				this.startRecognize()
			},500)
		},
		// 创建扫描控件
      startRecognize () {
        let that = this
        if (!window.plus) return
        scan = new plus.barcode.Barcode('bcid')
        scan.onmarked = onmarked

        function onmarked (type, result, file) {
          switch (type) {
            case plus.barcode.QR:
              type = 'QR'
              break
            case plus.barcode.EAN13:
              type = 'EAN13'
              break
            case plus.barcode.EAN8:
              type = 'EAN8'
              break
            default:
              type = '其它' + type
              break
          }
          result = result.replace(/\n/g, '')
          that.codeUrl = result
        //   alert(result)
		  that.closeScan();
		  
		  that.$router.push({
			  name:'saoysao',
			  params:{}
		  })

		}
		setTimeout(()=>{
			this.startScan()
		},500)		
      },
      // 开始扫描
      startScan () {
        if (!window.plus) return
        scan.start()
      },
      // 关闭扫描
      downScan () {
        if (!window.plus) return
		scan.cancel()
		this.closeScan()
		
      },
      // 关闭条码识别控件
      closeScan () {
        if (!window.plus) return
		scan.close()
		this.showsao = false;
	  },
	},
}
</script>

<style scoped>
*{ touch-action: none; }
	.box{width: 100%;box-sizing: border-box;background: #fff;}
	.header{background: #fff;padding: 0 .2rem 0;height: 1.17rem;display: flex;flex-flow: row;align-content: center;justify-content: space-between;line-height: 1.17rem;}
	.van-icon{line-height: 1.17rem;}
	.header div{font-size: .48rem;font-weight: bold;}
	.bars{display: flex;width: 100%;flex-flow: row;justify-content: space-around;align-content: center;background: #fff;padding: .5rem .3rem;}
	.bars li{display: flex;flex-flow: column;align-content: center;}
	.bars li span{text-align: center;margin-top: .2rem;}
	.bars li img{width: 1.2rem;height: 1.2rem;border-radius: 50%;}
	#bcid {
	  width: 100vw;
	  height: 92vh;
      position: absolute;
	  left: 0;
	  top: 8vh;
      right: 0;
      text-align: center;
      color: #fff;
	  background: rgba(0,0,0,0.9);
	  z-index: 11;
	}
	.cancelscan{
		position: absolute;
		background: rgba(0,0,0);
		top: 0;
		left: 0;
		z-index: 12;
		height: 8vh;
		line-height: 8vh;
		width: 100%;
		color: #fff;
	}
	.canspan{color: #fff;font-size: .36rem;padding-left: .2rem;}
	.wrapper{
		position: absolute;
		top: 1.17rem;
		bottom: 1.3333rem;
		width: 100%;
		overflow: hidden;
		background: #fff;
	}
	.logo{width: 100%;text-align: center;margin-top:30px;}
	.logo img{
		width: 90px;
		height: 90px;
		border-radius: 50%;
	}
</style>
