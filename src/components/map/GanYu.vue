<template>
    <div class="gan-yu-map">
<!--        :style="{transform:scale}"-->
<!--        :width="mapWidth+'px'" :height="mapHeight+'px'"-->
        <svg xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink"
             class="gan-yu-svg"
             :style="{transform:scale+translate}"
             :width="mapWidth+'px'"
             :height="mapHeight+'px'">
            <defs>
                <linearGradient id="PSgrad_0" x1="0%" x2="70.711%" y1="0%" y2="70.711%">
                    <stop offset="0%" stop-color="rgb(88,178,220)" stop-opacity="1"/>
                    <stop offset="100%" stop-color="rgb(30,136,168)" stop-opacity="1"/>
                </linearGradient>
            </defs>
            <path v-for="(town,index) in towns"
                  :id="town.id"
                  :name="town.name"
                  class="map-towns"
                  :d="town.map"
                  :key="town.id+index"
                  @mouseenter="mapMouseenter(town,$event)"
                  @mouseleave="mapMouseleave(town,$event)"
                  ref="town"
                  @click="mapClickHandler(town)"
                  fill-rule="evenodd"
                  stroke="rgb(33, 35, 45)"
                  stroke-width="1px"
                  stroke-linecap="round"
                  stroke-linejoin="miter"
                  :fill="fillHandler(town.id)"/>
            <text class="map-text" kerning="auto" font-family="Adobe Heiti Std" fill="rgb(0, 0, 0)" :font-size="fontSize" x="239.5px" y="248.5px"> <tspan dy="-58px"><tspan  font-family="Microsoft YaHei" fill="#0E172B">&#40657;</tspan><tspan x="239.5px" dy="1.2em">&#26519;</tspan><tspan x="239.5px" dy="1.2em">&#38215;</tspan> </tspan>
            </text>
            <text class="map-text" kerning="auto" font-family="Adobe Heiti Std" fill="rgb(0, 0, 0)" :font-size="fontSize" x="382.5px" y="278.5px"> <tspan dy="-58px"><tspan  font-family="Microsoft YaHei" fill="#0E172B">&#21385;</tspan><tspan x="382.5px" dy="1.2em">&#24196;</tspan><tspan x="382.5px" dy="1.2em">&#38215;</tspan> </tspan>
            </text>
            <text class="map-text" kerning="auto" font-family="Adobe Heiti Std" fill="rgb(0, 0, 0)" :font-size="fontSize" x="482.5px" y="276.5px"> <tspan dy="-58px"><tspan  font-family="Microsoft YaHei" fill="#0E172B">&#37329;</tspan><tspan x="482.5px" dy="1.2em">&#23665;</tspan><tspan x="482.5px" dy="1.2em">&#38215;</tspan> </tspan>
            </text>
            <text class="map-text" kerning="auto" font-family="Adobe Heiti Std" fill="rgb(0, 0, 0)" :font-size="fontSize" x="605.5px" y="218.5px"> <tspan dy="-58px"><tspan  font-family="Microsoft YaHei" fill="#0E172B">&#30707;</tspan><tspan x="605.5px" dy="1.2em">&#26725;</tspan><tspan x="605.5px" dy="1.2em">&#38215;</tspan> </tspan>
            </text>
            <text class="map-text" kerning="auto" font-family="Adobe Heiti Std" fill="rgb(0, 0, 0)" :font-size="fontSize" x="696.5px" y="124.5px"> <tspan dy="-58px"><tspan  font-family="Microsoft YaHei" fill="#0E172B">&#26584;</tspan><tspan x="696.5px" dy="1.2em">&#27754;</tspan><tspan x="696.5px" dy="1.2em">&#38215;</tspan> </tspan>
            </text>
            <text class="map-text" kerning="auto" font-family="Adobe Heiti Std" fill="rgb(0, 0, 0)" :font-size="fontSize" x="609.5px" y="381.5px"> <tspan dy="-58px"><tspan  font-family="Microsoft YaHei" fill="#0E172B">&#28023;</tspan><tspan x="609.5px" dy="1.2em">&#22836;</tspan><tspan x="609.5px" dy="1.2em">&#38215;</tspan> </tspan>
            </text>
            <text class="map-text" kerning="auto" font-family="Adobe Heiti Std" fill="rgb(0, 0, 0)" :font-size="fontSize" x="497.5px" y="456.5px"> <tspan dy="-58px"><tspan  font-family="Microsoft YaHei" fill="#0E172B">&#36195;</tspan><tspan x="497.5px" dy="1.2em">&#39532;</tspan><tspan x="497.5px" dy="1.2em">&#38215;</tspan> </tspan>
            </text>
            <text class="map-text" kerning="auto" font-family="Adobe Heiti Std" fill="rgb(0, 0, 0)" :font-size="fontSize" x="314.5px" y="412.5px"> <tspan dy="-58px"><tspan  font-family="Microsoft YaHei" fill="#0E172B">&#22612;</tspan><tspan x="314.5px" dy="1.2em">&#23665;</tspan><tspan x="314.5px" dy="1.2em">&#38215;</tspan> </tspan>
            </text>
            <text class="map-text" kerning="auto" font-family="Adobe Heiti Std" fill="rgb(0, 0, 0)" :font-size="fontSize" x="262.5px" y="555.5px"> <tspan dy="-58px"><tspan  font-family="Microsoft YaHei" fill="#0E172B">&#22478;</tspan><tspan x="262.5px" dy="1.2em">&#22836;</tspan><tspan x="262.5px" dy="1.2em">&#38215;</tspan> </tspan>
            </text>
            <text class="map-text" kerning="auto" font-family="Adobe Heiti Std" fill="rgb(0, 0, 0)" :font-size="fontSize" x="416.5px" y="578.5px"> <tspan dy="-58px"><tspan  font-family="Microsoft YaHei" fill="#0E172B">&#22478;</tspan><tspan x="416.5px" dy="1.2em">&#35199;</tspan><tspan x="416.5px" dy="1.2em">&#38215;</tspan> </tspan>
            </text>
            <text class="map-text" kerning="auto" font-family="Adobe Heiti Std" fill="rgb(0, 0, 0)" :font-size="fontSize" x="498.5px" y="642.5px"> <tspan dy="-58px"><tspan  font-family="Microsoft YaHei" fill="#0E172B">&#38738;</tspan><tspan x="498.5px" dy="1.2em">&#21475;</tspan><tspan x="498.5px" dy="1.2em">&#38215;</tspan> </tspan>
            </text>
            <text class="map-text" kerning="auto" font-family="Adobe Heiti Std" fill="rgb(0, 0, 0)" :font-size="fontSize" x="571.5px" y="687.5px"> <tspan dy="-58px"><tspan  font-family="Microsoft YaHei" fill="#0E172B">&#23435;</tspan><tspan x="571.5px" dy="1.2em">&#24196;</tspan><tspan x="571.5px" dy="1.2em">&#38215;</tspan> </tspan>
            </text>
            <text class="map-text" kerning="auto" font-family="Adobe Heiti Std" fill="rgb(0, 0, 0)" :font-size="fontSize" x="500.5px" y="805.5px"> <tspan dy="-58px"><tspan  font-family="Microsoft YaHei" fill="#0E172B">&#22697;</tspan><tspan x="500.5px" dy="1.2em">&#23578;</tspan><tspan x="500.5px" dy="1.2em">&#38215;</tspan> </tspan>
            </text>
            <text class="map-text" kerning="auto" font-family="Adobe Heiti Std" fill="rgb(0, 0, 0)" :font-size="fontSize" x="307.5px" y="747.5px"> <tspan dy="-58px"><tspan  font-family="Microsoft YaHei" fill="#0E172B">&#27801;</tspan><tspan x="307.5px" dy="1.2em">&#27827;</tspan><tspan x="307.5px" dy="1.2em">&#38215;</tspan> </tspan>
            </text>
            <text class="map-text" kerning="auto" font-family="Adobe Heiti Std" fill="rgb(0, 0, 0)" :font-size="fontSize" x="125.5px" y="537.5px"> <tspan dy="-58px"><tspan  font-family="Microsoft YaHei" fill="#0E172B">&#29677;</tspan><tspan x="125.5px" dy="1.2em">&#24196;</tspan><tspan x="125.5px" dy="1.2em">&#38215;</tspan> </tspan>
            </text>
        </svg>
    </div>

