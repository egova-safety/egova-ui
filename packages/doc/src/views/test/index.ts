import { component, View } from "@egova/flagwind-web";
import PlatePicker from "@egova/ui-plate-picker";
import "./index.less";

@component({
    template: require("./index.html"),
    components: {
        "u-plate-picker": PlatePicker
    }
})
export default class TestView extends View {

}
