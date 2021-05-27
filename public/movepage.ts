window.onload = function (){
  const buttonEasy : any = document.getElementById('leveleasy') as HTMLButtonElement;
  buttonEasy.addEventListener('click', function(){
    location.href = '/maingame/easy';
  });
  const buttonNormal : any = document.getElementById('levelnormal') as HTMLButtonElement;
  buttonNormal.addEventListener('click', function(){
    location.href = '/maingame/normal';
  });
  const buttonHard : any = document.getElementById('levelhard') as HTMLButtonElement;
  buttonHard.addEventListener('click', function(){
    location.href = '/maingame/hard';
  });
}