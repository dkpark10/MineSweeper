'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var commonutility_1 = require("../lib/commonutility");
var ptdifficulty_1 = require("../lib/ptdifficulty");
var pbuttonHandler_1 = require("../lib/pbuttonHandler");
var buttonHandler;
router.get('/', function (request, response, nextfunction) {
    response.render("main", {});
});
router.get('/maingame/:level', function (request, response, nextfunction) {
    var level = request.params.level;
    var mineBoard = {
        mine: 0,
        flag: false,
        visited: false,
        aroundNumber: 0
    };
    var mineData = (function (arg) {
        return {
            row: arg.row,
            col: arg.col,
            numberOfMine: arg.numberOfMine,
            extraCell: (arg.row * arg.col) - arg.numberOfMine,
            board: Array.from({ length: arg.row }, function () { })
                .map(function () { return Array.from({ length: arg.col }, function () { return commonutility_1.cloneObject(mineBoard); }); })
        };
    })(ptdifficulty_1.levels[level]);
    // 싱글톤 
    buttonHandler = pbuttonHandler_1.ButtonHandler.getInstance(mineData);
    var responseBoard;
    buttonHandler.plantMine();
    buttonHandler.setAroundMineNumberOfCell();
    // 지뢰밭 배열 추출
    responseBoard = mineData.board.map(function (ele1) {
        return ele1.map(function (ele2) { return ele2.mine; });
    });
    response.render("index", { row: mineData.row,
        col: mineData.col,
        mine: responseBoard,
        numofMine: mineData.numberOfMine });
});
router.post('/leftclickhandle', function (request, response, nextfunction) {
    var coord = { y: Number(request.body.y), x: Number(request.body.x) };
    var responseJson = {};
    if (buttonHandler.isClickFlag(coord.y, coord.x)) {
        responseJson['responsedata'] = [{ y: coord.y, x: coord.x, status: commonutility_1.EventStatus.NOTHING, num: -1 }];
        response.status(200).json(responseJson);
    }
    else if (buttonHandler.isClickMine(coord.y, coord.x)) {
        responseJson['responsedata'] = [{ y: coord.y, x: coord.x, status: commonutility_1.EventStatus.END, num: -1 }];
        response.status(200).json(responseJson);
    }
    else if (buttonHandler.getBoard()[coord.y][coord.x].aroundNumber > 0) {
        var numOfCell = buttonHandler.getBoard()[coord.y][coord.x].aroundNumber;
        buttonHandler.getBoard()[coord.y][coord.x].visited = true;
        buttonHandler.setExtraCell(buttonHandler.getExtraCell() - 1);
        var eventStauts = buttonHandler.isGameClear() ? commonutility_1.EventStatus.END : commonutility_1.EventStatus.NUMBERCELL;
        responseJson['responsedata'] = [{ y: coord.y, x: coord.x, status: eventStauts, num: numOfCell }];
        response.status(200).json(responseJson);
    }
    else {
        responseJson['responsedata'] = buttonHandler.chainConflict(coord.y, coord.x);
        response.status(200).json(responseJson);
    }
});
router.post('/rightclickhandle', function (request, response, nextfunction) {
    var coord = { y: Number(request.body.y), x: Number(request.body.x) };
    response.status(200).json(buttonHandler.setFlag(coord.y, coord.x));
});
router.post('/wheelclickhandle', function (request, response, nextfunction) {
    var coord = { y: Number(request.body.y), x: Number(request.body.x) };
    var responseJson = {};
    responseJson['responsedata'] = buttonHandler.wheelClickHandle(coord.y, coord.x);
    response.status(200).json(responseJson);
});
module.exports = router;
