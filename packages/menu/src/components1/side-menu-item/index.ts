import { component, Component } from "@/decorator";
import Mixin from "../mixin";
import ItemMixin from "../item-mixin";
@component({
    name: "side-menu-item",
    template: require("./index.html"),
    mixins: [Mixin, ItemMixin]
})
export default class SideMenuItem extends Component {

}
