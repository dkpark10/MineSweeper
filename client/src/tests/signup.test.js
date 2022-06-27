import { render, fireEvent, waitFor } from '@testing-library/react';
import defaultComponent from './default';
import { invalidMessage } from '../utils/static_data';

describe('회원가입 입력 검증 테스트', () => {
  test('아이디 이메일 입력 검증', async () => {
    const { container, getByText } = render(defaultComponent());

    await waitFor(() => {
      fireEvent.click(getByText('회원가입'));
    });

    const inputId = container.querySelector('#id');
    const inputEmail = container.querySelector('#email');

    fireEvent.change(inputId, { target: { value: 'asd' } });
    await waitFor(() => {
      const failMessage = getByText(invalidMessage.id[0]);
      expect(failMessage.textContent).toBe(invalidMessage.id[0]);
    });

    fireEvent.change(inputEmail, { target: { value: 'asd' } });
    await waitFor(() => {
      const failMessage = getByText(invalidMessage.email[0]);
      expect(failMessage.textContent).toBe(invalidMessage.email[0]);
    });
  });

  test('비밀번호 입력 검증', async () => {
    const { container, getByText } = render(defaultComponent());

    const inputPassword = container.querySelector('#password');
    const inputRepeatPassword = container.querySelector('#repeat-password');

    fireEvent.change(inputPassword, { target: { value: 'asd' } });
    await waitFor(() => {
      const failMessage = getByText(invalidMessage.password);
      expect(failMessage.textContent).toBe(invalidMessage.password);
    });

    fireEvent.change(inputPassword, { target: { value: 'abc123456' } });
    fireEvent.change(inputRepeatPassword, { target: { value: '123456' } });

    await waitFor(() => {
      const failMessage = getByText(invalidMessage.repeatPassword);
      expect(failMessage.textContent).toBe(invalidMessage.repeatPassword);
    });
  });
});
