import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import styled from "@emotion/styled";
import ProductCard from "./ProductCard";
import {
  ProductListType,
  ProductCategoryDetails,
} from "../../types/CommonTypes";

const BoxStyled = styled(Box)`
  height: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  background-color: #f6f6f6;
  .MuiTabs-flexContainer {
    height: 100%;
    background: white;
  }
  .productlist-productcard {
    width: 100%;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
  }
`;
type VerticalTabProps = {
  tabDataArray: ProductCategoryDetails[];
  activeTab: string;
  tabOnChange: (value: string) => void;
  productList: ProductListType[];
  productOnClick: (product: ProductListType) => void;
};

export const ProductCategoryVerticalTabs: React.FC<VerticalTabProps> = ({
  activeTab,
  tabDataArray,
  tabOnChange,
  productList,
  productOnClick,
}) => (
  <BoxStyled
    sx={{
      flexGrow: 1,
      bgcolor: "background.paper",
      display: "flex",
      height: 224,
    }}
  >
    <Tabs
      orientation="vertical"
      variant="fullWidth"
      value={activeTab}
      onChange={(_e, newValue) => tabOnChange(newValue)}
      sx={{
        borderRight: 1,
        borderColor: "divider",
      }}
    >
      {tabDataArray.map((tabDetails, index) => (
        <Tab
          key={`index-${index}`}
          label={tabDetails.name}
          value={tabDetails.value}
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        />
      ))}
    </Tabs>
    <div className="productlist-productcard">
      {productList.map((eachProduct, index) => (
        <ProductCard
          key={`index-${index}`}
          product={eachProduct}
          onClick={productOnClick}
        />
      ))}
    </div>
  </BoxStyled>
);
