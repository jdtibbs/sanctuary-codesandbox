import {
  add,
  even,
  fromMaybe,
  ifElse,
  isJust,
  isNothing,
  I,
  Just,
  Nothing,
  odd,
  pipe
} from 'sanctuary';

/**

Maybe 
- A data structure that models the presence or absence of a value.
- Used to provide default value for a given condition.

Just = truth / a valid value
Nothing = false / empty value

*/

test('isJust / isNothing', () => {
  expect(isJust(Just('fred'))).toBe(true);
  expect(isNothing(Nothing)).toBe(true);
});

test('fromMaybe => default or value', () => {
  expect(fromMaybe('')(Just('fred'))).toBe('fred');
  expect(fromMaybe('nothing')(Nothing)).toBe('nothing');
});

const addOne = pred => ifElse(pred)(add(1))(I);
const _addTwo = pipe([add(2), Just]);
const addTwo = pred => ifElse(pred)(pipe([add(2), Just]))(Just);

test('addOne / addTwo', () => {
  expect(addOne(even)(1)).toBe(1);
  expect(addOne(even)(2)).toBe(3);
  expect(fromMaybe(0)(_addTwo(1))).toBe(3);
  expect(fromMaybe(0)(_addTwo(2))).toBe(4);
  expect(fromMaybe(0)(addTwo(even)(1))).toBe(1);
  expect(fromMaybe(0)(addTwo(even)(2))).toBe(4);
  expect(fromMaybe(0)(addTwo(odd)(1))).toBe(3);
  expect(fromMaybe(0)(addTwo(odd)(2))).toBe(2);
});
