import React, { useEffect, useState } from "react";
import Header from '../Header';
import "react-quill/dist/quill.snow.css";
import Input from '../atoms/Inputs';
import Editor from '../organisms/Editor';
import styled from 'styled-components';
import Theme from "../../styles/Theme";
import { RouteComponentProps } from 'react-router-dom';
import axiosApi, { Response } from '../../modules/API';
import { RootState } from '../../reducers';
import { useSelector } from 'react-redux';

const CreatePostWrapper = styled.div`
  position: absolute;
  width: 84%;
  max-width: 824px;
  left:50%;
  transform: translateX(-50%);
  margin: 2.0rem 0;
  background-color:white;
  border-radius:7px;
  padding: 2.0rem;
  height: 724px;
`;

export default function CreatePost({ history }: RouteComponentProps) {

  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");

  const { isLogin, author } = useSelector((state: RootState) => ({
    isLogin: state.login.isLogin,
    author: state.login.id,
  }));

  // 비로그인시 로그인창으로
  useEffect(() => {
    if (isLogin !== true) {
      history.replace('/signin');
    }
  }, [isLogin, history]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.length <= 49){
      setTitle(e.target.value);
    }
  }

  const writeSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    if (title.length === 0)
      return;

    axiosApi.post(`http://localhost:8080/api/auth/posts`, {
      "author": author,
      "title": title,
      "contents": contents.substring(0, 2500)
    })
      .then((res: Response) => {
      })
  }

  return (
    <>
      <Header
        selected='Community'
      />
      <CreatePostWrapper>
        <form onSubmit={writeSubmit}>
          <Input
            type={'text'}
            value={title}
            width={'100%'}
            height={'2.2rem'}
            backgroundColor={'white'}
            placeHolder={'Enter a Title'}
            onChange={onChange}
          />
          <hr style={{ marginBottom: '2.0rem' }} />
          <div style={{
            height: '524px'
          }}>
            <Editor
              contents={contents}
              setContents={setContents}
            />
          </div>
          <div style={{
            textAlign: 'right',
            margin: '0.8rem 0'
          }}>
            <Input
              type={'submit'}
              value={'Write'}
              width={'4.8rem'}
              height={'1.8rem'}
              backgroundColor={Theme.mainColor}
            />
          </div>
        </form>
      </CreatePostWrapper>
    </>
  )
}