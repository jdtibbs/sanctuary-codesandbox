import { add, compose, pipe } from 'sanctuary';

const add2 = add(2);
console.log('add2', add2(1));
const add3 = add(3);
console.log('add3', add3(3));
const add5 = add(5);
console.log('add5', add5(5));
(() => {
  const x = compose(add5)(add3);
  console.log('compose 9 ', x(1));
})();
(() => {
  const x = pipe([add(5), add(4), add(3), add(2)]);
  console.log('pipe 16', x(2));
})();
