type InvalidMessageProps = 'id' | 'idduplicate' | 'email' | 'password' | 'repeatPassword';
type InvalidMessageContent =
  '영어와 숫자 _ 를 포함하는 최소 5글자 최대 15 사이 문자여야 합니다.'
  | '이미 존재하는 아이디입니다.'
  | '이메일 형식이 올바르지 않습니다.'
  | '비밀번호는 최소 6글자에서 최대 15글자 여야 합니다.'
  | '비밀번호가 일치 하지 않습니다.';

type InvalidMessage = {
  [K in InvalidMessageProps]: InvalidMessageContent;
};

const invalidMessage: InvalidMessage = {
  id: '영어와 숫자 _ 를 포함하는 최소 5글자 최대 15 사이 문자여야 합니다.',
  idduplicate: '이미 존재하는 아이디입니다.',
  email: '이메일 형식이 올바르지 않습니다.',
  password: '비밀번호는 최소 6글자에서 최대 15글자 여야 합니다.',
  repeatPassword: '비밀번호가 일치 하지 않습니다.',
};

export default invalidMessage;
