import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import Editor from "../molecules/editor";
import {
  PostControllerWrapper,
  AlignCenterWrapper,
  InputWrapper
} from '../atoms/bulletin_wrapper';

import SubmitButton from '../atoms/submit_button';

import {
  Input,
} from '../../../common/atoms/index';

import {
  Header
} from "../../../common/organisms/index";

import axiosInstance from '../../../../utils/default_axios';
import { useStringInput } from "../../../custom_hooks/useinput";
import { AxiosResponse } from "axios";
import { PostProps } from 'bulletin-type';

interface Props extends RouteComponentProps<{ postid: string }> {
  postInfo: PostProps;
}

export default function PostCreatePage({
  match,
  postInfo,
  history
}: Props) {
  const postid = match.params.postid;
  const [title, setTitle] = useStringInput(postInfo.title);
  const [contents, setContetns] = useState<string>(postInfo.content);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.length <= 0) {
      return;
    }
    const request = async () => {
      try {
        const { status }: AxiosResponse = await axiosInstance.patch(`/api/auth/posts`, {
          postid,
          title: title,
          contents: contents
        })

        if (status === 201) {
          ;
        }
      } catch (e) {
      } finally {
        history.replace("/community?page=1");
      }
    }
    request();
  }

  return (
    <>
      <Header />
      <div>
        <PostControllerWrapper>
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
                수정
              </SubmitButton>
            </AlignCenterWrapper>
          </form>
        </PostControllerWrapper>
      </div>
    </>
  )
}