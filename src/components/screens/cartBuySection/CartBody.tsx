import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BuyButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: centre;
  width: 80%;
  margin: 2rem auto;
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  padding: 0.6rem;
  color: white;
  font-size: 1.2rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
  svg {
    margin-right: 0.3rem;
  }
`;

const CartContainer = styled(Box)`
  display: grid;
  grid-template-columns: 70% 30%;
  align-items: center;
  width: 95%;
  margin: 1rem auto;
  padding: 1rem;
  height: 100%;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  background: #ffffff;
  .cartpage-productsection {
    height: 100%;
    overflow-y: scroll;
  }
`;

const ProductItem = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

const ProductDetails = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  .productrow-productname {
    font-size: 1.4rem;
    font-weight: bold;
    margin: 0 0 0.5rem 0;
  }
  .productrow-productdetails {
    font-size: 1rem;
    margin: 0.2rem 0;
  }
`;

const ProductActions = styled(Box)`
  display: flex;
  align-items: center;
`;

const SummarySection = styled(Box)`
  width: 100%;
  height: 100%;
  margin: 0.4rem;
  padding: 1rem;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  .summary-divider {
    margin: 0.5rem 0;
  }
  .summary-header {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
  }
  .summary-detail-row {
    font-size: 1.2rem;
    margin: 0.4rem 0;
  }
  .backto-prodcutpage-nav {
    font-size: 0.8rem;
    margin: 3.5rem auto 0 auto;
  }
`;

type CartDetails = {
  productId: string;
  productName: string;
  color: string;
  price: number;
  quantity: number;
};

type CartBodyType = {
  cartDetails: CartDetails[];
  deleteButtonClick: (productDetails: CartDetails) => void;
  buyButtonClick: () => void;
  backToProductListNav: () => void;
};

const getSummaryDetails = (cartList: CartDetails[]) => {
  const noOfItems = cartList.length;
  let subTotalAmount = 0;
  cartList.forEach((product) => {
    const { price, quantity } = product;
    subTotalAmount = subTotalAmount + price * quantity;
  });

  return {
    noOfItems,
    subTotalAmount,
  };
};

export const CartBody: React.FC<CartBodyType> = ({
  buyButtonClick,
  cartDetails,
  deleteButtonClick,
  backToProductListNav,
}) => {
  const [summaryData, setSummaryData] = useState(
    getSummaryDetails(cartDetails)
  );

  useEffect(
    () => setSummaryData(getSummaryDetails(cartDetails)),
    [cartDetails]
  );
  return (
    <CartContainer>
      <div className="cartpage-productsection">
        {cartDetails.map((product) => (
          <ProductItem key={product.productId}>
            <ProductDetails>
              <span className="productrow-productname">
                {product.productName}
              </span>
              <span className="productrow-productdetails">
                Color : {product.color}
              </span>
              <span className="productrow-productdetails">
                Price : ₹{product.price}
              </span>
              <span className="productrow-productdetails">
                Quantity : {product.quantity}
              </span>
            </ProductDetails>
            <ProductActions>
              <IconButton
                color="secondary"
                onClick={() => deleteButtonClick(product)}
              >
                <DeleteIcon />
              </IconButton>
            </ProductActions>
          </ProductItem>
        ))}
      </div>
      <SummarySection className="cartpage-segmentsection">
        <span className="summary-header">Summary</span>
        <Divider className="summary-divider" />
        <span className="summary-detail-row">
          No of Items : {summaryData.noOfItems}
        </span>
        <span className="summary-detail-row">Estimated Taxes & Fees : ₹0</span>
        <span className="summary-detail-row">
          Total : ₹{summaryData.subTotalAmount}
        </span>
        <BuyButton onClick={buyButtonClick}>
          <LocalMallIcon />
          Buy Now
        </BuyButton>
        <BuyButton
          onClick={backToProductListNav}
          className="backto-prodcutpage-nav"
        >
          <ArrowBackIcon />
          Back to Product Page
        </BuyButton>
      </SummarySection>
    </CartContainer>
  );
};
