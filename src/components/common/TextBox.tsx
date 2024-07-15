import React from "react";
import styled from "styled-components";

type TexBoxProps = {
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  isError?: boolean;
  type?: React.HTMLInputTypeAttribute;
  isRequired?: boolean;
  maxLength?: number;
};

const TextBoxContainer = styled.input<{ iserror: boolean }>`
  background: ${(props) => (props.iserror ? "#FF7276" : "#eee")};
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;

}
`;

export const TextBox: React.FC<TexBoxProps> = ({
  onChange,
  placeholder,
  value,
  isError,
  type,
  isRequired,
  maxLength,
}) => (
  <TextBoxContainer
    iserror={isError || false}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={isRequired}
    maxLength={maxLength}
  />
);
