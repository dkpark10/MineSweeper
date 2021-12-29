import TextWrapper from '../molecules/TextWrapper';
import PostWrapper from '../atoms/PostWrapper';

type TpostTitleTuple = [string, number];

export default function PostTitleInfo() {

  const postTitleInfo: TpostTitleTuple[] = [
    ['Title', 1],
    ['Author', 2],
    ['Time', 3],
    ['Like', 4]
  ]

  return (
    <>
      <PostWrapper
        backgroundColor={'none'}
        grid_Template_Columnn={'69% 11% 11% 9%'}
      >
        {postTitleInfo.map(ele => {

          const [value, idx] = ele;

          return (
            <TextWrapper
              key={idx}
              width={'none'}
              textAlign={'center'}
              fontSize={'1.1rem'}
              value={value}
              isColor={false}
            />
          )
        })}
      </PostWrapper>
    </>
  )
}

