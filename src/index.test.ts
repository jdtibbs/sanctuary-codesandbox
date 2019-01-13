import { add, compose, fromMaybe, head } from 'sanctuary';

test('sanctuary add5 = 8', () => {
  const add5 = add(5);
  expect(add5(3)).toBe(8);
});

test('head = 3', ()=>{
  expect(fromMaybe(0)(head([3,4,5]))).toBe(3)
}
 test('compose', ()=>{
  const add2 = add(2);
  const add5 = add(5);
  const add3 = add(3);
  expect(compose(add2(1))(add5(1))(add3(1))(1)).toBe(10))
})