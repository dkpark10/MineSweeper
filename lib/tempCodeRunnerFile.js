const obj = function(){
  const init = 0, isflag = 1, isquestionMark = 2, disable = 3;
  return {
    getInitStatus: () => { return init; },
    getisFlag: () => { return isflag; },
    getisQuestionMark: () => { return isquestionMark; },
    getDisable: () => { return disable; }
  };
}

const sil = obj;
console.log(sil.isquestionMark);
sil.isquestionMark = 2345;
console.log(sil.isquestionMark);
sil.isquestionMark = 123;
console.log(sil.getisQuestionMark());