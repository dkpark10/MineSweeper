'use strict';
window.onload = function () {

  document.addEventListener('contextmenu', function(e : MouseEvent){   // 오른쪽 마우스 막음
    e.preventDefault();
  });
  
  for (let i: number = 0; i < 5; i++) {
    for (let j: number = 0; j < 5; j++) {
      const buttonID = `buttonCell${i}?${j}`;
      const buttonElement : HTMLButtonElement = document.getElementById(buttonID) as HTMLButtonElement;
      buttonElement.addEventListener('mousedown', buttonClickEvent);
    }
  }
}

var isInit: boolean = true;
const MS: number = 1000;
const cellid: string = 'buttonCell';

const colorofButtonNumber: [null, string, string, string, string, string, string, string, string] =
  [null, '#FF7388', '#614BF4', '##FFFF35', '#DC1C38', '#7EEE62', '#0DEBEB', '#A566F8', '#A9350B'];

enum mouseEvent {
  LEFTCLICK,
  MIDDLECLICK,
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
  num: number | undefined;
}

function buttonIDparsing(buttonId: string): Coord {
  const coord: string[] = buttonId.substr(cellid.length).split('?');
  return { y: Number(coord[0]), x: Number(coord[1]) };
}


function buttonClickEvent(this: HTMLButtonElement, e: MouseEvent) {

  const requestCoord: Coord = buttonIDparsing(this.id as string);
  const xhr: XMLHttpRequest = new XMLHttpRequest();

  if (e.which === mouseEvent.LEFTCLICK) {

    xhr.open('POST', '/leftClickHandle');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(requestCoord));

    console.log('??????/1111111');
    xhr.addEventListener('load', () => {

      console.log('??????/22222222');

      const responseData: ResponseJSON = JSON.parse(xhr.responseText);
      if (responseData.status === EventStatus.END) {
        // to do...
        console.log('click mine;;;;');
      } else if (responseData.status === EventStatus.NOTHING) {
        ;
      } else if (responseData.status === EventStatus.NUMBERCELL) {
        const y: number = responseData.y;
        const x: number = responseData.x;
        const num: number = responseData.num as number;
        const buttonCell = document.getElementById(`${cellid}${y}?${x}`) as HTMLButtonElement;
        buttonCell.style.color = colorofButtonNumber[num] as string;
        buttonCell.innerText = num.toString();
      }
    });
  }
}