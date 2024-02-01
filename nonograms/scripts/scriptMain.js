import {nono} from './nonograms.js';

const bodyTag = document.querySelector('body');
// const curentNono = nono.hard.dinosaur;
// const curentNono = nono.midle.boat;
let curentNono = nono.easy.candle;
console.log(curentNono);

const mainVar =
{
  rowKeys: [],
  columKeys: [],
  count: 0,
  isWin: false,
  isGameStart: false,
  startGame: 0,
  endGame: 0,
  elapsedTime: 0,
  copyCurrentNono: [],
  currentGame: [],
}



// console.log(getEmptyMatrix(curentNono.length, curentNono[0].length));
// console.log(new Array(curentNono.length).fill(0));

function getRowKeys(curentNono)
{
  mainVar.rowKeys.length = 0;

  for(let i = 0; i < curentNono.length; i++)
  {
    const tempRowKeys = [];

    for(let j = curentNono[i].length - 1; j >= 0; j--)
    {
      if(curentNono[i][j] === 1)
      {
        mainVar.count++;
      }
      else
      {
        if(mainVar.count > 0)
        {
          tempRowKeys.push(mainVar.count);
          mainVar.count = 0;
        }
      }
    }

    if(mainVar.count > 0)
    {
      tempRowKeys.push(mainVar.count);
      mainVar.count = 0;
    }

    mainVar.rowKeys.push(tempRowKeys);
  }

  mainVar.count = 0;
}

function getColumnKeys(curentNono)
{
  mainVar.columKeys.length = 0;

  for(let i = 0; i < curentNono.length; i++)
  {
    const tempColumKeys = [];

    for(let j = curentNono[i].length - 1; j >= 0; j--)
    {
      if(curentNono[j][i] === 1)
      {
        mainVar.count++;
      }
      else
      {
        if(mainVar.count > 0)
        {
          tempColumKeys.push(mainVar.count);
          mainVar.count = 0;
        }
      }
    }

    if(mainVar.count > 0)
    {
      tempColumKeys.push(mainVar.count);
      mainVar.count = 0;
    }

    mainVar.columKeys.push(tempColumKeys);
  }

  mainVar.count = 0;
}

function getGameField(curentNono)
{
  const maxLengthRowKeys = Math.max(...mainVar.rowKeys.map((item) => item.length));
  const maxLengthColumKeys = Math.max(...mainVar.columKeys.map((item) => item.length));

  const tableTag = document.createElement('table');
  tableTag.classList.add('game-field');

  for(let i = 0; i < curentNono.length + maxLengthColumKeys; i++)
  {
    const newRow = document.createElement('tr');

    if(i < maxLengthColumKeys)
    {
      // loop to create first rows with keys
      for(let j = 0; j < curentNono[0].length; j++)
      {
        let newCell;
        newCell = document.createElement('th');

        // set the attributes for merging in the first cell
        if(j === 0 && i === 0)
        {
          newCell.setAttribute('colspan', maxLengthRowKeys);
          newCell.setAttribute('rowspan', maxLengthColumKeys);
          newRow.append(newCell);
          newCell = document.createElement('th');
        }

        // write the key in the cell if there is one
        if(mainVar.columKeys[j][maxLengthColumKeys - 1 - i])
        {
          newCell.textContent = mainVar.columKeys[j][maxLengthColumKeys - 1 - i];
        }
        
        newRow.append(newCell);
      }
    }
    else
    {
      // loop to create all other rows
      for(let j = 0; j < curentNono[0].length + maxLengthRowKeys; j++)
      {
        let newCell;

        if(i < maxLengthColumKeys || j < maxLengthRowKeys)
        {
          newCell = document.createElement('th');

          // write the key in the cell if there is one
          if(mainVar.rowKeys[i - maxLengthColumKeys][maxLengthRowKeys - 1 - j])
          {
            newCell.textContent = mainVar.rowKeys[i - maxLengthColumKeys][maxLengthRowKeys - 1 - j];
          }
        }
        else
        {
          newCell = document.createElement('td');
        }
      
        newRow.append(newCell)
      }
    }
    
    tableTag.append(newRow);
  }

  return tableTag;
}

