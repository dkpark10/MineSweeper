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
  const coord = buttonId.split('?');
  const ret = {};
  ret.y = coord[0];
  ret.x = coord[1];
  
  return ret;
}