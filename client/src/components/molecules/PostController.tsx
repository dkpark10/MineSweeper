import React from 'react';
import { InlineText } from '../atoms/Text';
import MyLink from '../atoms/MyLink';

interface IPostController {
  isAuthor: boolean;
  postid: number;
}

const authorIsMe = ({ postid }: Partial<IPostController>) => {

  return (
    <>
      <MyLink
        url={'/community/update'}
      >
        <InlineText
          size={'1.4rem'}
          isColor={false}
          value={'↺'}
        />
      </MyLink>
      <MyLink
        url={'/community/delete'}
        search={`?postid=${postid}`}
      >
        <InlineText
          size={'1.4rem'}
          isColor={false}
          value={'ⅹ'}
        />
      </MyLink>
    </>
  )
}

export default function PostController({ isAuthor, postid }: IPostController) {

  return (
    <>
      <MyLink
        url={'/community'}
        search={'?page=1'}
      >
        <InlineText
          size={'1.4rem'}
          isColor={false}
          value={'≡'}
        />
      </MyLink>
      {isAuthor && authorIsMe({ postid })}
    </>
  )
}