import { URLS } from "./urls";
import { axiosInstance as axios } from "../utils/axiosInstance";

export const ProductService = {
    getProductList: (options: object) => axios.get(URLS.productService.getProduct, options),
    getSearchedProducts: (options: object) => axios.get(URLS.productService.getSearchedProducts, options),
    addToCard: (options: object) => axios.post(URLS.productService.addToCard,null, options),
};
