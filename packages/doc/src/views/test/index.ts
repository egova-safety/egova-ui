import { component, View } from "@egova/flagwind-web";
import Breadcrumb from "@egova/ui-breadcrumb";
import "./index.less";

@component({
    template: require("./index.html"),
    components: {
        "u-plate-picker": Breadcrumb
    }
})
export default class TestView extends View {

}
