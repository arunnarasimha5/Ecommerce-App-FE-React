import React, { useEffect, useState } from "react";
import "../../common/CommonStyles.css";
import { isFieldEmpty } from "../../common/Utils";
import { WarningMessages } from "../../common/WarningMessages";
import { TextBox } from "../../common/TextBox";
import { Button } from "../../common/Button";

export type SigninSignUpDataType = {
  signUpData: {
    userID: string;
    name: string;
    password: string;
    email: string;
    credit: string;
  };
  signInData: {
    userID: string;
    password: string;
  };
};

type SigninSignUpPageProps = {
  hanldeSignInSignUpClick: (
    typeOfAction: "SignUp" | "SignIn",
    SigninSignupPageData: SigninSignUpDataType
  ) => void;
  shiftToSignIn?: boolean;
};

export const SigninSignUpPage: React.FC<SigninSignUpPageProps> = ({
  hanldeSignInSignUpClick,
  shiftToSignIn,
}) => {
  const initialData = {
    signUpData: {
      userID: "",
      name: "",
      password: "",
      email: "",
      credit: "",
    },
    signInData: {
      userID: "",
      password: "",
    },
  };

  const initialErrorData = {
    signUpData: {
      userID: {
        isError: false,
        placeholder: "User Name (No Spaces)",
      },
      name: {
        isError: false,
        placeholder: "Name",
      },
      password: {
        isError: false,
        placeholder: "Password",
      },
      email: "",
      credit: {
        isError: false,
        placeholder: "Credit",
      },
    },
    signInData: {
      userID: {
        isError: false,
        placeholder: "User Name",
      },
      password: {
        isError: false,
        placeholder: "Password",
      },
    },
  };

  const [signinSignupPageData, setSigninSignupPageData] =
    useState<SigninSignUpDataType>(initialData);
  const [textFieldsError, setTextFeildsError] = useState(initialErrorData);

  /**
   * Function to commonly handle all the input fields and fill the respective state data
   */
  const onChangeCommonHandler = (
    typeOfAction: "SignUp" | "SignIn",
    field: string,
    value: string | number
  ) => {
    setSigninSignupPageData((prev) => {
      const updatedSignInSignUpData = { ...prev };

      switch (typeOfAction) {
        case "SignUp":
          switch (field) {
            case "userID":
            case "password":
            case "name":
            case "email":
            case "credit":
              updatedSignInSignUpData.signUpData[field] = value as string;
              break;
            default:
              break;
          }
          break;

        case "SignIn":
          switch (field) {
            case "userID":
            case "password":
              updatedSignInSignUpData.signInData[field] = value as string;
              break;
            default:
              break;
          }
          break;

        default:
          break;
      }

      return updatedSignInSignUpData;
    });
  };

  /**
   * Function to trigger on SignIn/SignUp Click to pass data to parent conmponent
   */
  const signInSignUpClickHandler = (typeOfAction: "SignUp" | "SignIn") => {
    let isError = false;
    setTextFeildsError(initialErrorData);
    const dataToValidate =
      typeOfAction === "SignUp"
        ? signinSignupPageData.signUpData
        : signinSignupPageData.signInData;
    const currentActionKey =
      typeOfAction === "SignUp" ? "signUpData" : "signInData";

    let newErrorData = { ...initialErrorData };
    let newSigninSignUpData = { ...signinSignupPageData };

    Object.entries(dataToValidate).forEach((objPair) => {
      const [key, value] = objPair;
      if (
        (key === "credit" && Number(value) === 0) ||
        (key === "userName" && /\s/.test(value)) ||
        isFieldEmpty(value)
      ) {
        isError = true;
        newSigninSignUpData = {
          ...newSigninSignUpData,
          [currentActionKey]: {
            ...newSigninSignUpData[currentActionKey],
            [key]: "",
          },
        };
        newErrorData = {
          ...newErrorData,
          [currentActionKey]: {
            ...newErrorData[currentActionKey],
            [key]: {
              isError: true,
              placeholder: WarningMessages[key],
            },
          },
        };
      }
    });
    console.log(newErrorData, "newErrorData");
    setSigninSignupPageData(newSigninSignUpData);
    setTextFeildsError(newErrorData);
    if (!isError) {
      hanldeSignInSignUpClick(typeOfAction, signinSignupPageData);
    }
  };

  const clearValuesToInitial = () => {
    setSigninSignupPageData(initialData);
    setTextFeildsError(initialErrorData);
  };

  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    const addRightPanelActive = () =>
      container?.classList.add("right-panel-active");
    const removeRightPanelActive = () =>
      container?.classList.remove("right-panel-active");

    signUpButton?.addEventListener("click", addRightPanelActive);
    signInButton?.addEventListener("click", removeRightPanelActive);

    return () => {
      signUpButton?.removeEventListener("click", addRightPanelActive);
      signInButton?.removeEventListener("click", removeRightPanelActive);
    };
  }, []);

  useEffect(() => {
    if (shiftToSignIn) {
      document.getElementById("signIn")?.click();
    }
  }, [shiftToSignIn]);

  return (
    <div className="container" id="container">
      <div className="form-container sign-up-container">
        <h1>Create Account</h1>
        <span>Enter the required details</span>
        <TextBox
          type="text"
          isRequired
          isError={textFieldsError.signUpData.userID.isError}
          placeholder={textFieldsError.signUpData.userID.placeholder}
          value={signinSignupPageData.signUpData.userID}
          onChange={(e) =>
            onChangeCommonHandler("SignUp", "userID", e.target.value)
          }
        />
        <TextBox
          isRequired
          isError={textFieldsError.signUpData.name.isError}
          placeholder={textFieldsError.signUpData.name.placeholder}
          value={signinSignupPageData.signUpData.name}
          onChange={(e) =>
            onChangeCommonHandler("SignUp", "name", e.target.value)
          }
        />
        <TextBox
          type="password"
          isError={textFieldsError.signUpData.password.isError}
          placeholder={textFieldsError.signUpData.password.placeholder}
          value={signinSignupPageData.signUpData.password}
          onChange={(e) =>
            onChangeCommonHandler("SignUp", "password", e.target.value)
          }
        />
        <TextBox
          type="email"
          placeholder="Email"
          value={signinSignupPageData.signUpData.email}
          onChange={(e) =>
            onChangeCommonHandler("SignUp", "email", e.target.value)
          }
        />
        <TextBox
          type="text"
          isError={textFieldsError.signUpData.credit.isError}
          placeholder={textFieldsError.signUpData.credit.placeholder}
          value={signinSignupPageData.signUpData.credit}
          maxLength={6}
          onChange={(e) => {
            const value = e.target.value;
            if (!isNaN(Number(value)) || value === "") {
              onChangeCommonHandler("SignUp", "credit", e.target.value);
            }
          }}
        />
        <Button onClick={() => signInSignUpClickHandler("SignUp")}>
          Sign Up
        </Button>
      </div>
      <div className="form-container sign-in-container">
        <h1 className="ecommerce-main-header">E Commerce App</h1>
        <h1>Sign in</h1>
        <span>Enter your User Name and Password</span>
        <TextBox
          type="email"
          isError={textFieldsError.signInData.userID.isError}
          placeholder={textFieldsError.signInData.userID.placeholder}
          value={signinSignupPageData.signInData.userID}
          onChange={(e) =>
            onChangeCommonHandler("SignIn", "userID", e.target.value)
          }
        />
        <TextBox
          type="password"
          isError={textFieldsError.signInData.password.isError}
          placeholder={textFieldsError.signInData.password.placeholder}
          value={signinSignupPageData.signInData.password}
          onChange={(e) =>
            onChangeCommonHandler("SignIn", "password", e.target.value)
          }
        />
        <Button onClick={() => signInSignUpClickHandler("SignIn")}>
          Sign In
        </Button>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login and start shopping !!</p>
            <Button isGhost id="signIn" onClick={clearValuesToInitial}>
              Sign In
            </Button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>New Here ?</h1>
            <p>
              Enter your personal details, Create an account and start shopping
              !!
            </p>
            <Button isGhost id="signUp" onClick={clearValuesToInitial}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
