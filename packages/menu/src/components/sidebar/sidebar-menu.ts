import { component, Component, config, watch } from "../../decorator";

@component({
    template: require("./sidebar-menu.html")
})
export default class SidebarMenu extends Component {
    @config({})
    public menuList!: Array<any>;

    @config({})
    public iconSize!: Number;

    @config({ default: "dark" })
    public menuTheme!: String;

    @config({ default: (): Array<any> => [] })
    public openNames!: Array<any>;

    @config({})
    public singleMenu!: Boolean;

    @config({})
    public activeName!: string;

    public active: string = "";

    public isOpened: boolean = false;

    @watch("activeName", { immediate: true })
    public onActiveNameChange(nv: any, ov: any) {
        this.active = nv;
        this.$forceUpdate();
    }

    public changeMenu(active: Boolean): void {
        this.$emit("on-change", active);
    }

    public itemTitle(item: any): any {
        if (typeof item.title === "object") {
            // return this.$t(item.title.i18n);
            return this.itemTitle(item.title.i18n);
        } else {
            return item.title;
        }
    }

    @watch("$route.name", { immediate: true })
    public update(): void {
        this.$nextTick(() => {
            if (this.$refs.sideMenu) {
                // this.$refs["sideMenu"].updateOpened();
                // (<any>this.$refs.sideMenu).updateActiveName();
                // this.$refs.sideMenu["activeName"] = (<any>this).$route.name;
                this.active = (<any>this).$route.name;
                this.$forceUpdate();
            }
        });
    }

    public mounted() {
        let that = this;
        let interval = setTimeout(function() {
            if (!that.isOpened) {
                that.updateOpenMenu(that);
            } else {
                clearTimeout(interval);
            }
        }, 600);
    }

    public updateOpenMenu(that: any) {
        let targets = document.getElementsByClassName("router-link-active");
        let target;
        if (targets.length > 0) {
            target = targets[0];
        }
        if (target) {
            that.isOpened = true;
            (<any>target.parentNode).previousElementSibling.dispatchEvent(
                new Event("click")
            );
        }
    }
}
