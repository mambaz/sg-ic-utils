const checksumMappings = {
  S: ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'],
  T: ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'],
  F: ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K'],
  G: ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K'],
  M: ['K', 'L', 'J', 'N', 'P', 'Q', 'R', 'T', 'U', 'W', 'X']
};

const weights = [2, 7, 6, 5, 4, 3, 2]

const generateID = () => {
  const firstChars = ['S', 'T', 'F', 'G', 'M'];
  const first = firstChars[Math.floor(Math.random() * 5)];

  const chars = (Math.floor(Math.random() * 9999999) + 10000000).toString().slice(1).split('');
  const output = first + chars.join('');

  chars.forEach((_, index) => (chars[index] *= weights[index]));

  const sum = chars.reduce((a, v) => a + v, 0);

  const offset = (first === 'T' || first === 'G') ? 4 : (first === 'M') ? 3 : 0;
  let index = (offset + sum) % 11;
  if (first === 'M') index = 10 - index;

  return output + checksumMappings[first][index];
};

module.exports = {
  // Function to generate random SGICs (Singapore ICs) for testing purposes
  generateDummySGICs: (count = 1) => {
    const ids = Array.from({ length: count }, generateID);
    return count !== 1 ? ids : ids[0];
  },

  // Function to validate the format of a given SGIC
  validateSGIC: (str) => {
    const firstChar = str.charAt(0);
    const lastChar = str.charAt(str.length - 1);
    const remainingChars = str.slice(1, -1).split('');

    remainingChars.forEach((_, index) => (remainingChars[index] *= weights[index]));

    const sum = remainingChars.reduce((a, v) => a + v, 0);

    const offset = (firstChar === 'T' || firstChar === 'G') ? 4 : (firstChar === 'M') ? 3 : 0;
    let index = (offset + sum) % 11;
    if (firstChar === 'M') index = 10 - index;

    return lastChar === checksumMappings[firstChar]?.[index];
  },
};
