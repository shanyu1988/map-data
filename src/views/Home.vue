<template>
    <div class="main" @click="bodyClickHandler($event)" v-loading="loading">
        <div class="tips">点击地图<br>查看更多信息</div>
        <div v-if="!isMobile" class="full-screen" @click="fullScreenHandler($event)">{{screenType?"退出全屏":"全屏"}}</div>
         <h1 class="title"></h1>
         <div class="map-box" ref="mapBox" id="mapBox">
           <gan-yu ref="ganYu" @mapClick="mapClickHandler"></gan-yu>
         </div>
        <div class="content-box"
             element-loading-background="rgba(0, 0, 0, 0.6)"
             @click="contentBoxClickHandler($event)">
            <div class="rolling-box" id="rollingBox">
                <div class="county-box">
                    <h1 class="box-title">
                        <p>
                            {{townInfo.Name?townInfo.Name:"暂无标题"}}
                        </p>

                    </h1>

                    <div class="item-title">
                        简介
                    </div>
                     <p class="content-text" v-html="townInfo.JianJie">
                     </p>
                    <div class="item-title">
                        {{currentTown.id=="ShouYe"?"组织架构图":"服务队合影"}}
                    </div>
                     <div class="group-photo" v-if="townInfo.PicPath">
                       <div class="img-box" >
                           <el-image
                                   style="width: 100%; height:100%"
                                   :src="imgUrl+townInfo.PicPath"
                                   :preview-src-list="groupUrlList">
                           </el-image>
                       </div>
                     </div>
                    <div class="item-title" v-if="huoDong&&huoDong.length>0">
                        特色服务展示
                    </div>
                     <ul class="activity-photo" v-if="huoDong&&huoDong.length>0">
                       <li v-for="(item,index) in huoDong"
                           :key="'huoDong'+index">
<!--                           @click="imgClickHandler(imgUrl2+item.PicPat,huoDong)"-->
                         <div class="img-box">
<!--                           <img :src="imgUrl2+item.PicPath">-->
                             <el-image
                                     style="width: 100%; height:100%"
                                     :src="imgUrl2+item.PicPath"
                                     :preview-src-list="huoDongUrlList">
                             </el-image>
                         </div>
                       </li>
                     </ul>
                    <div class="item-title" v-if="person&&person.length>0">
                        服务队队员信息
                    </div>
                    <ul class="person-info" v-if="person&&person.length>0">
                        <li v-for="(item ,index) in person" :key="'person'+index" @click="personClickHandler(item,index)">
                            <div class="img-box">
                                <img :src="imgUrl+item.PicPath">
                            </div>
                            <h4 class="person-name">{{item.Name}}</h4>
                        </li>
                    </ul>
                </div>
                <div class="township-box" v-if="false"></div>
            </div>
        </div>
        <el-drawer append-to-body
                   custom-class="person-drawer-1"
                   :visible.sync="drawer"
                   direction="rtl"
                   :with-header="false">
            <div class="person-info-box">
                <div class="person-photo">
                    <img :src="imgUrl+currentPersonInfo.PicPath">
                </div>

                <p class="person-name">
                    <span>姓名</span>
                    {{currentPersonInfo.Name}}
                </p>
                <div class="person-cheng-nuo" v-if="currentPersonInfo.ChengNuo">
                    <span>承诺</span>
                    <div v-html="currentPersonInfo.ChengNuo"></div>
                </div>
                <div class="person-synopsis">
                    <span>简介</span>
                    <div v-html="currentPersonInfo.JianJie"></div>
                </div>

            </div>
        </el-drawer>

    </div>
</template>

