import styled from "styled-components";

interface Props {
  fontSize: string;
}

const NotFoundWrapper = styled.div`
  position: absolute; 
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  text-align:center;
`;

const NotFoundText = styled.div<Props>`
  text-align: center;
  font-size:${({ fontSize }) => fontSize};
`;

export default function NotFound() {
  return (
    <NotFoundWrapper>
      <NotFoundText
        fontSize={"5.5rem"}
      >
        4 💣 4
      </NotFoundText>
      <NotFoundText
        fontSize={"2.75rem"}
      >
        페이지를 찾을 수 없습니다.
      </NotFoundText>
    </NotFoundWrapper>
  )
}