<template>
    <div style="width:100%;height:100vh;">
        <div class="header">
            <div>分值排行</div> 
        </div>    
        <van-tabs v-model="active" swipeable color="#157FCA"  :line-height="2" @change="changeTab">
            <van-tab  title="总排行" >
               <div class="c1" ref="wrapper">
                   <ul>
                    <li v-for="(i,index) in list" :key="index">
                        <div class="medal">
                            <img src="@/assets/images/one.jpg" alt="" v-if="index==0">
                            <img src="@/assets/images/two.jpg" alt="" v-if="index==1">
                            <img src="@/assets/images/tree.jpg" alt="" v-if="index==2">
                            <span v-if="index>2" class="font1">{{index}}</span>
                        </div>                       
                        <div class="who">
                            <img src="@/assets/images/touxiang.png" alt="">
                            <span>{{i.name}}</span>
                        </div>
                        <span class="score">
                            {{i.score}}
                        </span>
                    </li>
                   </ul>
                   <p class="nodata" v-if="list.length==0"> 暂无数据...  </p>                  
               </div>
            </van-tab>
            <van-tab  title="日排行" >
               <div class="c1" ref="wrapper">
                   <ul>
                    <li v-for="(i,index) in list" :key="index">
                        <div class="medal">
                            <img src="@/assets/images/one.jpg" alt="" v-if="index==0">
                            <img src="@/assets/images/two.jpg" alt="" v-if="index==1">
                            <img src="@/assets/images/tree.jpg" alt="" v-if="index==2">
                            <span v-if="index>2" class="font1">{{index}}</span>
                        </div>                       
                        <div class="who">
                            <img src="@/assets/images/touxiang.png" alt="">
                            <span>{{i.name}}</span>
                        </div>
                        <span class="score">
                            {{i.score}}
                        </span>
                    </li>
                   </ul>
                   <p class="nodata" v-if="list.length==0"> 暂无数据...  </p>
               </div>
            </van-tab>
            <van-tab  title="月排行" >
                <div class="c1" ref="wrapper">
                   <ul>
                    <li v-for="(i,index) in list" :key="index">
                        <div class="medal">
                            <img src="@/assets/images/one.jpg" alt="" v-if="index==0">
                            <img src="@/assets/images/two.jpg" alt="" v-if="index==1">
                            <img src="@/assets/images/tree.jpg" alt="" v-if="index==2">
                            <span v-if="index>2" class="font1">{{index}}</span>
                        </div>                       
                        <div class="who">
                            <img src="@/assets/images/touxiang.png" alt="">
                            <span>{{i.name}}</span>
                        </div>
                        <span class="score">
                            {{i.score}}
                        </span>
                    </li>
                   </ul>
                   <p class="nodata" v-if="list.length==0"> 暂无数据...  </p>
               </div>
            </van-tab>
            <van-tab  title="年排行" >
                <div class="c1" ref="wrapper">
                   <ul>
                    <li v-for="(i,index) in list" :key="index">
                        <div class="medal">
                            <img src="@/assets/images/one.jpg" alt="" v-if="index==0">
                            <img src="@/assets/images/two.jpg" alt="" v-if="index==1">
                            <img src="@/assets/images/tree.jpg" alt="" v-if="index==2">
                            <span v-if="index>2" class="font1">{{index}}</span>
                        </div>                       
                        <div class="who">
                            <img src="@/assets/images/touxiang.png" alt="">
                            <span>{{i.name}}</span>
                        </div>
                        <span class="score">
                            {{i.score}}
                        </span>
                    </li>
                   </ul>
                   <p class="nodata" v-if="list.length==0"> 暂无数据...  </p>
               </div>
            </van-tab>
            </van-tabs>      
        <btmbar @goIndex="goto"  :actived='actnum'></btmbar>
    </div>
</template>
<script>
import btmbar  from './component/btmbar.vue'
import Bscroll from 'better-scroll'
import { Toast } from 'vant'
export default {
    components:{btmbar,Bscroll},
	data() {
		return {
            uid:this.$store.state.uid || window.sessionStorage.getItem("uid"),
			codeUrl: '',
            showsao:false,
            active:0,
            actnum:1,

            type:0, // 0总排行 1日排行 2月排行 3年排行
            page:1,
            pageCount:10,
            list:[],
            totalPage:1,
            isend:true,
            pullup:true,
		}
    },
    created(){
        this.getList()
    },
    mounted(){
        var first = null
		mui.back = function() {
			if (!first) {
				first = new Date().getTime() 
				mui.toast('再按一次退出应用')
				setTimeout(function() { 
					first = null
				}, 1000)
			} else {
				if (new Date().getTime() - first < 1000) { 
					plus.runtime.quit() 
				}
			}
		}
        setTimeout(() => {
            this._initScroll()
        }, 20)
        this.$nextTick(() => {
            this.scroll = new Bscroll(this.$refs.wrapper, {})
        })
    },
    methods:{
        _initScroll() {   
            if (this.pullup) {
            this.scroll.on('scrollEnd', () => {
                
                if (this.scroll.y <= (this.scroll.maxScrollY + 50) && this.scroll.y !=0) {
                    console.log(this.scroll.y + '***'+this.scroll.maxScrollY)
                    this.getList()
                }
            })
            }
        },
        getList(num){
            if(num == '1'){
                this.page = 1;
                this.list=[]
            }
            if(this.page!=1 && this.page>this.totalPage){
                Toast('没有更多数据了....')
                return;
            }
            if(!this.isend){
                return;
            }
            Toast.loading({
                mask: false,
                message: '加载中...',
                loadingType:"spinner",
                duration:0
            })
            this.isend = false;
            var params = {"cmd":"scoreSort",'uid':this.uid,type:this.type,nowPage:this.page,pageCount:this.pageCount}
            this.postRequest(params)
            .then(res =>{
                console.log(res)
                this.isend = true;
                if(res.data.dataList){                    
                    this.totalPage= res.data.totalPage                    
                    this.list = [...this.list, ...res.data.dataList]                    
                    this.page=this.page+1;
                }
                
            })
        },
        changeTab(num){
            // console.log(num)
            this.type = num;
            this.getList('1')
        }
    }
}
</script>
<style scoped>
.header{background: #fff;height: 1.17rem;line-height: 1.17rem;text-align: center;font-size: .48rem;font-weight: bold;}
.c1{width: 9.31rem;margin: .3rem auto 0;background: #fff;height: 13.6rem;overflow-y: hidden;border-radius: 5px;}
.c1 li{height: 1.17rem;width: 100%;display: flex;flex-flow: row;align-content: center;line-height: 1.17rem;border-bottom: 1px solid#f7f7f7;}
.medal{flex: 1;text-align: center;}
.medal img{width:.45rem;height:.56rem;}
.who{flex: 3;font-size: .4rem;}
.who img{width: .8rem;height: .8rem;border-radius: 50%;margin-right: .2rem;}
.score{flex:1;text-align: center;color: #157FCA;font-size: .35rem;}
.font1{font-size: 14px;}
.nodata{width:100%;text-align:center;height:100px;line-height:100px;color: #999;font-size: 14px;}
</style>

