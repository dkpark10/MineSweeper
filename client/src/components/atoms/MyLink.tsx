import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface IMyLink {
  url: string;
  state?: any;
  search?: string;
  children?: any;
}

// 이 컴포넌트는
// 링크안에 컴포넌트 집어넣고 싶을 때
// 주로 텍스트에서 링크를 클릭할테니
// 텍스트용 !!
const MyLinkStyle = styled.span`
  margin:0 0.2rem;
  a {
    text-decoration:none;
  }
`;

const MyLink = ({ url, state, search, children }: IMyLink) => {

  return (
    <>
      <MyLinkStyle>
        <Link to={{
          pathname: url,
          state: state,
          search: search
        }}
        >
          {children}
        </Link>
      </MyLinkStyle>
    </>
  )
}

export default MyLink;