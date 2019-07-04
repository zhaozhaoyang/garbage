<template>
    <div class="c1">
        <myheader tit="消息" showL="true"></myheader>
        <scroll :click="clicks" :pullup="true" @scrollToEnd="scrollToEnd" class="wrapper_box">
            <ul class="list">
                <li class="flex" v-for="(item,index) in list" :key="index">
                    <div class="lf">
                        <span class="font1 sp1">{{item.title}}</span>
                        <span class="font2">{{item.content}}</span>
                    </div>
                    <div class="rt color9 font2">
                    {{item.adtime}}
                    </div>
                </li> 
                 <div class="" style="width:100%;text-align:center;" v-if="isLoading">
                    <van-loading type="spinner" color="#1989fa" size="16"/>
                    <span style="line-height:30px;color:#999;">{{loadtip}}</span>
                </div>      
            </ul>
        </scroll>
        <p class="nodata" v-if="list.length==0">
            暂无数据...
        </p>
    </div>
</template>
<script>
import myheader  from './component/header.vue'
import Scroll from './component/scroll.vue'
import BScroll from 'better-scroll'
export default {
    components:{myheader,Scroll},
    data() {
		return {
            list:[],	
            // list:[{"title":"标题","content":"内容","adtime":"时间"},{"title":"标题","content":"内容","adtime":"时间"},{"title":"标题","content":"内容","adtime":"时间"},{"title":"标题","content":"内容","adtime":"时间"},{"title":"标题","content":"内容","adtime":"时间"},{"title":"标题","content":"内容","adtime":"时间"},{"title":"标题","content":"内容","adtime":"时间"},{"title":"标题","content":"内容","adtime":"时间"},{"title":"标题","content":"内容","adtime":"时间"},{"title":"标题","content":"内容","adtime":"时间"},{"title":"标题","content":"内容","adtime":"时间"}],
            uid:this.$store.state.uid || window.sessionStorage.getItem("uid"),
            page:1,
            pageCount:10,
            totalPage:1,

            clicks: true,
            loadtip:"加载中..",
            isLoading:false,
            isend:true

		}
    },
    created(){
        this.getList()
    },
    mounted(){
        
    },
    methods:{
        getList(){
            if(!this.isend){
                return;
            }
            this.isend = false;
            this.postRequest({"cmd":"messagelist",'uid':this.uid,nowPage:this.page,pageCount:this.pageCount})
            .then(res =>{
                console.log(res)
                this.isend = true;
                if(res.data.dataList){
                    this.totalPage= res.data.totalPage                    
                    this.list = [...this.list, ...res.data.list]
                    this.page=this.page+1;  
                }
            })
        },
        scrollToEnd(){
            this.isLoading=true;
            if(this.totalPage<=this.page){
                this.loadtip= '没有更多了...'
                setTimeout(()=>{
                    this.isLoading = false;
                },2000)
                return;
            }
            this.getList();
        }
    }
}
</script>
<style scoped>
.nodata{width:100%;text-align:center;height:100px;line-height:100px;color: #999;font-size: 14px;}
.flex{display: flex;flex-flow: row;align-items: center;justify-content: space-between;}
.font1{font-size: .43rem;font-weight: bold;color:#111; }
.font2{font-size: .32rem;color:#999; }
.color9{color: #999;}
.c1{width: 100%;height: 100vh;background: #fff;}
.list{padding: .4rem .3rem;}
.list li{height: 1.8rem;width: 100%;border-bottom: 1px solid #fafafa;box-sizing: border-box;}
.lf{display: flex;flex-flow: column;}
.sp1{margin-bottom: .3rem;}
.rt{letter-spacing: 1px;align-self: flex-start;margin-top: 15px;}

.wrapper_box{
    position: absolute;
    width: 100%;
    top: 1.17rem;
    bottom: 0;
    overflow: hidden;
}
</style>
