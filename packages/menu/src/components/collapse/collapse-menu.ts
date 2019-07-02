import { component, Component, config } from "../../decorator";
import sidebarMenu from "../sidebar/sidebar-menu";
import sidebarMenuCollapse from "../sidebar-collapse/sidebar-menu-collapse";
import "./collapse-menu.less";
import { Util } from "../util";

@component({
    template: require("./collapse-menu.html"),
    components: {
        "u-sidebar-menu": sidebarMenu,
        "u-sidebar-menu-collapse": sidebarMenuCollapse
    }
})
export default class CollapseMenu extends Component {
    @config({ default: false })
    public collapse!: Boolean;

    @config({})
    public menuList!: Array<any>;

    @config({
        default: "dark",
        validator(val: string) {
            return Util.oneOf(val, ["dark", "light"]);
        }
    })
    public theme!: String;

    @config({})
    public beforePush!: Function;

    @config({})
    public openNames!: Array<any>;
    // 菜单是否是单级菜单。默认是多级菜单
    @config({default: false})
    public single!: boolean;

    public get bgColor(): String {
        return this.theme === "dark" ? "#495060" : "#fff";
    }

    public get collapseIconColor(): String {
        return this.theme === "dark" ? "#fff" : "#495060";
    }

    public handleChange(name: any) {
        let willpush = true;
        if (this.beforePush !== undefined) {
            if (!this.beforePush(name)) {
                willpush = false;
            }
        }
        if (willpush) {
            (<any>this).$router.push({
                name: name
            });
        }
        this.$emit("on-change", name);
    }
}
