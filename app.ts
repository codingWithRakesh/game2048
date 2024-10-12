let arrBoxs: NodeListOf<HTMLDivElement>[] = [
  document.querySelectorAll('.box1') as NodeListOf<HTMLDivElement>,
  document.querySelectorAll('.box2') as NodeListOf<HTMLDivElement>,
  document.querySelectorAll('.box3') as NodeListOf<HTMLDivElement>,
  document.querySelectorAll('.box4') as NodeListOf<HTMLDivElement>
];
let n = 4;

const TwoorFour = () => {
  return Math.random() > 0.5 ? 2 : 4
}

function log<T>(...datas: T[]) {
  console.log(...datas)
}

const randomData = () => {
  while (true) {
    let i = Math.floor(Math.random() * n);
    let j = Math.floor(Math.random() * n);
    if (!arrBoxs[i][j].innerText) {
      arrBoxs[i][j].innerText = String(TwoorFour());
      if (arrBoxs[i][j].innerText === '2') {
        addStyle(i, j, 2)
      } else {
        addStyle(i, j, 4)
      }
      break;
    }
  }
};

function addStyle(i: number, j: number, n: number) {
  arrBoxs[i][j].classList.add(`tile-${n}`)
}
function removeStyle(i: number, j: number, n: number) {
  arrBoxs[i][j].classList.remove(`tile-${n}`)
}

randomData();
randomData();

const controls = (key: KeyboardEvent) => {
  if (key.key === 'ArrowDown') {
    downButton();
  } else if (key.key === 'ArrowRight') {
    rightButton();
  } else if (key.key === 'ArrowLeft') {
    leftButton();
  } else if (key.key === 'ArrowUp') {
    upButton();
  }
};

window.addEventListener('keydown', controls);

const scoreDiv = document.querySelector('#score') as HTMLDivElement
let score = 0
const addScore = (value: number) => {
  score += value
  scoreDiv.innerText = String(score)
}

const leftButton = () => {
  let isMovable = false
  for (let i = 0; i < arrBoxs.length; i++) {
    let prevValue = 0;
    let prevColum = -1;
    for (let j = 0; j < arrBoxs[0].length; j++) {
      if (arrBoxs[i][j].innerText) {
        let boxData = Number(arrBoxs[i][j].innerText)
        if (boxData != prevValue) {
          prevValue = boxData
          prevColum = j
        } else {
          let addValue = prevValue + boxData
          arrBoxs[i][j].innerText = ''
          removeStyle(i, j, boxData)
          removeStyle(i, prevColum, boxData)
          addStyle(i, prevColum, addValue)
          arrBoxs[i][prevColum].innerText = String(addValue)
          addScore(addValue)
          prevValue = 0
          isMovable = true
        }
      }
    }

    let columToSet = 0;
    for (let j = 0; j < arrBoxs[0].length; j++) {
      if (arrBoxs[i][j].innerText) {
        if (j != columToSet) {
          let temp = arrBoxs[i][j].innerText;
          arrBoxs[i][j].innerText = ''
          removeStyle(i, j, Number(temp))
          addStyle(i, columToSet, Number(temp))
          arrBoxs[i][columToSet].innerText = temp
          isMovable = true
        }
        columToSet++
      }
    }
  }
  if (!checkGameOver() && isMovable) {
    randomData();
  }
}

const rightButton = () => {
  let isMovable = false
  for (let i = 0; i < arrBoxs.length; i++) {
    let prevValue = 0;
    let prevColum = -1;
    for (let j = arrBoxs[0].length - 1; j >= 0; j--) {
      if (arrBoxs[i][j].innerText) {
        let boxData = Number(arrBoxs[i][j].innerText)
        if (boxData != prevValue) {
          prevValue = boxData
          prevColum = j
        } else {
          let addValue = prevValue + boxData
          arrBoxs[i][j].innerText = ''
          removeStyle(i, j, boxData)
          removeStyle(i, prevColum, boxData)
          addStyle(i, prevColum, addValue)
          arrBoxs[i][prevColum].innerText = String(addValue)
          addScore(addValue)
          prevValue = 0
          isMovable = true
        }
      }
    }

    let columToSet = arrBoxs[0].length - 1;
    for (let j = arrBoxs[0].length - 1; j >= 0; j--) {
      arrBoxs[i][j].classList.remove('red')
      if (arrBoxs[i][j].innerText) {
        if (j != columToSet) {
          let temp = arrBoxs[i][j].innerText;
          arrBoxs[i][j].innerText = ''
          removeStyle(i, j, Number(temp))
          addStyle(i, columToSet, Number(temp))
          arrBoxs[i][columToSet].innerText = temp
          isMovable = true
        }
        columToSet--
      }
    }
  }
  if (!checkGameOver() && isMovable) {
    randomData();
  }
}

