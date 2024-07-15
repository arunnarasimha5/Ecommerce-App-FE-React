import React from "react";
import "./ProductList.css";
import { ProductCategoryVerticalTabs } from "./ProductCategoryTabs";

import { BuyProductDialog } from "./ProductAddToCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { CommonAppHeader, HeaderBlock } from "../../common/CommonHeader";
import {
  AddAndDeleteToCartRequestType,
  ProductListType,
  UserDetailsType,
} from "../../types/CommonTypes";

type ProductPageProps = {
  userData?: UserDetailsType;
  productTabData?: {
    selectedTab: string;
    productList: ProductListType[];
  };
  productDailogData: {
    show: boolean;
    product?: ProductListType;
    addToCartClick: (addToCartRequest: AddAndDeleteToCartRequestType) => void;
    onCloseButtonClick: () => void;
  };
  productCardClick: (value: ProductListType) => void;
  tabOnChange: (value: string) => void;
  accountDetailsClick: () => void;
  logoutButtonClick: () => void;
  goToCartButtonClick: () => void;
};

export const ProductListPage: React.FC<ProductPageProps> = ({
  accountDetailsClick,
  productTabData,
  userData,
  logoutButtonClick,
  goToCartButtonClick,
  tabOnChange,
  productDailogData,
  productCardClick,
}) => (
  <div className="productpage-list-conatiner">
    <CommonAppHeader
      greetingText={`Welcome ${userData?.name}`}
      userName={userData?.name || ""}
      accountDetailsClick={accountDetailsClick}
      logoutClick={logoutButtonClick}
    />
    <div className="productpage-body">
      <ProductCategoryVerticalTabs
        activeTab={productTabData?.selectedTab || ""}
        tabDataArray={userData?.productCategoryDetails || []}
        tabOnChange={tabOnChange}
        productList={productTabData?.productList || []}
        productOnClick={productCardClick}
      />
    </div>
    <HeaderBlock className="productlist-gotocart" onClick={goToCartButtonClick}>
      <LocalMallIcon />
      Go To Cart
    </HeaderBlock>

    <BuyProductDialog
      creditDetails={userData?.credit || 0}
      handleBuy={productDailogData.addToCartClick}
      handleClose={productDailogData.onCloseButtonClick}
      open={productDailogData.show}
      product={productDailogData.product}
    />
  </div>
);
