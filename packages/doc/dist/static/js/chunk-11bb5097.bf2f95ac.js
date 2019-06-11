(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-11bb5097"],{"0b8c":function(n,t,e){"use strict";var r={};e.r(r),e.d(r,"map",function(){return i}),e.d(r,"setting",function(){return m});var a={};e.r(a),e.d(a,"point",function(){return s}),e.d(a,"edit",function(){return c}),e.d(a,"heatmap",function(){return f}),e.d(a,"track",function(){return y});var d={};e.r(d),e.d(d,"selectBox",function(){return b}),e.d(d,"infoWindow",function(){return L}),e.d(d,"overlay",function(){return k});e("cadf"),e("551c"),e("f751"),e("097d");var o='\n<template>\n    <fm-map vid="esri_map" ></fm-map>\n</template>\n\n<script lang="ts">\n\nimport { component, View } from "@egova/flagwind-web";\n\n@component\nexport default class Map extends View\n{\n\n}\n<\/script>',i=o,l='\nimport { setting, MapLoader } from "src/index";\n\nsetting.arcgis = {\n    ...setting.arcgis, ...{\n        arcgisApi: "http://120.202.26.100:8081/arcgis4js/library/3.21/",\n        routeUrl: "",\n        center: [118.573, 37.446],\n        wkid: 4326,\n        wkidFromApp: 4326,\n        zoom: 9,\n        slider: false,\n        basemap: "dark-gray-vector",\n        logo: false,\n        sliderPosition: "bottom-left"\n    }\n};\nsetting.mapType = "arcgis";\nMapLoader.loadCss(setting.arcgis);\nMapLoader.loadScript(setting.arcgis);',m=l,p='\n<template>\n    <fm-map ref="fwAmap"   vid="esri_map">\n        <fm-point-layer vid="tollgateLayer"\n                        :enableCluster="false" :symbol="symbol" :source="dataList"\n                        @onLayerClick="onLayerClick" @changeStandardModel="onChangeStandardModel">\n        </fm-point-layer>\n    </fm-map>\n</template>\n<script lang="ts">\n\nimport { component, View } from "@egova/flagwind-web";\n\n@component\nexport default class PointLayerView extends View\n{\n    protected dataList = [\n        { id: "1", name: "张三", longitude: 118.5731, latitude: 37.61462 },\n        { id: "2", name: "李娜", longitude: 118.1332, latitude: 37.48463 },\n        { id: "3", name: "五三", longitude: 118.3833, latitude: 37.6466 },\n        { id: "4", name: "原因", longitude: 118.5634, latitude: 37.9463 },\n        { id: "5", name: "李妈", longitude: 118.7135, latitude: 37.1468 }\n    ];\n\n    protected symbol = {\n        height: 32,\n        width: 32,\n        imageUrl: "./static/map/point.png"\n    };\n\n    protected onChangeStandardModel(model: any) {\n        return model;\n    }\n}\n<\/script>',s=p,u='\n<template>\n    <fm-map vid="esri_map" >\n        <fm-edit-layer @onEditInfo="onEditInfo">\n            <fm-point-layer vid="tollgateLayer"\n                :enableCluster="false" :enableEdit="true" :showInfoWindow="true" :symbol="symbol" :source="dataList"\n                @changeStandardModel="onChangeStandardModel">\n            </fm-point-layer>\n        </fm-edit-layer>\n    </fm-map>\n</template>\n<script lang="ts">\n\nimport { component, View } from "@egova/flagwind-web";\n\n@component({ template: require("./index.html")  })\nexport default class EditLayerView extends View {\n    protected dataList = [\n        { id: "1", name: "张三", longitude: 118.5731, latitude: 37.61462 },\n        { id: "2", name: "李娜", longitude: 118.1332, latitude: 37.48463 },\n        { id: "3", name: "五三", longitude: 118.3833, latitude: 37.6466 },\n        { id: "4", name: "原因", longitude: 118.5634, latitude: 37.9463 },\n        { id: "5", name: "李妈", longitude: 118.7135, latitude: 37.1468 }\n    ];\n\n    protected symbol = {\n        height: 32,\n        width: 32,\n        imageUrl: "./static/map/point.png"\n    };\n\n    protected onEditInfo(model: any, isSave: boolean): Promise<boolean> {\n        return new Promise<boolean>((resolve, reject) => {\n            alert(model.id);\n            resolve(true);\n        });\n    }\n\n    protected onChangeStandardModel(model: any) {\n        return model;\n    }\n}\n<\/script>',c=u,g='\n<template>\n    <fm-map  vid="esri_map">\n        <fm-heatmap-layer vid="heatmapLayer" :source="dataList" @changeStandardModel="onChangeStandardModel">\n        </fm-heatmap-layer>\n    </fm-map>\n</template>\n<script lang="ts">\n\nimport { component, View } from "@egova/flagwind-web";\n\n@component({ template: require("./index.html")  })\nexport default class HeatmapLayerView extends View {\n    protected dataList = [\n        { id: "1", name: "张三", longitude: 118.5731, latitude: 37.61462 },\n        { id: "2", name: "李娜", longitude: 118.1332, latitude: 37.48463 },\n        { id: "3", name: "五三", longitude: 118.3833, latitude: 37.6466 },\n        { id: "4", name: "原因", longitude: 118.5634, latitude: 37.9463 },\n        { id: "5", name: "李妈", longitude: 118.7135, latitude: 37.1468 }\n    ];\n\n    protected onChangeStandardModel(model: any) {\n        return {\n            longitude: Math.ceil(<number>model.longitude * 1000) / 1000,\n            latitude: Math.ceil(<number>model.latitude * 1000) / 1000\n        };\n    }\n}\n<\/script>',f=g,h='\n<template>\n    <fm-map  vid="esri_map">\n        <fm-track-layer :symbol="carSymbol" @getImageUrl="getImageUrl" @getImageAngle="getImageAngle" @on-build="onTrackBuild">\n            <fm-point-layer vid="tollgateLayer" :source="dataList" :enableCluster="false" :enableEdit="true" :showInfoWindow="true" :symbol="pointSymbol"\n                @onLayerClick="onLayerClick" @changeStandardModel="onChangeStandardModel">\n            </fm-point-layer>\n        </fm-track-layer>\n    </fm-map>\n</template>\n<script lang="ts">\n\nimport { component, View } from "@egova/flagwind-web";\n\n@component({ template: require("./index.html")  })\nexport default class HeatmapLayerView extends View {\n    protected dataList = [\n        { id: "1", name: "张三", longitude: 118.5731, latitude: 37.61462 },\n        { id: "2", name: "李娜", longitude: 118.1332, latitude: 37.48463 },\n        { id: "3", name: "五三", longitude: 118.3833, latitude: 37.6466 },\n        { id: "4", name: "原因", longitude: 118.5634, latitude: 37.9463 },\n        { id: "5", name: "李妈", longitude: 118.7135, latitude: 37.1468 }\n    ];\n\n    protected trackLayer: maps.FlagwindTrackLayer;\n\n    protected carSymbol = {\n        height: 32,\n        width: 32,\n        imageUrl: "./static/map/car.png"\n    };\n\n    protected pointSymbol = {\n        height: 32,\n        width: 32,\n        imageUrl: "./static/map/point.png"\n    };\n\n    protected getImageUrl(trackLine: maps.TrackLine, angle: number) {\n        return "./static/map/car.png";\n    }\n\n    protected getImageAngle(trackLine: maps.TrackLine, angle: number) {\n        return angle;\n    }\n\n    protected onTrackBuild(layer: maps.FlagwindTrackLayer) {\n        this.trackLayer = layer;\n        layer.showTrackToolBox();\n    }\n\n    protected startTrack() {\n        this.trackLayer.startTrack(this.dataList);\n    }\n\n    protected onChangeStandardModel(model: any) {\n        return model;\n    }\n}\n<\/script>',y=h,w='\n<template>\n    <fm-map  vid="esri_map" >\n        <fm-select-box @onCheckChanged="onCheckChanged">\n            <fm-point-layer\n                vid="tollgateLayer"\n                :enableCluster="false"\n                :showInfoWindow="true"\n                :symbol="symbol"\n                :source="dataList"\n                @changeStandardModel="onChangeStandardModel">\n            </fm-point-layer>\n        </fm-select-box>\n    </fm-map>\n</template>\n<script lang="ts">\n\nimport { component, View } from "@egova/flagwind-web";\n\n@component({ template: require("./index.html") })\nexport default class SelectBoxView extends View {\n    protected dataList = [\n        { id: "1", name: "张三", longitude: 118.5731, latitude: 37.61462 },\n        { id: "2", name: "李娜", longitude: 118.1332, latitude: 37.48463 },\n        { id: "3", name: "五三", longitude: 118.3833, latitude: 37.6466 },\n        { id: "4", name: "原因", longitude: 118.5634, latitude: 37.9463 },\n        { id: "5", name: "李妈", longitude: 118.7135, latitude: 37.1468 }\n    ];\n\n    protected symbol = {\n        height: 32,\n        width: 32,\n        imageUrl: "./static/map/point.png"\n    };\n\n    protected onCheckChanged(evt: any) {\n        alert(evt);\n    }\n\n    protected onChangeStandardModel(model: any) {\n        return model;\n    }\n}\n<\/script>',b=w,v='\n<template>\n<fm-map  vid="esri_map">\n\n    <fm-point-layer vid="tollgateLayer" :enableCluster="false" :showInfoWindow="true" :symbol="pointSymbol"\n        :source="dataList" @changeStandardModel="onChangeStandardModel">\n        <fm-info-window :showWare="true">\n        </fm-info-window>\n    </fm-point-layer>\n\n    <fm-info-window ref="fmInfoWindow" @click="onClick" :point="position" :title="title" :showWare="true">\n        <template slot="content">自定义内容</template>\n        <template slot="footer">\n            <div style="float:right;padding:4px;">\n                <i-button type="primary">确定</i-button>\n                <i-button type="error">取消</i-button>\n            </div>\n        </template>\n    </fm-info-window>\n\n</fm-map>\n\n<i-button @click="onOpenInfoWindow">显示信息窗口</i-button>\n</template>\n<script lang="ts">\n\nimport { component, View } from "@egova/flagwind-web";\n\n@component({ template: require("./index.html") })\nexport default class InfoWindowView extends View {\n    protected dataList = [\n        { id: "1", name: "张三", longitude: 118.5731, latitude: 37.61462 },\n        { id: "2", name: "李娜", longitude: 118.1332, latitude: 37.48463 },\n        { id: "3", name: "五三", longitude: 118.3833, latitude: 37.6466 },\n        { id: "4", name: "原因", longitude: 118.5634, latitude: 37.9463 },\n        { id: "5", name: "李妈", longitude: 118.7135, latitude: 37.1468 }\n    ];\n\n    protected position: any = {\n        id: "5",\n        name: "李妈",\n        longitude: 118.7135,\n        latitude: 37.1468\n    };\n\n    protected title: string = "标题";\n\n    protected layer: maps.FlagwindBusinessLayer;\n\n    protected pointSymbol = {\n        height: 32,\n        width: 32,\n        imageUrl: "./static/map/point.png"\n    };\n\n    protected point = {\n        longitude: 118.7135,\n        latitude: 37.1468,\n        data: { id: "5", name: "李妈", longitude: 118.7135, latitude: 37.1468 }\n    };\n\n    protected onOpenInfoWindow() {\n        let infoWindow = <InfoWindowComponent>this.$refs.fmInfoWindow;\n        infoWindow.show();\n    }\n\n    protected onChangeStandardModel(model: any) {\n        return model;\n    }\n}\n<\/script>',L=v,C='\n<template>\n    <fm-map  vid="esri_map">\n        <fm-overlay :point="point">\n            这是一个遮罩物<br />\n            你可以在这里放你自己的组件，显示在地图上{{point.data.name}}\n        </fm-overlay>\n    </fm-map>\n</template>\n<script lang="ts">\n\nimport { component, View } from "@egova/flagwind-web";\n\n@component({ template: require("./index.html") })\nexport default class OverlayView extends View {\n    protected point = {\n        longitude: 118.7135,\n        latitude: 37.1468,\n        data: { id: "5", name: "李妈", longitude: 118.7135, latitude: 37.1468 }\n    };\n}\n\n<\/script>',k=C;e.d(t,"b",function(){return r}),e.d(t,"a",function(){return a}),e.d(t,"c",function(){return d})},5887:function(n,t){n.exports='<div class="v-intro">\r\n    <h1>Point Layer</h1>\r\n    <h2>一、概述</h2>\r\n    <p>该组件为点要素图层组件，对应 flagwind map 中的 FlagwindPointLayer类。我们可配置相关参数来实现不同点要素图层展示。该组件依附于Map组件，且不能脱离Map组件独立使用。</p>\r\n    <h2>二、示例</h2>\r\n    <u-example title="说明">\r\n        <template slot="case">\r\n            <fm-map ref="fwAmap" vid="esri_map" >\r\n                <fm-point-layer vid="tollgateLayer" :enableCluster="false" :symbol="symbol" :source="dataList"\r\n                    @changeStandardModel="onChangeStandardModel">\r\n                </fm-point-layer>\r\n            </fm-map>\r\n        </template>\r\n        <template slot="desc">\r\n            <p>首先需要定义map组件，用于构建地图对象。然后再定义point layer组件，显示点要素。</p>\r\n            <p>不同类型的点要素可以定义多个点图层，通过绑定不同属性来显示不同的点要素</p>\r\n        </template>\r\n        <u-code slot="code" lang="html">{{code.point}}</u-code>\r\n    </u-example>\r\n    <div class="api">\r\n        <h2>API</h2>\r\n        <h3>属性</h3>\r\n        <table>\r\n            <thead>\r\n                <tr>\r\n                    <th>名称</th>\r\n                    <th>说明</th>\r\n                    <th>数据类型</th>\r\n                    <th>属性类型</th>\r\n                    <th>默认值</th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr>\r\n                    <td>vid</td>\r\n                    <td>对象唯一标识</td>\r\n                    <td>string</td>\r\n                    <td>静态属性</td>\r\n                    <td>必填</td>\r\n                </tr>\r\n                <tr>\r\n                    <td>options</td>\r\n                    <td>地层参数</td>\r\n                    <td>any</td>\r\n                    <td>静态属性</td>\r\n                    <td></td>\r\n                </tr>\r\n                <tr>\r\n                    <td>enableEdit</td>\r\n                    <td>启用坐标修改功能</td>\r\n                    <td>boolean</td>\r\n                    <td>动态属性</td>\r\n                    <td>false</td>\r\n                </tr>\r\n                <tr>\r\n                    <td>enableCluster</td>\r\n                    <td>启用要素聚合功能</td>\r\n                    <td>boolean</td>\r\n                    <td>静态属性</td>\r\n                    <td>false</td>\r\n                </tr>\r\n\r\n                <tr>\r\n                    <td>symbol</td>\r\n                    <td>要素样式</td>\r\n                    <td>any</td>\r\n                    <td>静态属性</td>\r\n                    <td>必填</td>\r\n                </tr>\r\n                <tr>\r\n                    <td>requestData</td>\r\n                    <td>是否异步请求数据，为true时，必须设置getDataList事件。</td>\r\n                    <td>boolean</td>\r\n                    <td>静态属性</td>\r\n                    <td></td>\r\n                </tr>\r\n                <tr>\r\n                    <td>requestStatus</td>\r\n                    <td>是否异步请求状态，为true时，必须设置getStatusList事件。</td>\r\n                    <td>boolean</td>\r\n                    <td>静态属性</td>\r\n                    <td></td>\r\n                </tr>\r\n                <tr>\r\n                    <td>showInfoWindow</td>\r\n                    <td>要素单击时，是否显示信息窗口</td>\r\n                    <td>boolean</td>\r\n                    <td>动态属性</td>\r\n                    <td></td>\r\n                </tr>\r\n                <tr>\r\n                    <td>showTooltip</td>\r\n                    <td>要素悬停时，是否显示tooltip信息。</td>\r\n                    <td>boolean</td>\r\n                    <td>静态属性</td>\r\n                    <td></td>\r\n                </tr>\r\n                <tr>\r\n                    <td>selectMode</td>\r\n                    <td>是否启用地图要素选择功能</td>\r\n                    <td>number</td>\r\n                    <td>静态属性</td>\r\n                    <td>0（0为未启用 1为单选，2为多选）</td>\r\n                </tr>\r\n            </tbody>\r\n\r\n        </table>\r\n\r\n        <h3>事件</h3>\r\n        <table>\r\n            <thead>\r\n                <tr>\r\n                    <th>事件名</th>\r\n                    <th>说明</th>\r\n                    <th>参数</th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr>\r\n                    <td>on-build</td>\r\n                    <td>组件构建完成回调。</td>\r\n                    <td>(layer:FlagwindBusinessLayer)</td>\r\n                </tr>\r\n                <tr>\r\n                    <td>onLayerClick</td>\r\n                    <td>图层要素单击事件。</td>\r\n                    <td>(evt:any)</td>\r\n                </tr>\r\n                <tr>\r\n                    <td>onCheckChanged</td>\r\n                    <td>图层要素单击选择回调事件。</td>\r\n                    <td>(evt: { target: Array; check: boolean; selectedItems: Array })</td>\r\n                </tr>\r\n                <tr>\r\n                    <td>onPositionChanged</td>\r\n                    <td>要素坐标变更回调事件。</td>\r\n                    <td>(currentPoint: any, originPoint: any, item: any)</td>\r\n                </tr>\r\n                <tr>\r\n                    <td>onVisibleChanged</td>\r\n                    <td>图层可见性变换回调事件。</td>\r\n                    <td>(isShow: boolean)</td>\r\n                </tr>\r\n                <tr>\r\n                    <td>getImageUrl</td>\r\n                    <td>自定义要素图标，它的优先级高于symbol，默认为null。</td>\r\n                    <td>(model: any)</td>\r\n                </tr>\r\n                <tr>\r\n                    <td>changeStandardModel</td>\r\n                    <td>标准化实体转换方法。</td>\r\n                    <td>(model: any)</td>\r\n                </tr>\r\n                <tr>\r\n                    <td>getInfoWindowContext</td>\r\n                    <td>信息弹窗方法。返回结果如：{title: "详细信息", content: "没有定制详细信息"}\r\n                    </td>\r\n                    <td>(mode: any)</td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n\r\n</div>\r\n'},a829:function(n,t,e){"use strict";e.r(t);var r=e("85f2"),a=e.n(r),d=e("7618"),o=e("268f"),i=e.n(o),l=e("4aa6"),m=e.n(l),p=e("4d16"),s=e.n(p),u=e("6d9c"),c=e("0b8c"),g=function(){var n=function(t,e){return n=s.a||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var e in t)t.hasOwnProperty(e)&&(n[e]=t[e])},n(t,e)};return function(t,e){function r(){this.constructor=t}n(t,e),t.prototype=null===e?m()(e):(r.prototype=e.prototype,new r)}}(),f=function(n,t,e,r){var o,l=arguments.length,m=l<3?t:null===r?r=i()(t,e):r;if("object"===("undefined"===typeof Reflect?"undefined":Object(d["a"])(Reflect))&&"function"===typeof Reflect.decorate)m=Reflect.decorate(n,t,e,r);else for(var p=n.length-1;p>=0;p--)(o=n[p])&&(m=(l<3?o(m):l>3?o(t,e,m):o(t,e))||m);return l>3&&m&&a()(t,e,m),m},h=function(n){function t(){var t=null!==n&&n.apply(this,arguments)||this;return t.code=c["a"],t.dataList=[{id:"1",name:"张三",longitude:118.5731,latitude:37.61462},{id:"2",name:"李娜",longitude:118.1332,latitude:37.48463},{id:"3",name:"五三",longitude:118.3833,latitude:37.6466},{id:"4",name:"原因",longitude:118.5634,latitude:37.9463},{id:"5",name:"李妈",longitude:118.7135,latitude:37.1468}],t.symbol={height:32,width:32,imageUrl:"./static/map/point.png"},t}return g(t,n),t.prototype.onChangeStandardModel=function(n){return n},t=f([Object(u["component"])({template:e("5887")})],t),t}(u["View"]);t["default"]=h}}]);