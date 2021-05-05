'use strict';
window.onload = function () {
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
    document.addEventListener('auxclick', function (e) {
        e.preventDefault();
    });
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            var buttonID = "buttonCell" + i + "?" + j;
            var buttonElement = document.getElementById(buttonID);
            buttonElement.addEventListener('mousedown', buttonClickEvent);
        }
    }
};
var isInit = true;
var MS = 1000;
var cellid = 'buttonCell';
var colorofButtonNumber = [null, '#FF7388', '#614BF4', '##FFFF35', '#DC1C38', '#7EEE62', '#0DEBEB', '#A566F8', '#A9350B'];
var mouseEvent;
(function (mouseEvent) {
    mouseEvent[mouseEvent["LEFTCLICK"] = 1] = "LEFTCLICK";
    mouseEvent[mouseEvent["MIDDLECLICK"] = 2] = "MIDDLECLICK";
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
    var coord = buttonId.substr(cellid.length).split('?');
    return { y: Number(coord[0]), x: Number(coord[1]) };
}
function buttonClickEvent(e) {
    var requestCoord = buttonIDparsing(this.id);
    console.log(requestCoord);
    var xhr = new XMLHttpRequest();
    if (e.which === mouseEvent.LEFTCLICK) {
        xhr.open('POST', '/leftClickHandle');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(requestCoord));
        console.log('??????/1111111');
        xhr.addEventListener('load', function () {
            console.log('??????/22222222');
            var responseData = JSON.parse(xhr.responseText);
            if (responseData.status === EventStatus.END) {
                // to do...
                console.log('click mine;;;;');
            }
            else if (responseData.status === EventStatus.NOTHING) {
                ;
            }
            else if (responseData.status === EventStatus.NUMBERCELL) {
                var y = responseData.y;
                var x = responseData.x;
                var num = responseData.num;
                var buttonCell = document.getElementById("" + cellid + y + "?" + x);
                buttonCell.style.color = colorofButtonNumber[num];
                buttonCell.innerText = num.toString();
            }
        });
    }
}
