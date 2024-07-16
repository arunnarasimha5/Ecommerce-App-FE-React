import styled from "@emotion/styled";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

type CommonAppHeaderProps = {
  greetingText: string;
  userName: string;
  accountDetailsClick: () => void;
  logoutClick: () => void;
};

const CommonHeaderContainer = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  font-size: 1.7rem;
  color: white;
  svg {
    margin-right: 0.3rem;
  }
  .heading-left {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    svg {
      font-size: 2rem;
    }
    .app-heading {
      font-size: 2rem;
      font-weight: bold;
      display: flex;
      align-items: center;
    }
    .user-welcome {
      font-size: 1.2rem;
      margin: 0.5rem 0.3rem 0.2rem 2.5rem;
    }
  }
  .heading-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    font-size: 1.2rem;
    svg {
      font-size: 1.5rem;
    }
    .heading-logout {
      font-size: 1rem;
      font-weight: bold;
    }
  }
`;

export const HeaderBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: transform 0.3s ease;
  font-weight: bold;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  text-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

export const CommonAppHeader: React.FC<CommonAppHeaderProps> = ({
  accountDetailsClick,
  greetingText,
  logoutClick,
  userName,
}) => (
  <CommonHeaderContainer>
    <div className="heading-left">
      <label className="app-heading">
        <ShoppingCartIcon />E Commerce App
      </label>
      <label className="user-welcome">{greetingText}</label>
    </div>
    <div className="heading-right">
      <HeaderBlock
        className="heading-accountdetails"
        onClick={accountDetailsClick}
      >
        <AccountCircleIcon />
        {userName}
      </HeaderBlock>
      <HeaderBlock className="heading-logout" onClick={logoutClick}>
        <LogoutIcon />
        LOGOUT
      </HeaderBlock>
    </div>
  </CommonHeaderContainer>
);
