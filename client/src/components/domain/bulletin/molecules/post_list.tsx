import React from "react";
import PostCardItem from "../molecules/post_card_item";
import { calculPassedTime } from "../../../../utils/date_handler";

interface PostProps {
  id: number;
  author: string;
  title: string;
  comments: number;
  likenum: number;
  time: number;
  totalItemCount: number;
}

interface Props {
  postData: PostProps[];
  widthRatio: string[];
  url: string;
  page: string;
}

export default function PostList({
  postData,
  widthRatio,
  url,
  page
}: Props) {

  return (
    <ul>
      {postData.map((post, idx) =>
        <li
          className="post_item" 
          key={idx}
        >
          <PostCardItem
            widthRatio={widthRatio}
            title={post.title}
            author={post.author}
            date={calculPassedTime(post.time)}
            url={url}
            postid={post.id}
            page={page}
          />
        </li>
      )}
    </ul>
  )
}