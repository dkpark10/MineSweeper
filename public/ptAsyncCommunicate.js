'use strict';
var mouseEvent;
(function (mouseEvent) {
    mouseEvent[mouseEvent["LEFTCLICK"] = 1] = "LEFTCLICK";
    mouseEvent[mouseEvent["WHEELCLICK"] = 2] = "WHEELCLICK";
    mouseEvent[mouseEvent["RIGHTCLICK"] = 3] = "RIGHTCLICK";
})(mouseEvent || (mouseEvent = {}));
;
var EventStatus;
(function (EventStatus) {
    EventStatus[EventStatus["END"] = 0] = "END";
    EventStatus[EventStatus["NOTHING"] = 1] = "NOTHING";
    EventStatus[EventStatus["DISABLED"] = 2] = "DISABLED";
    EventStatus[EventStatus["NUMBERCELL"] = 3] = "NUMBERCELL";
    EventStatus[EventStatus["SETFLAG"] = 4] = "SETFLAG";
    EventStatus[EventStatus["RELIVEFLAG"] = 5] = "RELIVEFLAG";
})(EventStatus || (EventStatus = {}));
window.onload = function () {
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
    document.addEventListener('auxclick', function (e) {
        e.preventDefault();
    });
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/getrowandcol');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({}));
    xhr.addEventListener('load', setButtonEvent);
    var closeModalButton = document.getElementById('closemodal');
    closeModalButton.addEventListener('click', closeModal);
};
var isFirstClick = true;
var timeGap;
var timerID;
var colorofButtonNumber = [null, '#FF245E', '#614BF4', '#FFAA39', '#DC1C38', '#7EEE62', '#0DEBEB', '#A566F8', '#A9350B'];
function setButtonEvent() {
    var responseData = JSON.parse(this.responseText).level;
    var row = responseData.row;
    var col = responseData.col;
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            var buttonID = "buttoncell" + i + "?" + j;
            var buttonElement = document.getElementById(buttonID);
            buttonElement.addEventListener('mousedown', buttonClickEvent);
        }
    }
}
// 버튼클릭 콜백이벤트 1: 자기자신 2: 마우스 이벤트를 디폴트로 받음
function buttonClickEvent(e) {
    var requestCoord = buttonIDparsing(this.id);
    var xhr = new XMLHttpRequest();
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
function setInitialTime(startTIme) {
    isFirstClick = false;
    var MILLISECOND = 1000;
    timerID = setInterval(function () {
        var endTime = new Date().getTime();
        timeGap = Math.floor((endTime - startTIme) / MILLISECOND);
        var timerElement = document.getElementById('timer');
        if (timeGap < 10) {
            timerElement.innerText = "00" + timeGap;
        }
        else if (timeGap >= 10 && timeGap < 100) {
            timerElement.innerText = "0" + timeGap;
        }
        else if (timeGap >= 999) {
            timerElement.innerText = '999';
        }
        else {
            timerElement.innerText = "" + timeGap;
        }
    }, MILLISECOND);
}
function buttonIDparsing(buttonId) {
    var coord = buttonId.substr('buttoncell'.length).split('?');
    return { y: Number(coord[0]), x: Number(coord[1]) };
}
function leftClickHandleling() {
    console.log('output left click');
    var responseData = JSON.parse(this.responseText).responsedata;
    responseData.forEach(function (element) {
        var y = element.y;
        var x = element.x;
        var num = element.num;
        var buttonCellElement = document.getElementById("buttoncell" + y + "?" + x);
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
function rightClickHandleling() {
    console.log('output right click');
    var responseData = JSON.parse(this.responseText);
    var y = responseData.y;
    var x = responseData.x;
    var buttonCellElement = document.getElementById("buttoncell" + y + "?" + x);
    var extraFlagElement = document.getElementById('extraflag');
    var extraFlagElementValue = extraFlagElement.textContent;
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
function wheelClickHandleling() {
    console.log('output wheel click');
    var responseData = JSON.parse(this.responseText).responsedata;
    responseData.forEach(function (element) {
        var y = element.y;
        var x = element.x;
        var num = element.num;
        var buttonCellElement = document.getElementById("buttoncell" + y + "?" + x);
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
function setInnerHTMLButtonCell(htmlElement, num) {
    htmlElement.style.color = colorofButtonNumber[num];
    htmlElement.innerText = num.toString();
}
function openModal() {
    var modal = document.querySelector('.modal');
    modal.classList.remove('hidden');
}
function closeModal() {
    var modal = document.querySelector('.modal');
    modal.classList.add('hidden');
}
