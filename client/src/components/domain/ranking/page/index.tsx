import React, { useEffect, useState, useRef } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';

import { GameProps } from 'rankpage-type';

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

import RankWrapper, { RankListWrapper } from '../atoms/rank_wrapper';
import RankNavigator from '../molecules/rank_navigator';
import RankHeader from '../molecules/rank_table_header';
import RankList from '../molecules/rank_table_list';
import SearchInput from '../atoms/search_input';
import Select from '../atoms/select';

import useFetch from '../../../custom_hooks/usefetch';

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
  const [rankData, loading, error] = useFetch<GameProps[]>(url);
  const searchUserInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (game === 'minesweeper') {
      setUrl(`/api/game/${game}?page=${page}&level=${level}`);
    } else {
      setUrl(`/api/game/${game}?page=${page}`);
    }
  }, [game, page, level]);

  const searchUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = searchUserInput.current?.value;
    if (user?.length === 0) {
      setUrl(`/api/game/${game}?level=${level}&page=${page}`);
    } else {
      setUrl(`/api/game/${game}?level=${level}&user=${user}`);
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
            ref={searchUserInput}
            search={searchUser}
          />
          <Select
            disabled={game !== 'minesweeper'}
          />
          <RankListWrapper>
            <RankHeader />
            <RankList
              rankData={rankData}
              page={page as string}
            />
          </RankListWrapper>
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
