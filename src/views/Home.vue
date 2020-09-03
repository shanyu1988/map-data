<template>
    <div class="main">
        <div class="full-screen">全屏</div>
<!--         <h1 class="title"></h1>-->
<!--         <div class="map-box" ref="mapBox" id="mapBox">-->
<!--           <gan-yu @mapClick="mapClickHandler"></gan-yu>-->
<!--         </div>-->
<!--        <div class="content-box">-->
<!--            <div class="rolling-box">-->
<!--                <div class="county-box">-->
<!--                     <h1 class="box-title">-->
<!--                       抗日山共产党员服务队-->
<!--                       <template v-if="currentTown.name">-->
<!--                         {{currentTown.name}}服务所-->
<!--                       </template>-->
<!--                     </h1>-->
<!--                     <div class="content-title">-->
<!--                       <div class="text" style="width: 260px">简介</div>-->
<!--                       <div class="decorate"></div>-->
<!--                     </div>-->
<!--                     <p class="content-text">-->
<!--                       国网江苏省电力有限公司连云港市赣榆区供电分公司于1989年12月28日成立。法定代表人王琛，公司经营范围包括：电力供应、管理；电动汽车充换电服务等。国网江苏省电力有限公司连云港市赣榆区供电分公司于1989年12月28日成立。法定代表人王琛，公司经营范围包括：电力供应、管理；电动汽车充换电服务等。国网江苏省电力有限公司连云港市赣榆区供电分公司于1989年12月28日成立。法定代表人王琛，公司经营范围包括：电力供应、管理；电动汽车充换电服务等。国网江苏省电力有限公司连云港市赣榆区供电分公司于1989年12月28日成立。法定代表人王琛，公司经营范围包括：电力供应、管理；电动汽车充换电服务等。-->
<!--                     </p>-->
<!--                     <div class="content-title">-->
<!--                       <div class="text" style="width: 260px">服务队合影</div>-->
<!--                       <div class="decorate"></div>-->
<!--                     </div>-->
<!--                     <div class="group-photo">-->
<!--                       <div class="img-box">-->
<!--                         <img src="@/assets/img/img_01.jpg">-->
<!--                       </div>-->
<!--                     </div>-->
<!--                     <div class="content-title">-->
<!--                       <div class="text" style=" width: 260px">服务活动展示</div>-->
<!--                       <div class="decorate"></div>-->
<!--                     </div>-->
<!--                     <ul class="activity-photo">-->
<!--                       <li style="margin-right: 40px">-->
<!--                         <div class="img-box">-->
<!--                           <img src="@/assets/img/img_01.jpg">-->
<!--                         </div>-->
<!--                       </li>-->
<!--                       <li>-->
<!--                         <div class="img-box">-->
<!--                           <img src="@/assets/img/img_02.jpg">-->
<!--                         </div>-->
<!--                       </li>-->
<!--                     </ul>-->
<!--                    <div class="content-title">-->
<!--                        <div class="text" style="width: 360px">抗日山共产党员服务队</div>-->
<!--&lt;!&ndash;                        <div class="text" style="width: 360px">标题</div>&ndash;&gt;-->
<!--                        <div class="decorate"></div>-->
<!--                    </div>-->
<!--                    <ul class="person-info">-->
<!--                        <li v-for="item in 9" :key="'person'+item">-->
<!--                            <div class="img-box">-->
<!--                                <img src="@/assets/img/img_03.jpg">-->
<!--                            </div>-->
<!--                            <h4 class="person-name">李先生</h4>-->
<!--                            <p class="person-post">-->
<!--                                岗位-->
<!--                            </p>-->
<!--                        </li>-->
<!--                    </ul>-->
<!--                </div>-->
<!--                <div class="township-box" v-if="false"></div>-->
<!--            </div>-->
<!--        </div>-->

    </div>
</template>

<script>
    import GanYu from "@/components/map/GanYu"

    export default {
        name: "Home",
        components: {
            // eslint-disable-next-line vue/no-unused-components
            GanYu
        },
        data() {
            return {
                mapBoxHeight: null,
                mapBoxWidth: null,
                currentTown: {
                    name: '',
                    id: ""
                }
            }
        },
        provide() {
            return {
                main: this
            }
        },
        methods: {
            getMapBoxHeight() {
                return document.getElementById("mapBox").offsetHeight;
            },
            getMapBoxWidth() {
                return document.getElementById("mapBox").offsetWidth;
            },
            mapClickHandler(town) {
                this.currentTown = town;
            }
        },
        mounted() {
            this.mapBoxHeight = this.getMapBoxHeight();
            this.mapBoxWidth = this.getMapBoxWidth();
            let _this = this;
            window.onresize = function () {
                _this.mapBoxHeight = _this.getMapBoxHeight();
                _this.mapBoxWidth = _this.getMapBoxWidth();
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
            min-width: 720px;
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
            height: 180px;

            > li {
                border-radius: 12px;
                background-image: linear-gradient(-45deg, rgb(88, 178, 220) 0%, rgb(30, 136, 168) 100%);
                height: 180px;
                width: 300px;
                float: left;
                padding: 5px;
                overflow: hidden;

                .img-box {
                    background-color: #fcfaf2;
                    height: 170px;
                    width: 290px;
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
            width: 100%;
            margin: 24px 0 0 0;
            overflow: hidden;
            display: flex;
            justify-content:space-between ;
            align-content: stretch;
            flex-wrap:wrap;
            > li {
                margin-bottom: 24px;
                border-radius:8px;
                width: 200px;
                height: 300px;
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
                }
                .person-post {
                    color:#FFF;
                    font-size: 16px;
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
            background-position: bottom;

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
</style>