import { add, fromMaybe, head } from 'sanctuary';

test('sanctuary add5 = 8', () => {
  const add5 = add(5);
  expect(add5(3)).toBe(8);
});

test('head = 3', ()=>{
  expect(fromMaybe(0)(head([3,4,5]))).toBe(3)
}
