// import { component, mixins, config, model, watch, inject, provide   } from "@egova/flagwind-web";

// export { component, mixins, config, model, watch, inject, provide };

import component, { mixins } from "vue-class-component";
import { Prop as config, Model as model, Watch as watch, Inject as inject, Provide as provide } from "vue-property-decorator";
import Vue from "vue";
export { component, mixins, config, model, watch, inject, provide };

import iview, {Notice, Message} from "iview";
const components: any = iview;
export class Component extends Vue {
    /**
     * 获取一个全局消息提示框实例。
     * @returns Message
     */
    protected get $message(): Message
    {
        return components.Message;
    }
     
    /**
     * 获取一个全局通知提醒实例。
     * @returns Notice
     */
    protected get $notice(): Notice
    {
        return components.Notice;
    }
}