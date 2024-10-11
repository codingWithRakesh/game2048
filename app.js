"use strict";
let arrBoxs = [
    document.querySelectorAll('.box1'),
    document.querySelectorAll('.box2'),
    document.querySelectorAll('.box3'),
    document.querySelectorAll('.box4')
];
let n = 4;
const TwoorFour = () => {
    return Math.random() > 0.5 ? 2 : 4;
};
const randomData = () => {
    while (true) {
        let i = Math.floor(Math.random() * n);
        let j = Math.floor(Math.random() * n);
        if (!arrBoxs[i][j].innerText) {
            arrBoxs[i][j].innerText = String(TwoorFour());
            arrBoxs[i][j].classList.add('red');
            break;
        }
    }
};
randomData();
randomData();
const controls = (key) => {
    if (key.key === 'ArrowDown') {
        downButton();
    }
    else if (key.key === 'ArrowRight') {
        rightButton();
    }
    else if (key.key === 'ArrowLeft') {
        leftButton();
    }
    else if (key.key === 'ArrowUp') {
        upButton();
    }
};
window.addEventListener('keydown', controls);
const scoreDiv = document.querySelector('#score');
let score = 0;
const addScore = (value) => {
    score += value;
    scoreDiv.innerText = String(score);
};
const leftButton = () => {
    for (let i = 0; i < arrBoxs.length; i++) {
        let prevValue = 0;
        let prevColum = -1;
        for (let j = 0; j < arrBoxs[0].length; j++) {
            if (arrBoxs[i][j].innerText) {
                let boxData = Number(arrBoxs[i][j].innerText);
                if (boxData != prevValue) {
                    prevValue = boxData;
                    prevColum = j;
                }
                else {
                    let addValue = prevValue + boxData;
                    arrBoxs[i][j].innerText = '';
                    arrBoxs[i][prevColum].innerText = String(addValue);
                    addScore(addValue);
                    prevValue = 0;
                }
            }
        }
        let columToSet = 0;
        for (let j = 0; j < arrBoxs[0].length; j++) {
            arrBoxs[i][j].classList.remove('red');
            if (arrBoxs[i][j].innerText) {
                if (j != columToSet) {
                    let temp = arrBoxs[i][j].innerText;
                    arrBoxs[i][j].innerText = '';
                    arrBoxs[i][columToSet].innerText = temp;
                }
                columToSet++;
            }
        }
    }
    if (!checkGameOver()) {
        randomData();
    }
};
const rightButton = () => {
    for (let i = 0; i < arrBoxs.length; i++) {
        let prevValue = 0;
        let prevColum = -1;
        for (let j = arrBoxs[0].length - 1; j >= 0; j--) {
            if (arrBoxs[i][j].innerText) {
                let boxData = Number(arrBoxs[i][j].innerText);
                if (boxData != prevValue) {
                    prevValue = boxData;
                    prevColum = j;
                }
                else {
                    let addValue = prevValue + boxData;
                    arrBoxs[i][j].innerText = '';
                    arrBoxs[i][prevColum].innerText = String(addValue);
                    addScore(addValue);
                    prevValue = 0;
                }
            }
        }
        let columToSet = arrBoxs[0].length - 1;
        for (let j = arrBoxs[0].length - 1; j >= 0; j--) {
            arrBoxs[i][j].classList.remove('red');
            if (arrBoxs[i][j].innerText) {
                if (j != columToSet) {
                    let temp = arrBoxs[i][j].innerText;
                    arrBoxs[i][j].innerText = '';
                    arrBoxs[i][columToSet].innerText = temp;
                }
                columToSet--;
            }
        }
    }
    if (!checkGameOver()) {
        randomData();
    }
};
const upButton = () => {
    for (let j = 0; j < arrBoxs[0].length; j++) {
        let prevValue = 0;
        let prevRow = -1;
        for (let i = 0; i < arrBoxs.length; i++) {
            if (arrBoxs[i][j].innerText) {
                let boxData = Number(arrBoxs[i][j].innerText);
                if (boxData != prevValue) {
                    prevValue = boxData;
                    prevRow = i;
                }
                else {
                    let addValue = prevValue + boxData;
                    arrBoxs[i][j].innerText = '';
                    arrBoxs[prevRow][j].innerText = String(addValue);
                    addScore(addValue);
                    prevValue = 0;
                }
            }
        }
        let rowToSet = 0;
        for (let i = 0; i < arrBoxs.length; i++) {
            arrBoxs[i][j].classList.remove('red');
            if (arrBoxs[i][j].innerText) {
                if (i != rowToSet) {
                    let temp = arrBoxs[i][j].innerText;
                    arrBoxs[i][j].innerText = '';
                    arrBoxs[rowToSet][j].innerText = temp;
                }
                rowToSet++;
            }
        }
    }
    if (!checkGameOver()) {
        randomData();
    }
};
const downButton = () => {
    for (let j = 0; j < arrBoxs[0].length; j++) {
        let prevValue = 0;
        let prevRow = -1;
        for (let i = arrBoxs.length - 1; i >= 0; i--) {
            if (arrBoxs[i][j].innerText) {
                let boxData = Number(arrBoxs[i][j].innerText);
                if (boxData != prevValue) {
                    prevValue = boxData;
                    prevRow = i;
                }
                else {
                    let addValue = prevValue + boxData;
                    arrBoxs[i][j].innerText = '';
                    arrBoxs[prevRow][j].innerText = String(addValue);
                    addScore(addValue);
                    prevValue = 0;
                }
            }
        }
        let rowToSet = arrBoxs.length - 1;
        for (let i = arrBoxs.length - 1; i >= 0; i--) {
            arrBoxs[i][j].classList.remove('red');
            if (arrBoxs[i][j].innerText) {
                if (i != rowToSet) {
                    let temp = arrBoxs[i][j].innerText;
                    arrBoxs[i][j].innerText = '';
                    arrBoxs[rowToSet][j].innerText = temp;
                }
                rowToSet--;
            }
        }
    }
    if (!checkGameOver()) {
        randomData();
    }
};
let modalBox = document.querySelector('.modalBox');
const checkGameOver = () => {
    for (let i = 0; i < arrBoxs.length; i++) {
        for (let j = 0; j < arrBoxs[0].length; j++) {
            if (!arrBoxs[i][j].innerText) {
                return false;
            }
        }
    }
    modalBox.classList.remove('none');
    window.removeEventListener('keydown', controls);
    return true;
};
let buttonRemove = document.querySelector('#buttonRemove');
buttonRemove.addEventListener('click', () => {
    modalBox.classList.add('none');
    location.reload();
});
let showData = document.querySelector('.showData');
let touchStartX;
let touchStartY;
showData.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});
showData.addEventListener("touchend", (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            rightButton();
        }
        else {
            leftButton();
        }
    }
    else {
        if (deltaY > 0) {
            downButton();
        }
        else {
            upButton();
        }
    }
});
let buttonNew = document.querySelector('#buttonNew');
buttonNew.addEventListener('click', () => {
    location.reload();
});
