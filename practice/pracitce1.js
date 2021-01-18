let arr = [];
let row = 5;
let col = 3;
let value = {mine:0,status:2};

function Test(arr,row,col,value){
  arr = Array.from(Array(row), () => new Array(col).fill(value));
  console.log(arr);
}

Test(arr,row,col,value);
console.log(arr);