var isInit = true;
const msSecond = 1000;
const cellID = 'buttonCell';
let startTime = null;

const colorOfButtonNumber = [null, '#FF7388', '#614BF4', '#E8FF64', '#DC1C38', '#7EEE62', '#0DEBEB', '#A566F8', '#A9350B'];
const mouseEvent = { LEFTCLICK: 1, MIDDLECLICK:2, RIGHTCLICK: 3 };

function buttonClick(event) {

  const jsonData = buttonIdParsing(this.id);
  const xhr = new XMLHttpRequest();

  if (event.which === mouseEvent.LEFTCLICK) {

    xhr.open('POST', '/leftClickHandle');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(jsonData));

    xhr.addEventListener('load', function () {
      const responseData = JSON.parse(xhr.responseText);
      if (responseData.responsedata.status === 'clickMine') {
        // to do...
        let n = 23;
      }
      else {
        changeButtonToDisabled(responseData.responsedata);
      }
    });
  }
  else if (event.which === mouseEvent.MIDDLECLICK){
    
    xhr.open('POST', '/middleClickHandle');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(jsonData));

    xhr.addEventListener('load', function () {
    });
  }
  else if (event.which === mouseEvent.RIGHTCLICK) {

    xhr.open('POST', '/rightClickHandle');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(jsonData));

    xhr.addEventListener('load', function () {
      const responseData = JSON.parse(xhr.responseText);
      const y = responseData.coord.y, x = responseData.coord.x;

      console.log(responseData);
      if (responseData.status === 'setFlag') {
        document.getElementById(`${cellID}${y}?${x}`).innerHTML = '<img src="flag.png"/>';
      }
      else{
        document.getElementById(`${cellID}${y}?${x}`).innerHTML = '';
      }
    });
  }
}

function changeButtonToDisabled(responsedata) {

  for (element of responsedata) {
    const y = element.coord[0]; const x = element.coord[1];
    const number = element.number === 0 ? '' : element.number;

    if (number !== 0)
      document.getElementById(`${cellID}${y}?${x}`).style.color = colorOfButtonNumber[number];
    document.getElementById(`${cellID}${y}?${x}`).innerText = number;
    document.getElementById(`${cellID}${y}?${x}`).disabled = true;
  }
}

function buttonIdParsing(buttonId) {
  const coord = buttonId.substr(cellID.length).split('?');
  return { y: coord[0], x: coord[1] };
}

function getPassedSecond(endTime) {
  let timeDiffrence = Math.floor(endTime.getTime() - startTime.getTime()) / msSecond;
  let lengthOftimeDiffrence = String(timeDiffrence).length;
  if (lengthOftimeDiffrence === 3) return String(timeDiffrence);
  else return lengthOftimeDiffrence === 2 ? '0' + String(timeDiffrence) : '00' + String(timeDiffrence);
}

function startShowingTime() {
  setInterval(function () {
    const timeDiffrence = getPassedSecond(new Date);
    document.getElementById('showTime').innerText = timeDiffrence;
  }, msSecond)
}