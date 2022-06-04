import React, { useState } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import queryString from 'query-string';

import {
  Header,
  Footer
}from "../../../common/organisms/index";

import {
  PageNation
}from "../../../common/molecules/index";

import {
  Loading
}from "../../../common/atoms/index";

import RankWrapper from "../atoms/rank_wrapper";
import RankNavigator from "../molecules/rank_navigator";
import RankItem from "../molecules/rank_item";
import SearchInput from "../atoms/search_input";

import axiosInstance from "../../../../utils/default_axios";
import useAxios from "../../../custom_hooks/useaxios";
import { useStringInput } from "../../../custom_hooks/useinput";
import { AxiosResponse } from "axios";

interface MatchParams {
  level: string;
  page: string;
}

interface GameProps {
  id: string;
  record: string;
  ranking: number;
  totalItemCount: number;
}

export default function Ranking({
  match,
  location }: RouteComponentProps<MatchParams>) {
  const { page } = queryString.parse(location.search);
  const level = match.params.level;
  const INITURL = `/api/game/${level}?page=${page}`;
  const [rankData, loading, setRankData] = useAxios<GameProps[]>(INITURL);
  const [value, setValue] = useStringInput("");
  const [searchLoading, setSearchLoading] = useState(false);

  const searchUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = value.length === 0 ? INITURL : `/api/game/${level}?user=${value}`;

    try {
      setSearchLoading(true);
      const { data }: AxiosResponse<GameProps[]> = await axiosInstance.get(url);
      setRankData(data.map(item => ({
        ...item,
        totalItemCount: data.length
      })))
    } catch (e) {

    }
    setSearchLoading(false);
  }

  if (loading || searchLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <div>
        <RankWrapper>
          <RankNavigator
            currentLevel={level}
          />
          <SearchInput
            value={value}
            setValue={setValue}
            search={searchUser}
          />
          <RankItem />
          <ul>
            {rankData.map((rank, idx) =>
              <li key={idx}>
                <Link to={`/mypage/${rank.id}`} replace>
                  <RankItem
                    rank={Number(page) + idx}
                    id={rank.id}
                    record={rank.record}
                  />
                </Link>
              </li>
            )}
          </ul>
          <PageNation
            url={match.url}
            totalItemCount={rankData.length === 0 ? 1 : rankData[0].totalItemCount}
            currentPage={Number(page)}
          />
        </RankWrapper>
      </div>
      <Footer />
    </>
  )
}