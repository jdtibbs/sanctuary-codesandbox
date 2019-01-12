import { add } from 'sanctuary';

test('sanctuary add5 = 8', () => {
  const add5 = add(5);
  expect(add5(3)).toBe(8);
});

test('x', ()=>{
  expect(1+2).toBe(3)
}
