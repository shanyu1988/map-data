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
                    <div class="item-title custom-title" v-if="townInfo.JianJie">
                        <p :style="{lineHeight:townInfo.Name1&&townInfo.Name1.length>15?'36px':'82px'}">{{townInfo.Name1?townInfo.Name1:"暂无标题"}}</p>
                    </div>
                     <p class="content-text" v-html="townInfo.JianJie"></p>
<!--                    服务队合影-->
                    <div class="item-title custom-title" v-if="fuWuDui&&fuWuDui.length>0" >
<!--                       -->
                        <p :style="{lineHeight:townInfo.Name2.length>15?'36px':'82px'}">{{townInfo.Name2?townInfo.Name2:"暂无标题"}}</p>
                    </div>
                    <div class="fu-wu-dui-box" v-if="fuWuDui&&fuWuDui.length>0" >
                        <!--<div class="group-photo" v-for="(item,index) in fuWuDui" :key="'fuWuDui'+index">
                            <div class="img-box">
                                <el-image
                                        style="width: 100%; height:100%"
                                        :src="imgUrl2+item.PicPath"
                                        :preview-src-list="fuWuDuiUrlList">
                                </el-image>
                            </div>
                        </div>-->
                        <div class="fu-wu-dui-photo" v-for="(item,index) in fuWuDui" :key="'fuWuDui'+index">
                            <div class="img-box">
                                <el-image
                                        style="width: 100%; height:100%"
                                        :src="imgUrl2+item.PicPath"
                                        :preview-src-list="fuWuDuiUrlList">
                                </el-image>
                            </div>
                        </div>
                    </div>

                    <div class="item-title custom-title" v-if="huoDong&&huoDong.length>0">
                        <p :style="{lineHeight:townInfo.Name3.length>15?'36px':'82px'}">{{townInfo.Name3?townInfo.Name3:"暂无标题"}}</p>
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
                    <div class="item-title custom-title" v-if="person&&person.length>0">
                        <p :style="{lineHeight:townInfo.Name3.length>15?'36px':'82px'}">{{townInfo.Name4?townInfo.Name4:"暂无标题"}}</p>
                    </div>
                    <ul class="person-info" v-if="person&&person.length>0">
                        <li v-for="(item ,index) in person" :key="'person'+index" @click="personClickHandler(item,index)">
<!--                            @click="personClickHandler(item,index)"-->
                            <div class="img-box">
                                <img :src="imgUrl+item.PicPath">
                            </div>
                            <div class="text-box">
