import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductService } from "../service/ProductService";

export interface InitialStateI {
    value: Array<ProductI>;
    searchedProducts: Array<ProductI>;
    amount: AmountI;
    isAdded: boolean;
}

interface AmountI {
    value: number;
    index: string;
}
export interface ProductI {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    rating: number;
    image: string;
    discount: string;
}

const initialState: InitialStateI = { value: [], amount: { value: 0, index: "" }, searchedProducts: [], isAdded: false };

const { actions, reducer } = createSlice({
    name: "products",
    initialState,
    reducers: {
        increaseAmount: (state, actions) => {
            state.amount.value++;
            state.amount.index = actions.payload;
        },
        decreaseAmount: (state, actions) => {
            state.amount.value--;
            state.amount.index = actions.payload;
        },

        setProductsData: (state, action) => {
            state.value = action.payload;
        },
        setIsAdded: (state, actions) => {
            state.isAdded = actions.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProductList.fulfilled, () => {});
    },
});

const getProductList = createAsyncThunk("getProductList", async (params: object, ThunkAPI) => {
    const result = await ProductService.getProductList(params);
    if (result.data) ThunkAPI.dispatch(actions.setProductsData(result.data));

    return result;
});
const getSearchedProducts = createAsyncThunk("getSearchedProducts", async (params: object, ThunkAPI) => {
    const result = await ProductService.getSearchedProducts({ params });
    if (result.data) ThunkAPI.dispatch(actions.setProductsData(result.data));

    return result;
});
const addToCard = createAsyncThunk("addToCard", async (params: object, ThunkAPI) => {
    const result = await ProductService.addToCard({ params });
    if (result.data) ThunkAPI.dispatch(actions.setIsAdded(true));

    return result;
});

export { actions, addToCard, getProductList, getSearchedProducts };

export default reducer;
