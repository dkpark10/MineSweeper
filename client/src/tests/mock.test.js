import '@testing-library/jest-dom/extend-expect';
import {
  render,
  fireEvent,
  waitFor,
} from '@testing-library/react'; import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import defaultComponent from './default';

describe('<UserProfile />', () => {
  const mock = new MockAdapter(axios, { delayResponse: 200 }); // 200ms 가짜 딜레이 설정
  // API 요청에 대하여 응답 미리 정하기
  mock.onGet('https://jsonplaceholder.typicode.com/users/1').reply(200, {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496',
      },
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
  });

  test('loads userData properly', async () => {
    const { getByText } = render(defaultComponent());
    await waitFor(() => getByText('로딩중..'));

    await waitFor(() => {
      const username = getByText('Bret');
      const email = getByText('Sincere@april.biz');
      expect(username.textContent).toBe('Username: Bret');
      expect(email.textContent).toBe('Email: Sincere@april.biz');
    });
  });
});