function displayTimer()
{
  if(mainVar.isGameStart)
  {
    const elapsetTime = Date.now() - mainVar.startGame;
    mainVar.elapsedTime = elapsetTime;
    const second = Math.floor(elapsetTime / 1000);
    const minuts = Math.floor(second / 60);

    const timer = document.querySelector('.header__timer');
    timer.textContent = 
    `Timer: ${minuts.toString().padStart(2, '0')}:${(second % 60).toString().padStart(2, '0')}`;
    setTimeout(displayTimer, 1000);
  }
  else
  {
    const timer = document.querySelector('.header__timer');
    timer.textContent = `Timer: 00:00`;
  }
}

function resetTimer()
{
  mainVar.isGameStart = false;
  mainVar.startGame = 0;
  mainVar.endGame = 0;
  mainVar.elapsedTime = 0;
}

function getEndGame()
{
  const gameField = document.querySelector('.game-field');
  gameField.classList.add('active__end-game');
  playSound(gameField);

  mainVar.isGameStart = false;
  mainVar.endGame = Date.now();
  setTimeout(alert, 10, `Great! You have solved the nonogram in ${Math.floor(mainVar.elapsedTime / 1000)} seconds!`);
}

function getKeySelect(obj, label)
{
  const div = document.createElement('div');
  const p = document.createElement('p');
  const select = document.createElement('select');
  
  div.classList.add('menu-item');
  select.classList.add(label);
  p.textContent = label;

  Object.keys(obj).forEach((item, index) => 
  {
    const option = document.createElement('option');
    option.textContent = item;

    select.append(option);
  })

  div.append(p);
  div.append(select);
  return div;
}

function getButton(label)
{
  const div = document.createElement('div');
  const p = document.createElement('p');
  const button = document.createElement('button');
  
  div.classList.add('menu-item');
  button.classList.add(label);
  button.textContent = 'click!'
  p.textContent = label;

  div.append(p);
  div.append(button);
  return div;
}

function changeCurentNono()
{
  const difficulty = document.querySelector('.difficulty');
  const nonograms = document.querySelector('.nonograms');

  const diffValue = difficulty.options[difficulty.options.selectedIndex].textContent;
  const nonoValue = nonograms.options[nonograms.options.selectedIndex].textContent;

  curentNono = nono[diffValue][nonoValue];
}

function setNonoHead()
{
  const nonograms = document.querySelector('.nonograms');
  const head = document.querySelector('.header__head'); 

  const nonoValue = nonograms.options[nonograms.options.selectedIndex].textContent;
  head.textContent = nonoValue;
}

function playSound(element)
{
  const audio = document.querySelector('.audio-sounds');

  switch(true)
  {
    case(element.classList.contains('shaded-cell')):
      audio.src = `assets/sound/fit.mp3`;
      break;
    case(element.classList.contains('crossed-cell')):
      audio.src = `assets/sound/puh.mp3`;
      break;
    case(element.classList.contains('active__end-game')):
      audio.src = `assets/sound/trrr.mp3`;
      break;
    default: audio.src = `assets/sound/fjuh.mp3`;
  }

  audio.play();
}

function getEmptyMatrix(rows, columns)
{
  return new Array(rows).fill(0).map((item) => item = new Array(columns).fill(0))
}

function setCurrentGameValue(element, row, column)
{
  switch(true)
  {
    case(element.classList.contains('shaded-cell')):
      mainVar.currentGame[row][column] = 1;
      break;
    case(element.classList.contains('crossed-cell')):
      mainVar.currentGame[row][column] = 2;
      break;
    default: mainVar.currentGame[row][column] = 0;
  }
}

