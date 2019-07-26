import { component, Component, config, watch } from "@/decorator";
import Mixin from "../mixin";
import { Util } from "../util";
import SideMenuItem from "../side-menu-item";
import CollapsedMenu from "../collapsed-menu";
import "./index.less";
@component({
    name: "SideMenu",
    template: require("./index.html"),
    mixins: [Mixin],
    components: {
        "side-menu-item": SideMenuItem,
        "collapsed-menu": CollapsedMenu
    }
})
export default class SideMenu extends Component {
    @config({ type: Array, default: () => new Array() })
    public menuList!: Array<any>;

    @config({ type: Boolean, default: false })
    public collapsed!: boolean;

    @config({ type: String, default: "dark" })
    public theme!: string;

    @config({ type: Number, default: 20 })
    public rootIconSize!: number;

    @config({ type: Number, default: 16 })
    public iconSize!: number;

    @config({ type: Boolean, default: false })
    public accordion!: boolean;

    @config({ type: String, default: "" })
    public activeName!: string;

    @config({ type: Array, default: () => new Array() })
    public openNames!: Array<any>;

    public openedNames: Array<any> = [];

    public get textColor() {
        return this.theme === "dark" ? "#ffffff" : "#495060";
    }

    public handleSelect(name: string) {
        this.$emit("on-select", name);
    }

    public getOpenedNamesByActiveName(name: string) {
        return (this as any).$route.matched.map((item: any) => item.name).filter((_: any) => _ !== name);
    }

    public updateOpenName(name: string) {
        if (name === "main") {
            this.openedNames = [];
        } else {
            this.openedNames = this.getOpenedNamesByActiveName(name);
        }
    }

    @watch("activeName", { immediate: true })
    public listenActiveName(name: string) {
        if (this.accordion) {
            this.openedNames = this.getOpenedNamesByActiveName(name);
        } else {
            this.openedNames = Util.getUnion(this.openedNames, this.getOpenedNamesByActiveName(name));
        }
    }

    @watch("openNames", { immediate: true, deep: true })
    public listenOpenNames(newNames: Array<any> = []) {
        this.openNames = newNames;
    }

    @watch("openedNames", { immediate: true, deep: true })
    public listenOpenedNames() {
        // 在页面元素渲染完成之后执行
        this.$nextTick(() => {
            (this.$refs.menu as any).updateOpened();
        });
    }

    public mounted() {
        this.openedNames = Util.getUnion(this.openedNames, this.getOpenedNamesByActiveName(this.activeName));
    }
}