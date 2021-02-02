window.onload = function () {
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 30; j++) {
      const buttonID = `buttonCell${i}?${j}`;
      document.getElementById(buttonID).addEventListener('click',buttonClick);
    }
  }
}