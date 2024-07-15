import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
  CardMedia,
  Grid,
  IconButton,
} from "@mui/material";
import styled from "@emotion/styled";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import {
  AddAndDeleteToCartRequestType,
  ProductListType,
} from "../../types/CommonTypes";

const StyledButton = styled(Button)`
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  width: 30%;
  color: white;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 10px;
  }
  .product-quantitysection {
    display: flex;
    align-items: center;
    .add-minus-icons {
      margin: 0.3rem 0.3rem;
    }
    input {
      pointer-events: none;
      caret-color: transparent;
    }
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  .footer-buttons {
    margin-bottom: 0.3rem;
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  color: white;
  padding: 1rem;
  border-radius: 10px 10px 0 0;
`;

type BuyProductDialogProps = {
  open: boolean;
  product?: ProductListType;
  handleClose: () => void;
  handleBuy: (addToCartRequest: AddAndDeleteToCartRequestType) => void;
  creditDetails: number;
};

export const BuyProductDialog: React.FC<BuyProductDialogProps> = ({
  open,
  product,
  handleClose,
  handleBuy,
  creditDetails,
}) => {
  const [color, setColor] = useState(
    product?.productColorVarientAndPrice[0]?.color || ""
  );
  const [quantity, setQuantity] = useState(1);

  const handleColorChange = (event: any) => {
    setColor(event.target.value);
  };

  const handleQuantityChange = (type: "plus" | "minus") => {
    setQuantity((prev) => {
      if (type === "plus") {
        return prev < 5 ? prev + 1 : prev;
      } else {
        return prev > 1 ? prev - 1 : prev;
      }
    });
  };

  const handleBuyClick = () => {
    const selectedVariant = product?.productColorVarientAndPrice.find(
      (variant) => variant.color === color
    );
    if (selectedVariant && product) {
      const addToCartRequest: AddAndDeleteToCartRequestType = {
        productId: product.productId,
        color: selectedVariant.color,
        price: selectedVariant.price,
        quantity,
      };
      handleBuy(addToCartRequest);
    }
  };

  return product ? (
    <StyledDialog
      open={open}
      onClose={handleClose}
      id="Product-Addtocart-Popup"
    >
      <StyledDialogTitle>Buy {product.productName}</StyledDialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} marginTop={2}>
            <CardMedia
              component="img"
              image={product?.productImage}
              sx={{
                width: "100%",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={8} marginTop={2}>
            <Typography variant="body1" gutterBottom>
              {product.productDetails.split(",").map((eachPoint) => (
                <>
                  ‣ {eachPoint.trim()}
                  <br />
                </>
              ))}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Color</InputLabel>
                  <Select
                    value={color}
                    onChange={handleColorChange}
                    label="Color"
                  >
                    {product.productColorVarientAndPrice.map((variant) => (
                      <MenuItem key={variant.color} value={variant.color}>
                        {variant.color}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} className="product-quantitysection">
                <IconButton onClick={() => handleQuantityChange("minus")}>
                  <RemoveCircleOutlineRoundedIcon className="add-minus-icons" />
                </IconButton>
                <TextField
                  fullWidth
                  margin="normal"
                  type="number"
                  label="Quantity"
                  value={quantity}
                  InputProps={{ inputProps: { min: 1, max: 5 } }}
                />
                <IconButton onClick={() => handleQuantityChange("plus")}>
                  <AddCircleOutlineRoundedIcon className="add-minus-icons" />
                </IconButton>
              </Grid>
            </Grid>
            <Typography variant="body1" marginTop={2}>
              {`Your Balance Credit is  ₹${creditDetails}`}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="footer-buttons">
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <StyledButton onClick={handleBuyClick}>Add To Cart</StyledButton>
      </DialogActions>
    </StyledDialog>
  ) : (
    <></>
  );
};
