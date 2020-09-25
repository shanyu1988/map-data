<template>
    <div class="main">

        <div class="tips">点击地图<br>查看更多信息</div>
        <div v-if="!isMobile" class="full-screen" @click="fullScreenHandler">{{screenType?"退出全屏":"全屏"}}</div>
         <h1 class="title"></h1>
         <div class="map-box" ref="mapBox" id="mapBox">
           <gan-yu @mapClick="mapClickHandler"></gan-yu>
         </div>
        <div class="content-box"
             element-loading-background="rgba(0, 0, 0, 0.6)"
             v-loading="loading">
            <div class="rolling-box" id="rollingBox">
                <div class="county-box">
                    <h1 class="box-title">
                        {{townInfo.Name?townInfo.Name:"暂无标题"}}
                    </h1>
                     <!--<h1 class="box-title">
                       抗日山共产党员服务队
                       <template v-if="currentTown.name">
                         {{currentTown.name}}服务所
                       </template>
                     </h1>-->
                     <div class="content-title">
                       <div class="text" style="width: 260px">简介</div>
                       <div class="decorate"></div>
                     </div>
                     <p class="content-text" v-html="townInfo.JianJie">
                     </p>
                     <div class="content-title" v-if="townInfo.PicPath">
                       <div class="text" style="width: 260px">服务队合影</div>
                       <div class="decorate"></div>
                     </div>
                     <div class="group-photo" v-if="townInfo.PicPath">
                       <div class="img-box" >
<!--                           @click="imgClickHandler(imgUrl+townInfo.PicPath,[])"-->
                           <el-image
                                   style="width: 100%; height:100%"
                                   :src="imgUrl+townInfo.PicPath"
                                   :preview-src-list="groupUrlList">
                           </el-image>
<!--                         <img :src="imgUrl+townInfo.PicPath">-->
                       </div>
                     </div>
                     <div class="content-title" v-if="huoDong&&huoDong.length>0">
                       <div class="text" style=" width: 260px">服务活动展示</div>
                       <div class="decorate"></div>
                     </div>
                     <ul class="activity-photo" v-if="huoDong&&huoDong.length>0">
                       <li v-for="(item,index) in huoDong"
                           :key="'huoDong'+index"
                           :style="{marginRight:index%2===0?'16px':'0'}">
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
                    <div class="content-title" v-if="person&&person.length>0">
                        <div class="text" style="width: 360px">抗日山共产党员服务队</div>
<!--                        <div class="text" style="width: 360px">标题</div>-->
                        <div class="decorate"></div>
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
                   custom-class="person-drawer"
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
                <div class="person-synopsis">
                    <span>简介</span>
                    <div v-html="currentPersonInfo.JianJie"></div>
                </div>
            </div>
        </el-drawer>
        <el-dialog :visible.sync="showImg"
                   width="70%"
                   custom-class="img-dialog"
                   :show-close="false">

        </el-dialog>
    </div>
</template>

<script>
    import GanYu from "@/components/map/GanYu@v1"
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
                    name: '青口',
                    id: "MapQingKou"
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
            imgClickHandler(imgUrl,urlList){
                this.showImg=true;
                console.log('----',imgUrl)
                console.log('----',urlList)
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
                this.reqTownInfo(town.name)
            },
            reqTownInfo(){
                this.$http({
                    method:"post",
                    url:this.$http.adornUrl("/api/RenYuanList"),
                    data:{
                        quyu:this.currentTown.name+"镇"
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
        background: #536976; /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #292E49, #536976); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #292E49, #536976); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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
            color: #dbdbdb;
            padding-top: 28px;
            bottom: 140px;
            left: 36px;
            background-image: url("~@/assets/img/click.png");
            background-repeat: no-repeat;
            background-size: 24px 24px;
            background-position: center top;
        }
        .county-box {
            width: calc(100% - 20px);
        }
        .full-screen{
            cursor:pointer;
            left:36px;
            bottom: 36px;
            width: 200px;
            font-size: 18px;
            color: #FFF;
            border: 1px solid #FFF;
            height: 40px;
            line-height: 40px;
            border-radius: 4px;
            position: absolute;
        }
        .title {
            position: absolute;
            top: 7.03%;
            left: 3.75%;
            width: 25%;
            height: 7.59%;
            background-repeat: no-repeat;
            background-position: center;
            background-image: url("~@/assets/img/title.png");
            background-size: 100% 100%;
        }

        .map-box {
            position: absolute;
            top: 11.11%;
            left: 7%;
            width: 43.23%;
            height: 78.33%;
        }

        .content-box {
            position: absolute;
            right: 5%;
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
            font-size: 38px;
            text-align: center;
            color: rgb(255, 255, 255);
            margin-bottom: 40px;
        }

        .content-text {
            width: 100%;
            font-size: 18px;
            color: #fcfaf2;
            line-height: 1.8;
            text-align: justify;
            padding: 24px;
        }

        .group-photo {
            margin: 24px auto 24px auto;
            border-radius: 12px;
            background-image: linear-gradient(-45deg, rgb(88, 178, 220) 0%, rgb(30, 136, 168) 100%);
            width: 480px;
            height: 270px;
            padding: 5px 0 0 5px;
            .img-box {
                border-radius: 8px;
                overflow: hidden;
                float: left;
                width: 470px;
                height: 260px;

                > img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .activity-photo {
            margin: 24px auto 24px auto;
            width: 640px;
            overflow: hidden;
            > li {
                margin-bottom: 16px;
                border-radius: 12px;
                background-image: linear-gradient(-45deg, rgb(88, 178, 220) 0%, rgb(30, 136, 168) 100%);
                height: 180px;
                width: 312px;
                float: left;
                padding: 5px;
                overflow: hidden;

                .img-box {
                    background-color: #fcfaf2;
                    height: 170px;
                    width: 302px;
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
            width: 700;
            margin: 0 auto;
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
                background-image: -moz-linear-gradient(-45deg, rgb(88, 178, 220) 0%, rgb(30, 136, 168) 100%);
                background-image: linear-gradient(-45deg, rgb(88, 178, 220) 0%, rgb(30, 136, 168) 100%);
                background-image: -ms-linear-gradient(-45deg, rgb(88, 178, 220) 0%, rgb(30, 136, 168) 100%);
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
    .person-drawer{
        .el-drawer__body{
            overflow-y: auto;
            background: linear-gradient(to top, #292E49, #536976);
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
                color: #FFF;
                margin-top: 24px;
                font-size:32px;
                >span{
                    margin-bottom: 8px;
                    display: block;
                    font-size: 18px;
                    color: #dbdbdb;
                }

            }
            .person-synopsis{
                >div{
                    font-size: 16px;
                }
            }
        }
    }

</style>
