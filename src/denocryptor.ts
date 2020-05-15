import { sha512 } from "https://denopkg.com/chiefbiiko/sha512/mod.ts";

/******************************************************************************/

class OptionsEncryptPassword {
  count: number = 3; // number of times to apply the encryption algorithm to the result
}
export { OptionsEncryptPassword };

// applies a salt to a password hash and hashes it a predefined number of times equal to 'options.count'
function encryptPassword(
  hash: string, // the hash you're salting and then encrypting
  salt: string, // the salt hash that's going to be applied to the original hash, generally stored separately on the server for later uses
  options: OptionsEncryptPassword = {
    count: 3,
  },
): string {
  let result: string = ``;

  // salt the hash, then run the SHA-512 encryption algorithm on the salted hash
  result = saltHash(hash, salt);
  result = hashValue(result, options);

  return result;
}
export { encryptPassword };

/******************************************************************************/

class OptionsHashValue {
  count: number = 1; // how many times to apply the hashing algorithm to the 'value' string
}
export { OptionsHashValue };

// accepts a value, converts it to a string, and then applies the SHA-512 hash to it
function hashValue(
  value: any,
  options: OptionsHashValue = {
    count: 1,
  },
): string {
  let result: string = value;

  // run `options.count` number of iterations of the hashing algorithm
  for (let i = 0; i < options.count; i += 1) {
    result = (sha512(result, "utf8", "hex") as string);
  }

  return result;
}
export { hashValue };

/******************************************************************************/

class OptionsMakeID {
  version: number = 1; // TODO implement this
  origin: string | number = (Date.now() as unknown as string); // TODO implement this
  seed: string | number = (Date.now() as unknown as string); // TODO implement this
  isSecure: boolean = false;
}
export { OptionsMakeID };

// generate a random pseudo-UUID string
function makeID(
  options: OptionsMakeID = {
    version: 1,
    origin: (Date.now() as unknown as string),
    seed: (Date.now() as unknown as string),
    isSecure: false,
  },
): string {
  let result: string = ``;

  // TODO add different versions
  // TODO implement origin
  // TODO implement seed

  const characters = "0123456789abcdef";
  // generate the ID using the fast mode
  if (options.isSecure === false) {
    for (let i = 0; i < 36; i += 1) {
      let currentChar = `-`;
      if (i === 8 || i === 13 || i === 18 || i === 23) {
        currentChar = `-`;
      } else {
        let rando = Math.ceil(Math.random() * 256);
        rando %= 16;
        currentChar = characters[rando];
      }
      result += currentChar;
    }
  } else { // generate the ID using the slow mode
    let finished = false;
    let byteArray = new Array(36);
    do {
      const currentByte = Math.floor(Math.random() * 36);
      if (byteArray[currentByte] === undefined) {
        if (
          currentByte === 8 || currentByte === 13 || currentByte === 18 ||
          currentByte === 23
        ) {
          byteArray[currentByte] = `-`;
        } else {
          // generate a random byte to fill in the empty slot
          let rando = Math.ceil(Math.random() * 256);
          rando %= 16;
          byteArray[currentByte] = characters[rando];
        }
      }
      // check to see if all the bytes are filled and we're finished
      for (let i = 0; i < byteArray.length; i += 1) {
        if (byteArray[i] === undefined) {
          finished = false;
          break;
        } else {
          finished = true;
        }
      }
    } while (finished === false);
    // build the string using each byte in the array
    for (let i = 0; i < byteArray.length; i += 1) {
      result += byteArray[i];
    }
  }

  return result;
}
export { makeID };

/******************************************************************************/

class OptionsMakeHash {
  size: number = 128; // how many random hexadecimal characters to generate
  toLowerCase: boolean = true; // whether the result should be all lowercase letters and numbers
  toUpperCase: boolean = false; // whether the result should be all uppercase letters and numbers
  isSecure: boolean = false; // whether to generate the random hash using a slower, but more secure method
}
export { OptionsMakeHash };

