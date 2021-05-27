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
