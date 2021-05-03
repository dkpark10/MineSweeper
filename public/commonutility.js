"use strict";
exports.__esModule = true;
exports.cloneObject = exports.EventStatus = void 0;
var EventStatus;
(function (EventStatus) {
    EventStatus[EventStatus["END"] = 0] = "END";
    EventStatus[EventStatus["NOTHING"] = 1] = "NOTHING";
    EventStatus[EventStatus["DISABLED"] = 2] = "DISABLED";
    EventStatus[EventStatus["NUMBERCELL"] = 3] = "NUMBERCELL";
    EventStatus[EventStatus["SETFLAG"] = 4] = "SETFLAG";
    EventStatus[EventStatus["RELIVEFLAG"] = 5] = "RELIVEFLAG";
})(EventStatus = exports.EventStatus || (exports.EventStatus = {}));
function cloneObject(obj) {
    var ret = {};
    for (var key in obj) {
        if (typeof obj[key] === 'object') {
            ret[key] = cloneObject(obj[key]);
        }
        else {
            ret[key] = obj[key];
        }
    }
    return ret;
}
exports.cloneObject = cloneObject;