<!--                                <p class="person-name" :style="getPersonNameHeight(item)">-->
<!--                                    {{item.Name}}-->
<!--                                </p>-->
<!--                                <p class="person-cheng-nuo" v-if="item.ChengNuo">-->
<!--                                    服务承诺：{{item.ChengNuo}}-->
<!--                                </p>-->
<!--                                <p class="person-jian-jie">-->
<!--                                    简介：{{item.JianJie}}-->
<!--                                </p>-->
<!--                                                            v-html="item.ChengNuo"-->

                                <div class="person-dui-yuan">
                                    <div class="title">
                                        姓名
                                    </div>
                                    <div class="content name">
                                        {{item.Name}}
                                    </div>
                                </div>

                                <div class="person-dui-yuan">
                                    <div class="title">
                                        岗位
                                    </div>
                                    <div class="content info">
                                        {{item.GangWei}}
                                    </div>
                                </div>

                                <div class="person-dui-yuan">
                                    <div class="title">
                                        服务承诺
                                    </div>
                                    <div class="content info">
                                        {{item.ChengNuo}}
                                    </div>
                                </div>

                                <div class="person-dui-yuan">
                                    <div class="title">
                                        简介
                                    </div>
                                    <div class="content info">
                                        {{item.JianJie}}
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="township-box" v-if="false"></div>
            </div>
        </div>
        <!--
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
                    <span>服务承诺</span>
                    <div v-html="currentPersonInfo.ChengNuo"></div>
                </div>
                <div class="person-synopsis">
                    <span>简介</span>
                    <div v-html="currentPersonInfo.JianJie"></div>
                </div>
            </div>
        </el-drawer>
        -->

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
                fuWuDui:[],
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
                huoDongUrlList:[],
                fuWuDuiUrlList:[]
            }
        },
        provide() {
            return {
                main: this
            }
        },
        computed:{

        },
        methods: {
            getPersonNameHeight(item){
                if(item.ChengNuo){
                    return {
                        height:"32px",
                        lineHeight:"32px"
                    }
                }else{
                    return {
                        height:"76px",
                        lineHeight:"76px"
                    }
                }

            },
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
                // this.currentPersonInfo = personInfo;
                // this.drawer = true;
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
                        quyu:this.currentTown.name==="首页"||this.currentTown.name==="城郊"?this.currentTown.name:this.currentTown.name+"镇"
                    }
                }).then(({data})=>{
                    console.log('5678',data)
                    this.person = data.Rens;
                    //this.personSort();
                    this.townInfo = data.zhen;
                    this.huoDong = data.PicS_3;
                    this.fuWuDui = data.PicS_2;
                    this.loading = false;
                    // if(this.townInfo.PicPath){
                    //     this.groupUrlList = [
                    //         this.imgUrl+this.townInfo.PicPath
                    //     ]
                    // }else{
                    //     this.groupUrlList = []
                    // }

                    this.huoDongUrlList=[];
                    this.fuWuDuiUrlList = [];
                    if(this.fuWuDui.length>0){
                        this.fuWuDui.forEach((item,index)=>{
                            this.fuWuDuiUrlList.push(this.imgUrl2+item.PicPath);
                        })
                    }
                    if(this.huoDong.length>0){
                        this.huoDong.forEach((item,index)=>{
                            this.huoDongUrlList.push(this.imgUrl2+item.PicPath);
                        })
                    }

                }).catch((e)=>{
                    console.error()
                    this.$message.error("请求数据发生错误，请重新尝试！");
                })
            },
            personSort(){
                // ChengNuo: "春蚕到死丝方尽蜡炬成灰泪始干"
                // File_Name: "董淑军1.jpg"
                // JianJie: ""
                // Name: "董淑军1"
                // PicPath: "d6786918ba774ac591fb5ba147ac06bc.jpg"
                // Sort: 1
                for(let i=0;i<this.person.length-1;i++){
                    for(let j =0;j<this.person.length-i-1;j++){
                        if(this.person[j].Sort>this.person[j+1].Sort){
                            let swap = this.person[j];
                            this.person[j] = this.person[j+1];
                            this.person[j+1] = swap
                        }
                    }
                }
            },
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
                font-size: 24px;
                color: #FFF;
                background-repeat: no-repeat;
                background-image: url("~@/assets/img/title_bg.png");
            }
            .item-title.custom-title{
                overflow: hidden;
                height: 72px;
                color: #e5150e;
                background-position: bottom;
                background-image: url("~@/assets/img/title_bg_01.png");
                >p{
                    margin: 0 auto;
                    width: 360px;
                }
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
        >.title {
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
        .fu-wu-dui-box{
            width: 654px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-content: stretch;
            flex-wrap: wrap;
            margin-top: 20px;
            .fu-wu-dui-photo{
                border-radius: 8px;
                width: 318px;
                height: 220px;
                overflow: hidden;
                margin-bottom: 16px;
                .img-box{
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .group-photo {
            margin: 20px auto 20px auto;
            border-radius: 8px;
            background-color: #e61e13;

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
                border-radius: 8px;
                height: 220px;
                width: 318px;
                float: left;
                overflow: hidden;
                .img-box {
                    height: 100%;
                    width: 100%;
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
                height: 385px;
                background-color: #e61e13;
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
                .person-dui-yuan{
                    line-height: 1.5;
                    font-size: 14px;
                    color: #FFF;
                    margin-bottom: 6px;
                    overflow: hidden;
                    >.content.info{}
                    >.content.name{
                        font-weight: bold;
                    }
                    >.title{
                        font-size: 14px;
                        text-align-last:justify;
                        text-align:justify;
                        text-justify:distribute-all-lines; // 这行必加，bai兼容ie浏览器
                        float: left;
                        width: 72px;
                        padding-right: 16px;
                        line-height: 1.5;
                        color:rgba(255,255,255,0.7)
                    }
                    >.content{
                        font-size: 14px;
                        float:right;
                        line-height: 1.5;
                        max-height: 42px;
                        width: calc(100% - 72px);
                        text-align: left;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                }
                .person-jian-jie{
                    line-height: 20px;
                    font-size: 14px;
                    height: 40px;
                    color: #FFF;
                    overflow: hidden;
                }
                .text-box{
                    height: 145px;
                    padding-top: 8px;
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