</template>
<script>
    import {towns} from "./base.js"
    export default {
        name: "GanYu",
        data() {
            return {
                towns:towns,
                colors: {
                    //缺省
                    default: "rgb(145, 152, 159)",
                    active: "url(#PSgrad_0)",
                    hover: "rgb(142,173,203)"
                },
                fontSize:"18px",
                currentTown:"",
                mapHeight:846,
                mapWidth:832
            }
        },
        created() {

        },
        inject:{
            main:{
                default:null
            }
        },
        provide(){
            return {
                ganYu:this
            }
        },
        computed:{
            // eslint-disable-next-line vue/return-in-computed-property
            widthScale(){
                return this.main.mapBoxWidth/this.mapWidth
            },
            // eslint-disable-next-line vue/return-in-computed-property
            heightScale(){
                return this.main.mapBoxHeight/this.mapHeight
            },

            scale(){
                return `scale(${this.widthScale},${this.heightScale})`
            },
            translate(){
                return `translate(${parseInt(this.mapWidth*(this.widthScale-1)/2)}px,${parseInt(this.mapHeight*(this.heightScale-1)/2)}px)`
            },

            // eslint-disable-next-line vue/return-in-computed-property
            mapTop(){
                return (1 - this.main.mapBoxHeight/this.mapHeight)
            },
            // eslint-disable-next-line vue/return-in-computed-property
            mapLeft(){

            }
        },
        mounted() {

        },
        methods:{
            fillHandler(id){
                return this.currentTown === id ? this.colors.active : this.colors.default
            },
            mapClickHandler(town){
                this.currentTown = town.id;
                this.$emit("mapClick",{
                    id:town.id,
                    name:town.name
                });
            },
            mapMouseenter(town,e){
                //console.log()
                e.target.setAttribute("fill",this.colors.hover)
            },
            mapMouseleave(town,e){
                if(this.currentTown === town.id){
                    e.target.setAttribute("fill",this.colors.active)
                }else{
                    e.target.setAttribute("fill",this.colors.default)
                }

            },
        }
    }
</script>

<style lang="scss" scoped>
    .gan-yu-map{
        width: 100%;
        height: 100%;
        position: relative;
        .gan-yu-svg{
            position: absolute;
            left: 0;
            top: 0;
            .map-towns{
                cursor: pointer;
            }
            .map-text{
                -webkit-user-select:none;

                -moz-user-select:none;

                -ms-user-select:none;

                user-select:none;
            }
        }
    }

</style>