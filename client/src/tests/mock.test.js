import '@testing-library/jest-dom/extend-expect';
import {
  render,
  waitFor,
  fireEvent,
} from '@testing-library/react'; import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import testComponent from './test_component';
import defaultComponent from './default';

describe('<UserProfile />', () => {
  const mock = new MockAdapter(axios, { delayResponse: 200 });
  mock.onGet('http://localhost:8080/rank').reply(200, [
    {
      rank: 1,
      id: 'king',
    },
    {
      rank: 2,
      id: 'queen',
    },
    {
      rank: 3,
      id: 'joker',
    },
  ]);

  test('데이타 로드 테스트', async () => {
    const { container, getByText } = render(defaultComponent());

    await waitFor(() => {
      const rankingNavi = getByText('랭킹');
      fireEvent.click(rankingNavi);
    });

    await waitFor(() => {
      const username = getByText('RANK:1ID:king');
      expect(username.textContent).toBe('RANK:1ID:king');
    });
  });
});
