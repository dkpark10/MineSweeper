import React from "react";
import { RouteComponentProps, useLocation } from "react-router-dom";
import styled from "styled-components";

import {
  Header,
  Footer
}from "../../../common/organisms/index";

import {
  PageNation
}from "../../../common/molecules/index";

import DefaultBulletinWrapper from "../atoms/bulletin_wrapper";
import PostArticle from "../molecules/post_article";

import PostCardHeader from "../molecules/post_card_header";
import PostList from "../molecules/post_list";
import BuelltinNavi from "../molecules/post_navigator";
import useAxios from "../../../custom_hooks/useaxios";

interface PostProps {
  id: number;
  author: string;
  title: string;
  comments: number;
  likenum: number;
  time: number;
  totalItemCount: number;
}

interface MatchParams {
  postid: string;
}

interface State {
  page: string;
}

const PostPageWrapper = styled(DefaultBulletinWrapper)`
  background-color: white;
  padding:20px;
`;

export default function Post({
  match,
}: RouteComponentProps<MatchParams>) {
  const postid = match.params.postid;
  const { state: { page } } = useLocation<State>();
  const [response,] = useAxios<PostProps[]>(`/api/posts?page=${page}`, []);
  const widthRatio = ["68%", "20%", "12%"];

  return (
    <>
      <Header />
      <div>
        <PostPageWrapper>
          <PostArticle
            postid={postid}
          />
        </PostPageWrapper>
      </div>
      <div>
        <DefaultBulletinWrapper>
          <BuelltinNavi
            url={"/community"}
          />
          <PostCardHeader
            widthRatio={widthRatio}
          />
          <PostList
            postData={response}
            widthRatio={widthRatio}
            url={"/community"}
            page={page[0]}
          />
          <PageNation
            url={"/community"}
            totalItemCount={response.length === 0 ? 1 : response[0].totalItemCount}
            currentPage={Number(page)}
          />
        </DefaultBulletinWrapper>
      </div>
      <Footer />
    </>
  )
}