const upButton = () => {
  let isMovable = false
  for (let j = 0; j < arrBoxs[0].length; j++) {
    let prevValue = 0;
    let prevRow = -1;
    for (let i = 0; i < arrBoxs.length; i++) {
      if (arrBoxs[i][j].innerText) {
        let boxData = Number(arrBoxs[i][j].innerText)
        if (boxData != prevValue) {
          prevValue = boxData
          prevRow = i
        } else {
          let addValue = prevValue + boxData
          arrBoxs[i][j].innerText = ''
          removeStyle(i, j, boxData)
          removeStyle(prevRow, j, boxData)
          addStyle(prevRow, j, addValue)
          arrBoxs[prevRow][j].innerText = String(addValue)
          addScore(addValue)
          prevValue = 0
          isMovable = true
        }
      }
    }

    let rowToSet = 0;
    for (let i = 0; i < arrBoxs.length; i++) {
      arrBoxs[i][j].classList.remove('red')
      if (arrBoxs[i][j].innerText) {
        if (i != rowToSet) {
          let temp = arrBoxs[i][j].innerText;
          arrBoxs[i][j].innerText = ''
          removeStyle(i, j, Number(temp))
          addStyle(rowToSet, j, Number(temp))
          arrBoxs[rowToSet][j].innerText = temp
          isMovable = true
        }
        rowToSet++
      }
    }
  }
  if (!checkGameOver() && isMovable) {
    randomData();
  }
}

const downButton = () => {
  let isMovable = false
  for (let j = 0; j < arrBoxs[0].length; j++) {
    let prevValue = 0;
    let prevRow = -1;
    for (let i = arrBoxs.length - 1; i >= 0; i--) {
      if (arrBoxs[i][j].innerText) {
        let boxData = Number(arrBoxs[i][j].innerText)
        if (boxData != prevValue) {
          prevValue = boxData
          prevRow = i
        } else {
          let addValue = prevValue + boxData
          arrBoxs[i][j].innerText = ''
          removeStyle(i, j, boxData)
          removeStyle(prevRow, j, boxData)
          addStyle(prevRow, j, addValue)
          arrBoxs[prevRow][j].innerText = String(addValue)
          addScore(addValue)
          prevValue = 0
          isMovable = true
        }
      }
    }

    let rowToSet = arrBoxs.length - 1;
    for (let i = arrBoxs.length - 1; i >= 0; i--) {
      arrBoxs[i][j].classList.remove('red')
      if (arrBoxs[i][j].innerText) {
        if (i != rowToSet) {
          let temp = arrBoxs[i][j].innerText;
          arrBoxs[i][j].innerText = ''
          removeStyle(i, j, Number(temp))
          addStyle(rowToSet, j, Number(temp))
          arrBoxs[rowToSet][j].innerText = temp
          isMovable = true
        }
        rowToSet--
      }
    }
  }
  if (!checkGameOver() && isMovable) {
    randomData();
  }
}

let modalBox = document.querySelector('.modalBox') as HTMLDivElement
const checkGameOver = () => {
  for (let i = 0; i < arrBoxs.length; i++) {
    for (let j = 0; j < arrBoxs[0].length; j++) {
      if (!arrBoxs[i][j].innerText) {
        return false
      }
    }
  }
  modalBox.classList.remove('none')
  window.removeEventListener('keydown', controls);
  return true
}

let buttonRemove = document.querySelector('#buttonRemove') as HTMLButtonElement

buttonRemove.addEventListener('click', () => {
  modalBox.classList.add('none')
  location.reload()
})

let showData = document.querySelector('.showData') as HTMLDivElement

let touchStartX: number;
let touchStartY: number;

showData.addEventListener("touchstart", (event: TouchEvent) => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});

showData.addEventListener("touchend", (event: TouchEvent) => {
  const touchEndX = event.changedTouches[0].clientX;
  const touchEndY = event.changedTouches[0].clientY;

  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0) {
      rightButton()
    } else {
      leftButton()
    }
  } else {
    if (deltaY > 0) {
      downButton()
    } else {
      upButton()
    }
  }
});


let buttonNew = document.querySelector('#buttonNew') as HTMLButtonElement

buttonNew.addEventListener('click', () => {
  location.reload()
})
