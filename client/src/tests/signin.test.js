import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axiosInstance from '../utils/default_axios';

import defaultComponent from './default';

describe('로그인 입력 검증 테스트', () => {
  const mock = new MockAdapter(axiosInstance, { delayResponse: 200 });
  mock.onPost('/api/login').reply(202, true);

  test('로그인 실패 테스트', async () => {
    const { getByText, getByPlaceholderText } = render(defaultComponent());

    await waitFor(() => {
      fireEvent.click(getByText('로그인'));
    });

    await waitFor(() => {
      const id = getByPlaceholderText('아이디');
      const password = getByPlaceholderText('비밀번호');
      const loginButton = getByText('로그인');

      fireEvent.change(id, { target: { value: 'dkpark10' } });
      fireEvent.change(password, { target: { value: '123456' } });
      fireEvent.click(loginButton);

      const failMessage = getByText('아이디 또는 비밀번호가 틀립니다.');

      expect(failMessage).toBeInTheDocument();
      expect(failMessage.textContent).toBe('아이디 또는 비밀번호가 틀립니다.');
    });
  });
});
