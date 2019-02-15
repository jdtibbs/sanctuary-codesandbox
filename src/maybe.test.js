import {
  add,
  even,
  fromMaybe,
  get,
  ifElse,
  isJust,
  isNothing,
  I,
  Just,
  Nothing,
  odd,
  pipe,
  prop,
  show
} from 'sanctuary';

/**

Maybe 
- A data structure that models the presence or absence of a value.
- Used to provide default value for a given condition.

Just = truth / a valid value
Nothing = false / empty value

*/

test('isJust / isNothing', () => {
  const name = Just('fred');
  expect(isJust(name)).toBe(true);
  const nothing = Nothing;
  expect(isNothing(nothing)).toBe(true);
});

test('fromMaybe -> default or value', () => {
  const name = Just('fred');
  expect(fromMaybe('')(name)).toBe('fred');
  const nothing = Nothing;
  expect(fromMaybe('nothing')(nothing)).toBe('nothing');
});

const produce = { id: 1, name: 'apple' };
const getName = prop('name');
const addOne = pred => ifElse(pred)(add(1))(I);
const _addTwo = pipe([add(2), Just]);
// const addTwo = pred => ifElse(pred)(_addTwo)(Just);
const addTwo = pred => ifElse(pred)(pipe([add(2), Just]))(Just);

test('fred', () => {
  expect(addOne(even)(1)).toBe(1);
  expect(addOne(even)(2)).toBe(3);
  expect(fromMaybe(0)(_addTwo(1))).toBe(3);
  expect(fromMaybe(0)(_addTwo(2))).toBe(4);
  expect(fromMaybe(0)(addTwo(even)(1))).toBe(1);
  expect(fromMaybe(0)(addTwo(even)(2))).toBe(4);
  expect(fromMaybe(0)(addTwo(odd)(1))).toBe(3);
  expect(fromMaybe(0)(addTwo(odd)(2))).toBe(2);
});
