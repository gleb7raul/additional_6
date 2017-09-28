module.exports = function zeros(expression) {
  let resultNumber = '1';
  const arr = expression.split('*');
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    const double = element[element.length - 2] === '!';
    const number = element.match(/^\d+/ig)[0];
    if (double) {
      arr[i] = doubleFactorial(number);
    } else {
      arr[i] = singleFactorial(number);
    }
  }
  for (let i = 0; i < arr.length; i++) {
    resultNumber = multiply(arr[i], resultNumber);
  }
  const lastZeros = resultNumber[resultNumber.length - 1] === '0' ? resultNumber.match(/0+$/ig)[0] : '';
  return lastZeros.length;
}

function singleFactorial(number) {
  let result = `${number}`;
  while (number > 1) {
    number--;
    result = multiply(result, `${number}`);
  }
  return result;
}

function doubleFactorial(number) {
  let result = `${number}`;
  while (number > 1) {
    number -= 2;
    if (number <= 0) {
      break;
    }
    result = multiply(result, `${number}`);
  }
  return result;
}

function multiply(first, second) {

  const arr1 = first.split('').reverse();
  const arr2 = second.split('').reverse();
  const result = [];

  for (let iterNum1 = 0; iterNum1 < arr1.length; iterNum1++) {
    for (let iterNum2 = 0; iterNum2 < arr2.length; iterNum2++) {
      const idxIter = iterNum1 + iterNum2;
      result[idxIter] = arr1[iterNum1] * arr2[iterNum2] + (idxIter >= result.length ? 0 : result[idxIter]);

      if (result[idxIter] > 9) {
        result[idxIter + 1] = Math.floor(result[idxIter] / 10) + (idxIter + 1 >= result.length ? 0 : result[idxIter + 1]);
        result[idxIter] -= Math.floor(result[idxIter] / 10) * 10;
      }
    }
  }
  return result.reverse().join('');
}