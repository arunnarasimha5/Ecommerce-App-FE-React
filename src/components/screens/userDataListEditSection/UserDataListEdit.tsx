import React, { useEffect, useRef, useState } from "react";
import "../../common/CommonStyles.css";
import { isFieldEmpty } from "../../common/Utils";
import { WarningMessages } from "../../common/WarningMessages";
import { TextBox } from "../../common/TextBox";
import { Button } from "../../common/Button";
import { Tooltip } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styled from "@emotion/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  UserDetailsType,
  UserDetailsUpdateRequest,
} from "../../types/CommonTypes";

type UserDataListEditPageProps = {
  userData?: UserDetailsType;
  handleUserUpdateClick: (
    UserDetailsUpdatedData: UserDetailsUpdateRequest
  ) => void;
  backToProductPageClick: () => void;
  shiftToUserView: boolean;
};

const EditFieldContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 30% 70%;
  align-items: center;
  justify-items: start;
  span {
    font-size: 0.9rem;
  }
`;

const ButtonsConatiner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  .updatedetails-button {
    margin: auto 0;
  }
`;

const ProductListNavButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: absolute;
  right: 2.3rem;
  bottom: 0.8rem;
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

interface UserDetailsShowProps {
  detail?: string | number;
}

const UserDetailsShow: React.FC<UserDetailsShowProps> = ({ detail }) => {
  const userRef = useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (userRef.current) {
      setIsOverflowing(
        userRef.current.scrollWidth > userRef.current.clientWidth
      );
    }
  }, [detail]);

  return (
    <>
      {isOverflowing ? (
        <Tooltip title={detail?.toString()} placement="right">
          <span className="user-data" ref={userRef}>
            {detail}
          </span>
        </Tooltip>
      ) : (
        <span className="user-data" ref={userRef}>
          {detail}
        </span>
      )}
    </>
  );
};

