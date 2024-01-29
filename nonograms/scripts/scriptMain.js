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
}

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

function getEndGame()
{
  const gameField = document.querySelector('.game-field');
  gameField.classList.add('active__end-game');

  mainVar.isGameStart = false;
  mainVar.endGame = Date.now();
  alert(`Great! You have solved the nonogram in ${Math.floor(mainVar.elapsedTime / 1000)} seconds!`);
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

    // if(index === 0)
    // {
    //   option.setAttribute('selected', 'selected');
    // }

    select.append(option);
  })

  div.append(p);
  div.append(select);
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

function loadPage(curentNono)
{
  getRowKeys(curentNono);
  getColumnKeys(curentNono);

  const header = document.createElement('header');
  const main = document.createElement('main');

  const timer = document.createElement('p');
  timer.classList.add('header__timer');

  const menu = document.createElement('div');
  menu.classList.add('main__menu');
  menu.append(getKeySelect(nono, 'difficulty'));
  menu.append(getKeySelect(nono.easy, 'nonograms'));

  header.append(timer);
  main.append(getGameField(curentNono));
  main.append(menu);

  bodyTag.append(header);
  bodyTag.append(main);

  displayTimer();
}

loadPage(curentNono);

// Init Game
const gameField = bodyTag.querySelectorAll('td');
const copyCurrentNono = curentNono.slice();

gameField.forEach((item, index) =>
{
  item.addEventListener('click', (event) =>
  {
    item.classList.toggle('shaded-cell');

    if(!mainVar.isGameStart)
    {
      mainVar.isGameStart = true;
      mainVar.startGame = Date.now();
      displayTimer();
    }

    const rowField = Math.floor(index / curentNono[0].length);
    const columField = index - (rowField * curentNono[0].length);

    if(copyCurrentNono[rowField][columField] === 1)
    {
      copyCurrentNono[rowField][columField] = 0;
    }
    else
    {
      copyCurrentNono[rowField][columField] = 1;
    }

    mainVar.isWin = !copyCurrentNono.some((item) => item.some((item2) => item2 === 1));

    if(mainVar.isWin)
    {
      setTimeout(getEndGame, 10);
    }
  })
})

// Change nonograms select
const difficulty = document.querySelector('.difficulty');

difficulty.addEventListener('change', (event) =>
{
  const nonoDivSelect = document.querySelectorAll('.menu-item')[1];
  const options = difficulty.options[difficulty.options.selectedIndex].textContent
  const newNonoDivSelect = getKeySelect(nono[options], 'nonograms');

  nonoDivSelect.replaceWith(newNonoDivSelect);
  changeCurentNono();

  const gameField = document.querySelector('.game-field');

  getRowKeys(curentNono);
  getColumnKeys(curentNono);
  gameField.replaceWith(getGameField(curentNono));
});


