<template>
    <div class="c1">
        <myheader tit="巡河" showL="true"></myheader>
        <div class="box">
            <div class="sec1">
                <p class="font1">巡河河段：</p>
                <van-radio-group v-model="radio"  @change="sel_he">
                    <div class="c_he">
                        <van-radio :name="index" checked-color="#157FCA" v-for="(it,index) in riverList" :key="index"><span class="font2">{{it.name}}</span></van-radio>
                        <!-- <van-radio name="2" checked-color="#157FCA"><span class="font2">单选框 1</span></van-radio>
                        <van-radio name="3" checked-color="#157FCA"><span class="font2">单选框 1</span></van-radio> -->
                    </div>
                </van-radio-group>                
            </div>
            <div class="sec1">
                <p class="font1">天气：</p>
                <van-radio-group v-model="radiow" checked-color="#157FCA" @change="sel_weather">
                    <div class="c_he">
                        <van-radio name="1" checked-color="#157FCA"><span class="font2">晴</span></van-radio>
                        <van-radio name="2" checked-color="#157FCA"><span class="font2">多云</span></van-radio>
                        <van-radio name="3" checked-color="#157FCA"><span class="font2">阴天</span></van-radio>
                    </div>
                </van-radio-group>                
            </div>
             <div class="sec1">
                <p class="font1">存在问题：</p>
                <div class="truble bd">
                   <div style="width:80%;">
                        <van-tag :plain='item.show' type="primary" round color="#157FCA" @click="choose(index)" v-for="(item,index) in questionList" :key="index">{{item.questioncontent}}</van-tag>
                    </div>
                </div>
            </div>
            <div class="sec1">
                <p class="font1">其他问题描述：</p>
                <textarea class="board" name="" id="" cols="30" rows="10" placeholder="请描述你的问题">

                </textarea>
            </div>
            <div class="sec1">
                <p class="font1">上次问题解决情况：</p>
                <textarea class="board" name="" id="" cols="30" rows="10" placeholder="请输入...">

                </textarea>
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
                    <!-- <van-uploader  v-model="fileList" multiple :max-count="5" capture="camera" preview-size="50">
                        <div class="camera">
                            <img src="../assets/images/upcamera.jpg" alt="" style="height:50px;width:50px;position:relative;top:-3px;">
                        </div>                        
                    </van-uploader> -->
                </div>
                
            </div>
            <m-ybutton @click="doIt"></m-ybutton>
        </div>
        <van-dialog v-model="dg_show" :showConfirmButton="showConfirmButton">
            <div class="dg_content">
                <img src="../assets/images/bell.jpg" style="height:57px;width:88px;">
                <p>温馨提示：街道级河长每月巡河不少于2次 村级河长每月巡河不少于4次</p>
                <m-ybutton size="3" text="开始巡河" @click="close_dg"></m-ybutton>
            </div>            
        </van-dialog>
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
import { Toast} from 'vant'
import axios from 'axios'
export default {
    components:{myheader},
    data() {
		return {
            uid:this.$store.state.uid || window.sessionStorage.getItem("uid"),
            radio:'0',
            radiow:'0',
            // fileList:[],
            dg_show:true,
            showbig:false,
            showConfirmButton:false,
            nowbig:"",
            riverList:[],

            questionList:[],
            content:"",       //其他问题描述
            // images:['http://122.114.48.61:8080/garbage/userfiles/sendfile/2019/07/20190704145215fbJN.jpg'],
            images:[],
            weather:"",
            reachname:"",    //河段名称
            lastquestion:"", //上次问题解决情况
            question:""
		}
    },
    created(){
        // 河段
        this.postRequest({"cmd":"reachList","uid":this.uid})
        .then(res =>{
            // console.log(res)
            if(res.data.dataList){
                this.riverList = res.data.dataList
            }
        })
        // 问题列表
        this.questions()
    },
    methods:{
        questions(){
            this.postRequest({"cmd":"questionList"})
            .then(res =>{
                if(res.data.dataList){
                    // console.log(res)
                    for(let i in res.data.dataList){
                        res.data.dataList[i].show = true
                    }
                    this.questionList = res.data.dataList
                }
            })
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
        sel_he(num){
            this.reachname = this.riverList[num].name
        },
        sel_weather(num){
            if(num == '1')
                this.weather = '晴'
            else if(num == '2')
                this.weather = '多云'
            else
                this.weather = '阴天'
            
        },
        choose(n){      
            // this['isplain'+n] =  !this['isplain'+n];
            this.questionList[n].show = !this.questionList[n].show            
        }, 
        close_dg(){
            this.dg_show = false;
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
        doIt(){
            // 提交
            var qarr =[];//存储问题
            for(let i in this.questionList){
                if(!this.questionList[i].show){
                    qarr.push(this.questionList[i].questioncontent)
                }
            }
           this.question = qarr.toString()            
            if(this.reachname ==''||this.weather==""||this.images.length=='0'){
                Toast('河段名称、天气、上传图片不能为空！');	
                return;
            }

            this.postRequest({cmd:"subRiverPotrol",uid:this.uid,reachname:this.reachname,weather:this.weather,question:this.question,content:this.content,lastquestion:this.lastquestion,images:this.images})
            .then(res =>{
                console.log(res)
                this.$router.push('/upok') 
            })            
            
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
        }
    }
}
</script>
<style scoped>
.c1{background: #fff;}
.font1{font-size:0.427rem ;color: #111111;font-weight: bold;}
.bd{border-bottom: 1px solid #C0C0C0;}
.font2{font-size:0.347rem ;color: #333;}
.box{padding: .4rem;}
.van-radio{margin-right: .2rem;}
.sec1 p{height: .99rem;line-height: .99rem;}
.c_he{display: flex;flex-flow: row;border-bottom: 1px solid #C0C0C0;height: 1.1rem;line-height: 1.1rem;}
.truble{min-width: 70px;}
.van-tag{margin: .22rem;}
.board{background:rgba(247,247,247,1);height: 4.053rem;width: 9.28rem;padding: .3rem;border-radius: 4px;}
::-webkit-input-placeholder { 
    color:    #999;
}
.camera{height: 50px;width: 50px;border-radius: 3px;margin-top: .13rem;position: relative;}

/* .camera .van-button{height: 50px;width: 50px;} */
.dg_content{display: flex;flex-flow: column;align-items: center;}
.dg_content img{margin-top: .3rem;}
.dg_content p{width: 80%;margin: .5rem 0;line-height: .5rem;color: #333;font-size: 15px;}
.cameraIcon{height:50px;width:50px;margin-right:12px;border-radius:3px;}


.del{
    position: absolute;
    right: 4px;
    top: -5px;
    width: 18px;
    height: 18px
}
.mydg{
    background: transparent;
}
</style>
