function buttonUp(){
  const buttonId = this.id;
  const jsonData = buttonIdParsing(buttonId);
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if(xhr.readtstate === xhr.DONE){
      if(xhr.status === 200 || xhr.status === 201){
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