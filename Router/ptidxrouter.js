'use strict';
var express = require('express');
var router = express.Router();
var app = express();
var commonutility_1 = require("../lib/commonutility");
var ptdifficulty_1 = require("../lib/ptdifficulty");
var pbuttonHandler_1 = require("../lib/pbuttonHandler");
router.get('/', function (request, response, nextfunction) {
    var mineBoard = {
        mine: 0,
        flag: false,
        visited: false,
        aroundNumber: 0
    };
    var mineData = {
        row: ptdifficulty_1.test.row,
        col: ptdifficulty_1.test.col,
        numberOfMine: ptdifficulty_1.test.numberOfMine,
        extraCell: (ptdifficulty_1.test.row * ptdifficulty_1.test.col) - ptdifficulty_1.test.numberOfMine,
        board: Array.from({ length: ptdifficulty_1.test.row }, function () { return commonutility_1.cloneObject(mineBoard); })
            .map(function () { return Array.from({ length: ptdifficulty_1.test.col }, function () { return commonutility_1.cloneObject(mineBoard); }); })
    };
    var buttonHandler = pbuttonHandler_1.ButtonHandler.getInstance(mineData);
    var responseBoard;
    if (request.session.mine === undefined) {
        buttonHandler.plantMine();
        // 지뢰밭 배열 추출
        responseBoard = mineData.board.map(function (ele1) {
            return ele1.map(function (ele2) { return ele2.mine; });
        });
        console.log(responseBoard);
        request.session.mine = mineData;
        response.render("index", { mine: responseBoard });
    }
});
module.exports = router;
