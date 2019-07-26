export class Util {
    public static oneOf(ele: string, targetArr: Array<string>): boolean {
        if (targetArr.indexOf(ele) >= 0) {
            return true;
        } else {
            return false;
        }
    }

    public static showTitle(item: any, vm: any) {
        let { title } = item.meta;
        if (!title) return;
        title = (item.meta && item.meta.title) || item.name;
        return title;
    }

    /**
     * 获取交集
     * @param arr1 
     * @param arr2 
     */
    public static getUnion(arr1: Array<any>, arr2: Array<any>) {
        return Array.from(new Set([...arr1, ...arr2]));
    }

    public static findNodeUpperByClasses(ele: any, classes: any): any {
        let parentNode: any = ele.parentNode;
        if (parentNode) {
            let classList = parentNode.classList;
            if (classList && classes.every((className: string) => classList.contains(className))) {
                return parentNode;
            } else {
                return Util.findNodeUpperByClasses(parentNode, classes);
            }
        }
    }
}
