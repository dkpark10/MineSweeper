import styled from "styled-components";
import CenterWrapper from "../../../common/atoms/center_wrapper";

const SignWrapper = styled(CenterWrapper)`
  font-family: "Noto Sans KR", sans-serif;
  background-color: white;
  padding:10px;
  border-radius: 12px;
  width:378px;
  box-shadow: 5px 5px 16px -2px rgb(175, 175, 175);
  text-align: center;

  .failmsg{
    text-align:center;
    font-size:0.9rem;
    color:red;
  }

  a{
    text-decoration: none;
  }

  @media screen and (${({theme}) => theme.mobile}){
    width: 100vw;
    padding:12px;
  }
`;

export default SignWrapper;