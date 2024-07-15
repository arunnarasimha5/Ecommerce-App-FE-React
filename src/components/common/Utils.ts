import { ProductListType } from "../types/CommonTypes";

/**
 * Function to check if the field is empty or not.
 */
export const isFieldEmpty = (fieldValue: string) =>
  fieldValue.trim().length === 0;

/**
 * Function to get Blob Image URL from the base64String
 */
const getBlobImage = (base64String: string) => {
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray], { type: "image/png" });
  const url = URL.createObjectURL(blob);

  return url;
};

/**
 * Function to convert ProductListType Response Blob to image
 */
export const convertProductResponse = (
  productListResponse: ProductListType[]
) =>
  productListResponse.map((product) => ({
    ...product,
    productImage: getBlobImage(product.productImage),
  }));
