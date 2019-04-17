let debug = process.env.NODE_ENV === "debugger";
/**
 * 项目打包PLATE_PICKER_OPTION值根据项目window对象中的配置进行取值
 */
export const PLATE_PICKER_OPTION = {
    defaultProvince: debug ? "京" : (<any>global).componentsOption.PLATE_PICKER_OPTION.defaultProvince || "京",
    place:  debug ? "left-start" : (<any>global).componentsOption.PLATE_PICKER_OPTION.place || "left-start"
};
