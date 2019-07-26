import { component, Component } from "@/decorator";
import { Util } from "./util";

@component
export default class Mixin extends Component{
    /**
     * 显示菜单标题
     * @param item 
     */
    public showTitle(item: any) {
        return Util.showTitle(item, this);
    }

    /**
     * 是否显示子菜单元素
     * @param item 
     */
    public showChildren(item: any) {
        return item.children && (item.children.length > 1 || (item.meta && item.meta.showAlways));
    }

    /**
     * 获取跳转链接
     * @param item 
     * @param children0 
     */
    public getNameOrHref(item: any, children0: boolean = false) {
        return item.href ? `isTurnByHref_${item.href}` : (children0 ? item.children[0].name : item.name);
    }
}