function addEventToNonoSelect(element)
{
  element.addEventListener('change', (event) =>
  {
    changeCurentNono();

    const gameField = document.querySelector('.game-field');

    getRowKeys(curentNono);
    getColumnKeys(curentNono);
    gameField.replaceWith(getGameField(curentNono));

    setNonoHead();
    resetTimer();
    initGame();
  })
}

function fillGameField(filledArr)
{
  const allTd = document.querySelectorAll('td');

  allTd.forEach((item, index) =>
  {
    const rowField = Math.floor(index / curentNono[0].length);
    const columField = index - (rowField * curentNono[0].length);

    switch(filledArr[rowField][columField])
    {
      case(1): item.className = 'shaded-cell';
        break;
      case(2): item.className = 'crossed-cell';
        break;
      default: item.className = '';
    }
  })
}

function initGame()
{
  const gameField = bodyTag.querySelectorAll('td');
  mainVar.currentGame = getEmptyMatrix(curentNono.length, curentNono[0].length);
  mainVar.copyCurrentNono = curentNono.map((item) => item.slice());

  gameField.forEach((item, index) =>
  {
    item.addEventListener('click', (event) =>
    {
      item.classList.remove('crossed-cell');
      item.classList.toggle('shaded-cell');
      playSound(item);

      if(!mainVar.isGameStart)
      {
        mainVar.isGameStart = true;
        mainVar.startGame = Date.now();
        displayTimer();
      }

      const rowField = Math.floor(index / curentNono[0].length);
      const columField = index - (rowField * curentNono[0].length);

      if(mainVar.copyCurrentNono[rowField][columField] === 1)
      {
        mainVar.copyCurrentNono[rowField][columField] = 0;
      }
      else
      {
        mainVar.copyCurrentNono[rowField][columField] = 1;
      }
      
      setCurrentGameValue(item, rowField, columField);
      mainVar.isWin = !mainVar.copyCurrentNono.some((item) => item.some((item2) => item2 === 1));

      if(mainVar.isWin)
      {
        setTimeout(getEndGame, 10);
      }

      console.log('curentNono - ', curentNono);
      console.log('filling - ', mainVar.copyCurrentNono);
      console.log('curentGame - ', mainVar.currentGame);
    });

    item.addEventListener('contextmenu', (event) =>
    {
      event.preventDefault();
      item.classList.remove('shaded-cell');
      item.classList.toggle('crossed-cell');
      playSound(item);

      if(!mainVar.isGameStart)
      {
        mainVar.isGameStart = true;
        mainVar.startGame = Date.now();
        displayTimer();
      }

      const rowField = Math.floor(index / curentNono[0].length);
      const columField = index - (rowField * curentNono[0].length);

      setCurrentGameValue(item, rowField, columField);
      mainVar.copyCurrentNono[rowField][columField] = curentNono[rowField][columField]

      console.log('curentNono - ', curentNono);
      console.log('filling - ', mainVar.copyCurrentNono);
      console.log('curentGame - ', mainVar.currentGame);
    })
  })
}

function loadPage(curentNono)
{
  getRowKeys(curentNono);
  getColumnKeys(curentNono);

  const header = document.createElement('header');
  const main = document.createElement('main');
  const audio = document.createElement('audio');
  audio.classList.add('audio-sounds');
  // audio.setAttribute('src', '../assets');

  const head = document.createElement('h1');
  const timer = document.createElement('p');
  head.classList.add('header__head');
  timer.classList.add('header__timer');

  const menu = document.createElement('div');
  menu.classList.add('main__menu');
  menu.append(getKeySelect(nono, 'difficulty'));
  menu.append(getKeySelect(nono.easy, 'nonograms'));
  menu.append(getButton('reset-game'));
  menu.append(getButton('save-game'));
  menu.append(getButton('continues'));
  

  header.append(head);
  header.append(timer);
  main.append(audio);
  main.append(getGameField(curentNono));
  main.append(menu);

  bodyTag.append(header);
  bodyTag.append(main);

  setNonoHead();
  displayTimer();
}

loadPage(curentNono);
initGame();

