<template>
    <div class="c1 bgcolor">
        <myheader tit="评分" showL="true"></myheader>
        <div>
            <van-cell-group>
                <van-field v-model="stype"  label="所属分类：" disabled />
                <van-field v-model="fuserInfo.name"  label="负责人：" disabled />
                <van-field v-model="fuserInfo.vilname"  label="所属地域：" disabled />
                <van-field v-model="fuserInfo.group"  label="所属组：" disabled />
                <van-field v-model="fuserInfo.phone"  label="联系方式：" disabled />
            </van-cell-group>
        </div>
        <div class="bgcolor mrate">
            <div class="mstart">
                <span>评分：</span>
                <div>
                    <van-rate v-model="score" color="#157FCA" size="16" @change="getscore" allow-half/>
                </div>   
            </div> 
            <div class="liuyan">
                <textarea class="board" name="" id="" cols="30" rows="10" placeholder="请输入您的评分理由"></textarea>
            </div>        
        </div>
        <div class="sec1">
            <p class="font1">上传图片：</p>
            <div style="display:flex;">
                <img src="../assets/images/upcamera.jpg" class="cameraIcon"  @click="getImage" v-if="images.length<5">
                <div style="position:relative;"  v-for="(it,index) in images" :key="index">
                    <img :src="it" alt=""  class="cameraIcon" @click="showBig(index)">
                    <!-- <van-icon name="clear" @click="delImg(index)"/> -->
                    <img class="del" src="../assets/images/del.png" alt="" @click="delImg(index)" >
                </div>
            </div>
            
        </div>

        <m-ybutton @click="doIt" text="提交"></m-ybutton>
        <van-dialog
            className="mydg"
            v-model="showbig"
            :showConfirmButton="false"
            :closeOnClickOverlay="true"
            v-if="nowbig!=''"
            @click="closebig"
            >
            <img :src="nowbig"  style="width:100%;height:300px;">
        </van-dialog>
    </div>
</template>
<script>
import myheader  from './component/header.vue'
import axios from 'axios'
import { Toast } from 'vant';
export default {
    components:{myheader},
    data() {
		return {
            uid:this.$store.state.uid || window.sessionStorage.getItem("uid"),      
            stype:'垃圾回收',
            score:0,
            fileList:[],
            fuserInfo:{},

            images:[],
            content:"",

            dg_show:true,
            showbig:false,
            showConfirmButton:false,
            nowbig:"",
		}
    },
    created(){
        this.fuserInfo = JSON.parse(localStorage.getItem('dataObject'))
    },
    mounted(){
        var first = null
        var that = this
        mui.back = function() {
            if (!first) {
                that.$router.push('/saoysao')
                first = new Date().getTime() 
                setTimeout(function() { 
                    first = null
                }, 1000)
            } else {
                if (new Date().getTime() - first < 1000) { 
                    plus.runtime.quit() 
                }
            }
        }
    },
    methods:{
        doIt(){
            if(this.score == 0){
                Toast('评分不能为空！')
                return;
            }
            var obj = {"cmd":"subreScore",'uid':this.uid,fid:this.fuserInfo.fid,name:this.fuserInfo.name,vilname:this.fuserInfo.vilname,group:this.fuserInfo.group,phone:this.fuserInfo.phone,score:this.score*2,content:this.fuserInfo.content,images:this.images}
            console.log(JSON.stringify(obj))
            this.postRequest(obj)
			.then(res =>{
                Toast.success('提交成功');
                setTimeout(()=>{
                    this.$router.push('/index')
                },1500)

			})           
            
        },
        getscore(num){            
            this.score = num;          
        },
        getImage(){
        // 拍照上传
        // mui.plusReady(function() {
            var c = plus.camera.getCamera();
            var self = this;
            c.captureImage(function(e) {
                plus.io.resolveLocalFileSystemURL(e, function(entry) {
                    entry.file(function(file){							
                        var fileReader = new plus.io.FileReader();
                        fileReader.readAsDataURL(file)
                        var formdata = new FormData();
                        var newfile;
                        fileReader.onloadend = function(f){
                            newfile = self.dataURLtoFile(f.target.result.toString(),'detail.png');//图片文件流                            
                            self.onRead1(newfile,f.target.result.toString(),obj=>{
                                var formdata = new FormData();
                                console.log(obj)
                                formdata.append('file',obj);
                                axios.post('http://122.114.48.61:8080/garbage/api/uploadFile',formdata).then(res=>{
                                    console.log(JSON.stringify(res))
                                    if(res.data.result=='0'){                                       
                                       self.images.push(res.data.filepath)
                                    }
                                }).catch(err=>{
                                    Toast('图片上传失败！');	
                                })
                            })
                            
                        }								
                    })
                    
                }, function(e) {
                    console.log("读取拍照文件错误：" + e.message);
                });
            }, function(s) {
                console.log("error" + s);
            }, {
                filename: "_doc/head.jpg"
            })
        
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
         onRead1(file,content,callback) {
				// if(file.size > 4194304) {
				// 	console.log("图片大小不能超过4M")
				// 	return;
				// }
				if (/\/(?:jpeg|png)/i.test(file.type) && file.size > 204800) {
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
        delImg(index){
            this.images.splice(index, 1);
        },
        showBig(index){           
            this.nowbig=this.images[index]
            this.showbig = true
        },
        closebig(){
            this.showbig = false
        },
    }
}
</script>
<style scoped>
.c1{width: 100vw;height: 100vh;}
.bgcolor{background: #fff;}
.mrate{margin: .3rem 0;}
.mstart{display: flex;flex-flow: row;height: 1.1rem; padding: 0rem 0.4rem;align-items: center;}
.mrate span{font-size: 0.373333rem;}
.liuyan{width: 100%;text-align: center;}
.board{background:rgba(247,247,247,1);height: 3.8rem;width: 9.1rem;padding: .3rem;border-radius: .1rem;}
.sec1{padding: 0 .4rem;}
.sec1 p{height: .88rem;line-height: .88rem;}
.font1{font-size:0.4rem ;color: #111111;font-weight: bold;}
.camera img{height:46px;width:46px;position: relative;top:4px;}

.mydg{
    background: transparent;
}
.del{
    position: absolute;
    right: 4px;
    top: -5px;
    width: 18px;
    height: 18px
}
.van-field__control:disabled{color: #666!important}
.cameraIcon{height:50px;width:50px;margin-right:12px;border-radius:3px;}
</style>
