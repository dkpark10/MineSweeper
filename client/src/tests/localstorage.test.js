import {
  getLocalStorageItem,
} from '../utils/common';

describe('로컬스토리지 값 가져오기 테스트', () => {
  test('기본값 테스트', () => {
    const defaultMust123 = getLocalStorageItem({
      key: 'test',
      defaultValue: '123',
      validator: (val) => val.length > 0,
    });

    expect(defaultMust123).toBe('123');
  });

  test('유효하지 않은 값이 들어올 때 테스트', () => {
    global.localStorage.setItem('test', 'strangeValue');
    expect(global.localStorage.getItem('test')).toBe('strangeValue');

    const defaultMust123 = getLocalStorageItem({
      key: 'test',
      defaultValue: '123',
      validator: (val) => ['1', '2', '3'].filter((item) => val === item).length > 0,
    });

    expect(defaultMust123).toBe('123');
  });
});
