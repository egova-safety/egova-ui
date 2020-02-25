import { component, config, Component } from "../decorator";

@component({template: require("./breadcrumb-nav.html")})
export default class BreadcrumbNav extends Component {

    @config({})
    public currentPath: Array<any>;

    protected itemTitle(item: any): String {

        if (typeof item.title === "object") {
            // return this.$t(item.title.i18n);
            return this.itemTitle(item.title.i18n);
        } else {
            return item.title;
        }
        
    }

}
