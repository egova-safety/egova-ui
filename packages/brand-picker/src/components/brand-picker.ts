import { component, config, watch, Component } from "../decorator";
import "./brand-picker.less";
import { BRAND_PICKER_OPTION } from "./brand-picker-options";
import axios from "axios";

@component({
    template: require("./brand-picker.html")
})
export default class BrandSelector extends Component {
    // 组件是否可见
    public visible: Boolean = false;

    @config()
    public headers: Object;

    // 初始化车辆品牌组件--哪一个品牌被默认选中
    @config({ default: BRAND_PICKER_OPTION.initBrandCode })
    public initBrandCode: String;

    @config({ default: BRAND_PICKER_OPTION.position })
    public position: String;
    // 按钮的样式
    @config({ default: () => BRAND_PICKER_OPTION.btnStyleObj })
    public btnStyleObj: Object;
    // 存储的是车辆品牌数据
    // @config({ default: [] })
    public brandList: Array<any>;
    // 选中的是哪一个车辆品牌种类
    public activeBrandCharClassIndex: Number = 0;
    // 当前选中的车辆品牌对象
    public curBrand: any = null;
    // 分类
    public brandCharArr: any = {
        hot: { title: "热门", active: true, data: [] },
        A: { title: "A", active: false, data: [] },
        B: { title: "B", active: false, data: [] },
        C: { title: "C", active: false, data: [] },
        D: { title: "D", active: false, data: [] },
        E: { title: "E", active: false, data: [] },
        F: { title: "F", active: false, data: [] },
        G: { title: "G", active: false, data: [] },
        H: { title: "H", active: false, data: [] },
        I: { title: "I", active: false, data: [] },
        J: { title: "J", active: false, data: [] },
        K: { title: "K", active: false, data: [] },
        L: { title: "L", active: false, data: [] },
        M: { title: "M", active: false, data: [] },
        N: { title: "N", active: false, data: [] },
        O: { title: "O", active: false, data: [] },
        P: { title: "P", active: false, data: [] },
        Q: { title: "Q", active: false, data: [] },
        R: { title: "R", active: false, data: [] },
        S: { title: "S", active: false, data: [] },
        T: { title: "T", active: false, data: [] },
        U: { title: "U", active: false, data: [] },
        V: { title: "V", active: false, data: [] },
        W: { title: "W", active: false, data: [] },
        X: { title: "X", active: false, data: [] },
        Y: { title: "Y", active: false, data: [] },
        Z: { title: "Z", active: false, data: [] }
    };
    // 清理掉选中的车辆品牌
    public onClearBrand(): void {
        this.activeBrandCharClassIndex = 0;
        this.curBrand = null;
        for (let item in this.brandCharArr) {
            if (item) {
                this.brandCharArr[item].active = false;
            }
        }
        this.brandCharArr["hot"].active = true;
    }
    // 回到初始状态 如果有initBrandCode 会重置成initBrandCode
    // 需要注意的是 如果initBrandCode绑定的值是一直在变化 则无法重置 因为这里是一直重置成initBrandCode
    public resetToInit() {
        if (this.initBrandCode) {
            let vm = this;
            let brands = this.brandList;
            let brand = brands.find(function (item) {
                return item.id === vm.initBrandCode;
            });
            if (brand) {
                this.curBrand = brand;
            }
        }
    }
    public setData(brandCode: any, childBrandCodes?: any, brandYearCodes?: any) {
        let brand = this.brandList.find(item => item.id === brandCode);
        if (brand) {
            this.curBrand = brand;
        }
    }
    // 显示选中的车辆品牌名称
    protected get brandBtnText(): any {
        let brandBtnText = "不限品牌";
        if (this.curBrand) {
            brandBtnText = this.curBrand.name;
        }
        return brandBtnText;
    }
    // 获得车辆品牌代码
    protected get brandCode(): any {
        let brandCode = "";
        if (this.curBrand) {
            brandCode = this.curBrand.id;
        }
        return brandCode;
    }
    // 获得想要的数据
    protected get dataToEmit(): any {
        return [this.brandCode, "", ""];
    }
    // 获取车辆品牌数据信息的方法
    protected async getBrandList() {
        try {
            let headers = this.headers || {};
            let res = await axios.get<any>(BRAND_PICKER_OPTION.brandUrl, headers);
            if (res.data.hasError) {
                this.$message.error("获取车辆品牌数据,后台出错");
                return;
            }
            this.brandList = res.data.result;
            this.resolveBrandList();
        } catch (error) {
            this.$notice.error({ title: "在获取车辆品牌数据时,发生请求错误" });
        }
    }
    // 加载完成之后执行这个方法
    protected mounted(): void {
        // setTimeout(() => {
        //     this.resolveBrandList();
        // }, 1500);
        this.getBrandList();
    }
    // 渲染品牌数据---- 默认选中的车辆品牌
    protected resolveBrandList(): void {
        let vm = this;
        let brands = this.brandList;
        if (this.initBrandCode) {
            let brand = brands.find(function (item: any) {
                return item.id === vm.initBrandCode;
            });
            if (brand) {
                this.curBrand = brand;
            }
        }
        for (let i = 0, item, label; i < brands.length; ++i) {
            item = brands[i];
            label = item.firstLetter;
            this.brandCharArr[label].data.push(item);
            if (item.hotFlag) {
                this.brandCharArr.hot.data.push(item);
            }
        }
    }
    // 监听数据变化
    @watch("dataToEmit", { immediate: true })
    protected dataToEmitChange(nv: any, ov: any): void {
        if (JSON.stringify(nv) === JSON.stringify(ov)) {
            return;
        }
        this.$emit("change", nv[0], nv[1], nv[2]);
    }
    // 设置当前选中的车辆品牌的样式
    protected setActiveBrandClass(classNameArr: any): void {
        for (let item in this.brandCharArr) {
            if (item) {
                this.brandCharArr[item].active = false;
            }
        }
        for (let i = 0, name; i < classNameArr.length; ++i) {
            name = classNameArr[i];
            this.brandCharArr[name].active = true;
        }
    }
    // 点击车辆品牌的方法
    protected onClickBrand(brand: any): any {
        this.curBrand = brand;
        this.visible = false;
    }

}
