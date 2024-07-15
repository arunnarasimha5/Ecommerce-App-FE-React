export type LoginRequestType = {
  userID: string;
  password: string;
};

export type SignUpRequestType = {
  userID: string;
  name: string;
  password: string;
  email: string;
  credit: number;
};

export type AddAndDeleteToCartRequestType = {
  productId: string;
  color: string;
  price: number;
  quantity: number;
};

export type CartDetailsType = {
  id?: number;
  productId: string;
  productName: string;
  color: string;
  price: number;
  quantity: number;
};

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

export type ProductCategoryDetails = {
  name: string;
  value: string;
};

export type UserDetailsType = {
  userID: string;
  name: string;
  email: string;
  credit: number;
  cartDetails: CartDetailsType[];
  productCategoryDetails?: ProductCategoryDetails[];
};

export type UserDetailsUpdateRequest = {
  name: string;
  oldPassword: string;
  newPassword: string;
  email: string;
  credit: number;
};

export type CommonResponseType = {
  status: number;
  message: string;
  body: Object;
};
