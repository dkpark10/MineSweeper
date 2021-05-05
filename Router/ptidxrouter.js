'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var commonutility_1 = require("../lib/commonutility");
var ptdifficulty_1 = require("../lib/ptdifficulty");
var pbuttonHandler_1 = require("../lib/pbuttonHandler");
var buttonHandler;
router.get('/', function (request, response, nextfunction) {
    var mineBoard = {
        mine: 0,
        flag: false,
        visited: false,
        aroundNumber: 0
    };
    var tempBoard = Array.from({ length: ptdifficulty_1.test.row }, function () { })
        .map(function () { return Array.from({ length: ptdifficulty_1.test.col }, function () { return commonutility_1.cloneObject(mineBoard); }); });
    var mineData = {
        row: ptdifficulty_1.test.row,
        col: ptdifficulty_1.test.col,
        numberOfMine: ptdifficulty_1.test.numberOfMine,
        extraCell: (ptdifficulty_1.test.row * ptdifficulty_1.test.col) - ptdifficulty_1.test.numberOfMine,
        board: tempBoard
    };
    // 싱글톤 
    buttonHandler = pbuttonHandler_1.ButtonHandler.getInstance(mineData);
    var responseBoard;
    if (request.session.mine === undefined) {
        console.log('들어와??????????????//');
        buttonHandler.plantMine();
        buttonHandler.setAroundMineNumberOfCell();
        // 지뢰밭 배열 추출
        responseBoard = mineData.board.map(function (ele1) {
            return ele1.map(function (ele2) { return ele2.mine; });
        });
        request.session.mine = mineData;
        response.render("index", { mine: responseBoard });
    }
});
router.post('/leftClickHandle', function (request, response, nextfunction) {
    var sess = request.session.mine;
    var coord = { y: Number(request.body.y), x: Number(request.body.x) };
    var responseJson;
    if (buttonHandler.isClickFlag(coord.y, coord.x)) {
        responseJson = { y: coord.y, x: coord.x, status: commonutility_1.EventStatus.NOTHING, num: -1 };
        response.status(200).json(responseJson);
    }
    else if (buttonHandler.isClickMine(coord.y, coord.x)) {
        responseJson = { y: coord.y, x: coord.x, status: commonutility_1.EventStatus.END, num: -1 };
        response.status(200).json(responseJson);
    }
    else if (buttonHandler.getBoard()[coord.y][coord.x].aroundNumber > 0) {
        var numOfCell = buttonHandler.getBoard()[coord.y][coord.x].aroundNumber;
        responseJson = { y: coord.y, x: coord.x, status: commonutility_1.EventStatus.NUMBERCELL, num: numOfCell };
        response.status(200).json(responseJson);
    }
    else {
        buttonHandler.chainConflict(coord.y, coord.x);
    }
});
module.exports = router;
