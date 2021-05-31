window.onload = function () {
    var buttonEasy = document.getElementById('leveleasy');
    buttonEasy.addEventListener('click', function () {
        location.href = '/maingame/easy';
        sendGameLevelInfotoServer('easy');
    });
    var buttonNormal = document.getElementById('levelnormal');
    buttonNormal.addEventListener('click', function () {
        location.href = '/maingame/normal';
        sendGameLevelInfotoServer('normal');
    });
    var buttonHard = document.getElementById('levelhard');
    buttonHard.addEventListener('click', function () {
        location.href = '/maingame/hard';
        sendGameLevelInfotoServer('hard');
    });
};
function sendGameLevelInfotoServer(level) {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/savesessionlevel');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(level));
}
