const data = (() => {
  const row = 16, col = 30;
  let numofMine = 99;
  let map = [];
  let markmap = [];
  let visited = [];
  return {
    getRow : () => { return row; },
    getCol : () => { return col; },
    getNumofMine : () => {return numofMine;},
    setNumofMine: (value) => { numofMine = value; },
    setInitMap : () => { map = Array.from(Array(row), () => Array(col).fill(0));},
    getMap:() => {return map;},
    setInitVisited:() =>{Array.from(Array(row), () => Array(col).fill(false));},
    getVisited:() => {return visited;},
    setInitMarkMap:() => {markmap = Array.from(Array(row), () => Array(col).fill(0));},
    getMarkMap:() => {return markmap;}
  };
})();

module.exports = data;