<template>
    <div class="c1">
       <myheader tit="我的"></myheader>
        <div class="avator">
            <div class="upImg">
                 <van-uploader>
                    <img class="face" src="@/assets/images/touxiang.png" alt="" @click="editFace">
                </van-uploader>
            </div>           
            
            <div class="name">
               <span class="f1">{{dataObject.nickname}}</span>
                <span @click="goEdit">
                    <!-- <van-icon name="edit" size="18"/> -->
                    <img src="@/assets/images/edit.jpg" class="edit">
                </span>
            </div>
        </div>
        <van-cell-group :border='nobder'>
           <van-cell title="我的评分" icon="star-o" title-class="f2"  is-link  to="/myscore"/>
           <van-cell title="设置" icon="setting-o" title-class="f2"  is-link to="/set"/>
        </van-cell-group>
    	<btmbar @goIndex="goto" :actived='actnum'></btmbar>    
    </div>
</template>
<script>
import btmbar  from './component/btmbar.vue'
import myheader  from './component/header.vue'
import { Toast } from 'vant';
export default {
    components:{btmbar,myheader},
    data() {
        return{
            uid:this.$store.state.uid || window.sessionStorage.getItem("uid"),
            nobder:false,
            actnum:2,
            dataObject:""
        }
    },
    created(){
        this.postRequest({"cmd":"userInfo",'uid':this.uid})
        .then(res =>{
            this.dataObject  = res.data.dataObject
            // console.log(res)
        })
    },
    methods:{
        goEdit(){
            this.$router.push({path: '/changeNick?name=' + this.dataObject.nickname});
        },
        editFace(){
            this.postRequest({"cmd":"saveIcon",'uid':this.uid,icon:""})
            .then(res =>{
                console.log(res)
                Toast('修改成功！');	
            })
        }
    }
}
</script>
<style scoped>
.c1{background: #fff;height: 100vh;width: 100%;}
.upImg{width: 100%;text-align: center;}
.avator{width: 100%;margin:1rem 0;}
.face{width: 2.4rem;height: 2.4rem;border-radius: 50%;}
.name{text-align: center;margin-top: .6rem;}
.f1{font-size: .4rem;}
.f2{font-size: .43rem}
.edit{height:22px;width:22px;position: relative;top:-2px;}
</style>

