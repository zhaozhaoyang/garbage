<template>
    <div class="c1">
        <myheader tit="我的评分" showL="true"></myheader>
        <ul class="list">
            <li v-for="(item,index) in list" :key="index">
                <div class="b1">
                    <img src="@/assets/images/touxiang.png" alt="">
                </div>
                <div class="b2">
                    <!-- <div class="tm">{{item.adtime}}</div> -->
                    <div class="bb2">
                        <div class="men">{{item.name}}</div>
                        <div class="tm">{{item.adtime}}</div>
                    </div>               
                    <div class="b3 color6">
                        <div class="phone">{{item.vilname}}、{{item.group}}</div>                    
                        <div class="color6">评分：{{item.score}}</div>
                    </div>
                </div>                
            </li>
        </ul>
        <p class="nodata" v-if="list.length==0">
            暂无数据...
        </p>
    </div>
</template>
<script>
import myheader  from './component/header.vue'
import { Toast } from 'vant'
export default {
    components:{myheader},
    data() {
		return {
            uid:this.$store.state.uid || window.sessionStorage.getItem("uid"),
            list:[],
            page:1,
            pageCount:15,
            isload:true,
            totalPage:0 ,//总页数
		}
    },
    created(){
        this.getList()
    },
    mounted(){
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
    methods:{
        getList(){
            if(this.page!=1 && this.page>this.totalPage){
                Toast('没有更多数据了..')
                return;
            }

            this.postRequest({"cmd":"myScoreList",'uid':this.uid,nowPage:this.page,pageCount:this.pageCount})
            .then(res =>{
                console.log(res)
                if(res.data.dataList){
                    this.list = [...this.list,...res.data.dataList]
                    this.totalPage = res.data.totalPage
                    this.page += 1
                }           
            })
        }
    },
    destroyed(){
        window.onscroll = null
    }
}
</script>
<style scoped>
.color6{color: #999;}
.c1{background: #fff;height: 100vh;}
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
.nodata{width:100%;text-align:center;height:100px;line-height:100px;color: #999;font-size: 14px;}
.b1 img{height: 45px;width: 45px;border-radius: 50%;}
.b2{
    width: 77%; 
}
.tm{font-size: 12px;letter-spacing: 2px;text-align: right;color: #999;}
.bb2,.b3{
    display: flex;flex-flow: row;justify-content: space-between;
}
.bb2{height: 30px;}
.men{font-size:16px;color: #111;font-weight: bold;}
.phone{font-size:13px;color: #999;}

.b3{font-size: 13px;text-align: right;}
.blong{color: #999;line-height: 30px;}
</style>
