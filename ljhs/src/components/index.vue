<template>
  <div class="box">
    <div class="header">
      <van-icon name="scan" size="30px" @click="goscan" />
      <div>垃圾回收APP</div>
      <!-- <van-icon name="bulb-o" size="26px" @click="gonews"/> -->
      <van-icon
        class-prefix="iconfont icon-iconfontzhizuobiaozhun023110"
        name="extra"
        size="26px"
        @click="gonews"
      />
    </div>
    <div class="saoma" v-if="showsao">
      <div class="cancelscan">
        <span class="canspan" @click="downScan">关闭</span>
      </div>
      <div id="bcid"></div>
    </div>
    <div ref="wrapper" class="wrapper">
      <div>
        <div class="lunbo">
          <van-swipe :autoplay="3000" indicator-color="white" style="height:100%;">
            <van-swipe-item
              v-for="(item,index) in bannerlist"
              :key="index"
              @touchstart="touchstart"
              @touchend="touchend"
            >
              <img
                :src="item.image"
                alt
                style
                class="lunboImg"
                @click.stop="gowebview(item.contentUrl,item.title)"
              />
            </van-swipe-item>
          </van-swipe>
        </div>
        <div>
          <ul class="bars animated fadeInLeft">
            <li @click="gotoflei">
              <img src="@/assets/images/nav1.jpg" alt />
              <span>垃圾分类</span>
            </li>
            <li @click="goxunhe">
              <img src="@/assets/images/nav2.jpg" alt />
              <span>巡河</span>
            </li>
            <li @click="gorank">
              <img src="@/assets/images/nav3.jpg" alt />
              <span>排行</span>
            </li>
          </ul>
        </div>
        <div class="logo">
          <img src="@/assets/images/logo.png" alt />
        </div>
      </div>
    </div>
    <btmbar @goIndex="goto" :actived="actnum"></btmbar>
    <van-dialog v-model="showdg" :showConfirmButton="false" :closeOnClickOverlay="true">
      <div>
        <!-- <img src="@/assets/images/bg.png" style="width:280px;height:240px;"> -->
        <div :style="bgmask" class="saobg">
          <div class="tipss">请扫描你所在区域二维码</div>
          <div class="btn" @click="closemsk">确定</div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import btmbar from "./component/btmbar.vue";
import 'vue2-animate/dist/vue2-animate.min.css';
import { Icon, Swipe, SwipeItem, Lazyload, Toast } from "vant";
import Bscroll from "better-scroll";
let scan = null;
export default {
  components: { btmbar, Bscroll },
  data() {
    return {
      uid: this.$store.state.uid || window.sessionStorage.getItem("uid"),
      codeUrl: "",
      showsao: false,
      actnum: 0,
      bannerlist: JSON.parse(window.localStorage.getItem("bannerlist")), //轮播图
      dataObject: {},

      showdg: false,
      bgmask:
        "background: url(" +
        require("../assets/images/bg.png") +
        ");background-size:100% 100%;",
      youke: "",

      oneX: "",
      twoX: ""
    };
  },
  created() {
    this.youke = window.sessionStorage.getItem("youke");
    this.getBannerImg();
    this.getUserInfo();
  },
  mounted() {
    var first = null;
    mui.back = function() {
      if (!first) {
        first = new Date().getTime();
        mui.toast("再按一次退出应用");
        setTimeout(function() {
          first = null;
        }, 1000);
      } else {
        if (new Date().getTime() - first < 1000) {
          plus.runtime.quit();
        }
      }
    };
    // window.addEventListener('scroll', this.handleScroll, true);  // 监听（绑定）滚轮滚动事件
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.wrapper, { click: true });
    });
  },
  methods: {
    touchstart(e) {
      this.oneX = e.changedTouches[0].clientX;
    },
    touchend(e) {
      this.twoX = e.changedTouches[0].clientX;
    },
    gowebview(url,title) {
      if (this.oneX == this.twoX) {
        //当滑动距离等于0时触发点击事件
        window.event ? (window.event.cancelBubble = true) : e.stopPropagation();
        var url = "http://122.114.48.61:8080/" + url;
        this.$router.push({
          name: "webview",
          params: { src: url,title:title}
        });
      }
    },
    getBannerImg() {
      this.postRequest({ cmd: "bannerlist" }).then(res => {
        if (res.data.dataList) {
          console.log(res)
          var bannerlist = res.data.dataList;
          for (let i of bannerlist) {
            i.image = "http://122.114.48.61:8080/" + i.image;
          }
          window.localStorage.setItem("bannerlist", JSON.stringify(bannerlist));
          this.bannerlist = bannerlist;
        }
      });
    },
    getUserInfo() {
      if (this.youke == "3") {//游客
        return;
      }
      this.postRequest({ cmd: "userInfo", uid: this.uid }).then(res => {
        // console.log(res);
        this.dataObject = res.data.dataObject;
        window.sessionStorage.setItem(
          "userInfo",
          JSON.stringify(res.data.dataObject)
        );
        this.$store.commit("setuserInfo", res.data.dataObject);
      });
    },
    gorank() {
      if (this.dataObject.identity != "0") {
        Toast.fail("暂无权限！");
        return;
      }
      this.$router.push("/rank");
    },
    closemsk() {
      this.showdg = false;
    },
    goxunhe() {
      if (this.dataObject.identity != "1" && this.dataObject.identity != "2") {
        Toast.fail("暂无权限！");
        return;
      }
      this.$router.push({ name: "identity", params: {} });
    },
    gotoflei() {
      if (this.dataObject.identity != "0") {
        Toast.fail("暂无权限！");
        return;
      }
      this.$router.push("/fenlei");
    },
    gonews() {
      this.$router.push("/news");
    },
    goscan() {
      if (this.youke == "3" || this.dataObject.identity != "0") {
        Toast.fail("暂无权限！");
        return;
      }
      this.showsao = true;
      setTimeout(() => {
        this.startRecognize();
      }, 500);
    },
    // 创建扫描控件
    startRecognize() {
      let that = this;
      if (!window.plus) return;
      var styles = {frameColor: "#22ac38",scanbarColor: "#22ac38"};
      scan = new plus.barcode.Barcode("bcid",'',styles);
      scan.onmarked = onmarked;

      function onmarked(type, result, file) {
        switch (type) {
          case plus.barcode.QR:
            type = "QR";
            break;
          case plus.barcode.EAN13:
            type = "EAN13";
            break;
          case plus.barcode.EAN8:
            type = "EAN8";
            break;
          default:
            type = "其它" + type;
            break;
        }
        result = result.replace(/\n/g, "");
        that.codeUrl = result;
        console.log(result);
        that.closeScan();
        //   this.showdg = false //扫码失败代码

        that
          .postRequest({ cmd: "scan", fid: result, uid: that.uid })
          .then(res => {
            if (res.data.resultNote == "扫描失败，二维码数据有误") {
              that.showdg = true; //扫码失败代码
            } else {
              localStorage.setItem(
                "dataObject",
                JSON.stringify(res.data.dataObject)
              );
              that.$router.push({
                name: "saoysao",
                params: { dataObject: JSON.stringify(res.data.dataObject) }
              });
            }
          });
      }
      setTimeout(() => {
        this.startScan();
      }, 500);
    },
    // 开始扫描
    startScan() {
      if (!window.plus) return;
      scan.start();
    },
    // 关闭扫描
    downScan() {
      if (!window.plus) return;
      scan.cancel();
      this.closeScan();
    },
    // 关闭条码识别控件
    closeScan() {
      if (!window.plus) return;
      scan.close();
      this.showsao = false;
    }
  }
};
</script>

