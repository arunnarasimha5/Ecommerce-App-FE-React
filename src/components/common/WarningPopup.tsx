import React from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import { Button } from "./Button";

// Styled container for the dialog
const StyledDialogContainer = styled.div<{ iswarning: boolean }>`
  width: 25rem;
  height: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .warning-header,
  .warning-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .warning-header {
    height: 30%;
    font-weight: bold;
    background: linear-gradient(to right, #ff4b2b, #ff416c);
    font-size: 1.7rem;
    color: white;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }
  .warning-body {
    font-size: 1.3rem;
    color: ${(props) => (props.iswarning ? "red" : "green")};
    padding: 1rem;
  }
  .warning-closebtn {
    padding: 9px 32px;
  }
`;

type WarningPopupProps = {
  isOpen: boolean;
  messageToDisplay: string;
  isWarning: boolean;
  onClose: () => void;
};

export const WarningPopup: React.FC<WarningPopupProps> = ({
  isOpen,
  isWarning,
  messageToDisplay,
  onClose,
}) => (
  <Dialog
    open={isOpen}
    onClose={onClose}
    classes={{ paper: "dialog" }}
    disableBackdropClick
    id="Warnining-Popup"
  >
    <StyledDialogContainer iswarning={isWarning || false}>
      <div className="warning-header">
        {isWarning ? "Warning !!" : "Success !!"}
      </div>
      <div className="warning-body">{messageToDisplay}</div>
      <Button className="warning-closebtn" onClick={onClose}>
        Close
      </Button>
    </StyledDialogContainer>
  </Dialog>
);
