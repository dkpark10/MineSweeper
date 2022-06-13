import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { AxiosResponse } from 'axios';
import Editor from '../molecules/editor';
import {
  PostControllerWrapper,
  AlignCenterWrapper,
  InputWrapper,
} from '../atoms/bulletin_wrapper';

import SubmitButton from '../atoms/submit_button';

import {
  Input,
} from '../../../common/atoms/index';

import {
  Header,
} from '../../../common/organisms/index';

import axiosInstance from '../../../../utils/default_axios';
import { useStringInput } from '../../../custom_hooks/useinput';

interface Props extends RouteComponentProps {
  author: string;
}

export default function PostCreatePage({
  author,
  history,
}: Props) {
  const [title, setTitle] = useStringInput('');
  const [contents, setContetns] = useState<string>('');

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.length <= 0) {
      return;
    }

    const request = async () => {
      try {
        const { status }: AxiosResponse = await axiosInstance.post('/api/auth/posts', {
          author,
          title,
          contents,
        });

        if (status === 201) {
          history.replace('/community?page=1');
        }
      } catch (error) {
        // empty
      }
    };
    request();
  };

  return (
    <>
      <Header />
      <div>
        <PostControllerWrapper>
          <form onSubmit={submit}>
            <InputWrapper>
              <Input
                type='text'
                name='post_title'
                width='100%'
                height='40px'
                value={title}
                onChange={setTitle}
                placeholder='제목을 입력하세요.'
              />
            </InputWrapper>
            <Editor
              contents={contents}
              setContents={setContetns}
            />
            <AlignCenterWrapper>
              <SubmitButton
                type='submit'
                width='80px'
                height='33px'
              >
                등록
              </SubmitButton>
            </AlignCenterWrapper>
          </form>
        </PostControllerWrapper>
      </div>
    </>
  );
}
