interface TestInterface {
  testValue: string;
}

let test = { testValue: "x" };
test.testValue = "poop";

console.log(test.testValue);

let z: TestInterface = test;
console.log(z.testValue);

import {
  hashValue,
  OptionsHashValue,
  saltHash,
  makeKey,
  makeHash,
  makeID,
} from "./denocryptor.ts";

let x = Math.random();

console.log(x);

let n = hashValue("fart", { count: 3 });
console.log(n);

let a1 = `13579`;
let b1 = `2468024680`;

let c1 = saltHash(a1, b1);
console.log(c1);

let a2 = makeKey({
  size: 32,
  isComplex: false,
});
console.log(`a2 : ${a2}`);

let a3 = makeHash({
  size: 24,
  toLowerCase: true,
  toUpperCase: false,
  isSecure: false,
});
console.log(`a3 : ${a3}`);

let b3 = makeHash({
  size: 24,
  toLowerCase: true,
  toUpperCase: false,
  isSecure: true,
});
console.log(`b3 : ${b3}`);

let a4 = makeID({
  version: 1,
  origin: ((Date.now() as unknown) as string),
  seed: (Date.now() as number),
  isSecure: true,
});
console.log(a4);

let k: number = 1337;
let r = k as unknown as string;
console.log(r);
