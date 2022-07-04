import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import {
  render,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axiosInstance from '../utils/default_axios';
import defaultComponent from './default';

describe('<UserProfile />', () => {
  const mock = new MockAdapter(axiosInstance, { delayResponse: 200 });
  mock.onGet('/api/game/easy?page=1').reply(200, [
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

  test('데이타 로드 테스트', async () => {
    const { getByText } = render(defaultComponent());

    await waitFor(() => {
      const rankingNavi = getByText('랭킹');
      fireEvent.click(rankingNavi);
    });

    await waitFor(() => {
      const username = getByText('RANK:1ID:dkpark10');
      expect(username.textContent).toBe('RANK:1ID:dkpark10');
    });
  });
});
