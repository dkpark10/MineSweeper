import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';

import { GameProps } from 'rankpage-type';
import { AxiosResponse } from 'axios';
import {
  Header,
  Footer,
} from '../../../common/organisms/index';

import {
  PageNation,
} from '../../../common/molecules/index';

import {
  Loading,
} from '../../../common/atoms/index';

import RankWrapper from '../atoms/rank_wrapper';
import RankNavigator from '../molecules/rank_navigator';
import RankHeader from '../molecules/rank_table_header';
import RankList from '../molecules/rank_table_list';
import SearchInput from '../atoms/search_input';
import Select from '../atoms/select';

import axiosInstance from '../../../../utils/default_axios';
import useFetch from '../../../custom_hooks/usefetch';
import { useStringInput } from '../../../custom_hooks/useinput';

interface MatchParams {
  game: string;
  page: string;
}

export default function Ranking({
  match,
  location,
}: RouteComponentProps<MatchParams>) {
  const { page, level } = queryString.parse(location.search);
  const { game } = match.params;

  const [url, setUrl] = useState(`/api/game/${game}?page=${page}&level=${level}`);
  const [rankData, loading, error, setRankData] = useFetch<GameProps[]>(url);
  const [userToFind, setUserToFind] = useStringInput('');

  useEffect(() => {
    if (game === 'minesweeper') {
      setUrl(`/api/game/${game}?page=${page}&level=${level}`);
    } else {
      setUrl(`/api/game/${game}?page=${page}`);
    }
  }, [game, page, level]);

  const searchUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userToFind.length === 0) {
      setUrl(`/api/game/minesweeper/${level}?page=${page}`);
    } else {
      setUrl(`/api/game/minesweeper/${level}?user=${userToFind}`);
    }

    try {
      const { data }: AxiosResponse<GameProps[]> = await axiosInstance.get(url);
      setRankData(data.map((item) => ({
        ...item,
        totalItemCount: data.length,
      })));
    } catch (err) {
      // empty
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <>
      <Header />
      <div>
        <RankWrapper>
          <RankNavigator
            currentGame={game}
          />
          <SearchInput
            value={userToFind}
            setValue={setUserToFind}
            search={searchUser}
          />
          <Select
            currentGame={game}
          />
          <RankHeader />
          <RankList
            rankData={rankData}
            page={page as string}
          />
          <PageNation
            url={match.url}
            totalItemCount={rankData.length === 0 ? 1 : rankData[0].totalItemCount}
            currentPage={Number(page)}
          />
        </RankWrapper>
      </div>
      <Footer />
    </>
  );
}
