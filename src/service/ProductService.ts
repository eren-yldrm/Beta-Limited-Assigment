import { axiosInstance as axios } from "../utils/axiosInstance";
import { URLS } from "./urls";

export const ProductService = {
    getProductList: (options: object) => axios.get(URLS.productService.getProduct, options),
    getSearchedProducts: (options: object) => axios.get(URLS.productService.getSearchedProducts, options),
    addToCard: (options: object) => axios.post(URLS.productService.addToCard, null, options),
};
