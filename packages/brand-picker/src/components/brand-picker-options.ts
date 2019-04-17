let debug = process.env.NODE_ENV === "debugger";
/**
 * 项目打包BRAND_PICKER_OPTION值根据项目window对象中的配置进行取值
 */
export const BRAND_PICKER_OPTION = {
    brandUrl: debug ? "http://192.168.101.27:8080/unity/brand/all" : (<any>global).componentsOption.BRAND_PICKER_OPTION.brandUrl || "http://192.168.101.27:8080/unity/brand/all",
    initBrandCode: debug ? "" : (<any>global).componentsOption.BRAND_PICKER_OPTION.initBrandCode || "",
    position: debug ? "right-start" : (<any>global).componentsOption.BRAND_PICKER_OPTION.position || "right-start",
    btnStyleObj: debug ? {} : (<any>global).componentsOption.BRAND_PICKER_OPTION.btnStyleObj || {}
};
