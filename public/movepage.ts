window.onload = function (){
  const buttonEasy : any = document.getElementById('leveleasy') as HTMLButtonElement;
  buttonEasy.addEventListener('click', function(){
    location.href = '/maingame/easy';
    sendGameLevelInfotoServer('easy');
  });
  const buttonNormal : any = document.getElementById('levelnormal') as HTMLButtonElement;
  buttonNormal.addEventListener('click', function(){
    location.href = '/maingame/normal';
    sendGameLevelInfotoServer('normal');
  });
  const buttonHard : any = document.getElementById('levelhard') as HTMLButtonElement;
  buttonHard.addEventListener('click', function(){
    location.href = '/maingame/hard';
    sendGameLevelInfotoServer('hard');
  });
}


function sendGameLevelInfotoServer(level: string){
  
  const xhr: XMLHttpRequest = new XMLHttpRequest();
  xhr.open('post', '/savesessionlevel');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(level));
}
