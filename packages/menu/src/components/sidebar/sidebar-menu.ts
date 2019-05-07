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
                // this.active = (<any>this).$route.name;
                // this.$forceUpdate();

                this.setActiveName(this.menuList, (<any>this).$route.name);
            }
        });
    }

    public setActiveName(menuList: Array<any>, name: string) {
        for (let menu of menuList) {
            if (menu.name === name) this.active = name;
            else if (name.indexOf(menu.name) >= 0 && menu.name !== name) {
                if (menu.children && menu.children.length) {
                    this.setActiveName(menu.children, name);
                } else this.active = menu.name;
            }
        }
        this.$forceUpdate();
    }

    public mounted() {
        let that = this;
        let interval = setTimeout(function () {
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
