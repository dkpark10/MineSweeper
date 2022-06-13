import styled from 'styled-components';
import { AbsoluteCenterWrapper } from '../../../common/atoms/wrapper';

const OptionWrapper = styled(AbsoluteCenterWrapper)`
  font-family: "Noto Sans KR", sans-serif;
  background-color: white;
  padding:20px;
  border-radius: 12px;
  width:418px;
  box-shadow: 5px 5px 16px -2px rgb(175, 175, 175);

  @media screen and (${({ theme }) => theme.mobile}){
    width: 90vw;
    padding:20px;
  }
`;

export default OptionWrapper;
