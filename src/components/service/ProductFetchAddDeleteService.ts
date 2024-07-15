import {
  AddAndDeleteToCartRequestType,
  CommonResponseType,
} from "../types/CommonTypes";
import api from "./api";

export const getProductListByCategory = async (category: string) =>
  api
    .get(`/getproductdata/${category}`)
    .then((res) => res.data as CommonResponseType);

export const doAddToCart = async (
  productDetails: AddAndDeleteToCartRequestType
) =>
  api
    .post(`/addtocart`, productDetails)
    .then((res) => res.data as CommonResponseType);

export const doDeleteFromCartService = async (
  productDetails: AddAndDeleteToCartRequestType
) =>
  api
    .post(`/deletefromcart`, productDetails)
    .then((res) => res.data as CommonResponseType);

export const doBuyCartProductsService = async () =>
  api.get(`buycartproducts`).then((res) => res.data as CommonResponseType);
