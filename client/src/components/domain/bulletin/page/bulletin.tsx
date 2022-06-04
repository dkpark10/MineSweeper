import React from "react";
import { RouteComponentProps } from "react-router-dom";
import queryString from 'query-string';

import {
  Loading
} from "../../../common/atoms/index";

import {
  Header,
  Footer
} from "../../../common/organisms/index";

import {
  PageNation
} from "../../../common/molecules/index";


import DefaultBulletinWrapper from "../atoms/bulletin_wrapper";
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

export default function Bulletion({
  location,
  match
}: RouteComponentProps) {
  const { page } = queryString.parse(location.search);
  const [response, loading] = useAxios<PostProps[]>(`/api/posts?page=${page}`, []);
  const widthRatio = ["68%", "20%", "12%"];

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <div>
        <DefaultBulletinWrapper>
          <BuelltinNavi
            url={location.pathname}
          />
          <PostCardHeader
            widthRatio={widthRatio}
          />
          <PostList
            postData={response}
            widthRatio={widthRatio}
            url={match.url}
            page={page[0]}
          />
          <PageNation
            url={location.pathname}
            totalItemCount={response.length === 0 ? 1 : response[0].totalItemCount}
            currentPage={Number(page)}
          />
        </DefaultBulletinWrapper>
      </div>
      <Footer />
    </>
  )
}
