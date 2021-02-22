window.onload = function () {
  document.addEventListener('contextmenu', function(event){
    event.preventDefault();
  });
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const buttonID = `buttonCell${i}?${j}`;
      document.getElementById(buttonID).addEventListener('mousedown',buttonClick);
    }
  }
}