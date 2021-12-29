import React from 'react'
import styled from 'styled-components';

interface IPostWrapper {
  children: any;
  backgroundColor: string;
  grid_Template_Columnn: string;
}

export const PostStyle = styled.div<IPostWrapper>`
  display: grid;
  position: relative;
  margin : 9px 0;
  min-height: 2.5rem;
  border-radius: 7px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  grid-template-columns: ${({ grid_Template_Columnn }) => grid_Template_Columnn};
  box-shadow: 5px 5px 8px 0px rgb(175, 175, 175);
  border-top: 0.5px solid white;
  border-left: 0.5px solid #eee;
  padding-left: 1.0rem;
  align-items: center;
`;


const PostWrapper = ({ children, backgroundColor, grid_Template_Columnn }: IPostWrapper) => {

  return (
    <>
      <PostStyle
        backgroundColor={backgroundColor}
        grid_Template_Columnn={grid_Template_Columnn}
      >
        {children}
      </PostStyle>
    </>
  )
}

export default PostWrapper;