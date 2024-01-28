const maskString = (inputString = '', visibleRange = [0, -4]) => inputString
      .split('')
      .fill('*', Math.abs(visibleRange[0]), visibleRange[1] || inputString.length)
      .join('');
   
module.exports = {
    maskString,
}