<script>
    import GanYu from "@/components/map/GanYu"
    import config from "@/sys.config.js"
    export default {
        name: "Home",
        components: {
            // eslint-disable-next-line vue/no-unused-components
            GanYu
        },
        data() {
            return {
                showImg:false,
                drawer: false,
                loading:false,
                mapBoxHeight: null,
                mapBoxWidth: null,
                currentTown: {
                    name: '首页',
                    id: "ShouYe"
                },
                imgUrl:config.requestUrl+"Upload/",
                imgUrl2:config.requestUrl,
                person:[],
                screenType:false,
                townInfo:{},
                huoDong:[],
                currentPersonInfo:{},
                isMobile:false,
                currentImgUrl:"",
                groupUrlList:[],
                huoDongUrlList:[]
            }
        },
        provide() {
            return {
                main: this
            }
        },
        methods: {
            bodyClickHandler(e){
                this.$refs.ganYu.currentTown = "ShouYe"
                this.loading = true;
                this.currentTown = {
                    id:'ShouYe',
                    name:"首页"
                };
                document.getElementById('rollingBox').scrollTop = 0;
                this.reqTownInfo()
                return false;
            },
            contentBoxClickHandler(e){
                e.stopPropagation();
            },
            imgClickHandler(imgUrl,urlList){
                this.showImg=true;
                this.currentImgUrl = imgUrl;


            },
            whetherIsMobile(){
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if(isAndroid || isiOS){
                    return true
                }
            },
            personClickHandler(personInfo){
                console.log(personInfo)
                this.currentPersonInfo = personInfo;
                this.drawer = true;
            },
            fullScreenHandler(){
                let docElm = document.documentElement;
                if(this.screenType){
                    if(document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if(document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if(document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if(document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                    this.screenType = false;
                }else{
                    if(docElm.requestFullscreen) {
                        docElm.requestFullscreen();
                    }
                    //FireFox
                    else if(docElm.mozRequestFullScreen) {
                        docElm.mozRequestFullScreen();
                    }
                    //Chrome等
                    else if(docElm.webkitRequestFullScreen) {
                        docElm.webkitRequestFullScreen();
                    }
                    //IE11
                    else if(elem.msRequestFullscreen) {
                        elem.msRequestFullscreen();
                    }
                    this.screenType = true;
                }
                e.stopPropagation();
            },
            getMapBoxHeight() {
                return document.getElementById("mapBox").offsetHeight;
            },
            getMapBoxWidth() {
                return document.getElementById("mapBox").offsetWidth;
            },
            mapClickHandler(town) {
                this.loading = true;
                this.currentTown = town;
                document.getElementById('rollingBox').scrollTop = 0;
                this.reqTownInfo()
            },
            reqTownInfo(){
                this.$http({
                    method:"post",
                    url:this.$http.adornUrl("/api/RenYuanList"),
                    data:{
                        quyu:this.currentTown.name==="首页"?this.currentTown.name:this.currentTown.name+"镇"
                    }
                }).then(({data})=>{
                    console.log(data)
                    this.person = data.Rens;
                    this.townInfo = data.zhen;
                    this.huoDong = data.HuoDongPicS;
                    this.loading = false;
                    if(this.townInfo.PicPath){
                        this.groupUrlList = [
                            this.imgUrl+this.townInfo.PicPath
                        ]
                    }else{
                        this.groupUrlList = []
                    }
                    this.huoDongUrlList=[];
                    if(this.huoDong.length>0){
                        this.huoDong.forEach((item,index)=>{
                            this.huoDongUrlList.push(this.imgUrl2+item.PicPath);
                        })
                    }

                }).catch(()=>{
                    this.$message.error("请求数据发生错误，请重新尝试！");
                })
            }
        },
        mounted() {
            this.isMobile = this.whetherIsMobile()
            this.mapBoxHeight = this.getMapBoxHeight();
            this.mapBoxWidth = this.getMapBoxWidth();
            this.reqTownInfo();
            let _this = this;
            window.onresize = function () {
                _this.mapBoxHeight = _this.getMapBoxHeight();
                _this.mapBoxWidth = _this.getMapBoxWidth();
                setInitialScale()
            }
        }
    };
</script>
<style lang="scss" scoped>
    .main {
        width: 100%;
        height: 100%;
        //background-color: #1c1c1c;
        /*background: #536976; !* fallback for old browsers *!*/
        /*background: -webkit-linear-gradient(to right, #292E49, #536976); !* Chrome 10-25, Safari 5.1-6 *!*/
        /*background: linear-gradient(to right, #292E49, #536976); !* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ *!*/
        background-image: url("~@/assets/img/bg.jpg");
        background-size: 100% 100%;
        position: relative;
        overflow: hidden;

        ::v-deep.el-dialog.img-dialog{
            height: 70%;
            .el-dialog__header{
                display: none;
            }
            .el-dialog__body{
                padding: 0;
            }
        }
        ::v-deep.el-image-viewer__wrapper {
            .el-image-viewer__btn.el-image-viewer__close{
                width: 80px;
                height: 80px;
                font-size: 80px;
                .el-icon-circle-close{
                    color: #FFF;
                }
            }
            .el-image-viewer__prev,.el-image-viewer__next{
                width: 80px;
                height: 80px;
                font-size: 60px;
            }
        }

        .tips{
            position: absolute;
            width: 200px;
            height: 24px;
            font-size:14px;
            line-height:21px;
            color: #bd343b;
            padding-top: 28px;
            bottom: 120px;
            left: 36px;
            background-image: url("~@/assets/img/click_red.png");
            background-repeat: no-repeat;
            background-size: 24px 24px;
            background-position: center top;
        }
        .county-box {
            width: calc(100% - 20px);
            .item-title{
                width: 680px;
                height: 58px;
                margin: 0 auto;
                line-height: 56px;
                font-size: 28px;
                color: #FFF;
                background-image: url("~@/assets/img/title_bg.png");
            }
        }
        .full-screen{
            cursor:pointer;
            left:36px;
            bottom: 36px;
            width: 200px;
            font-size: 18px;
            color: #cf3217;
            border: 1px solid #cf3217;
            background-color: rgba(255,255,255,.6);
            height: 40px;
            line-height: 40px;
            border-radius: 4px;
            position: absolute;
        }
        .title {
            position: absolute;
            top: 2%;
            left: 2%;
            width: 36.87%;
            height: 10.46%;
            background-repeat: no-repeat;
            background-position: center;
            background-image: url("~@/assets/img/heder_title_bg.png");
            //src/assets/img/heder_title_bg.png
            background-size: 100% 100%;
        }

        .map-box {
            position: absolute;
            top: 5%;
            left: 7%;
            width:50%;
            height: 90%;
        }

        .content-box {
            position: absolute;
            right: 2%;
            width: 37.5%;
            top: 5.56%;
            height: 88.88%;
            overflow: hidden;

            .rolling-box {
                width: calc(100% + 20px);
                height: 100%;
                overflow-y: auto;
                overflow-x: hidden;
            }
        }

        .box-title {
           height: 54px;
            margin-bottom: 30px;
            background-image: url("~@/assets/img/head_bg.png");
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center bottom;
            display: flex;
            justify-content: center;
            >p{
                padding: 0 20px;
                height: 40px;
                line-height: 40px;
                background-color: #FFF;
                font-size: 32px;
                text-align: center;
                color:#cf3217;
            }
        }

        .content-text {
            width: 100%;
            font-size: 18px;
            color: #e81f18;
            line-height: 1.8;
            text-align: justify;
            padding:20px 24px;
        }

        .group-photo {
            margin: 20px auto 20px auto;
            border-radius: 12px;
            background-color: #cf3317;
            width: 654px;
            height: 420px;
            padding: 5px 0 0 5px;
            .img-box {
                border-radius: 8px;
                overflow: hidden;
                border:5px solid #FFF;
                float: left;
                width: 644px;
                height: 410px;
            }
            ::v-deep.el-image{
                border-radius: 2px;
                overflow: hidden;
            }
        }

        .activity-photo {
            margin: 20px auto 20px auto;
            width: 654px;
            overflow: hidden;
            display: flex;
            justify-content: space-between;
            align-content: stretch;
            flex-wrap: wrap;
            > li {
                margin-bottom: 16px;
                border-radius: 12px;
                background-color: #cf3317;
                height: 220px;
                width: 318px;
                float: left;
                padding: 5px;
                overflow: hidden;

                .img-box {
                    background-color: #fcfaf2;
                    height: 210px;
                    width: 308px;
                    border-radius: 8px;
                    overflow: hidden;
                    > img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }

        .person-info {
            width: 654px;
            margin:0 auto;
            margin-top: 20px;
            overflow: hidden;
            display: flex;
            justify-content:space-between ;
            align-content: stretch;
            flex-wrap:wrap;
            > li {
                margin-bottom: 24px;
                border-radius:8px;
                cursor: pointer;
                width: 200px;
                height: 280px;
                background-color: #cf3317;
                padding: 6px 6px 0 6px;
                .img-box{
                    width: 188px;
                    margin: 0 auto;
                    height:225px;
                    overflow: hidden;
                    border-radius: 8px;
                    >img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .person-post {
                    color:#FFF;
                    font-size: 16px;
                    overflow: hidden;
                    height: 20px;
                }
                .person-name {
                    line-height: 1.5;
                    font-size: 20px;
                    font-weight: unset;
                    margin-top: 8px;
                    color:#FFF;
                }

            }


        }

        .content-title {
            width: 100%;
            padding-bottom: 12px;
            background-image: url("~@/assets/img/decorate_02.png");
            background-repeat: no-repeat;
            background-position: bottom left;

            .text {
                height: 54px;
                line-height: 50px;
                font-size: 28px;
                border-width: 2px;
                border-color: rgba(145, 152, 159, 0.8);
                border-style: solid;
                margin: 0 auto;
                color: #FFF;
                font-weight: normal;
            }

            .decorate {
                margin: 0 auto;
                width: 14px;
                height: 12px;
                background-repeat: no-repeat;
                background-position: center;
                background-image: url("~@/assets/img/decorate_01.png");
            }
        }
    }
    ::v-deep :focus{outline:0;}
</style>

<style lang="scss">
    .person-drawer-1{
        .el-drawer__body{
            overflow-y: auto;
            background:#FFF;
        }/*
        .el-drawer__body::-webkit-scrollbar {!*滚动条整体样式*!

            width: 10px;     !*高宽分别对应横竖滚动条的尺寸*!

            height: 1px;

        }
        .el-drawer__body::-webkit-scrollbar-thumb {
            !*滚动条里面小方块*!
            border-radius: 10px;
            box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
            background   : #535353;
        }
        .el-drawer__body::-webkit-scrollbar-track {
            !*滚动条里面轨道*!
            box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            background   : #ededed;
        }*/
        .person-info-box{
            padding: 24px;
            .person-photo{
                width: 200px;
                height: 280px;
                border-radius: 12px;
                overflow: hidden;
                >img{
                    width: 100%;
                    height: 100%;
                }
            }
            .person-name,.person-synopsis{
                color: rgb(230,30,20);
                margin-top: 24px;
                font-size:32px;
                margin-bottom: 16px;
                >span{
                    margin-bottom: 8px;
                    display: block;
                    font-size: 18px;
                    color: rgba(230,30,20,0.6);
                }

            }
            .person-synopsis{
                >div{
                    font-size: 16px;
                }
            }
            .person-cheng-nuo{
                margin-bottom: 16px;
                >div{
                    font-size: 20px;
                    color: #e61e14;
                }
                >span{
                    margin-bottom: 8px;
                    display: block;
                    font-size: 18px;
                    color: rgba(230,30,20,0.6);
                }
            }
        }
    }

</style>
