import { renderHook } from '@testing-library/react-hooks';
import useCompare from '../components/custom_hooks/usecompare';

describe('두 값 비교 커스텀훅 테스트', () => {
  test('원시 값 비교 테스트', () => {
    const { result, rerender } = renderHook((props) => useCompare(props), {
      initialProps: {
        val1: 123,
        val2: 123,
      },
    });

    expect(result.current).toBe(true);

    rerender({
      val1: 456,
      val2: 123,
    });

    expect(result.current).toBe(false);
  });

  test('객체 값 비교 테스트', () => {
    const { result, rerender } = renderHook((props) => useCompare(props), {
      initialProps: {
        val1: [1, 2, 3],
        val2: [1, 2, 3],
      },
    });

    expect(result.current).toBe(true);

    rerender({
      val1: [1, 2, 3],
      val2: [1, 2, 6],
    });

    expect(result.current).toBe(false);
  });
});
