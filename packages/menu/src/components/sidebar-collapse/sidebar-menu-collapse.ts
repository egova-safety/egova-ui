import { component, Component, config } from "../../decorator";

@component({
    template: require("./sidebar-menu-collapse.html")
})
export default class SidebarMenuCollapse extends Component{
    @config({})
    public menuList: Array<any>;

    @config({default: "white"})
    public iconColor: String;

    @config({default: "darck"})
    public menuTheme: String;

    @config({})
    public singleMenu: Boolean;

    public changeMenu(active: any): void {
        this.$emit("on-change", active);
    }

    public itemTitle(item: any): any {
        if(typeof item.title === "object") {
            return this.itemTitle(item.title.i18n);
            // return this.$t(item.title.i18n);
        }else {
            return item.title;
        }
    }
}
