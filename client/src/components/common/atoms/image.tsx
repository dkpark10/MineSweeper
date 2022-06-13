import React from 'react';
import styled from 'styled-components';

interface Props {
  width: string;
  height: string;
  src: string;
  alt: string;
}

const ImageWrapper = styled.div<Partial<Props>>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display:inline-block;
  overflow: hidden;
 
  img, div {
    width:100%;
    height:100%;
    object-fit: cover;
  }
`;

export default function Image({
  width,
  height,
  src,
  alt,
}: Props) {
  return (
    <ImageWrapper
      width={width}
      height={height}
    >
      <img
        src={src}
        alt={alt}
      />
    </ImageWrapper>
  );
}
