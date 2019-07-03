<template>
    <div class="c1">
        <myheader tit="农户列表" showL="true"></myheader>
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
        <ul class="list" v-if="list.length==0" >
           <li style="text-align:center;">暂无数据...</li> 
        </ul>
    </div>
</template>
<script>
import myheader  from './component/header.vue'
export default {
    components:{myheader},
    data() {
		return {
            uid:this.$store.state.uid || window.sessionStorage.getItem("uid"),
            list:[],
            totalPage:"" ,//总页数
            nowPage: 1,
            pageCount:10
		}
    },
    created(){
        this.getList(1)
    },
    methods:{
        getList(num){
            var data = {"cmd":"farmerlist","uid":this.uid,"nowPage":num,"pageCount":this.pageCount}
            this.postRequest(data)
            .then(res =>{
                console.log(res)                
                if(res.data.dataList){
                    this.list = res.data.dataList
                    this.totalPage = res.data.totalPage
                }
            })
        }
    }
}
</script>
<style scoped>
.color6{color: #999;}
.c1{background: #fff;height: 100vh;}
.list{
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
