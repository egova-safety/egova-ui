let debug = process.env.NODE_ENV === "debugger";

let option = (<any>global).componentsOption && (<any>global).componentsOption.PLATE_PICKER_OPTION;
/**
 * 项目打包PLATE_PICKER_OPTION值根据项目window对象中的配置进行取值
 */
export const PLATE_PICKER_OPTION = {
    defaultProvince: (debug || !option) ? "京" : option.defaultProvince || "京",
    place: (debug || !option) ? "left-start" : option.place || "left-start"
};
