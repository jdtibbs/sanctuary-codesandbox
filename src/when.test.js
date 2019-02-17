import {
  add,
  equals,
  encase,
  fromMaybe,
  gt,
  I,
  pipe,
  prop,
  when
} from 'sanctuary';
// import { clear, log } from './util';

test('basic', () => {
  expect(when(gt(5))(add(1))(4)).toBe(4);
  expect(when(gt(5))(add(1))(5)).toBe(5);
  expect(when(gt(5))(add(1))(6)).toBe(7);
  expect(when(gt(5))(v => v * 2)(6)).toBe(12);
});

test('impl Ramda cond?', () => {
  const getPropValue = pipe([prop, encase]);

  expect(fromMaybe(false)(getPropValue('a')({ a: true }))).toBe(true);
  expect(fromMaybe(false)(getPropValue('a')({ a: false }))).toBe(false);
  expect(fromMaybe(false)(getPropValue('a')({ b: true }))).toBe(false);
  expect(fromMaybe(false)(getPropValue('b')({ a: true }))).toBe(false);

  const isPropTrue = p =>
    pipe([getPropValue(p), fromMaybe(false), equals(true)]);

  expect(isPropTrue('a')({ a: true })).toBe(true);
  expect(isPropTrue('a')({ a: false })).toBe(false);
  expect(isPropTrue('a')({ b: true })).toBe(false);
  expect(isPropTrue('b')({ a: true })).toBe(false);

  const loading = when(isPropTrue('loading'))(v => ({ result: 'loading' }));
  const a = when(isPropTrue('a'))(v => ({ result: 'a' }));
  const b = when(isPropTrue('b'))(v => ({ result: 'b' }));

  expect(loading({ loading: true })).toMatchObject({ result: 'loading' });
  expect(a({ a: true })).toMatchObject({ result: 'a' });
  expect(b({ b: true })).toMatchObject({ result: 'b' });

  const render = pipe([loading, a, b]);

  expect(render({ loading: true })).toMatchObject({ result: 'loading' });
  expect(render({ a: true })).toMatchObject({ result: 'a' });
  expect(render({ b: true })).toMatchObject({ result: 'b' });
  expect(render({ X: true })).toMatchObject({ X: true });
});
