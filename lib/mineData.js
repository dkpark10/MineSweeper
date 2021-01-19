module.exports = () => {
  const row = 16;
  const col = 30;
  const numofMine = 99;
  let isMine = 1;
  let map = [];
  let visited = [];
  
  this.getRow = () => {return row;}
  this.getCol = () => {return col;}
  this.getNumofMine = () => {return numofMine;}
}