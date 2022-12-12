// https://www.codewars.com/kata/60a1aac7d5a5fc0046c89651

export const kataTypeScript = (string: string) => {
  const hasDuplicatedChars = checkingForDuplicated(string);
  if (hasDuplicatedChars) return charactersSliceHandler(string);
  console.log('result', string);
  return string;
};

export const checkingForDuplicated = (string: string) => {
  for (let i: number = 0; i < string.length; i++) {
    const regex = new RegExp(`${string[i]}`, 'g');
    const numberOfEqualLetters = [...string.matchAll(regex)].length;
    if (numberOfEqualLetters > 1) return true;
  }
  return false;
};

export const charactersSliceHandler = (string: string) => {
  const stringToArray: string[] = string.split('');
  const alphabet: string = 'abcdefghijklmnopqrstuvwxyz';

  for (let i: number = 0; i < string.length; i++) {
    const regex = new RegExp(`${string[i]}`, 'g');
    const equalLetters: any[] = [...string.matchAll(regex)];
    const numberOfEqualLetters: number = [...string.matchAll(regex)].length;

    if (numberOfEqualLetters > 1) {
      const numberOfNextLetters: number = Math.floor(numberOfEqualLetters / 2);
      const indexOfLetter: number = alphabet.indexOf(string[i]);
      let letter: string = '';
      letter = alphabet[indexOfLetter + 1];

      if (indexOfLetter === alphabet.length - 1) {
        letter = alphabet[0];
      }

      for (let i: number = equalLetters.length - 1; i >= 0; i--) {
        stringToArray.splice(equalLetters[i].index, 1);
      }

      if (numberOfEqualLetters % 2 !== 0) {
        stringToArray.push(string[i]);
      }

      [...Array(numberOfNextLetters)].forEach((_, i) => {
        stringToArray.push(letter);
      });
      const parsedString: string = [...stringToArray].join('');
      return kataTypeScript(parsedString);
    }
  }
  throw new Error('Infinite loop detected');
};

kataTypeScript('zzzab');
