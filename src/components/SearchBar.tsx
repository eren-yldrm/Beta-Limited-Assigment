import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, IconButton, InputBase, Paper, Stack } from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Logo from "../assets/logo-dark.png";
import type { AppDispatch } from "../redux";
import { getSearchedProducts } from "../redux/productsSlice";

export default function SearchBar() {
    const [inputValue, setInputValue] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();

    const handleSearch = useCallback(() => dispatch(getSearchedProducts({ name: inputValue })), [dispatch, inputValue]);

    return (
        <Paper sx={{ borderRadius: 8 }}>
            <Stack direction="row" justifyContent="space-around" alignItems="center">
                <Box component="img" src={Logo} sx={{ width: 150, height: 50, p: "10px" }} />

                <Box sx={{ border: "1px solid grey", borderRadius: "25px " }}>
                    <IconButton sx={{ p: "10px" }}>
                        <SearchIcon />
                    </IconButton>
                    <InputBase placeholder="Searching for..." onChange={(e) => setInputValue(e.target.value)} />
                    <Button onClick={handleSearch} sx={{ backgroundColor: "#b5525c", color: "#fff", ":hover": { backgroundColor: "#b5525c" }, p: "10px", borderTopRightRadius: "25px 25px", borderBottomRightRadius: "25px 25px" }}>
                        Search
                    </Button>
                </Box>
            </Stack>
        </Paper>
    );
}