// generates a random hexidecimal hash, where `size` is the number of random hexadecimal characters to generate
function makeHash(
  options: OptionsMakeHash = {
    size: 128,
    toLowerCase: true,
    toUpperCase: false,
    isSecure: false,
  },
): string {
  let result: string = ``;

  //
  const characters = `0123456789abcdef`;
  if (options.isSecure === false) {
    // if using fast/less secure random generation, do it the easy way
    for (let i = 0; i < options.size; i += 1) {
      let rando = Math.floor(Math.random() * 16);
      const currentChar = characters[rando];
      result += currentChar;
    }
  } else {
    // generate the hash using the slower but slightly more random way
    let finished = false;
    let byteArray = new Array(options.size);
    do {
      const currentByte = Math.floor(Math.random() * options.size);
      if (byteArray[currentByte] === undefined) {
        let rando = Math.floor(Math.random() * 16);
        byteArray[currentByte] = characters[rando];
      }
      for (let i = 0; i < byteArray.length; i += 1) {
        if (byteArray[i] === undefined) {
          finished = false;
          break;
        } else {
          finished = true;
        }
      }
    } while (finished === false);
    // build the result string using the byte array data
    for (let i = 0; i < byteArray.length; i += 1) {
      result += byteArray[i];
    }
  }

  if (options.toLowerCase === true) {
    result = result.toLowerCase();
  } else if (options.toUpperCase === true) {
    result = result.toUpperCase();
  }
  return result;
}
export { makeHash };

/******************************************************************************/

class OptionsMakeKey {
  size: number = 20; // how many alphanumeric characters to generate
  isComplex: boolean = false; // whether to use both uppercase and lowercase alphanumeric characters
}
export { OptionsMakeKey };

// generate a random alphanumeric string
function makeKey(
  options: OptionsMakeKey = {
    size: 20,
    isComplex: false,
  },
): string {
  let result: string = ``;

  try {
    if (options === undefined || typeof options !== `object`) {
      options = {
        size: 20,
        isComplex: false,
      };
    } else {
      if (options.size === undefined) {
        options.size = 20;
      } else {
        options.size = Number(options.size);
      }
      if (options.isComplex === undefined) {
        options.isComplex = false;
      } else {
        options.isComplex = toBoolean(options.isComplex);
      }
    }
    if (options.size % 1 !== 0 || options.size < 1) {
      // error, size must be an integer greater than or equal to 1
      throw new Error(
        `The size options for the key generation function was not an integer (whole number) greater than or equal to 1.`,
      );
    }
  } catch (ex) {
    throw new Error(
      `An exception error occurred while attempting to parse the options for the key generation function : ${ex.message}`,
    );
  }

  // calculate various values for use in determining a random value
  let divisor = 0;
  let upperRange = 3844;
  if (options.isComplex === true) {
    divisor = 62;
    upperRange = 3844;
  } else {
    divisor = 36;
    upperRange = 1296;
  }

  // generate a random character and then append it to the `result` string
  const characters =
    `0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`;
  for (let i = 0; i < options.size; i += 1) {
    let rando = Math.ceil(Math.random() * upperRange);
    rando %= divisor;
    const currentChar = characters[rando];
    result += currentChar;
  }

  return result;
}
export { makeKey };

/******************************************************************************/

// combines a two hashes, then runs them through the SHA-512 hashing algorithm
function saltHash(
  hash: string,
  salt: string,
): string {
  let result = ``;

  // determine the length of the longest string
  let longer = 0;
  if (hash.length > salt.length) {
    longer = hash.length;
  } else {
    longer = salt.length;
  }
  // combine the two strings, attempting to interleave them
  for (let i = 0; i < longer; i += 1) {
    if (i < hash.length) {
      result += hash[i];
    }
    if (i < salt.length) {
      result += salt[i];
    }
  }

  return result;
}
export { saltHash };

/******************************************************************************/

// converts a string or numeric value to a boolean true or false
function toBoolean(
  value: any,
): boolean {
  if (typeof value === `number`) {
    if (value === 1) {
      return true;
    }
    return false;
  }
  if (typeof value === `string`) {
    value = value.toLowerCase();
    if (value === `true` || value === `yes` || value === `y` || value === `1`) {
      return true;
    }
    return false;
  }
  if (typeof value === `boolean`) {
    return value;
  }
  throw new Error(
    `Error attempting to parse ${JSON.stringify(value)} as a boolean value.`,
  );
}
export { toBoolean };
