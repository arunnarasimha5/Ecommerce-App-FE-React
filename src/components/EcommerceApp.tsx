import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  doLogOutService,
  doSignInService,
  doSignUpService,
} from "./service/LoginSignUpService";
import { WarningPopup } from "./common/WarningPopup";
import {
  SigninSignUpDataType,
  SigninSignUpPage,
} from "./screens/loginSignUpSection/LoginSignUpPage";
import { ProductListPage } from "./screens/productListSection/ProductList";
import { UserDataListEditPage } from "./screens/userDataListEditSection/UserDataListEdit";
import { CartBuyPage } from "./screens/cartBuySection/CartPage";
import {
  AddAndDeleteToCartRequestType,
  ProductListType,
  UserDetailsType,
  UserDetailsUpdateRequest,
} from "./types/CommonTypes";
import {
  doAddToCart,
  doBuyCartProductsService,
  doDeleteFromCartService,
  getProductListByCategory,
} from "./service/ProductFetchAddDeleteService";
import { convertProductResponse } from "./common/Utils";
import {
  doUpdateUserDataService,
  getCurrentUserDataService,
} from "./service/UserDetailsService";

const EcommerceAppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

type ProductTabDataType = {
  selectedTab: string;
  productList: ProductListType[];
};

export const EcommerceApp: React.FC = () => {
  const warningInitialData = {
    showPopup: false,
    isWarning: false,
    messageToDisplay: "",
  };

  const navigate = useNavigate();

  const [screenShiftFlag, setScreenShiftFlag] = useState({
    shiftToSignIn: false,
    shiftToUserView: false,
  });
  const [showWarning, setShowWarning] = useState(warningInitialData);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserData, setCurrentUserData] = useState<UserDetailsType>();
  const [productTabData, setProductTabData] = useState<ProductTabDataType>();
  const [selectedProduct, setSelectedProduct] = useState<ProductListType>();
  const [showProductDailog, setShowProductDailog] = useState(false);

  const doSignUp = async (data: SigninSignUpDataType) => {
    const { signUpData } = data;
    await doSignUpService({
      ...signUpData,
      credit: Number(signUpData.credit),
    })
      .then((responseObj) => {
        const { message, status } = responseObj;
        if (status === 200) {
          setShowWarning({
            showPopup: true,
            isWarning: false,
            messageToDisplay: message,
          });
          setScreenShiftFlag({ shiftToUserView: false, shiftToSignIn: true });
        } else {
          setShowWarning({
            showPopup: true,
            isWarning: true,
            messageToDisplay: message,
          });
        }
      })
      .catch((error) => {
        setShowWarning({
          showPopup: true,
          isWarning: true,
          messageToDisplay: error?.response?.data?.message || "",
        });
      });
  };

  const getSelectedTabProductList = async (category: string) => {
    await getProductListByCategory(category)
      .then((response) => {
        const { body, message, status } = response;
        if (status === 200) {
          setProductTabData({
            productList: convertProductResponse(body as ProductListType[]),
            selectedTab: category,
          });
          navigate("/productpage");
        } else {
          setShowWarning({
            showPopup: true,
            isWarning: true,
            messageToDisplay: message,
          });
        }
      })
      .catch((error) => {
        setShowWarning({
          showPopup: true,
          isWarning: true,
          messageToDisplay: error?.response?.data?.message || "",
        });
      });
  };

  const doSignIn = async (data: SigninSignUpDataType) => {
    const { signInData } = data;
    await doSignInService(signInData)
      .then((responseObj) => {
        const { message, status, body } = responseObj;
        if (status === 200) {
          const responseData = body as UserDetailsType;
          setCurrentUserData(responseData);
          const categoryToFetch =
            responseData.productCategoryDetails?.at(0)?.value;
          if (categoryToFetch) {
            getSelectedTabProductList(categoryToFetch);
            setIsAuthenticated(true);
          } else {
            setShowWarning({
              showPopup: true,
              isWarning: true,
              messageToDisplay: "Product Fetch Failed, Please Login Again!",
            });
          }
        } else {
          setShowWarning({
            showPopup: true,
            isWarning: true,
            messageToDisplay: message,
          });
        }
      })
      .catch((error) => {
        setShowWarning({
          showPopup: true,
          isWarning: true,
          messageToDisplay: error?.response?.data?.message || "",
        });
      });
  };

  /**
   * Function to handle the Sign In/Sign Up Button Click.
   */
  const handleSignInSignUp = async (
    actionType: "SignUp" | "SignIn",
    data: SigninSignUpDataType
  ) => {
    if (actionType === "SignUp") {
      await doSignUp(data);
    } else {
      await doSignIn(data);
    }
  };

  const addToCartHandler = async (
    addToCartRequest: AddAndDeleteToCartRequestType
  ) => {
    await doAddToCart(addToCartRequest)
      .then((response) => {
        const { body, message, status } = response;
        if (status === 200) {
          const updatedUserData = body as UserDetailsType;
          setCurrentUserData((prev) => ({
            ...updatedUserData,
            productCategoryDetails: prev?.productCategoryDetails,
          }));
          setShowProductDailog(false);
          setShowWarning({
            showPopup: true,
            isWarning: false,
            messageToDisplay: message,
          });
        } else {
          setShowWarning({
            showPopup: true,
            isWarning: true,
            messageToDisplay: message,
          });
        }
      })
      .catch((error) => {
        setShowWarning({
          showPopup: true,
          isWarning: true,
          messageToDisplay: error?.response?.data?.message || "",
        });
      });
  };

  const productCardClickHandler = (value: ProductListType) => {
    setSelectedProduct(value);
    setShowProductDailog(true);
  };

  const accountDetailsClickHandler = async () => {
    await getCurrentUserDataService()
      .then((responseObj) => {
        const { body, message, status } = responseObj;
        if (status === 200) {
          const updatedUserData = body as UserDetailsType;
          setCurrentUserData((prev) => ({
            ...updatedUserData,
            productCategoryDetails: prev?.productCategoryDetails,
          }));
          navigate("/userdetailspage");
        } else {
          setShowWarning({
            showPopup: true,
            isWarning: true,
            messageToDisplay: message,
          });
        }
      })
      .catch((error) => {
        setShowWarning({
          showPopup: true,
          isWarning: true,
          messageToDisplay: error?.response?.data?.message || "",
        });
      });
  };

  const logoutClickHanlder = async () => {
    await doLogOutService()
      .then((responseObj) => {
        const { message, status } = responseObj;
        if (status === 200) {
          setIsAuthenticated(false);
          setCurrentUserData(undefined);
          setProductTabData(undefined);
          setSelectedProduct(undefined);
          setScreenShiftFlag({ shiftToSignIn: false, shiftToUserView: false });
          navigate("/");
        } else {
          setShowWarning({
            showPopup: true,
            isWarning: true,
            messageToDisplay: message,
          });
        }
      })
      .catch((error) => {
        setShowWarning({
          showPopup: true,
          isWarning: true,
          messageToDisplay: error?.response?.data?.message || "",
        });
      });
  };

  const goToCartButtonClick = () => navigate("/cartbuypage");

  const handleUserUpdateClick = async (
    UserDetailsUpdatedData: UserDetailsUpdateRequest
  ) => {
    await doUpdateUserDataService(UserDetailsUpdatedData)
      .then((responseObj) => {
        const { body, message, status } = responseObj;
        if (status === 200) {
          const updatedUserData = body as UserDetailsType;
          setCurrentUserData((prev) => ({
            ...updatedUserData,
            productCategoryDetails: prev?.productCategoryDetails,
          }));
          setShowWarning({
            showPopup: true,
            isWarning: false,
            messageToDisplay: message,
          });
          setScreenShiftFlag({ shiftToSignIn: false, shiftToUserView: true });
        } else {
          setShowWarning({
            showPopup: true,
            isWarning: true,
            messageToDisplay: message,
          });
        }
      })
      .catch((error) => {
        setShowWarning({
          showPopup: true,
          isWarning: true,
          messageToDisplay: error?.response?.data?.message || "",
        });
      });
  };

  const buyButtonClickHandler = async () => {
    await doBuyCartProductsService()
      .then((responseObj) => {
        const { body, message, status } = responseObj;
        if (status === 200) {
          const updatedUserData = body as UserDetailsType;
          setCurrentUserData((prev) => ({
            ...updatedUserData,
            productCategoryDetails: prev?.productCategoryDetails,
          }));
          setShowWarning({
            showPopup: true,
            isWarning: false,
            messageToDisplay: message,
          });
          if (productTabData?.selectedTab) {
            getSelectedTabProductList(productTabData?.selectedTab);
          }
        } else {
          setShowWarning({
            showPopup: true,
            isWarning: true,
            messageToDisplay: message,
          });
        }
      })
      .catch((error) => {
        setShowWarning({
          showPopup: true,
          isWarning: true,
          messageToDisplay: error?.response?.data?.message || "",
        });
      });
  };

  const removeCartItemHandler = async (
    removeProductDetails: AddAndDeleteToCartRequestType
  ) => {
    await doDeleteFromCartService(removeProductDetails)
      .then((responseObj) => {
        const { body, message, status } = responseObj;
        if (status === 200) {
          const updatedUserData = body as UserDetailsType;
          setCurrentUserData((prev) => ({
            ...updatedUserData,
            productCategoryDetails: prev?.productCategoryDetails,
          }));
          setShowWarning({
            showPopup: true,
            isWarning: false,
            messageToDisplay: message,
          });
        } else {
          setShowWarning({
            showPopup: true,
            isWarning: true,
            messageToDisplay: message,
          });
        }
      })
      .catch((error) => {
        setShowWarning({
          showPopup: true,
          isWarning: true,
          messageToDisplay: error?.response?.data?.message || "",
        });
      });
  };

  const RequireAuth = ({ children }: { children: JSX.Element }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <>
      <EcommerceAppContainer>
        <Routes>
          <Route
            path="/"
            element={
              <SigninSignUpPage
                hanldeSignInSignUpClick={handleSignInSignUp}
                shiftToSignIn={screenShiftFlag.shiftToSignIn}
              />
            }
          />
          <Route
            path="/productpage"
            element={
              <RequireAuth>
                <ProductListPage
                  userData={currentUserData}
                  productTabData={productTabData}
                  productDailogData={{
                    product: selectedProduct,
                    show: showProductDailog,
                    addToCartClick: addToCartHandler,
                    onCloseButtonClick: () => {
                      setShowProductDailog(false);
                    },
                  }}
                  productCardClick={productCardClickHandler}
                  tabOnChange={getSelectedTabProductList}
                  accountDetailsClick={accountDetailsClickHandler}
                  logoutButtonClick={logoutClickHanlder}
                  goToCartButtonClick={goToCartButtonClick}
                />
              </RequireAuth>
            }
          />
          <Route
            path="/userdetailspage"
            element={
              <RequireAuth>
                <UserDataListEditPage
                  userData={currentUserData}
                  handleUserUpdateClick={handleUserUpdateClick}
                  backToProductPageClick={() => {
                    if (productTabData?.selectedTab) {
                      getSelectedTabProductList(productTabData?.selectedTab);
                    }
                  }}
                  shiftToUserView={screenShiftFlag.shiftToUserView}
                />
              </RequireAuth>
            }
          />
          <Route
            path="/cartbuypage"
            element={
              <RequireAuth>
                <CartBuyPage
                  userName={currentUserData?.name || ""}
                  cartDetails={currentUserData?.cartDetails || []}
                  accountDetailsClick={accountDetailsClickHandler}
                  logoutClick={logoutClickHanlder}
                  buyButtonClick={buyButtonClickHandler}
                  removeCartItem={removeCartItemHandler}
                  backToProductListNav={() => {
                    if (productTabData?.selectedTab) {
                      getSelectedTabProductList(productTabData?.selectedTab);
                    }
                  }}
                  creditDetails={currentUserData?.credit || 0}
                />
              </RequireAuth>
            }
          />
        </Routes>
        <WarningPopup
          isOpen={showWarning.showPopup}
          isWarning={showWarning.isWarning}
          messageToDisplay={showWarning.messageToDisplay}
          onClose={() =>
            setShowWarning((prev) => ({
              ...prev,
              showPopup: false,
              messageToDisplay: "",
            }))
          }
        />
      </EcommerceAppContainer>
    </>
  );
};