// ===================================================================================
// =============================== + EVENTS + ========================================
// ===================================================================================

// Change difficulty select
const difficulty = document.querySelector('.difficulty');

difficulty.addEventListener('change', (event) =>
{
  const nonoDivSelect = document.querySelectorAll('.menu-item')[1];
  const options = difficulty.options[difficulty.options.selectedIndex].textContent
  const newNonoDivSelect = getKeySelect(nono[options], 'nonograms');
  
  nonoDivSelect.replaceWith(newNonoDivSelect);

  // Change nonograms select (after change difficulty)
  const newNonoSelect = document.querySelector('.nonograms');
  addEventToNonoSelect(newNonoSelect);

  changeCurentNono();

  const gameField = document.querySelector('.game-field');

  getRowKeys(curentNono);
  getColumnKeys(curentNono);
  gameField.replaceWith(getGameField(curentNono));

  setNonoHead();
  resetTimer();
  initGame();
});

// Change nonograms select
const nonoSelect = document.querySelector('.nonograms');
addEventToNonoSelect(nonoSelect);

// Reset game
const resetGame = document.querySelector('.reset-game');
resetGame.addEventListener('click', (event) =>
{
  const gameField = document.querySelector('.game-field');
  const allTd = document.querySelectorAll('td');

  gameField.classList.remove('active__end-game');

  allTd.forEach((item) => 
  {
    item.className = '';
  })

  mainVar.currentGame = getEmptyMatrix(curentNono.length, curentNono[0].length);
  mainVar.copyCurrentNono = curentNono.map((item) => item.slice());
  resetTimer();
});

// Save game
const saveGame = document.querySelector('.save-game');
saveGame.addEventListener('click', (event) =>
{
  const difficulty = document.querySelector('.difficulty');
  const nonoSelect = document.querySelector('.nonograms');

  const currentGameInfo =
  {
    difficulty: difficulty.options[difficulty.options.selectedIndex].textContent,
    nonogram: nonoSelect.options[nonoSelect.options.selectedIndex].textContent,
    difficultyIndex: difficulty.options.selectedIndex,
    nonogramIndex: nonoSelect.options.selectedIndex,
    guess: mainVar.copyCurrentNono,
    fillingFileld: mainVar.currentGame,
    elapsedTime: mainVar.elapsedTime, 
  }

  localStorage.setItem('last-game', JSON.stringify(currentGameInfo));
  alert('Game saved!');
});

// Load game
const loadGame = document.querySelector('.continues');
loadGame.addEventListener('click', (event) =>
{
  const lastGameInfo = JSON.parse(localStorage.getItem('last-game'));
  const difficulty = document.querySelector('.difficulty');

  if(lastGameInfo)
  {
    //Change difficulty select
    difficulty.options.selectedIndex = lastGameInfo.difficultyIndex; 

    // Change div block with nonoSelect and add events
    const nonoDivSelect = document.querySelectorAll('.menu-item')[1];
    const newNonoDivSelect = getKeySelect(nono[lastGameInfo.difficulty], 'nonograms');
    nonoDivSelect.replaceWith(newNonoDivSelect);
    const newNonoSelect = document.querySelector('.nonograms');
    newNonoSelect.options.selectedIndex = lastGameInfo.nonogramIndex; //Change nono select
    addEventToNonoSelect(newNonoSelect);

    changeCurentNono();

    const gameField = document.querySelector('.game-field');

    getRowKeys(curentNono);
    getColumnKeys(curentNono);
    gameField.replaceWith(getGameField(curentNono));

    setNonoHead();
    initGame();

    mainVar.copyCurrentNono = lastGameInfo.guess;
    mainVar.currentGame = lastGameInfo.fillingFileld;
    fillGameField(lastGameInfo.fillingFileld);

    mainVar.startGame = Date.now() - lastGameInfo.elapsedTime;
    mainVar.isGameStart = true;
    displayTimer();
  }
  else
  {
    alert('No saved games!')
  }
});



