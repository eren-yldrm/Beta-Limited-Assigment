import { Container, Stack, Snackbar, Alert } from "@mui/material";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import type { RootState } from "./redux";
import { ProductI, actions as productsActions, getProductList } from "./redux/productsSlice";
import handleSession from "./utils/axiosInstance";

function App() {
    const productList = useSelector((state: RootState) => state.products.value);
    const isAdded = useSelector((state: RootState) => state.products.isAdded);

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            await handleSession();
            dispatch(getProductList({}));
        }
        fetchData();
    }, [dispatch]);

    const handleOnClose = useCallback(() => {
        dispatch(productsActions.setIsAdded(false));
    }, [dispatch]);

    return (
        <>
            <SearchBar />
            <Container sx={{ mt: 5 }}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                    {productList.map((product: ProductI) => (
                        <ProductCard key={product.id} cardData={product} />
                    ))}
                </Stack>
                <Snackbar open={isAdded} autoHideDuration={1500} onClose={handleOnClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                    <Alert severity="success" sx={{ width: "100%" }}>
                        This is a success message!
                    </Alert>
                </Snackbar>
            </Container>
        </>
    );
}

export default App;
