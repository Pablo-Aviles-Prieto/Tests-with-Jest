// https://www.codewars.com/kata/60a1aac7d5a5fc0046c89651

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export const lastSurvivors = (string: string): string | void => {
  const hasDuplicatedChars = checkingForDuplicated(string);
  return hasDuplicatedChars ? oneSliceHandler(string) : string;
};

export const checkingForDuplicated = (string: string): boolean => {
  for (let i: number = 0; i < string.length; i++) {
    const regex = new RegExp(`${string[i]}`, 'g');
    const numberOfEqualLetters = [...string.matchAll(regex)].length;
    if (numberOfEqualLetters > 1) return true;
  }
  return false;
};

export const oneSliceHandler = (string: string): string | void => {
  const stringToArray = string.split('');

  for (let i: number = 0; i < string.length; i++) {
    const regex = new RegExp(`${string[i]}`, 'g');
    const equalLetters: any[] = [...string.matchAll(regex)];
    const numberOfEqualLetters = [...string.matchAll(regex)].length;

    if (numberOfEqualLetters > 1) {
      const numberOfNextLetters = Math.floor(numberOfEqualLetters / 2);
      const indexOfLetter = alphabet.indexOf(string[i]);
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
      const parsedString = [...stringToArray].join('');
      return lastSurvivors(parsedString);
    }
  }
  throw new Error('Possible infinite loop detected');
};

console.log(
  'result',
  lastSurvivors(
    'xsdlafqpcmjytoikojsecamgdkehrqqgfknlhoudqygkbxftivfbpxhxtqgpkvsrfflpgrlhkbfnyftwkdebwfidmpauoteahyh'
  )
);
