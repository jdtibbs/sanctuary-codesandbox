import { add, compose, Just, Nothing, pipe } from 'sanctuary';

const add5 = add(5);
console.log(add5(10));

const add2 = add(2);
console.log(add2(1));
const add5 = add(5);
console.log(add5(5));
const add3 = add(3);
console.log(add3(3));
const x = compose(Math.sqrt)(add(1))(99);
console.log(x);
console.log(pipe ([add(5) add(4) add(3) add(2)]) (1))
console.log(Just)
console.log(Nothing)
