'use strict';
exports.__esModule = true;
exports.ButtonHandler = exports.EventStatus = void 0;
var EventStatus;
(function (EventStatus) {
    EventStatus[EventStatus["END"] = 0] = "END";
    EventStatus[EventStatus["NOTHING"] = 1] = "NOTHING";
    EventStatus[EventStatus["DISABLED"] = 2] = "DISABLED";
    EventStatus[EventStatus["NUMBERCELL"] = 3] = "NUMBERCELL";
    EventStatus[EventStatus["SETFLAG"] = 4] = "SETFLAG";
    EventStatus[EventStatus["RELIVEFLAG"] = 5] = "RELIVEFLAG";
})(EventStatus = exports.EventStatus || (exports.EventStatus = {}));
var ButtonHandler = /** @class */ (function () {
    function ButtonHandler(sessionData) {
        this.row = sessionData.row;
        this.col = sessionData.col;
        this.numberOfMine = sessionData.numberOfMine;
        this.extraCell = sessionData.extraCell;
        this.board = sessionData.board;
    }
    ButtonHandler.prototype.getRow = function () { return this.row; };
    ButtonHandler.prototype.getCol = function () { return this.col; };
    ButtonHandler.prototype.getNumberOfMine = function () { return this.numberOfMine; };
    ButtonHandler.prototype.getExtraCell = function () { return this.extraCell; };
    ButtonHandler.prototype.getBoard = function () { return this.board; };
    ButtonHandler.prototype.setExtraCell = function (arg) { this.extraCell = arg; };
    ButtonHandler.prototype.setBoard = function (arg) { this.board = arg; };
    ButtonHandler.prototype.plantMine = function () {
        var extraNumberOfMine = this.numberOfMine;
        while (extraNumberOfMine) {
            var randomForRow = Math.floor(Math.random() * 100);
            var randomRow = randomForRow % this.row;
            var randomForCol = Math.floor(Math.random() * 100);
            var randomCol = randomForCol % this.col;
            if (this.board[randomRow][randomCol].mine === false) {
                this.board[randomRow][randomCol].mine = true;
                extraNumberOfMine--;
            }
        }
    };
    ButtonHandler.prototype.setFlag = function (y, x) {
        var isFlag = this.board[y][x].flag;
        var ret;
        if (this.board[y][x].visited === true) { // 방문된곳이면 아무런 이벤트를 발생하지 아니한다.
            ret = { y: y, x: x, status: EventStatus.NOTHING, num: 0 };
        }
        else if (isFlag === false) {
            this.board[y][x].flag = true;
            ret = { y: y, x: x, status: EventStatus.SETFLAG, num: 0 };
        }
        else {
            this.board[y][x].flag = false;
            ret = { y: y, x: x, status: EventStatus.RELIVEFLAG, num: 0 };
        }
        return ret;
    };
    ButtonHandler.prototype.isClickMine = function (y, x) {
        if (this.board[y][x].flag === true) { // 지뢰라도 깃발이라면 넘김
            return false;
        }
        else if (this.board[y][x].mine === true) {
            return true;
        }
        return false;
    };
    ButtonHandler.prototype.isClickFlag = function (y, x) {
        return this.board[y][x].flag === true ? true : false;
    };
    ButtonHandler.prototype.chainConflict = function (y, x) {
        var ret;
        var q;
        var cellNumber = this.board[y][x].aroundNumber;
        q.push({ y: y, x: x });
        this.board[y][x].visited = true;
        ret.push({
            y: y,
            x: x,
            status: cellNumber ? EventStatus.NUMBERCELL : EventStatus.DISABLED,
            num: cellNumber
        });
        while (q.length) {
            var currenty = q[0].y;
            var currentx = q[0].x;
            q.shift();
            for (var dir = 0; dir < 8; i++) {
                var nexty = currenty + this.directionY[dir];
                var nextx = currentx + this.directionX[dir];
                if (this.checkOutofRange(nexty, nextx))
                    continue;
                if (this.board[y][x].aroundNumber === 0 && this.board[y][x].visited !== false) {
                    var nextCellNumber = this.board[nexty][nextx].aroundNumber;
                    ret.push({
                        y: nexty,
                        x: nextx,
                        status: cellNumber ? EventStatus.NUMBERCELL : EventStatus.DISABLED,
                        num: cellNumber
                    });
                    this.board[nexty][nextx].visited = true;
                    q.push({ y: nexty, x: nextx });
                }
            }
        }
        return ret;
    };
    ButtonHandler.prototype.calculAroundMineNumberOfCell = function (y, x) {
        var ret = 0;
        for (var i = y - 1; i <= y + 1; i++) {
            for (var j = x - 1; j <= x + 1; j++) {
                if (this.checkOutofRange(i, j))
                    continue;
                if (this.board[y][x].mine === true)
                    ret++;
            }
        }
        return ret;
    };
    ButtonHandler.prototype.setAroundMineNumberOfCell = function () {
        var row = this.row;
        var col = this.col;
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < row; j++) {
                this.board[i][j].aroundNumber = this.calculAroundMineNumberOfCell(i, j);
            }
        }
    };
    ButtonHandler.prototype.checkOutofRange = function (y, x) {
        return y < 0 || x < 0 || y >= this.row || x >= this.col;
    };
    return ButtonHandler;
}());
exports.ButtonHandler = ButtonHandler;
