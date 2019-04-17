export class Util {
    public static  oneOf(ele: string, targetArr: Array<string>): boolean {
        if (targetArr.indexOf(ele) >= 0) {
            return true;
        } else {
            return false;
        }
    }
}
