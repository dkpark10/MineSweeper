window.onload = function () {
  for (let i = 0; i < 16; i++) {
    const mineDivButton = document.createElement('div');
    mineDivButton.id = 'buttonGroup';
    for (let j = 0; j < 30; j++) {
      const button = document.createElement('button');
      button.id = `${i}?${j}`;
      button.addEventListener('click', buttonUp);
      mineDivButton.appendChild(button);
    }
    document.getElementById('minediv').appendChild(mineDivButton);
  }
}