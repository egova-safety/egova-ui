import { BRAND_PICKER_OPTION } from "./brand-picker-options";
import axios from "axios";
import Cookies from "js-cookie";
/**
 * service
 */
export default class Service {
    /**
     * 获得所有的车辆品牌数据（只包含品牌、不包含子品牌和年款）
     * @returns {Promise<any>}
     */
    public async getVehicleBrandList(): Promise<any> {
        let token = Cookies.get("access_token");
        return axios.get<any>(BRAND_PICKER_OPTION.brandUrl,{headers: {Authorization : "Bearer" + token}});
    }
}
