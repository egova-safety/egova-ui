import { BRAND_PICKER_OPTION } from "./brand-picker-options";
import axios from "axios";

/**
 * service
 */
export default class Service {
    /**
     * 获得所有的车辆品牌数据（只包含品牌、不包含子品牌和年款）
     * @returns {Promise<any>}
     */
    public async getVehicleBrandList(): Promise<any> {
        return axios.get<any>(BRAND_PICKER_OPTION.brandUrl);
    }
}
