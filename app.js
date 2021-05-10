'use strict';
exports.__esModule = true;
var express = require('express');
var app = express();
var helmet = require('helmet');
var compression = require('compression');
var bodyparser = require('body-parser');
var session = require('express-session');
var fileStore = require('session-file-store')(session);
var path = require('path');
var fs = require('fs');
var port = 8080;
var ptsession_1 = require("./secret/ptsession");
var idxrouter = require("./Router/ptidxrouter");
// app.use = 요청들어올 떄 마다 실행
app.use(session(ptsession_1.secret)); // 세션값은 메모리에 저장 서버 재가동시 날아감 휘발성
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(compression());
app.use(helmet());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use('/', idxrouter);
// app.use('/ranking', rankrouter);
app.use(function (request, response, next) {
    response.render("notfound", {});
});
app.use(function (error, request, response, next) {
    console.error(error.stack);
    response.status(500).send('Something broke');
});
app.listen(port, function () {
    console.log("Waiting... " + port);
});
