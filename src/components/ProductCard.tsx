import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, Card, CardContent, CardHeader, CardMedia, Chip, IconButton, Rating, Stack, Typography } from "@mui/material";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { ProductI, addToCard, actions as productActions } from "../redux/productsSlice";

type props = {
    cardData: ProductI;
};

export default function ProductCard({ cardData }: props) {
    const dispatch = useDispatch();
    const amount = useSelector((state: RootState) => state.products.amount);

    const increaseAmount = useCallback(() => {
        dispatch(productActions.increaseAmount());
    }, [dispatch]);

    const decreaseAmount = useCallback(() => {
        dispatch(productActions.decreaseAmount());
    }, [dispatch]);

    const handleAddToCard = useCallback((id: string) => dispatch(addToCard({ id })), [dispatch]);

    return (
        <Card>
            <CardHeader avatar={<Chip label={cardData.discount} sx={{ bgcolor: "#b5525c", color: "#fff" }} />} />
            <CardMedia component="img" height="194" width="300" image={cardData.image} alt={cardData.name} />
            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack spacing={2}>
                        <Typography>{cardData.name}</Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Rating name="rating" value={cardData.rating} readOnly />
                            <Typography>({cardData.rating})</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Typography sx={{ color: "red" }}>${cardData.price}</Typography>
                            <Typography sx={{ color: "grey", textDecorationLine: "line-through" }}>${cardData.originalPrice}</Typography>
                        </Stack>
                        <Button variant="contained" onClick={() => handleAddToCard(cardData.id)} sx={{ bgcolor: "#b5525c" }}>
                            Add To Card
                        </Button>
                    </Stack>
                    <Stack alignItems="center">
                        {amount > 0 && (
                            <>
                                <IconButton onClick={decreaseAmount} sx={{ color: "red", border: "1px solid red", borderRadius: 1 }}>
                                    <RemoveIcon />
                                </IconButton>
                                <Typography>{amount}</Typography>
                            </>
                        )}
                        <IconButton onClick={increaseAmount} sx={{ color: "red", border: "1px solid red", borderRadius: 1 }}>
                            <AddIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}