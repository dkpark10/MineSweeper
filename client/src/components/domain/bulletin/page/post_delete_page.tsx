import React from 'react';
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import axiosInstance from '../../../../utils/default_axios';

import {
  CenterWrapper,
  Input
}from "../../../common/atoms/index";

interface MatchParams {
  postid: string;
}

const DeletePostPageWrapper = styled(CenterWrapper)`
  background-color:white;
  box-shadow: 5px 5px 16px -2px rgb(175, 175, 175);
  border-radius:8px;
  padding:20px;
  width: 342px;
`

const TextWrapper = styled.div`
  display:flex;
  justify-content: space-around;
  padding:14px;
`;

const InputButton = styled(Input)`
  cursor:pointer;
  border-radius: 8px;
  background-color: ${({ theme, type }) =>
    type === "submit" ? theme.grayMainColor : theme.grayBackGround
  };

  color: ${({ type }) =>
    type === "submit" ? "white" : ""
  };

  &:hover{
    background-image: ${({ type }) => {
    return type === "submit" ?
      `linear-gradient(70deg,#1033e3, #f74bf7);` : "";
  }};
  }
`;

export default function PostDeletePage({
  match,
  history
}: RouteComponentProps<MatchParams>) {
  const postid = match.params.postid;

  const submintHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { status } = await axiosInstance.delete(`/api/auth/posts/${postid}`);
      if (status === 200) {
        history.replace('/community?page=1');
      }
    }
    catch (error) {
    }
  }

  const cancle = () => {
    history.goBack();
  }

  const width = "84px";
  const height = "29px;"
  
  return (
    <DeletePostPageWrapper>
      <form onSubmit={submintHandler}>
        <TextWrapper>
          이 게시글을 삭제하시겠습니까?
        </TextWrapper>
        <TextWrapper>
          <InputButton
            width={width}
            height={height}
            type="submit"
            value="삭제"
          />
          <InputButton
            onClick={cancle}
            width={width}
            height={height}
            type="button"
            value="취소"
          />
        </TextWrapper>
      </form>
    </DeletePostPageWrapper>
  )
}