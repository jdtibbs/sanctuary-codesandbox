import {
  encase,
  equals,
  fromMaybe,
  get,
  gets,
  id,
  prop,
  props,
  pipe
} from 'sanctuary';

const log = l => v => {
  console.log(l, v);
  return v;
};

const _prop = pipe([prop, encase]);
const _props = pipe([props, encase]);

test('prop', () => {
  const o = { id: 1, name: 'fred' };
  expect(fromMaybe(0)(pipe([prop, encase])('id')(o))).toBe(1);
  expect(fromMaybe(0)(_prop('id')(o))).toBe(1);
  expect(fromMaybe('')(_prop('name')(o))).toBe('fred');
  expect(fromMaybe(0)(_prop('age')(o))).toBe(0);
});

test('props', () => {
  const o = { id: 1, name: 'fred', pets: { dog: true, cat: false } };
  const hasDog = _props(['pets', 'dog']);
  const hasCat = _props(['pets', 'cat']);
  expect(fromMaybe(false)(hasDog(o))).toBe(true);
  expect(fromMaybe(false)(hasCat(o))).toBe(false);
});

test('get', () => {
  const o = { id: 1, name: 'sam' };
  expect(fromMaybe(0)(get(equals(1))('id')(o))).toBe(1);
  expect(fromMaybe(0)(get(equals(2))('id')(o))).toBe(0);
  expect(fromMaybe('')(get(equals('sam'))('name')(o))).toBe('sam');
});

test('gets', () => {
  const o = { id: 1, name: 'sam', pets: { dog: true, cat: false } };
  expect(fromMaybe(true)(gets(equals(true))(['pets', 'dog'])(o))).toBe(true);
  expect(fromMaybe(false)(gets(equals(false))(['pets', 'cat'])(o))).toBe(false);
});
