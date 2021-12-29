import Header from './Header';
import '../styles/Ranking.css';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosApi, { Response } from '../modules/API';
import { useSelector } from 'react-redux';
import { RootState } from '../Reducers';
import queryString from 'query-string';
import Pagenation from './organisms/Pagenation';
import styled from 'styled-components';
import { InlineText, MyLink } from './atoms';

export interface MatchParams {
  level: string;
  page: string;
}

const LineWrapper = styled.div`
  display:flex;
  justify-content:center;
`;

const RankLinkbyLevel = ({ current }: { current: string }) => {

  const levels = ['test', 'easy', 'normal', 'hard'];
  const { theme, font } = useSelector((state: RootState) => ({
    theme: state.style.mainThemeColor,
    font: state.style.mainFontColor
  }));

  return (
    <div className='level-container'>
      {levels.map((ele, idx) => {

        const currentLevel = ele === current;
        const strColor = currentLevel === true ? theme : font;

        return (
          <span key={idx}>
            <Link to={`${ele}?page=1`}>
              <label style={{ color: strColor }}>
                {ele.toUpperCase()}
              </label>
            </Link>
          </span>
        )
      })}
    </div>
  )
}

const Ranking = ({ match, location }: RouteComponentProps<MatchParams>) => {

  const { page } = queryString.parse(location.search);
  const [totalItemCount, setTotalItemCount] = useState<number>(1);
  const level = match.params.level;
  useEffect(() => {

    axiosApi.get(`http://localhost:8080/api/game/${level}`)
      .then((response: Response) => {
        setTotalItemCount(response.data);
      })
      .catch((e) => {
        setTotalItemCount(1);
      });
  }, [level]);

  return (
    <>
      <Header
        selected='Ranking'
      />
      <RankLinkbyLevel
        current={level}
      />
      <LineWrapper>
        <hr style={{ width: '624px' }} />
      </LineWrapper>
      <RankingList
        currentPage={String(page)}
        level={level}
      />
      <Pagenation
        totalItemCount={totalItemCount}
        currentPage={Number(page)}
        url={match.url}
      />
    </>
  )
}

interface RankListProps {
  currentPage: string;
  level: string;
}

interface RankItem {
  ranking: number;
  id: string;
  record: number;
}

const RankingList = ({ currentPage, level }: RankListProps) => {

  const [list, setList] = useState<RankItem[]>([]);
  useEffect(() => {

    axiosApi.get(`http://localhost:8080/api/game/${level}?page=${currentPage}`)
      .then((response: Response) => {
        setList(prev => ([
          ...response.data
        ]))
      })
      .catch(e => setList(prev => ([
        ...prev
      ])));

  }, [currentPage, level]);

  const rankListComponent: JSX.Element[] = list.map((ele, idx) => {

    return (
      <div className='rank-container' key={idx}>
        <span className='rank-row-container' style={{
          width: '15%',
          fontSize: '18px',
          color: '#1033E3',
        }}>
          {ele.ranking}
        </span>
        <span className='rank-row-container' style={{ width: '70%' }}>
          <MyLink url={`/mypage/${ele.id}`}>
            <InlineText
              value={ele.id}
            />
          </MyLink>
        </span>
        <span className='rank-row-container' style={{ width: '15%' }}>
          {ele.record}
        </span>
      </div>
    )
  });

  return (
    <>
      <div className='rank-wrapper'>
        <div className='rank-header' style={{ fontSize: '1.2rem' }}>
          <span className='rank-row-container' style={{
            width: '15%',
          }}>
            {'Rank'}
          </span>
          <span className='rank-row-container' style={{ width: '70%' }}>
            {'ID'}
          </span>
          <span className='rank-row-container' style={{ width: '15%' }}>
            {'Time'}
          </span>
        </div>
        {rankListComponent}
      </div>
    </>
  )
}

export default Ranking;