<style scoped>
.box {
  width: 100%;
  box-sizing: border-box;
  background: #fff;
}
.header {
  background: #fff;
  padding: 0 0.2rem 0;
  height: 1.17rem;
  display: flex;
  flex-flow: row;
  align-content: center;
  justify-content: space-between;
  line-height: 1.17rem;
}
.van-icon {
  line-height: 1.17rem;
}
.header div {
  font-size: 0.48rem;
  font-weight: bold;
}
.bars {
  display: flex;
  width: 100%;
  flex-flow: row;
  justify-content: space-around;
  align-content: center;
  background: #fff;
  padding: 0.5rem 0.3rem;
}
.bars li {
  display: flex;
  flex-flow: column;
  align-content: center;
}
.bars li span {
  text-align: center;
  margin-top: 0.2rem;
}
.bars li img {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
}
#bcid {
  width: 100vw;
  height: 92vh;
  position: absolute;
  left: 0;
  top: 8vh;
  right: 0;
  text-align: center;
  color: #fff;
  background: rgba(0, 0, 0, 0.9);
  z-index: 11;
}
.lunbo {
  width: 100%;
  height: 4.27rem;
  background: #d7d7d7;
}
.lunboImg {
  width: 100%;
  height: 4.27rem;
}
.cancelscan {
  position: absolute;
  background: rgba(0, 0, 0);
  top: 0;
  left: 0;
  z-index: 12;
  height: 8vh;
  line-height: 8vh;
  width: 100%;
  color: #fff;
}
.canspan {
  color: #fff;
  font-size: 0.36rem;
  padding-left: 0.2rem;
}
.wrapper {
  position: absolute;
  top: 1.17rem;
  bottom: 1.3333rem;
  width: 100%;
  overflow: hidden;
  background: #fff;
}
.logo {
  width: 100%;
  text-align: center;
  margin-top: 50px;
}
.logo img {
  width: 125px;
  height: 120px;
}
.van-dialog {
  background: transparent;
  text-align: center;
}
.saobg {
  height: 240px;
  width: 280px;
  margin: 0 auto;
  position: relative;
}
.tipss {
  color: #666;
  font-size: 14px;
  position: relative;
  top: 3.5rem;
}
.btn {
  display: block;
  width: 4.56rem;
  height: 1.17rem;
  line-height: 1.17rem;
  text-align: center;
  border-radius: 0.586rem;
  font-size: 0.43rem;
  background: #157fca;
  color: #fff;
  position: absolute;
  bottom: 20px;
  left: 1.56rem;
}

.dg_content {
  display: flex;
  flex-flow: column;
  align-items: center;
}
.dg_content img {
  margin-top: 0.3rem;
}
.dg_content p {
  width: 80%;
  margin: 0.5rem 0;
  line-height: 0.5rem;
  color: #333;
  font-size: 15px;
}
</style>
