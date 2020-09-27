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
                  @click="mapClickHandler(town,$event)"
                  fill-rule="evenodd"
                  stroke="rgb(162, 31, 37)"
                  stroke-width="1px"
                  stroke-linecap="round"
                  stroke-linejoin="miter"
                  :fill="fillHandler(town.id)"/>
            <text class="map-text" id="MapHeiLin" kerning="auto" font-family="Microsoft YaHei" fill="rgb(0, 0, 0)"
                  :font-size="fontSize2" x="239.5px" y="240">
                <tspan dy="-58px">
                    <tspan fill="#0E172B">黑</tspan>
                    <tspan x="239.5px" :dy="fontSize">林</tspan>
                    <tspan x="239.5px" :dy="fontSize">支</tspan>
                    <tspan x="239.5px" :dy="fontSize">队</tspan>
                </tspan>
            </text>
            <text class="map-text" id="MapHeiLin" kerning="auto" font-family="Microsoft YaHei" fill="rgb(0, 0, 0)"
                  :font-size="fontSize2" x="382.5px" y="278.5px">
                <tspan dy="-58px">
                    <tspan fill="#0E172B">厉</tspan>
                    <tspan x="382.5px" :dy="fontSize">庄</tspan>
                    <tspan x="382.5px" :dy="fontSize">支</tspan>
                    <tspan x="382.5px" :dy="fontSize">队</tspan>
                </tspan>
            </text>
            <text  class="map-text" id="MapJinShan" kerning="auto" font-family="Microsoft YaHei" fill="rgb(0, 0, 0)"
                   :font-size="fontSize2" x="482.5px" y="276.5px">
                <tspan dy="-58px">
                    <tspan>金</tspan>
                    <tspan x="482.5px" :dy="fontSize">山</tspan>
                    <tspan x="482.5px" :dy="fontSize">支</tspan>
                    <tspan x="482.5px" :dy="fontSize">队</tspan>
                </tspan>
            </text>
            <text  class="map-text" id="MapShiQiao" kerning="auto" font-family="Microsoft YaHei" fill="rgb(0, 0, 0)"
                  :font-size="fontSize2" x="605.5px" y="218.5px">
                <tspan dy="-58px">
                    <tspan >石</tspan>
                    <tspan x="605.5px" :dy="fontSize">桥</tspan>
                    <tspan x="605.5px" :dy="fontSize">支</tspan>
                    <tspan x="605.5px" :dy="fontSize">队</tspan>
                </tspan>
            </text>
            <text  class="map-text" id="MapZheWang" kerning="auto" font-family="Microsoft YaHei" fill="rgb(0, 0, 0)"
                  :font-size="fontSize2" x="696.5px" y="124.5px">
                <tspan dy="-58px">
                    <tspan >柘</tspan>
                    <tspan x="696.5px" :dy="fontSize">汪</tspan>
                    <tspan x="696.5px" :dy="fontSize">支</tspan>
                    <tspan x="696.5px" :dy="fontSize">队</tspan>
                </tspan>
            </text>
            <text  class="map-text" id="MapHaiTou" kerning="auto" font-family="Microsoft YaHei" fill="rgb(0, 0, 0)"
                  :font-size="fontSize2" x="609.5px" y="381.5px">
                <tspan dy="-58px">
                    <tspan>海</tspan>
                    <tspan x="609.5px" :dy="fontSize">头</tspan>
                    <tspan x="609.5px" :dy="fontSize">支</tspan>
                    <tspan x="609.5px" :dy="fontSize">队</tspan>
                </tspan>
            </text>
            <text  class="map-text" id="MapGanMa" kerning="auto" font-family="Microsoft YaHei" fill="rgb(0, 0, 0)"
                  :font-size="fontSize2" x="497.5px" y="456.5px">
                <tspan dy="-58px">
                    <tspan>赣</tspan>
                    <tspan x="497.5px" :dy="fontSize">马</tspan>
                    <tspan x="497.5px" :dy="fontSize">支</tspan>
                    <tspan x="497.5px" :dy="fontSize">队</tspan>
                </tspan>
            </text>
            <text  class="map-text" id="MapTaShan" kerning="auto" font-family="Microsoft YaHei" fill="rgb(0, 0, 0)"
                  :font-size="fontSize2" x="314.5px" y="406px">
                <tspan dy="-58px">
                    <tspan>塔</tspan>
                    <tspan x="314.5px" :dy="fontSize">山</tspan>
                    <tspan x="314.5px" :dy="fontSize">支</tspan>
                    <tspan x="314.5px" :dy="fontSize">队</tspan>
                </tspan>
            </text>
            <text  class="map-text" id="MapChengTou" kerning="auto" font-family="Microsoft YaHei" fill="rgb(0, 0, 0)"
                  :font-size="fontSize2" x="262.5px" y="555.5px">
                <tspan dy="-58px">
                    <tspan>城</tspan>
                    <tspan x="262.5px" :dy="fontSize">头</tspan>
                    <tspan x="262.5px" :dy="fontSize">支</tspan>
                    <tspan x="262.5px" :dy="fontSize">队</tspan>
                </tspan>
            </text>
            <text  class="map-text" id="MapChengXi" kerning="auto" font-family="Microsoft YaHei" fill="rgb(0, 0, 0)"
                  :font-size="fontSize2" x="416.5px" y="570px">
                <tspan dy="-58px">
                    <tspan>城</tspan>
                    <tspan x="416.5px" :dy="fontSize">西</tspan>
                    <tspan x="416.5px" :dy="fontSize">支</tspan>
                    <tspan x="416.5px" :dy="fontSize">队</tspan>
                </tspan>
            </text>
            <text  class="map-text" id="MapChengJiao" kerning="auto" font-family="Microsoft YaHei" fill="rgb(0, 0, 0)"
                  :font-size="fontSize2" x="498.5px" y="636px">
                <tspan dy="-58px">
                    <tspan>城</tspan>
                    <tspan x="498.5px" :dy="fontSize">郊</tspan>
                    <tspan x="498.5px" :dy="fontSize">支</tspan>
                    <tspan x="498.5px" :dy="fontSize">队</tspan>
                </tspan>
            </text>
            <text  class="map-text" id="MapSongZhuang" kerning="auto" font-family="Microsoft YaHei" fill="rgb(0, 0, 0)"
                  :font-size="fontSize2" x="571.5px" y="680px">
                <tspan dy="-58px">
                    <tspan>宋</tspan>
                    <tspan x="571.5px" :dy="fontSize">庄</tspan>
                    <tspan x="571.5px" :dy="fontSize">支</tspan>
                    <tspan x="571.5px" :dy="fontSize">队</tspan>
                </tspan>
            </text>
            <text  class="map-text" id="MapDunShang" kerning="auto" font-family="Microsoft YaHei" fill="rgb(0, 0, 0)"
                  :font-size="fontSize2" x="500.5px" y="800px">
                <tspan dy="-58px">
                    <tspan>墩</tspan>
                    <tspan x="500.5px" :dy="fontSize">尚</tspan>
                    <tspan x="500.5px" :dy="fontSize">支</tspan>
                    <tspan x="500.5px" :dy="fontSize">队</tspan>
                </tspan>
            </text>
            <text  class="map-text" id="MapShaHe" kerning="auto" font-family="Microsoft YaHei" fill="rgb(0, 0, 0)"
                  :font-size="fontSize2" x="307.5px" y="740px">
                <tspan dy="-58px">
                    <tspan>沙</tspan>
                    <tspan x="307.5px" :dy="fontSize">河</tspan>
                    <tspan x="307.5px" :dy="fontSize">支</tspan>
                    <tspan x="307.5px" :dy="fontSize">队</tspan>
                </tspan>
            </text>
            <text  class="map-text" id="MapBanZhuang" kerning="auto" font-family="Microsoft YaHei" fill="rgb(0, 0, 0)"
                  :font-size="fontSize2" x="125.5px" y="537.5px">
                <tspan dy="-58px">
                    <tspan>班</tspan>
                    <tspan x="125.5px" :dy="fontSize">庄</tspan>
                    <tspan x="125.5px" :dy="fontSize">支</tspan>
                    <tspan x="125.5px" :dy="fontSize">队</tspan>
                </tspan>
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
                towns: towns,
                colors: {
                    //缺省
                    default: "#f9d8c7",
                    active: "#e81f18",
                    hover: "#f7b3b3"
                },
                fontSize: "18px",
                fontSize2: "16px",
                currentTown: "MapQingKou",
                mapHeight: 846,
                mapWidth: 832
            }
        },
        created() {

        },
        inject: {
            main: {
                default: null
            }
        },
        provide() {
            return {
                ganYu: this
            }
        },
        computed: {
            // eslint-disable-next-line vue/return-in-computed-property
            widthScale() {
                return this.main.mapBoxWidth / this.mapWidth
            },
            // eslint-disable-next-line vue/return-in-computed-property
            heightScale() {
                return this.main.mapBoxHeight / this.mapHeight
            },

            scale() {
                return `scale(${this.widthScale},${this.heightScale})`
            },
            translate() {
                return `translate(${parseInt(this.mapWidth * (this.widthScale - 1) / 2)}px,${parseInt(this.mapHeight * (this.heightScale - 1) / 2)}px)`
            },

            // eslint-disable-next-line vue/return-in-computed-property
            mapTop() {
                return (1 - this.main.mapBoxHeight / this.mapHeight)
            },
            // eslint-disable-next-line vue/return-in-computed-property
            mapLeft() {

            }
        },
        mounted() {

        },
        methods: {
            contentBoxClickHandler(e){
                e.stopPropagation();
            },
            fillHandler(id) {
                return this.currentTown === id ? this.colors.active : this.colors.default
            },
            mapClickHandler(town,e) {
                this.currentTown = town.id;
                this.$emit("mapClick", {
                    id: town.id,
                    name: town.name
                });
                e.stopPropagation();
            },
            mapMouseenter(town, e) {
                //console.log()
                e.target.setAttribute("fill", this.colors.hover)
            },
            mapMouseleave(town, e) {
                if (this.currentTown === town.id) {
                    e.target.setAttribute("fill", this.colors.active)
                } else {
                    e.target.setAttribute("fill", this.colors.default)
                }

            },
        }
    }
</script>

<style lang="scss" scoped>
    .gan-yu-map {
        width: 100%;
        height: 100%;
        position: relative;

        .gan-yu-svg {
            position: absolute;
            left: 0;
            top: 0;

            .map-towns {
                cursor: pointer;
            }

            .map-text {
                -webkit-user-select: none;

                -moz-user-select: none;

                -ms-user-select: none;

                user-select: none;
            }
        }
    }

</style>
