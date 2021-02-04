var isInit = true;
const msSecond = 1000;
const colorOfButtonNumber = ['#F1C6F1','#614BF4','#7EEE62','#DC1C38',
                             '#EADF64','#0DEBEB','#8475BE','#A9350B'];
let startTime = null;

function buttonClick(){
  const buttonId = this.id;
  const jsonData = buttonIdParsing(buttonId);
  const xhr = new XMLHttpRequest();

  xhr.open('POST', '/leftClickHandle');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(jsonData));  

  xhr.addEventListener('load', function(){
    const result = JSON.parse(xhr.responseText);
    console.log(result);
    // if(result.number > 0){
    //   document.getElementById(buttonId).style.color = colorOfButtonNumber[result.number - 1];
    //   document.getElementById(buttonId).innerText = result.number;
    // }
  });
}

function buttonIdParsing(buttonId){
  const string = 'buttonCell';
  const coord = buttonId.substr(string.length).split('?');
  return {y:coord[0], x:coord[1]};
}

function getPassedSecond(endTime){
  let timeDiffrence = Math.floor(endTime.getTime() - startTime.getTime()) / msSecond;
  let lengthOftimeDiffrence = String(timeDiffrence).length;
  if(lengthOftimeDiffrence === 3) return String(timeDiffrence);
  else return lengthOftimeDiffrence === 2 ? '0' + String(timeDiffrence) : '00' + String(timeDiffrence);
}

function startShowingTime(){
  setInterval(function(){
    const timeDiffrence = getPassedSecond(new Date);
    document.getElementById('showTime').innerText = timeDiffrence;
  }, msSecond);
}