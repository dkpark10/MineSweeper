import React from "react";
import styled from "styled-components";
import {
  Button,
  Input
} from "../../../common/atoms/index";

const BulletionNaviWrapper = styled.div`
  margin:20px 0px;
  display:flex;
  justify-content: center;
  align-items: center;
`;

const SearchInputWrapper = styled.div`
  height: 40px;
  box-shadow: 5px 5px 16px -2px rgb(175, 175, 175);
  padding-left: 16px;
  background-color: white;

  @media screen and (${({ theme }) => theme.minTablet}) {  
    width: 555px;
    border-radius: 8px;
  }

  @media screen and (${({ theme }) => theme.mobile}) {  
    width:100vw;
  }
`;

const SearchInput = styled(Input)`
  background-color: white;
`;

interface Props {
  value: string;
  setValue: React.ChangeEventHandler<HTMLInputElement>;
  search: React.FormEventHandler<HTMLFormElement>;
}

export default function UserSearchInput({
  value,
  setValue,
  search
}: Props) {

  return (
    <form onSubmit={search}>
      <BulletionNaviWrapper>
        <SearchInputWrapper>
          <SearchInput
            type={"text"}
            name={"user_search"}
            width={"80%"}
            height={"100%"}
            value={value}
            onChange={setValue}
          />
          <Button
            width={"20%"}
            height={"100%"}
            backgroundColor={"white"}
          >
            검색
          </Button>
        </SearchInputWrapper>
      </BulletionNaviWrapper>
    </form>
  )
}