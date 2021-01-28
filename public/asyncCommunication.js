const colorOfButtonNumber = ['#F1C6F1','#614BF4','#7EEE62','#DC1C38',
                    '#EADF64','#0DEBEB','#8475BE','#A9350B'];

function buttonClick(){
  const buttonId = this.id;
  const jsonData = buttonIdParsing(buttonId);
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if(xhr.readtstate === xhr.DONE){
      if(xhr.status === 200 || xhr.status === 201){
        const clickedButton = document.getElementById(buttonId);
        clickedButton.disabled = true;
      }else{
        console.error(xhr.responseText);
      }
    }
  }
  xhr.open('POST', '/buttonhandleing');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(jsonData));  
}

function buttonIdParsing(buttonId){
  const string = 'buttonCell';
  const coord = buttonId.substr(string.length).split('?');
  return {y:coord[0], x:coord[1]};
}