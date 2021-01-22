module.exports = function () {
  const init = 0, isflag = 1, isquestionMark = 2, disable = 3;
  return {
    getInitStatus: () => { return init; },
    getisFlag: () => { return isflag; },
    getisQuestionMark: () => { return isquestionMark; },
    getDisable: () => { return disable; }
  };
}