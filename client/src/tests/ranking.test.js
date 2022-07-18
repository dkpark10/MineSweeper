import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axiosInstance from '../utils/default_axios';
import defaultComponent from './default';

describe('랭킹 페이지 테스트', () => {
  const mock = new MockAdapter(axiosInstance, { delayResponse: 200 });
  mock.onGet('/api/game/minesweeper?page=1&level=easy')
    .reply(200, [
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
    ])
    .onGet('/api/game/minesweeper?page=1&level=normal')
    .reply(200, [
      {
        id: 'normaluser',
        record: '200.18',
        ranking: 1,
        totalItemCount: 1,
      },
    ])
    .onGet('/api/game/minesweeper?page=1&level=hard')
    .reply(200, [
      {
        id: 'harduser',
        record: '400.108',
        ranking: 1,
        totalItemCount: 1,
      },
    ])
    .onGet('/api/game/2048?page=1')
    .reply(200, [
      {
        id: '2048user',
        record: '2536',
        ranking: 1,
        totalItemCount: 1,
      },
    ]);

  test('지뢰찾기 랭킹 데이터 가져오기', async () => {
    const { getByText, getByTestId } = render(defaultComponent());

    await waitFor(() => {
      const rankingNavi = getByText('랭킹');
      fireEvent.click(rankingNavi);
    });

    await waitFor(() => {
      const selectButton = getByText('쉬움');
      expect(selectButton).toBeInTheDocument();

      const one = getByText('9.849');
      expect(one).toBeInTheDocument();

      fireEvent.click(selectButton);
      const selectLevelButton = ['easy', 'normal', 'hard']
        .map((level) => getByTestId(level));

      selectLevelButton.forEach((dom) => {
        expect(dom).toBeInTheDocument();
      });
    });
  });

  test('지뢰찾기 랭킹 노말 데이터 가져오기', async () => {
    const { getByText, getByTestId } = render(defaultComponent());

    await waitFor(() => {
      const selectButton = getByText('쉬움');
      expect(selectButton).toBeInTheDocument();
      fireEvent.click(selectButton);

      const selectLevelButton = getByTestId('normal');
      fireEvent.click(selectLevelButton);
    });

    await waitFor(() => {
      const normalRankData = getByText('normaluser');
      expect(normalRankData).toBeInTheDocument();
    });
  });

  test('지뢰찾기 랭킹 하드 데이터 가져오기', async () => {
    const { getByText, getByTestId } = render(defaultComponent());

    await waitFor(() => {
      const selectButton = getByText('쉬움');
      expect(selectButton).toBeInTheDocument();
      fireEvent.click(selectButton);

      const selectLevelButton = getByTestId('hard');
      fireEvent.click(selectLevelButton);
    });

    await waitFor(() => {
      const normalRankData = getByText('harduser');
      expect(normalRankData).toBeInTheDocument();
    });
  });

  test('2048 랭킹 데이터 가져오기', async () => {
    const { getByText } = render(defaultComponent());

    await waitFor(() => {
      const Link2048 = getByText('2048');
      expect(Link2048).toBeInTheDocument();
      fireEvent.click(Link2048);

      const user2048 = getByText('2048user');
      expect(user2048).toBeInTheDocument();
    });
  });
});
