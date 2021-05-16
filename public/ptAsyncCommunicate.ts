'use strict';

window.onload = function () {
  document.addEventListener('contextmenu', function (e: MouseEvent) {   // 오른쪽 마우스 막음
    e.preventDefault();
  });
  document.addEventListener('auxclick', function (e) {        // 휠클릭 막음
    e.preventDefault();
  });

  for (let i: number = 0; i < 10; i++) {
    for (let j: number = 0; j < 10; j++) {
      const buttonID = `buttoncell${i}?${j}`;
      const buttonElement: HTMLButtonElement = document.getElementById(buttonID) as HTMLButtonElement;
      buttonElement.addEventListener('mousedown', buttonClickEvent);
    }
  }
}

enum mouseEvent {
  LEFTCLICK = 1,
  WHEELCLICK,
  RIGHTCLICK
};

interface Coord {
  y: number;
  x: number;
}

enum EventStatus {
  END,
  NOTHING,
  DISABLED,
  NUMBERCELL,
  SETFLAG,
  RELIVEFLAG
}

interface ResponseJSON {
  y: number;
  x: number;
  status: EventStatus;
  num: number;
}

var isFirstClick: boolean = true;
var timeGap:number;
const colorofButtonNumber: [null, string, string, string, string, string, string, string, string] =
  [null, '#FF7388', '#614BF4', '##FFFF35', '#DC1C38', '#7EEE62', '#0DEBEB', '#A566F8', '#A9350B'];


// 버튼클릭 콜백이벤트 1: 자기자신 2: 마우스 이벤트를 디폴트로 받음
function buttonClickEvent(this: HTMLButtonElement, e: MouseEvent) {

  const requestCoord: Coord = buttonIDparsing(this.id as string);
  const xhr: XMLHttpRequest = new XMLHttpRequest();

  if (isFirstClick) {
    setInitialTime(new Date().getTime());
  }

  if (e.which === mouseEvent.LEFTCLICK) {

    xhr.open('post', '/leftclickhandle');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(requestCoord));
    xhr.addEventListener('load', leftClickHandleling);
  }
  else if (e.which === mouseEvent.RIGHTCLICK) {

    xhr.open('post', '/rightclickhandle');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(requestCoord));
    xhr.addEventListener('load', rightClickHandleling);
  }
  else if (e.which === mouseEvent.WHEELCLICK) {

    xhr.open('post', '/wheelclickhandle');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(requestCoord));
    xhr.addEventListener('load', wheelClickHandleling);
  }
  else {
    ;
  }
}


function setInitialTime(startTIme: number) {
  isFirstClick = false;

  setInterval(() => {
    const MILLISECOND:number = 1000;
    const endTime: number = new Date().getTime();
    timeGap = Math.floor((endTime - startTIme) / MILLISECOND);
    const timerElement: any = document.getElementById('timer') as HTMLSpanElement;

    if (timeGap < 10) {
      timerElement.innerText = `00${timeGap}`;
    } else if (timeGap >= 10 && timeGap < 100) {
      timerElement.innerText = `0${timeGap}`;
    } else if(timeGap >= 999){
      timerElement.innerText = '999';
    }else{
      timerElement.innerText = `${timeGap}`;
    }
  }, 1000);
}


function buttonIDparsing(buttonId: string): Coord {
  const coord: string[] = buttonId.substr('buttoncell'.length).split('?');
  return { y: Number(coord[0]), x: Number(coord[1]) };
}


function leftClickHandleling(this: XMLHttpRequest) {

  const responseData: ResponseJSON[] = JSON.parse(this.responseText).responsedata;

  responseData.forEach((element: ResponseJSON) => {
    if (element.status === EventStatus.END) {
      // to do...
      console.log('click mine;;;;');
    } else if (element.status === EventStatus.NOTHING) {
      ;
    } else {
      const y: number = element.y;
      const x: number = element.x;
      const num: number = element.num;
      const buttonCellElement = document.getElementById(`buttoncell${y}?${x}`) as HTMLButtonElement;

      if (element.status === EventStatus.DISABLED) {
        buttonCellElement.disabled = true;
      } else if (element.status === EventStatus.NUMBERCELL) {
        buttonCellElement.style.color = colorofButtonNumber[num] as string;
        buttonCellElement.innerText = num.toString();
      }
    }
  });
}


function rightClickHandleling(this: XMLHttpRequest) {

  const responseData: ResponseJSON = JSON.parse(this.responseText);
  const y: number = responseData.y; const x: number = responseData.x;
  const buttonCellElement: any = document.getElementById(`buttoncell${y}?${x}`) as HTMLButtonElement;
  const extraFlagElement: any = document.getElementById('extraflag') as HTMLSpanElement
  let extraFlagElementValue: string = extraFlagElement.textContent;

  if (responseData.status === EventStatus.SETFLAG) {
    extraFlagElement.innerText = Number(extraFlagElementValue) - 1;
    buttonCellElement.innerHTML = '<img src = "flag.png"/>';
  }
  else if (responseData.status === EventStatus.RELIVEFLAG) {
    extraFlagElement.innerText = Number(extraFlagElementValue) + 1;
    buttonCellElement.innerHTML = '';
  }
}


function wheelClickHandleling(this: XMLHttpRequest) {

  const responseData: ResponseJSON[] = JSON.parse(this.responseText).responsedata;

  responseData.forEach((element: ResponseJSON) => {
    if (element.status === EventStatus.END) {
      // to do...
      console.log('click mine;;;;');
    } else if (element.status === EventStatus.NOTHING) {
      ;
    } else {
      const y: number = element.y;
      const x: number = element.x;
      const num: number = element.num;
      const buttonCellElement = document.getElementById(`buttoncell${y}?${x}`) as HTMLButtonElement;

      if (element.status === EventStatus.DISABLED) {
        buttonCellElement.disabled = true;
      } else if (element.status === EventStatus.NUMBERCELL) {
        buttonCellElement.style.color = colorofButtonNumber[num] as string;
        buttonCellElement.innerText = num.toString();
      }
    }
  });
}