import { component, Component, config } from "@/decorator";
import Mixin from "../mixin";
import ItemMixin from "../item-mixin";
import { Util } from "../util";

@component({
    name: "collapsed-menu",
    template: require("./index.html"),
    mixins: [Mixin, ItemMixin]
})
export default class CollapsedMenu extends Component {
    /**
     * 隐藏标题
     */
    @config({ type: Boolean, default: false })
    public hideTitle!: boolean;

    /**
     * 根图标的大小
     */
    @config({ type: Number, default: 16 })
    public rootIconSize!: number;

    /**
     * 在右边显示缩略图
     */
    public placement: string = "right-end";

    /**
     * 点击缩略链接跳转到该页面
     */
    public handleClick(name: string): void {
        this.$emit("on-click", name);
    }

    /**
     * 显示简略菜单信息
     * @param event 当前节点
     * @param children 子节点的数据信息
     */
    public handleMousemove(event: any, children: Array<any> = []): void {
        const { pageY } = event;
        const height = children.length * 38;
        const isOverflow = pageY + height < window.innerHeight;
        this.placement = isOverflow ? "right-start" : "right-end";
    }

    public mounted() {
        let dropdown = Util.findNodeUpperByClasses((this.$refs.dropdown as any).$el, ["ivu-select-dropdown", "ivu-dropdown-transfer"]);
        if (dropdown) dropdown.style.overflow = "visible";
    }
}