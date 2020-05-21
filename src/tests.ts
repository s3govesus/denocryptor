import {
  encryptPassword,
  hashValue,
  makeID,
  makeHash,
  makeKey,
  saltHash,
  toBoolean,
} from "./mod.ts";

/******************************************************************************/

function testEncryptPassword() {
  let hash =
    `d06ec4ed2e76e2c6c9e3dc3e1608735be0cbc0802ca5c2dac19bb492b8605708e3b8aff927d58a4c17fe9a7e6e3afcf3fc8c9e21791500ec0257b8fcca4c9d98`;
  let salt =
    `38537b935d7d0b98fe624ba268b6122b3b9b4d79fb0f714aecb1c55c7a5eb90eaba60f58f428c71117c036ccb7dfdfa80b002f99e96f3d0d36e64288a9b08fa9`;

  let encryptedPassword = encryptPassword(hash, salt, {
    count: 7, // how many times to run the hashing algorithm on the salted hash : high count = more secure
  });
  console.log(`testEncryptPassword : ${encryptedPassword}`);
}
testEncryptPassword();

/******************************************************************************/

function testHashValue() {
  let value = `you can hash pretty much any string or number`;

  let hashedValue = hashValue(value, {
    count: 5, // how many times you want to run the hashing algorithm : higher count = more secure
  });
  console.log(`testHashValue : ${hashedValue}`);
}
testHashValue();

/******************************************************************************/

function testMakeID() {
  let id = makeID({
    version: 1, // not yet implemented
    origin: ``, // not yet implemented
    seed: ``, // not yet implemented
    isSecure: true, // slower, but more secure random data generation
  });
  console.log(`testMakeID : ${id}`);
}
testMakeID();

/******************************************************************************/

function testMakeHash() {
  let randomData = makeHash({
    size: 128, // how many characters to generate
    toLowerCase: true, // produce results that consist of only lowercase hexadecimal characters (default)
    toUpperCase: false, // produce results that consit of only uppercase hexadecimal characters
    isSecure: false, // slower, but more secure random data generation
  });
  console.log(`testMakeHash : ${randomData}`);
}
testMakeHash();

/******************************************************************************/

function testMakeKey() {
  let randomKey = makeKey({
    size: 20,
    isComplex: false, // whether or not to generate both uppercase and lowercase alphanumeric characters
  });
  console.log(`testMakeKey : ${randomKey}`);
}
testMakeKey();

/******************************************************************************/

function testSaltHash() {
  let hash =
    `d06ec4ed2e76e2c6c9e3dc3e1608735be0cbc0802ca5c2dac19bb492b8605708e3b8aff927d58a4c17fe9a7e6e3afcf3fc8c9e21791500ec0257b8fcca4c9d98`;
  let salt =
    `38537b935d7d0b98fe624ba268b6122b3b9b4d79fb0f714aecb1c55c7a5eb90eaba60f58f428c71117c036ccb7dfdfa80b002f99e96f3d0d36e64288a9b08fa9`;
  let saltedHash = saltHash(hash, salt);
  console.log(`testSaltHash : ${saltedHash}`);
}
testSaltHash();

/******************************************************************************/

function testToBoolean() {
  let someNumber = 0;
  let numberToBool = toBoolean(someNumber);
  console.log(
    `testToBoolean : typeof numberToBool : ${typeof numberToBool} | value numberToBool : ${numberToBool}`,
  );

  let someWord = `true`;
  let wordToBool = toBoolean(someWord);
  console.log(
    `testToBoolean : typeof wordToBool : ${typeof wordToBool} | value wordToBool; : ${wordToBool}`,
  );
}
testToBoolean();
