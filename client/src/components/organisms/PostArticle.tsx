import React, { useState } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { useEffect } from 'react';
import axiosApi, { Response } from '../../modules/API';
import { HeaderText } from '../atoms/Text';
import TextWrapper from '../molecules/TextWrapper';
import { calculTimeAgo } from '../../modules/DateHandler';
import PostController from '../molecules/PostController';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';

export interface IPost {
  id: number;
  author: string;
  title: string;
  content: string;
  comments: number;
  likenum: number;
  time: number;
  views: number;
}

interface MatchParams {
  postid: string;
}

const PostArticleWrapper = styled.div`
  width:100%;
  min-height: 760px;
  background-color:white;
  border-radius:7px;
  padding: 0.7rem 2.0rem;
  word-break:break-all;
`;

export default function PostArticle({ match, history }: RouteComponentProps<MatchParams>) {

  const postid = match.params.postid;
  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const [post, setPost] = useState<IPost>({
    id: -1,
    author: '',
    title: '',
    content: '',
    comments: -1,
    likenum: -1,
    time: 0,
    views: 0
  });

  const { loginedUser } = useSelector((state: RootState) => ({
    loginedUser: state.login.id
  }));

  useEffect(() => {

    axiosApi.patch(`http://localhost:8080/api/posts/${postid}?column=views`)
      .catch(e => { });

    axiosApi.get(`http://localhost:8080/api/posts/${postid}`)
      .then((response: Response) => {
        setPost(prev => ({
          ...response.data
        }));
        return response.data.author;
      })
      .then((author: string) => {
        setIsAuthor(author === loginedUser);
      })
      .catch(e => history.goBack());
  }, [postid, history, loginedUser]);

  return (
    <>
      <PostArticleWrapper>
        <HeaderText
          size={'2.2rem'}
          value={post.title}
          isColor={false}
        />
        <TextWrapper
          width={'100%'}
          fontSize={'0.9rem'}
          value={`Posted by ${post.author}`}
        />
        <TextWrapper
          width={'50%'}
          fontSize={'0.9rem'}
          value={`${calculTimeAgo(post.time)}`}
        />
        <TextWrapper
          width={'50%'}
          fontSize={'0.9rem'}
          value={`views: ${String(post.views)}`}
          textAlign={'right'}
        />
        <hr style={{ width: '100%', margin: '0.8rem 0' }} />
        <div style={{ margin: '1.5rem 0', height: '30.0rem' }}>
          {parse(post.content)}
        </div>
        <hr style={{ width: '100%', margin: '0.8rem 0' }} />
        <TextWrapper
          width={'20%'}
          textAlign={'left'}
        >
          <PostController 
            isAuthor={isAuthor}
            postid={post.id}
          />
        </TextWrapper>
      </PostArticleWrapper>
    </>
  )
}