import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.button<{ isghost: boolean }>`
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: ${(props) => (props.isghost ? "transparent" : "#ff4b2b")};
  ${(props) => props.isghost && "  border-color: #ffffff;"}
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 0.8rem 1.4rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 0.3s ease;
  margin: 0.5rem auto;
  &:hover {
    transform: scale(1.05);
  }
`;

type ButtonProps = {
  children: JSX.Element | string;
  isGhost?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  children,
  isGhost,
  ...props
}) => (
  <ButtonContainer isghost={isGhost || false} {...props}>
    {children}
  </ButtonContainer>
);
