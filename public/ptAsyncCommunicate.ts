'use strict';

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


window.onload = function () {
  document.addEventListener('contextmenu', function (e: MouseEvent) {   // 오른쪽 마우스 막음
    e.preventDefault();
  });
  document.addEventListener('auxclick', function (e) {        // 휠클릭 막음
    e.preventDefault();
  });

  const xhr: XMLHttpRequest = new XMLHttpRequest();

  xhr.open('post', '/getrowandcol');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({}));
  xhr.addEventListener('load', setButtonEvent);

  const closeModalButton: any = document.getElementById('closemodal') as HTMLButtonElement;
  closeModalButton.addEventListener('click', closeModal);
}

var isFirstClick: boolean = true;
var timeGap: number;
var timerID: any;
const colorofButtonNumber: [null, string, string, string, string, string, string, string, string] =
  [null, '#FF245E', '#614BF4', '#FFAA39', '#DC1C38', '#7EEE62', '#0DEBEB', '#A566F8', '#A9350B'];


function setButtonEvent(this: XMLHttpRequest) {

  const responseData: any = JSON.parse(this.responseText).level;
  const row:number = responseData.row;
  const col:number = responseData.col;

  for (let i: number = 0; i < row; i++) {
    for (let j: number = 0; j < col; j++) {
      const buttonID = `buttoncell${i}?${j}`;
      const buttonElement: any = document.getElementById(buttonID) as HTMLButtonElement;
      buttonElement.addEventListener('mousedown', buttonClickEvent);
    }
  }
}


// 버튼클릭 콜백이벤트 1: 자기자신 2: 마우스 이벤트를 디폴트로 받음
function buttonClickEvent(this: HTMLButtonElement, e: MouseEvent) {

  const requestCoord: Coord = buttonIDparsing(this.id as string);
  const xhr: XMLHttpRequest = new XMLHttpRequest();

  if (isFirstClick) {
    setInitialTime(new Date().getTime());
  }

  if (e.which === mouseEvent.LEFTCLICK) {

    console.log('input left click');
    xhr.open('post', '/leftclickhandle');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(requestCoord));
    xhr.addEventListener('load', leftClickHandleling);
  }
  else if (e.which === mouseEvent.RIGHTCLICK) {

    console.log('input right click');
    xhr.open('post', '/rightclickhandle');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(requestCoord));
    xhr.addEventListener('load', rightClickHandleling);
  }
  else if (e.which === mouseEvent.WHEELCLICK) {

    console.log('input wheel click');
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
  const MILLISECOND: number = 1000;

  timerID = setInterval(() => {

    const endTime: number = new Date().getTime();
    timeGap = Math.floor((endTime - startTIme) / MILLISECOND);
    const timerElement: any = document.getElementById('timer') as HTMLSpanElement;

    if (timeGap < 10) {
      timerElement.innerText = `00${timeGap}`;
    } else if (timeGap >= 10 && timeGap < 100) {
      timerElement.innerText = `0${timeGap}`;
    } else if (timeGap >= 999) {
      timerElement.innerText = '999';
    } else {
      timerElement.innerText = `${timeGap}`;
    }
  }, MILLISECOND);
}


function buttonIDparsing(buttonId: string): Coord {
  const coord: string[] = buttonId.substr('buttoncell'.length).split('?');
  return { y: Number(coord[0]), x: Number(coord[1]) };
}


function leftClickHandleling(this: XMLHttpRequest) {

  console.log('output left click');
  const responseData: ResponseJSON[] = JSON.parse(this.responseText).responsedata;

  responseData.forEach((element: ResponseJSON) => {

    const y: number = element.y;
    const x: number = element.x;
    const num: number = element.num;
    const buttonCellElement = document.getElementById(`buttoncell${y}?${x}`) as HTMLButtonElement;

    if (element.status === EventStatus.DISABLED) {
      buttonCellElement.disabled = true;
    }
    else if (element.status === EventStatus.NUMBERCELL) {
      setInnerHTMLButtonCell(buttonCellElement, num);
    }
    else if (element.status === EventStatus.END) {
      setInnerHTMLButtonCell(buttonCellElement, num);
      clearInterval(timerID);
      openModal();
    }
  });
}


function rightClickHandleling(this: XMLHttpRequest) {

  console.log('output right click');

  const responseData: ResponseJSON = JSON.parse(this.responseText);
  const y: number = responseData.y; const x: number = responseData.x;
  const buttonCellElement: any = document.getElementById(`buttoncell${y}?${x}`) as HTMLButtonElement;
  const extraFlagElement: any = document.getElementById('extraflag') as HTMLSpanElement
  let extraFlagElementValue: string = extraFlagElement.textContent;

  if (responseData.status === EventStatus.SETFLAG) {
    extraFlagElement.innerText = Number(extraFlagElementValue) - 1;
    buttonCellElement.innerHTML = '<img src = "/flag.png"/>';
    // buttonCellElement.innerHTML = '<img src = "flag.png"/>';   // 놋북일 때
  }
  else if (responseData.status === EventStatus.RELIVEFLAG) {
    extraFlagElement.innerText = Number(extraFlagElementValue) + 1;
    buttonCellElement.innerHTML = '';
  }
}


function wheelClickHandleling(this: XMLHttpRequest) {

  console.log('output wheel click');

  const responseData: ResponseJSON[] = JSON.parse(this.responseText).responsedata;

  responseData.forEach((element: ResponseJSON) => {
    
    const y: number = element.y;
    const x: number = element.x;
    const num: number = element.num;
    const buttonCellElement = document.getElementById(`buttoncell${y}?${x}`) as HTMLButtonElement;

    if (element.status === EventStatus.DISABLED) {
      buttonCellElement.disabled = true;
    }
    else if (element.status === EventStatus.NUMBERCELL) {
      setInnerHTMLButtonCell(buttonCellElement, num);
    }
    else if (element.status === EventStatus.END) {
      setInnerHTMLButtonCell(buttonCellElement, num);
      clearInterval(timerID);
      openModal();
    }
  });
}


function setInnerHTMLButtonCell(htmlElement: HTMLButtonElement, num : number){
  htmlElement.style.color = colorofButtonNumber[num] as string;
  htmlElement.innerText = num.toString();
}


function openModal() {

  const modal: any = document.querySelector('.modal') as HTMLDivElement;
  modal.classList.remove('hidden');
}


function closeModal() {
  const modal: any = document.querySelector('.modal') as HTMLDivElement;
  modal.classList.add('hidden');
}