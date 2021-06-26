window.onload = function () {
    var buttonEasy = document.getElementById('leveleasy');
    buttonEasy.addEventListener('click', function () {
        location.href = '/maingame/easy';
    });
    var buttonNormal = document.getElementById('levelnormal');
    buttonNormal.addEventListener('click', function () {
        location.href = '/maingame/normal';
    });
    var buttonHard = document.getElementById('levelhard');
    buttonHard.addEventListener('click', function () {
        location.href = '/maingame/hard';
    });
};
function sendLeveltoServer(level) {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/setsessionlevel');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ level: level }));
    xhr.addEventListener('load', function () { });
}
