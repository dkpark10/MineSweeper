module.exports = {
  row : 16,
  col : 30,
  numofMine : 99,
  isMine : 1,
  map : [],
  visited : [],
  status : {init:0, isflag:1, isquestionMark:2, disable:3},
  directionY : [0,0,1,-1],
  directionX : [1,-1,0,0],
};