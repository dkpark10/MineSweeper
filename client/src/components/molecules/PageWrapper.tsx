import PageLink, { IPage } from '../atoms/Page';
import styled from 'styled-components';

export interface IPageBlock extends IPage {
  align: string;
}

const PageBlockStyle = styled.div<Partial<IPageBlock>>`
  text-align:${({align}) => align};
`;

const PageBlock = ({ align, url, width, value, bold, border }: IPageBlock) => {

  return (
    <>
      <PageBlockStyle
        align={align}
      >
        <PageLink
          url={`${url}`}
          width={width}
          value={value}
          bold={bold}
          border={border}
        />
      </PageBlockStyle>
    </>
  )
}

export default PageBlock;