// 1、实现towerBuilder方法：传入tower层数，构建一个数组形式的tower，如
// towerBuilder(3)
// res: [ '  *  ', ' *** ', '*****' ]，竖着排列刚好形成一个“三角形”

// 方案一：
// function towerBuilder(nFloors) {
//   const arr = [];
//   const maxVal = (nFloors * 2) - 1;
//   for (let i = 1; i <= nFloors; i += 1) {
//     const currentRow = (i * 2) - 1;
//     const empty = (maxVal - currentRow) / 2;
//     const str = ' '.repeat(empty) + '*'.repeat(currentRow) + ' '.repeat(empty);
//     arr.push(str);
//   }
//   return arr;
// }

// 方案二：
const towerBuilder = nFloors => Array.from({ length: nFloors }, (v, k) => {
  const space = ' '.repeat(nFloors - k - 1);
  return space + '*'.repeat(k + k + 1) + space;
});
console.log(towerBuilder(3));


// 2、实现方法array_diff(a, b)，通过数组b过滤数组a里面含有的数组b里面的值，如
// array_diff([1,2,2,2,3],[2])
// res: [1,3]
// array_diff([1,2],[1])
// res: [2]

// 方案一：转换成字符串，使用正则处理
// function arrayDiff(a, b) {
//   const str = a.join('');
//   const reg = new RegExp(b, 'g');
//   return str.replace(reg, '').split('').map(i => +i);
// }

// 方案二：使用filter
const arrayDiff = (a, b) => a.filter(item => b.indexOf(item) === -1);
console.log(arrayDiff([1, 2, 2, 2, 3], [2]));
