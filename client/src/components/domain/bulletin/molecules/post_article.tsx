import React from "react";
import { Link } from "react-router-dom";
import parse from 'html-react-parser';
import styled from "styled-components";
import useAxios from "../../../custom_hooks/useaxios";

import {
  Loading,
  Title,
  Content,
  UnderLine
} from "../../../common/atoms/index";

import { calculPassedTime } from "../../../../utils/date_handler";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reducers/index";

interface Props {
  postid: string;
}

const PostArticleWrapper = styled.article`
  width:100%;
  padding:8px;
`;

const PostTitleInfo = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
`;

const PostContentWrapper = styled.div`
  width:100%;
  margin:30px 0px;
`;

interface PostProps {
  id: string;
  author: string;
  content: string;
  title: string;
  views: number;
  time: number;
}

export default function PostArticle({
  postid
}: Props) {
  const [response, loading] = useAxios<PostProps>(`api/posts/${postid}`);
  const loginedUser = useSelector((state: RootState) => state.login.id);

  if (loading) {
    return <Loading />;
  }

  return (
    <PostArticleWrapper>
      <Title
        fontSize={"1.26rem"}
        fontBold={true}
      >
        {response.title}
      </Title>
      <UnderLine />
      <PostTitleInfo>
        <Content
          fontSize={"0.72rem"}
        >
          작성날짜: {calculPassedTime(response.time)}
        </Content>
        <Content
          fontSize={"0.72rem"}
        >
          작성자: {response.author}
        </Content>
      </PostTitleInfo>
      <PostContentWrapper>
        <Content>
          {parse(response.content)}
        </Content>
      </PostContentWrapper>
      <UnderLine />
      {loginedUser === response.author &&
        <Link to={{
          pathname: `/community/delete/${postid}`,
          state: {
            postid: response.id,
            author: response.author
          }
        }}>
          <Content
            fontSize={"0.86rem"}
          >
            삭제
          </Content>
        </Link>
      }
    </PostArticleWrapper>
  )
}