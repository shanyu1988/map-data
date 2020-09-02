<template>
<div class="main">
  <h1 class="title"></h1>
  <div class="map-box" ref="mapBox" id="mapBox">
    <gan-yu @mapClick="mapClickHandler"></gan-yu>
  </div>
  <div class="content-box">

    <div class="rolling-box">
        <div class="county-box">
          <h1 class="box-title">抗日山共产党员服务队</h1>
          <div class="content-title">
            <div class="text" style="width: 260px">简介</div>
            <div class="decorate">
            </div>
          </div>
          <p class="content-text">
            国网江苏省电力有限公司连云港市赣榆区供电分公司于1989年12月28日成立。法定代表人王琛，公司经营范围包括：电力供应、管理；电动汽车充换电服务等。国网江苏省电力有限公司连云港市赣榆区供电分公司于1989年12月28日成立。法定代表人王琛，公司经营范围包括：电力供应、管理；电动汽车充换电服务等。国网江苏省电力有限公司连云港市赣榆区供电分公司于1989年12月28日成立。法定代表人王琛，公司经营范围包括：电力供应、管理；电动汽车充换电服务等。国网江苏省电力有限公司连云港市赣榆区供电分公司于1989年12月28日成立。法定代表人王琛，公司经营范围包括：电力供应、管理；电动汽车充换电服务等。
          </p>
          <div class="content-title">
            <div class="text" style="width: 260px">简介</div>
            <div class="decorate">
            </div>
          </div>
          <p class="content-text">
            国网江苏省电力有限公司连云港市赣榆区供电分公司于1989年12月28日成立。法定代表人王琛，公司经营范围包括：电力供应、管理；电动汽车充换电服务等。国网江苏省电力有限公司连云港市赣榆区供电分公司于1989年12月28日成立。法定代表人王琛，公司经营范围包括：电力供应、管理；电动汽车充换电服务等。国网江苏省电力有限公司连云港市赣榆区供电分公司于1989年12月28日成立。法定代表人王琛，公司经营范围包括：电力供应、管理；电动汽车充换电服务等。国网江苏省电力有限公司连云港市赣榆区供电分公司于1989年12月28日成立。法定代表人王琛，公司经营范围包括：电力供应、管理；电动汽车充换电服务等。
          </p>
          <div class="content-title">
            <div class="text" style="width: 260px">简介</div>
            <div class="decorate">
            </div>
          </div>
          <p class="content-text">
            国网江苏省电力有限公司连云港市赣榆区供电分公司于1989年12月28日成立。法定代表人王琛，公司经营范围包括：电力供应、管理；电动汽车充换电服务等。国网江苏省电力有限公司连云港市赣榆区供电分公司于1989年12月28日成立。法定代表人王琛，公司经营范围包括：电力供应、管理；电动汽车充换电服务等。国网江苏省电力有限公司连云港市赣榆区供电分公司于1989年12月28日成立。法定代表人王琛，公司经营范围包括：电力供应、管理；电动汽车充换电服务等。国网江苏省电力有限公司连云港市赣榆区供电分公司于1989年12月28日成立。法定代表人王琛，公司经营范围包括：电力供应、管理；电动汽车充换电服务等。
          </p>
          <div class="content-title">
            <div class="text" style="width: 260px">简介</div>
            <div class="decorate">
            </div>
          </div>
          <p class="content-text">
            国网江苏省电力有限公司连云港市赣榆区供电分公司于1989年12月28日成立。法定代表人王琛，公司经营范围包括：电力供应、管理；电动汽车充换电服务等。国网江苏省电力有限公司连云港市赣榆区供电分公司于1989年12月28日成立。法定代表人王琛，公司经营范围包括：电力供应、管理；电动汽车充换电服务等。国网江苏省电力有限公司连云港市赣榆区供电分公司于1989年12月28日成立。法定代表人王琛，公司经营范围包括：电力供应、管理；电动汽车充换电服务等。国网江苏省电力有限公司连云港市赣榆区供电分公司于1989年12月28日成立。法定代表人王琛，公司经营范围包括：电力供应、管理；电动汽车充换电服务等。
          </p>
        </div>

        <div class="township-box" v-if="false"></div>
    </div>
  </div>

</div>
</template>

<script>
  import GanYu from "@/components/map/GanYu"
export default {
  name: "Home",
  components: {
    GanYu
  },
  data(){
    return {
      mapBoxHeight:null,
      mapBoxWidth:null
    }
  },
  provide(){
    return{
      main:this
    }
  },
  methods:{
    getMapBoxHeight(){
      return document.getElementById("mapBox").offsetHeight;
    },
    getMapBoxWidth(){
      return document.getElementById("mapBox").offsetWidth;
    },
    mapClickHandler(town){

    }
  },
  mounted() {
      this.mapBoxHeight = this.getMapBoxHeight();
      this.mapBoxWidth = this.getMapBoxWidth();
      let _this = this;
      window.onresize = function(){
        _this.mapBoxHeight = _this.getMapBoxHeight();
        _this.mapBoxWidth = _this.getMapBoxWidth();

      }
  }
};
</script>
<style lang="scss" scoped>
  .main{
    width: 100%;
    height: 100%;
    background-color: #1c1c1c;
    position: relative;
    overflow: hidden;
    .county-box{
      width: calc(100% - 20px);
    }
    .title{
      position: absolute;
      top: 7.03%;
      left:3.75%;
      width: 25%;
      height: 7.59%;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url("~@/assets/img/title.png");
      background-size:100% 100%;
    }

    .map-box{
      position: absolute;
      top:11.11%;
      left: 7%;
      width: 43.23%;
      height: 78.33%;
    }
    .content-box{
      position: absolute;
      right: 5%;
      width: 37.5%;
      top:5.56%;
      height: 88.88%;
      overflow: hidden;
      .rolling-box{
        width: calc(100% + 20px);
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
      }
    }
    .box-title{
      font-size: 38px;
      text-align: center;
      color: rgb(255, 255, 255);
      margin-bottom: 40px;
    }
    .content-text {
      width: calc(100% - 20px);
      font-size: 18px;
      color: #fcfaf2;
      line-height: 1.8;
      text-align: justify;
      padding: 24px;
    }


    .content-title{
      width: calc(100% - 20px);
      padding-bottom: 12px;
      background-image: url("~@/assets/img/decorate_02.png");
      background-repeat: no-repeat;
      background-position: bottom ;
      .text{
        height: 54px;
        line-height: 54px;
        font-size:28px;
        border-width: 2px;
        border-color: rgba(145, 152, 159,0.8);
        border-style: solid;
        margin: 0 auto;
        color:#FFF;
        font-weight: normal;
      }

      .decorate{
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