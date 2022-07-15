import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import axiosInstance from '../utils/default_axios';
import MockAdapter from 'axios-mock-adapter';
import defaultComponent from './default';

describe('랭킹 페이지 테스트', () => {
  const mock = new MockAdapter(axiosInstance, { delayResponse: 200 });
  mock.onGet('/api/game/minesweeper/easy?page=1').reply(200, [
    {
      id: 'dkpark10',
      record: '9.849',
      ranking: 1,
      totalItemCount: 10,
    },
    {
      id: '익명_OzdzRPLf9',
      record: '12.000',
      ranking: 2,
      totalItemCount: 10,
    },
    {
      id: '익명_OzdzRPLf9',
      record: '15.100',
      ranking: 3,
      totalItemCount: 10,
    },
    {
      id: 'dkpark10',
      record: '15.488',
      ranking: 4,
      totalItemCount: 10,
    },
    {
      id: 'guestid',
      record: '15.686',
      ranking: 5,
      totalItemCount: 10,
    },
    {
      id: 'dkpark10',
      record: '19.169',
      ranking: 6,
      totalItemCount: 10,
    },
    {
      id: 'dkpark10',
      record: '20.425',
      ranking: 7,
      totalItemCount: 10,
    },
    {
      id: 'guestid',
      record: '20.656',
      ranking: 8,
      totalItemCount: 10,
    },
    {
      id: 'guestid',
      record: '44.855',
      ranking: 9,
      totalItemCount: 10,
    },
    {
      id: 'guestid',
      record: '45.108',
      ranking: 10,
      totalItemCount: 10,
    },
  ]);

  test('랭킹 데이터 가져오기', async () => {
    const { getByText } = render(defaultComponent());

    await waitFor(() => {
      const rankingNavi = getByText('랭킹');
      fireEvent.click(rankingNavi);
    });

    await waitFor(() => {
      const one = getByText('9.849');
      expect(one).toBeInTheDocument();
    });
  });
});
