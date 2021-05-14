'use strict';
window.onload = function () {
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
    document.addEventListener('auxclick', function (e) {
        e.preventDefault();
    });
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var buttonID = "buttoncell" + i + "?" + j;
            var buttonElement = document.getElementById(buttonID);
            buttonElement.addEventListener('mousedown', buttonClickEvent);
        }
    }
};
var isInit = true;
var colorofButtonNumber = [null, '#FF7388', '#614BF4', '##FFFF35', '#DC1C38', '#7EEE62', '#0DEBEB', '#A566F8', '#A9350B'];
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
function buttonIDparsing(buttonId) {
    var coord = buttonId.substr('buttoncell'.length).split('?');
    return { y: Number(coord[0]), x: Number(coord[1]) };
}
// 버튼클릭 콜백이벤트 1: 자기자신 2: 마우스 이벤트를 디폴트로 받음
function buttonClickEvent(e) {
    var requestCoord = buttonIDparsing(this.id);
    var xhr = new XMLHttpRequest();
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
function leftClickHandleling() {
    var responseData = JSON.parse(this.responseText).responsedata;
    responseData.forEach(function (element) {
        if (element.status === EventStatus.END) {
            // to do...
            console.log('click mine;;;;');
        }
        else if (element.status === EventStatus.NOTHING) {
            ;
        }
        else {
            var y = element.y;
            var x = element.x;
            var num = element.num;
            var buttonCellElement = document.getElementById("buttoncell" + y + "?" + x);
            if (element.status === EventStatus.DISABLED) {
                buttonCellElement.disabled = true;
            }
            else if (element.status === EventStatus.NUMBERCELL) {
                buttonCellElement.style.color = colorofButtonNumber[num];
                buttonCellElement.innerText = num.toString();
            }
        }
    });
}
function rightClickHandleling() {
    var responseData = JSON.parse(this.responseText);
    var y = responseData.y;
    var x = responseData.x;
    var buttonCellElement = document.getElementById("buttoncell" + y + "?" + x);
    var extraFlagElement = document.getElementById('extraflag');
    var extraFlagElementValue = extraFlagElement.textContent;
    if (responseData.status === EventStatus.SETFLAG) {
        extraFlagElement.innerText = Number(extraFlagElementValue) - 1;
        buttonCellElement.innerHTML = '<img src = "flag.png"/>';
    }
    else if (responseData.status === EventStatus.RELIVEFLAG) {
        extraFlagElement.innerText = Number(extraFlagElementValue) + 1;
        buttonCellElement.innerHTML = '';
    }
}
function wheelClickHandleling() {
    var responseData = JSON.parse(this.responseText).responsedata;
    responseData.forEach(function (element) {
        if (element.status === EventStatus.END) {
            // to do...
            console.log('click mine;;;;');
        }
        else if (element.status === EventStatus.NOTHING) {
            ;
        }
        else {
            var y = element.y;
            var x = element.x;
            var num = element.num;
            var buttonCellElement = document.getElementById("buttoncell" + y + "?" + x);
            if (element.status === EventStatus.DISABLED) {
                buttonCellElement.disabled = true;
            }
            else if (element.status === EventStatus.NUMBERCELL) {
                buttonCellElement.style.color = colorofButtonNumber[num];
                buttonCellElement.innerText = num.toString();
            }
        }
    });
}
