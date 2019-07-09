<template>
    <div class="c1">
       <myheader tit="我的"></myheader>
        <div class="avator">
            <div class="upImg">
                 <van-uploader :after-read="editFace">
                    <img class="face" :src="dataObject.icon" alt="" :onerror="src">
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
import axios from 'axios'
export default {
    components:{btmbar,myheader},
    data() {
        return{
            uid:this.$store.state.uid || window.sessionStorage.getItem("uid"),
            nobder:false,
            actnum:2,
            dataObject:"",
            src:'this.src="' + require('@/assets/images/mren.jpg') + '"'
        }
    },
    created(){
        // this.postRequest({"cmd":"userInfo",'uid':this.uid})
        // .then(res =>{
        //     this.dataObject  = res.data.dataObject           
        // })
        this.dataObject  = JSON.parse(window.sessionStorage.getItem("userInfo"))
    },
    methods:{
        goEdit(){
            this.$router.push({path: '/changeNick?name=' + this.dataObject.nickname});
        },
        editFace(file){
            var that = this;   
            // console.log(file)         
            this.compress(file.file,file.content,obj=>{
                var formdata = new FormData();
                formdata.append('file',obj);
                // console.log(obj)
                axios.post('http://122.114.48.61:8080/garbage/api/uploadFile',formdata).then(res=>{
                    // console.log(res)
                    if(res.data.result=='0'){
                        that.src = res.data.filepath 
                        that.dataObject.icon = res.data.filepath
                        window.sessionStorage.setItem("userInfo",JSON.stringify(that.dataObject))
                        that.postRequest({"cmd":"saveIcon",'uid':this.uid,icon:res.data.filepath}).then(result=>{
                            // console.log(result)
                            Toast('修改成功！');
                        })
                    }
                }).catch(err=>{
                    Toast('头像上传失败！');	
                })
            })
            
        },
        compress(file,content,callback){
            // 压缩
            if (/\/(?:jpeg|png)/i.test(file.type) && file.size > 102400) {
					let self = this
					let canvas = document.createElement('canvas')
					// 获取对应的CanvasRenderingContext2D对象(画笔)
					let ctx = canvas.getContext('2d')
					// 创建新的图片对象 
					let img = new Image()
					// 指定图片的DataURL(图片的base64编码数据)
					img.src = content
					img.onload = function() {
						var initSize = img.src.length;
						var width = img.width;
						var height = img.height;
						console.log(width, height, '输出宽高')
					
						//如果图片大于四百万像素，计算压缩比并将大小压至400万以下
						var ratio;
						if ((ratio = width * height / 4000000) > 1) {
							ratio = Math.sqrt(ratio);
							width /= ratio;
							height /= ratio;
						} else {
							ratio = 1;
						}
					
						canvas.width = width;
						canvas.height = height;
					
						//铺底色
						ctx.fillStyle = "#fff";
						ctx.fillRect(0, 0, canvas.width, canvas.height);
					
						// 如果图片像素大于100万则使用瓦片绘制
						var count;
						let tCanvas = document.createElement('canvas');
						let tctx = canvas.getContext('2d');
						if ((count = width * height / 10000000) > 1) {
							count = (Math.sqrt(count) + 1); //计算要分成多少块瓦片
					
							//            计算每块瓦片的宽和高
							var nw = (width / count);
							var nh = (height / count);
					
							tCanvas.width = nw;
							tCanvas.height = nh;
					
							for (var i = 0; i < count; i++) {
								for (var j = 0; j < count; j++) {
									tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
									ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
								}
							}
						} else {
							ctx.drawImage(img, 0, 0, width, height);
						}
					
						//进行最小压缩
						content = canvas.toDataURL("image/jpeg", 0.1);					
						canvas.width = canvas.height = 0;
					
						let files = self.dataURLtoFile(content, Date.parse(Date()) + '.jpg')
                        callback(files)
					}
				}else{
                    callback(file)					
				}

        },
        dataURLtoFile(dataurl, filename) {
				let arr = dataurl.split(','),
					mime = arr[0].match(/:(.*?);/)[1],
					bstr = atob(arr[1]),
					n = bstr.length,
					u8arr = new Uint8Array(n);
				while (n--) {
					u8arr[n] = bstr.charCodeAt(n);
				}
				return new File([u8arr], filename, {
					type: mime
				});
         },

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

