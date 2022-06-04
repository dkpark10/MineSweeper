import React from "react";
import styled from "styled-components";

const PostItemWrapper = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  height:39px;
  font-size:0.86rem;
`;

const PostItem = styled.span<{ width: string, fontSize: string, center?: boolean }>`
  display:inline-block;
  width:${({ width }) => width};
  text-align: ${({ center }) => center ? "center" : ""};
  font-size: ${({ fontSize }) => fontSize};
`;

interface Props {
  widthRatio: string[];
}

export default function PostCardHeader({
  widthRatio
}: Props) {

  const defaultFontSize = "0.85rem";

  return (
    <PostItemWrapper>
      <PostItem
        width={widthRatio[0]}
        center={true}
        fontSize={defaultFontSize}
      >
        제목
      </PostItem>
      <PostItem
        width={widthRatio[1]}
        fontSize={defaultFontSize}
        center={false}
      >
        작성자
      </PostItem>
      <PostItem
        width={widthRatio[2]}
        fontSize={defaultFontSize}
        center={false}
      >
        날짜
      </PostItem>
    </PostItemWrapper>
  )
}