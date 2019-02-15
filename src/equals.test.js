import { equals, Just } from 'sanctuary';

test('equals', () => {
  expect(equals(1)(1)).toBe(true);
  expect(equals('abc')('1')).toBe(false);
});
