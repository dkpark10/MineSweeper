import React, { useState } from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";

import Editor from "../molecules/editor";
import DefaultBulletinWrapper, { AlignCenterWrapper } from "../atoms/bulletin_wrapper";

import {
  Input,
  Button
} from "../../../common/atoms/index";

import {
  Header
} from "../../../common/organisms/index";

import axiosInstance from '../../../../utils/default_axios';
import { useStringInput } from "../../../custom_hooks/useinput";
import { AxiosResponse } from "axios";

const PostCreatePageWrapper = styled(DefaultBulletinWrapper)`
  position:relative;
  background-color:white;
  box-shadow: 5px 5px 16px -2px rgb(175, 175, 175);
`;

const InputWrapper = styled.div`
  border:1px solid #ccc;
  padding: 5px;

  @media screen and (${({ theme }) => theme.minTablet}){
    margin: 10px 0px;
  }
`;

const SubmitButton = styled(Button)`
  color:white;
  border-radius:8px;
  font-weight: bold;
`;

interface Props extends RouteComponentProps {
  author: string;
}

export default function PostCreatePage({
  author,
  history
}: Props) {
  const [title, setTitle] = useStringInput("");
  const [contents, setContetns] = useState<string>("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.length <= 0) {
      return;
    }

    const request = async () => {
      try {
        const { status }: AxiosResponse = await axiosInstance.post(`/api/auth/posts`, {
          author: author,
          title: title,
          contents: contents
        })

        if (status === 201) {
          history.replace("/community?page=1");
        } 
      } catch (e) {
      }
    }
    request();
  }

  return (
    <>
      <Header />
      <div>
        <PostCreatePageWrapper>
          <form onSubmit={submit}>
            <InputWrapper>
              <Input
                type={"text"}
                name={"post_title"}
                width={"100%"}
                height={"40px"}
                value={title}
                onChange={setTitle}
                placeholder={"제목을 입력하세요."}
              />
            </InputWrapper>
            <Editor
              contents={contents}
              setContents={setContetns}
            />
            <AlignCenterWrapper>
              <SubmitButton
                type="submit"
                width={"80px"}
                height={"33px"}
              >
                등록
              </SubmitButton>
            </AlignCenterWrapper>
          </form>
        </PostCreatePageWrapper>
      </div>
    </>
  )
}