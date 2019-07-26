import { component, Component, config } from "@/decorator";

@component
export default class ItemMixin extends Component {
    @config({ type: Object, default: () => Object.create(null) })
    public parentItem!: any;

    @config({ type: String, default: "" })
    public theme!: string;

    @config({ type: Number, default: 16 })
    public iconSize!: number;

    public get parentName() {
        return this.parentItem.name;
    }

    public get children() {
        return this.parentItem.children;
    }

    public get textColor() {
        return this.theme === "dark" ? "#ffffff" : "#495060";
    }
}