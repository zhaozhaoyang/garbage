<template>
    <div class="c1">
        <myheader tit="农户列表" showL="true"></myheader>
        <!-- <scroll :click="clicks" class="wrap"> -->
            <ul class="list">
                <li v-for="(item,index) in list" :key="index">
                    <div class="b1">
                        <img src="@/assets/images/touxiang.png" alt="">
                    </div>
                    <div class="b2">
                        <div class="tm">{{item.adtime}}</div>
                        <div class="bb2">
                            <div class="men">{{item.name}}</div>
                            <div class="blong">所属村：{{item.vname}}</div>
                        </div>               
                        <div class="b3 color6">
                            <div class="phone">联系方式：{{item.phone}}</div>                    
                            <div class="color6">所属组：{{item.gname}}</div>
                        </div>
                    </div>                
                </li>
            </ul>
        <!-- </scroll> -->
        
        <p class="nodata" v-if="list.length==0">
            暂无数据...
        </p>
    </div>
</template>
<script>
import myheader  from './component/header.vue'
import { Toast } from 'vant'
// import Scroll from './component/scroll.vue'
export default {
    components:{myheader},
    data() {
		return {
            clicks:true,
            uid:this.$store.state.uid || window.sessionStorage.getItem("uid"),
            list:[],
            totalPage:0 ,//总页数
            page: 1,
            pageCount:10,
            // 是否加载完成
            isload: true
		}
    },
    created(){
        this.getList()
        window.onscroll = function() {
        if (!this.isload) {
            return;
        }
        var scrollTop =document.body.scrollTop || document.documentElement.scrollTop;
        var clientHeight=document.compatMode == "CSS1Compat"?document.documentElement.clientHeight:document.body.clientHeight;
        var scrollHeight=document.body.scrollHeight|| document.documentElement.scrollHeight;
        // console.log(scrollTop +'----'+clientHeight+'---'+scrollHeight)
        if (
            scrollTop + (clientHeight - 0) >=scrollHeight - 0
        ) {
            this.getList();
        }
        }.bind(this);
    },
    mounted(){
        
    },
    methods:{
        getList(){
            if(!this.isload){
                return;
            }
            if(this.page!=1 && this.page>this.totalPage){
                Toast.toast('没有更多数据了..')
                return;
            }
            Toast.loading({
                mask: false,
                message: '加载中...',
                duration:0
            })
            this.isload = false;
            var data = {"cmd":"farmerlist","uid":this.uid,"nowPage":this.page}
            this.postRequest(data)
            .then(res =>{
                console.log(res)  
                this.isload=true;  
                this.page=this.page+1;  
                if(res.data.dataList){
                    this.totalPage = res.data.totalPage
                    this.list =this.list.concat(res.data.dataList);
                }
            })
        }
    }
}
</script>
<style scoped>
.color6{color: #999;}
.c1{background: #fff;height: 100vh;position: relative;}
.list{
    width: 100%;
}
.nodata{width:100%;text-align:center;height:100px;line-height:100px;color: #999;font-size: 14px;}
.wrap{
    position: absolute;
    top: 1.17rem;
    left: 0;
    bottom: 0px;
    width: 100%;
}
.list li{
    display: flex;
    flex-flow: row;
    border-bottom:1px solid #f7f7f7;
    height: 2.0rem;
    align-items: center;
    box-sizing: border-box;
}
.b1{
    width: 1.173rem;
    height: 1.173rem;
    border-radius: 50%;
    width: 20%;
    text-align: center;
}
.b1 img{height: 45px;width: 45px;border-radius: 50%;}
.b2{
    width: 77%; 
}
.tm{font-size: 12px;letter-spacing: 2px;text-align: right;}
.bb2,.b3{
    display: flex;flex-flow: row;justify-content: space-between;
}
.bb2{height: 30px;}
.men{font-size:16px;color: #111;font-weight: bold;}
.phone{font-size:13px;color: #999;}

.b3{font-size: 13px;text-align: right;}
.blong{color: #999;line-height: 30px;}
/* .b2,.b3{width: 40%;}
.b3{display: flex;flex-flow: column;}
.b1 img{height: 45px;width: 45px;border-radius: 50%;}
.men{font-size:16px;color: #111;font-weight: bold;margin-bottom: 15px;}
.phone{font-size:13px;color: #999;}
.tm{font-size: 12px;margin-bottom: 8px;letter-spacing: 2px;text-align: right;}
.b3{font-size: 13px;text-align: right;padding-right: 10px;}
.blong{margin-top: 8px;} */
</style>
