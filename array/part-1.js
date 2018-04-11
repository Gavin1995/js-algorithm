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

// 3、有如下array（常见业务：级联分类）
const array = [
  {
    id: 120,
    key: 'key-1',
    value: 'value-1',
    children: [
      {
        id: 1220,
        key: 'key-1-1xx',
        value: 'value-1-1xxx',
      },
      {
        id: 1221,
        key: 'key-1-2xx',
        value: 'value-1-2xxx',
        children: [
          {
            id: 122112,
            key: 'key-1-2xx-3x',
            value: 'value-1-2xxx-6x',
          }
        ]
      },
      {
        id: 1222,
        key: 'key-1-3xx',
        value: 'value-1-3xxx',
      },
    ]
  },
  {
    id: 130,
    key: 'key-2',
    value: 'value-2',
    children: [
      {
        id: 1320,
        key: 'key-2-1xx',
        value: 'value-2-1xxx',
      },
      {
        id: 1321,
        key: 'key-2-2xx',
        value: 'value-2-2xxx',
        children: [
          {
            id: 132112,
            key: 'key-2-2xx-3x',
            value: 'value-2-2xxx-6x',
          }
        ]
      },
      {
        id: 1322,
        key: 'key-2-3xx',
        value: 'value-2-3xxx',
        children: [
          {
            id: 132115,
            key: 'key-2-2xx-12x',
            value: 'value-2-2xxx-109x',
            children: [
              {
                id: 1321152,
                key: 'key-2-2xx-121x',
                value: 'value-2-2xxx-1092x',
              },
              {
                id: 1321159,
                key: 'key-2-2xx-122x',
                value: 'value-2-2xxx-1093x',
              }
            ]
          }
        ]
      },
    ]
  },
];
// 3.1、不返回array中各数据的id

// 方案一：递归解法
// const recursive = (obj) => {
//   const res = {
//     key: obj.key,
//     value: obj.value,
//   };
//   if (obj.children) {
//     res.children = obj.children.map(item => recursive(item));
//   }
//   return res;
// };
// const result = array.map(item => recursive(item));
// console.log(JSON.stringify(result));

// 方案二：使用正则处理
const removeId = (arr) => {
  let str = JSON.stringify(arr);
  str = str.replace(/"id.+?,/g, '');
  return JSON.parse(str);
};
console.log(JSON.stringify(removeId(array)));

// 3.2、找到上面array中value值为：value-2-2xxx-1092x 的id值

// 方案一：广度优先
// const findId = (arr, val) => {
//   if (arr.length === 0) {
//     return false;
//   }
//   const obj = arr.shift();
//   if (obj.value === val) {
//     return obj.id;
//   }
//   if (obj.children) {
//     arr.push(...obj.children);
//   }
//   return findId(arr, val);
// };
// console.log(findId(array, 'value-2-2xxx-1092x'));

// 方案二：深度优先
const findId = (arr, val) => {
  if (arr.length === 0) {
    return false;
  }
  const obj = arr.shift();
  if (obj.value === val) {
    return obj.id;
  }
  if (obj.children) {
    arr.unshift(...obj.children);
  }
  return findId(arr, val);
};
console.log(findId(array, 'value-2-2xxx-1092x'));

