import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import styled from "@emotion/styled";
import Tooltip from "@mui/material/Tooltip";

export type ProductListType = {
  productId: string;
  productName: string;
  productDetails: string;
  productColorVarientAndPrice: ProductColorVarientAndPrice[];
  productCategory: string;
  productImage: string;
};

type ProductColorVarientAndPrice = {
  price: number;
  color: string;
};

type ProductCardProps = {
  product: ProductListType;
  onClick: (product: ProductListType) => void;
};

const CardStyled = styled(Card)`
  width: 20%;
  height: 65%;
  margin: 1rem;
  transition: transform 0.3s ease;
  .productcard-productdetails {
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0.2rem;
  }
  :hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const PricingTable = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;

  .pricing-row {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem;
    border: 1px solid #ddd;
    margin-bottom: 0.5rem;
    background-color: #f9f9f9;
    border-radius: 4px;
  }
`;
const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <CardStyled onClick={() => onClick(product)}>
      <CardMedia
        component="img"
        image={product.productImage}
        alt={product.productName}
        height="50%"
      />
      <CardContent>
        <Typography gutterBottom variant="subtitle1" component="div">
          {product.productName}
        </Typography>
        <Tooltip title={product.productDetails} placement="right">
          <Typography
            variant="subtitle2"
            color="text.secondary"
            className="productcard-productdetails"
          >
            {product.productDetails}
          </Typography>
        </Tooltip>
        <PricingTable>
          {product.productColorVarientAndPrice.map((variant, index) => (
            <div key={index} className="pricing-row">
              <Typography variant="body2" color="text.primary">
                {variant.color}
              </Typography>
              <Typography variant="body2" color="text.primary">
                ₹{variant.price}
              </Typography>
            </div>
          ))}
        </PricingTable>
      </CardContent>
    </CardStyled>
  );
};

export default ProductCard;