export const UserDataListEditPage: React.FC<UserDataListEditPageProps> = ({
  handleUserUpdateClick,
  backToProductPageClick,
  userData,
  shiftToUserView,
}) => {
  const initialData = {
    name: userData?.name || "",
    oldPassword: "",
    newPassword: "",
    email: userData?.email || "",
    credit: userData?.credit || 0,
  };

  const initialErrorData = {
    name: {
      isError: false,
      placeholder: "Name",
    },
    oldPassword: {
      isError: false,
      placeholder: "Old Password",
    },
    newPassword: {
      isError: false,
      placeholder: "New Password",
    },
    email: "Email",
    credit: {
      isError: false,
      placeholder: "Credit",
    },
  };
  const [updateUserDetailsData, setUpdateUserDetailsData] =
    useState<UserDetailsUpdateRequest>(initialData);
  const [textFieldsError, setTextFeildsError] = useState(initialErrorData);

  /**
   * Function to commonly handle all the input fields and fill the respective state data
   */
  const onChangeCommonHandler = (field: string, value: string | number) => {
    setUpdateUserDetailsData((prev) => {
      const updatedUserDetails = { ...prev };

      switch (field) {
        case "oldPassword":
        case "newPassword":
        case "name":
        case "email":
          updatedUserDetails[field] = value as string;
          break;
        case "credit":
          updatedUserDetails[field] = value as number;
          break;
        default:
          break;
      }

      return updatedUserDetails;
    });
  };

  /**
   * Function to trigger on SignIn/SignUp Click to pass data to parent conmponent
   */
  const signInSignUpClickHandler = () => {
    let isError = false;
    setTextFeildsError(initialErrorData);

    let newErrorData = { ...initialErrorData };
    let newUserDetailsDataData = { ...updateUserDetailsData };

    Object.entries(updateUserDetailsData).forEach((objPair) => {
      const [key, value] = objPair;
      if (
        key === "credit" ? Number(value) === 0 : isFieldEmpty(value as string)
      ) {
        isError = true;
        newUserDetailsDataData = {
          ...newUserDetailsDataData,
          [key]: "",
        };
        newErrorData = {
          ...newErrorData,
          [key]: {
            isError: true,
            placeholder: WarningMessages[key],
          },
        };
      }
    });
    setUpdateUserDetailsData(newUserDetailsDataData);
    setTextFeildsError(newErrorData);
    if (!isError) {
      handleUserUpdateClick(updateUserDetailsData);
    }
  };

  const clearValuesToInitial = () => {
    setUpdateUserDetailsData(initialData);
    setTextFeildsError(initialErrorData);
  };

  useEffect(() => {
    const updateButton = document.getElementById("detailsUpdate");
    const viewButton = document.getElementById("detailsView");
    const container = document.getElementById("container");

    const addRightPanelActive = () =>
      container?.classList.add("right-panel-active");
    const removeRightPanelActive = () =>
      container?.classList.remove("right-panel-active");

    updateButton?.addEventListener("click", addRightPanelActive);
    viewButton?.addEventListener("click", removeRightPanelActive);

    return () => {
      updateButton?.removeEventListener("click", addRightPanelActive);
      viewButton?.removeEventListener("click", removeRightPanelActive);
    };
  }, []);

  useEffect(() => {
    if (shiftToUserView) {
      document.getElementById("detailsView")?.click();
    }
  }, [shiftToUserView]);

  return (
    <>
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <h1>Update Details</h1>
          <span>User Name/ID can't be changed </span>
          <EditFieldContainer>
            <span>Name</span>
            <TextBox
              type="text"
              isRequired
              isError={textFieldsError.name.isError}
              placeholder={textFieldsError.name.placeholder}
              value={updateUserDetailsData.name}
              onChange={(e) => onChangeCommonHandler("name", e.target.value)}
            />
          </EditFieldContainer>
          <EditFieldContainer>
            <span>Old Password</span>
            <TextBox
              type="password"
              isRequired
              isError={textFieldsError.oldPassword.isError}
              placeholder={textFieldsError.oldPassword.placeholder}
              value={updateUserDetailsData.oldPassword}
              onChange={(e) =>
                onChangeCommonHandler("oldPassword", e.target.value)
              }
            />
          </EditFieldContainer>
          <EditFieldContainer>
            <span>New Password</span>
            <TextBox
              type="password"
              isRequired
              isError={textFieldsError.newPassword.isError}
              placeholder={textFieldsError.newPassword.placeholder}
              value={updateUserDetailsData.newPassword}
              onChange={(e) =>
                onChangeCommonHandler("newPassword", e.target.value)
              }
            />
          </EditFieldContainer>
          <EditFieldContainer>
            <span>Email</span>
            <TextBox
              type="email"
              placeholder="Email"
              value={updateUserDetailsData.email}
              onChange={(e) => onChangeCommonHandler("email", e.target.value)}
            />
          </EditFieldContainer>
          <EditFieldContainer>
            <span>Credit</span>
            <TextBox
              type="text"
              isError={textFieldsError.credit.isError}
              placeholder={textFieldsError.credit.placeholder}
              value={updateUserDetailsData.credit}
              maxLength={6}
              onChange={(e) => {
                const value = e.target.value;
                if (!isNaN(Number(value)) || value === "") {
                  onChangeCommonHandler("credit", e.target.value);
                }
              }}
            />
          </EditFieldContainer>
          <ButtonsConatiner>
            <Button onClick={() => clearValuesToInitial()}>Clear</Button>
            <Button
              className="updatedetails-button"
              onClick={() => signInSignUpClickHandler()}
            >
              Update
            </Button>
          </ButtonsConatiner>
        </div>
        <div className="form-container sign-in-container">
          <h2 className="ecommerce-main-header icon-label-components">
            <ShoppingCartIcon />E Commerce App
          </h2>
          <h3 className="icon-label-components">
            <AccountCircleIcon /> User Details
          </h3>
          <div className="userdetails-section">
            <div className="userdetails-row">
              <span>User Name/ID</span>:
              <UserDetailsShow detail={userData?.userID} />
            </div>
            <div className="userdetails-row">
              <span>Name</span>: <UserDetailsShow detail={userData?.name} />
            </div>
            <div className="userdetails-row">
              <span>Email</span>:
              <UserDetailsShow detail={userData?.email} />
            </div>
            <div className="userdetails-row">
              <span>Credit</span>:
              <UserDetailsShow detail={`₹${userData?.credit}`} />
            </div>
          </div>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Need Recheck ?</h1>
              <p>Go back to User Details</p>
              <Button isGhost id="detailsView" onClick={clearValuesToInitial}>
                Go To User Details
              </Button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Need Changes ?</h1>
              <p>Click below for update your details.</p>
              <Button isGhost id="detailsUpdate" onClick={clearValuesToInitial}>
                Update Details
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ProductListNavButton onClick={backToProductPageClick}>
        <ArrowBackIcon />
        Back to Product Page
      </ProductListNavButton>
    </>
  );
};
