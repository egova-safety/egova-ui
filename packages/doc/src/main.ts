import flagwind from "@egova/flagwind-core";
import ApplicationContext from "./application/context";
import PlatePicker from "@egova/ui-plate-picker";

console.log(PlatePicker)
// 获取应用上下文
let context = ApplicationContext.current;

// 启动应用程序
flagwind.Application.start(context);
