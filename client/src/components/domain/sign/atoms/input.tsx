import React from "react";
import styled from "styled-components";

interface Props {
  type: string;
  value: string;
}

const Input = styled("input").attrs(({ type, value }: Props) => ({
  style: {
    type,
    value
  }
})) <Props>`
  font-family: "Noto Sans KR", sans-serif;
  width: 95%;
  height:38px;
  border:none;
  outline:none;
  margin: 0.75rem 0px;
  font-size: 0.85rem;
  border-radius: 8px;
  padding: .8em .9em;
  color: ${({ type }) => type === "submit" ? "white" : "black"};

  ${({type, theme}) => {
    if (type === "submit"){
      return `background-color: ${theme.mainColor}`
    }else{
      return `background-image : linear-gradient(to bottom, #EEEEEE,#EFEFEF)`
    } 
  }};

  &:hover{
    background-image: ${({ type }) => {
      if(type === "submit"){
        return type === "submit" ? 
        `linear-gradient(70deg,#1033e3, #f74bf7);
         cursor:pointer` : "";
      }
    }};
  }
`;

export default Input;