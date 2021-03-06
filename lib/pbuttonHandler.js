'use strict';
exports.__esModule = true;
exports.ButtonHandler = void 0;
// 버튼 이벤트 
// 주위에 지뢰가 하나 없는 청정경우일 경우에만 버튼 disabled 셋팅
// 지뢰가 아닌 칸이지만 주위에 지뢰가 있는경우 disabled를 셋팅하면 안됨 
var commonutility_1 = require("./commonutility");
var ButtonHandler = /** @class */ (function () {
    function ButtonHandler(sessionData) {
        this.directionY = [0, 0, 1, -1, -1, -1, 1, 1];
        this.directionX = [1, -1, 0, 0, -1, 1, -1, 1];
        this.row = sessionData.row;
        this.col = sessionData.col;
        this.numberOfMine = sessionData.numberOfMine;
        this.extraCell = sessionData.extraCell;
        this.board = sessionData.board;
    }
    ButtonHandler.getInstance = function (sessionData) {
        return this.instance || (this.instance = new this(sessionData));
    };
    ButtonHandler.prototype.getRow = function () { return this.row; };
    ButtonHandler.prototype.getCol = function () { return this.col; };
    ButtonHandler.prototype.getNumberOfMine = function () { return this.numberOfMine; };
    ButtonHandler.prototype.getExtraCell = function () { return this.extraCell; };
    ButtonHandler.prototype.getBoard = function () { return this.board; };
    ButtonHandler.prototype.setExtraCell = function (arg) { this.extraCell = arg; };
    ButtonHandler.prototype.setBoard = function (arg) { this.board = arg; };
    ButtonHandler.prototype.isGameClear = function () { return this.extraCell <= 0; };
    ButtonHandler.prototype.plantMine = function () {
        var extraNumberOfMine = this.numberOfMine;
        while (extraNumberOfMine) {
            var randomForRow = Math.floor(Math.random() * 100);
            var randomRow = randomForRow % this.row;
            var randomForCol = Math.floor(Math.random() * 100);
            var randomCol = randomForCol % this.col;
            if (this.board[randomRow][randomCol].mine === 0) {
                this.board[randomRow][randomCol].mine = 1;
                extraNumberOfMine--;
            }
        }
    };
    ButtonHandler.prototype.setFlag = function (y, x) {
        var isFlag = this.board[y][x].flag;
        var ret;
        if (this.board[y][x].visited === true) { // 방문된곳이면 아무런 이벤트를 발생하지 아니한다.
            ret = { y: y, x: x, status: commonutility_1.EventStatus.NOTHING, num: 0 };
        }
        else if (isFlag === false) {
            this.board[y][x].flag = true;
            ret = { y: y, x: x, status: commonutility_1.EventStatus.SETFLAG, num: 0 };
        }
        else {
            this.board[y][x].flag = false;
            ret = { y: y, x: x, status: commonutility_1.EventStatus.RELIVEFLAG, num: 0 };
        }
        return ret;
    };
    ButtonHandler.prototype.isClickMine = function (y, x) {
        if (this.board[y][x].flag === true) { // 지뢰라도 깃발이라면 넘김
            return false;
        }
        else if (this.board[y][x].mine === 1) {
            return true;
        }
        return false;
    };
    ButtonHandler.prototype.isClickFlag = function (y, x) {
        return this.board[y][x].flag === true ? true : false;
    };
    // 연쇄충돌을 일으킨다.
    ButtonHandler.prototype.chainConflict = function (y, x) {
        var _this = this;
        var ret = new Array();
        var q = new Array();
        q.push({ y: y, x: x });
        this.board[y][x].visited = true;
        ret.push({ y: y, x: x, status: commonutility_1.EventStatus.DISABLED, num: -1 });
        var extraCell = this.extraCell - 1;
        while (q.length) {
            var currenty = q[0].y;
            var currentx = q[0].x;
            q.shift();
            for (var dir = 0; dir < 8; dir++) {
                var nexty = currenty + this.directionY[dir];
                var nextx = currentx + this.directionX[dir];
                if (this.checkOutofRange(nexty, nextx))
                    continue;
                if (this.board[nexty][nextx].flag === true)
                    continue;
                if (this.board[nexty][nextx].aroundNumber === 0 && this.board[nexty][nextx].visited === false) {
                    extraCell--;
                    ret.push({ y: nexty, x: nextx, status: commonutility_1.EventStatus.DISABLED, num: -1 });
                    this.board[nexty][nextx].visited = true;
                    q.push({ y: nexty, x: nextx });
                }
            }
        }
        ret.map(function (element) {
            var y = element.y;
            var x = element.x;
            for (var dir = 0; dir < 8; dir++) {
                var nexty = y + _this.directionY[dir];
                var nextx = x + _this.directionX[dir];
                if (_this.checkOutofRange(nexty, nextx))
                    continue;
                if (_this.board[nexty][nextx].flag === true)
                    continue;
                if (_this.board[nexty][nextx].visited === true)
                    continue;
                var numOfCell = _this.board[nexty][nextx].aroundNumber;
                extraCell--;
                _this.board[nexty][nextx].visited = true;
                ret.push({ y: nexty, x: nextx, status: commonutility_1.EventStatus.NUMBERCELL, num: numOfCell });
            }
        });
        this.extraCell = extraCell;
        if (this.isGameClear()) {
            ret.push({ y: -1, x: -1, status: commonutility_1.EventStatus.END, num: -1 });
        }
        return ret;
    };
    ButtonHandler.prototype.wheelClickHandle = function (y, x) {
        var ret = new Array();
        // 휠클릭했을 때 방문한곳과, 깃발이 없어야 한다.
        if (this.board[y][x].flag === true && this.board[y][x].visited !== false) {
            return [{ y: y, x: x, status: commonutility_1.EventStatus.NOTHING, num: -1 }];
        }
        // 게임오버
        if (this.isRightSetFlag(y, x) === false) {
            return [{ y: y, x: x, status: commonutility_1.EventStatus.END, num: -1 }];
        }
        for (var i = y - 1; i <= y + 1; i++) {
            for (var j = x - 1; j <= x + 1; j++) {
                if (i == y && x == j)
                    continue;
                if (this.checkOutofRange(i, j))
                    continue;
                if (this.board[i][j].visited === true || this.board[i][j].flag === true)
                    continue;
                if (this.board[i][j].aroundNumber > 0) {
                    var numbercell = this.board[i][j].aroundNumber;
                    ret.push({ y: i, x: j, status: commonutility_1.EventStatus.NUMBERCELL, num: numbercell });
                }
                else {
                    ret = ret.concat(this.chainConflict(i, j));
                }
            }
        }
        return ret;
    };
    ButtonHandler.prototype.isRightSetFlag = function (y, x) {
        var flagcnt = 0;
        var aroundNumberofCell = this.board[y][x].aroundNumber;
        for (var i = y - 1; i <= y + 1; i++) {
            for (var j = x - 1; j <= x + 1; j++) {
                if (i == y && j == x)
                    continue;
                if (this.checkOutofRange(i, j))
                    continue;
                if (this.board[i][j].visited === true)
                    continue;
                if (this.board[i][j].flag === true && this.board[i][j].mine === 1) {
                    flagcnt++;
                }
            }
        }
        return flagcnt === aroundNumberofCell ? true : false;
    };
    ButtonHandler.prototype.calculAroundMineNumberOfCell = function (y, x) {
        var ret = 0;
        for (var i = y - 1; i <= y + 1; i++) {
            for (var j = x - 1; j <= x + 1; j++) {
                if (this.checkOutofRange(i, j))
                    continue;
                if (this.board[i][j].mine === 1)
                    ret++;
            }
        }
        return ret;
    };
    ButtonHandler.prototype.setAroundMineNumberOfCell = function () {
        var row = this.row;
        var col = this.col;
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
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
