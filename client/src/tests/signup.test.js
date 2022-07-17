import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axiosInstance from '../utils/default_axios';

import defaultComponent from './default';
import invalidMessage from '../utils/static_data';

describe('회원가입 입력 검증 테스트', () => {
  const mock = new MockAdapter(axiosInstance, { delayResponse: 200 });
  mock.onGet('/api/user?id=dkpark10').reply(200, true);

  test('서버에 이미 존재하는 아이디인지 입력 검증', async () => {
    const { getByText, getByPlaceholderText } = render(defaultComponent());

    await waitFor(() => {
      fireEvent.click(getByText('회원가입'));
    });

    await waitFor(() => {
      const inputId = getByPlaceholderText('아이디');
      fireEvent.change(inputId, { target: { value: 'dkpark10' } });

      const idFailMessage = getByText(invalidMessage.idduplicate);
      expect(idFailMessage).toBeInTheDocument();
      expect(idFailMessage.textContent).toBe(invalidMessage.idduplicate);
    });
  });

  test('아이디 입력 검증', async () => {
    const { getByText, getByPlaceholderText } = render(defaultComponent());

    await waitFor(() => {
      const inputId = getByPlaceholderText('아이디');

      fireEvent.change(inputId, { target: { value: 'asd' } });
      const idFailMessage = getByText(invalidMessage.id);
      expect(idFailMessage).toBeInTheDocument();
      expect(idFailMessage.textContent).toBe(invalidMessage.id);
    });
  });

  test('이메일 유효입력 검증', async () => {
    const { getByText, getByPlaceholderText } = render(defaultComponent());

    await waitFor(() => {
      const inputEmail = getByPlaceholderText('이메일');

      fireEvent.change(inputEmail, { target: { value: 'asd' } });
      const emailFailMessage = getByText(invalidMessage.email);

      expect(emailFailMessage).toBeInTheDocument();
      expect(emailFailMessage.textContent).toBe(invalidMessage.email);
    });
  });

  test('비밀번호 유효입력 검증', async () => {
    const { getByText, getByPlaceholderText } = render(defaultComponent());

    const inputPassword = getByPlaceholderText('비밀번호');

    fireEvent.change(inputPassword, { target: { value: 'asd' } });
    await waitFor(() => {
      const failMessage = getByText(invalidMessage.password);

      expect(failMessage).toBeInTheDocument();
      expect(failMessage.textContent).toBe(invalidMessage.password);
    });
  });

  test('비밀번호 똑같이 입력했는지 검증', async () => {
    const { getByText, getByPlaceholderText } = render(defaultComponent());

    const inputPassword = getByPlaceholderText('비밀번호');
    const inputRepeatPassword = getByPlaceholderText('비밀번호 확인');

    fireEvent.change(inputPassword, { target: { value: 'abc123456' } });
    fireEvent.change(inputRepeatPassword, { target: { value: '123456' } });

    await waitFor(() => {
      const failMessage = getByText(invalidMessage.repeatPassword);

      expect(failMessage).toBeInTheDocument();
      expect(failMessage.textContent).toBe(invalidMessage.repeatPassword);
    });
  });
});
