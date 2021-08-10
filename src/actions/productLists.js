import axios from "axios";
import { base_url } from "../utils/constants";

export const getProductLists = async () => {
    const response = await axios.get(base_url + '/api/salable-products?isSalable=true');
    return response;
}