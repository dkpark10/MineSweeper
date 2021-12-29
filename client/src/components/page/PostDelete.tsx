import React, { useEffect, useState } from 'react';
import Header from '../Header';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';
import axiosApi, { Response } from '../../modules/API';
import { RootState } from '../../reducers';
import { useSelector } from 'react-redux';
import TextWrapper from '../molecules/TextWrapper';
import { Button } from '../atoms/Buttons';

const PostWrapper = styled.div`
  padding:20px;
  top: 50%;
  left: 50%;
  border-radius:5px;
  transform: translate(-50%, -50%);
  position: absolute;
  max-width: 500px;
  background-color:white;
`;

const ButtonWrapper = styled.div`
  display:flex;
  justify-content:center;
  margin: 1.0rem 0;
`;

interface ISubmitButton {
  background: boolean;
  value: string;
}

const SubmitButton = styled.input.attrs(({ value }: ISubmitButton) => ({
  type: "submit",
  value: value
})) <ISubmitButton>`

  background-color: ${({ theme, background }) => {
    return background === true ? theme.mainColor : 'white'
  }};

  color: ${({ theme, background }) => {
    return background === true ? 'white' : theme.mainColor;
  }};

  display: inline;
  cursor:pointer;
  box-shadow: 5px 5px 16px -2px rgb(175, 175, 175);
  width:35%;
  height:33px;
  border-radius: 7px;
  font-family: 'Roboto', sans-serif;
  border: 2px solid ${({ theme }) => theme.mainColor};
  margin: 0.4rem 0.6rem;
`;

interface MatchParams {
  postid: string;
}

export default function PostDelete({ history, location }: RouteComponentProps<MatchParams>) {

  const { postid } = queryString.parse(location.search);
  const { isLogin, userid } = useSelector((state: RootState) => ({
    isLogin: state.login.isLogin,
    userid: state.login.id
  }));

  const [realAuthor, setRealAuthor] = useState<boolean>(false);

  useEffect(() => {
    if (isLogin !== true) {
      history.replace('/signin');
    }

    axiosApi.get(`http://localhost:8080/api/posts/${postid}`)
      .then((res: Response) => {

        if (res.data.author === userid) {
          setRealAuthor(true);
        } else {
          history.goBack();
        }
      })

  }, [isLogin, history, postid, userid]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    if (isLogin !== true) {
      return;
    }

    axiosApi.delete(`http://localhost:8080/api/auth/posts?postid=${postid}`)
      .then((res: Response) => {
        history.replace('/community?page=1');
      })
      .catch(() => {})
  }

  const deleteCancle = () => {
    history.replace('/community?page=1');
  }

  return (
    <>
      <Header
        selected='Community'
      />
      <PostWrapper>
        <form onSubmit={onSubmit}>
          <TextWrapper
            fontSize={'1.6rem'}
            value={'Are you sure you want to delete this post?'}
            textAlign={'center'}
          >
          </TextWrapper>
          <ButtonWrapper>
            <div style={{ width: '200px', textAlign: 'center' }}>
              {realAuthor && <SubmitButton
                background={true}
                value={'Yes'}
              />}
              <Button
                width={'35%'}
                height={'33px'}
                backgroundColor={'white'}
                border={true}
                onClick={deleteCancle}
              >
                No
              </Button>
            </div>
          </ButtonWrapper>
        </form>
      </PostWrapper>
    </>
  )
}

