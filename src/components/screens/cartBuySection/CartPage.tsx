import React from "react";
import { CommonAppHeader } from "../../common/CommonHeader";
import styled from "@emotion/styled";
import { CartBody } from "./CartBody";

export type ProductListType = {
  productId: string;
  productName: string;
  color: string;
  price: number;
  quantity: number;
};

type CartBuyPageProps = {
  userName: string;
  cartDetails: ProductListType[];
  creditDetails: number;
  removeCartItem: (itemDetails: ProductListType) => void;
  buyButtonClick: () => void;
  accountDetailsClick: () => void;
  logoutClick: () => void;
  backToProductListNav: () => void;
};

const CartBuyPageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .cartbuy-body {
    height: 80%;
    background: #f9f9f9;
  }
`;

export const CartBuyPage: React.FC<CartBuyPageProps> = ({
  userName,
  cartDetails,
  buyButtonClick,
  removeCartItem,
  accountDetailsClick,
  logoutClick,
  backToProductListNav,
  creditDetails,
}) => (
  <CartBuyPageContainer>
    <CommonAppHeader
      greetingText={`${userName}'s Cart`}
      userName={userName}
      accountDetailsClick={accountDetailsClick}
      logoutClick={logoutClick}
    />
    <div className="cartbuy-body">
      <CartBody
        cartDetails={cartDetails}
        buyButtonClick={buyButtonClick}
        deleteButtonClick={removeCartItem}
        backToProductListNav={backToProductListNav}
        creditDetails={creditDetails}
      />
    </div>
  </CartBuyPageContainer>
);
