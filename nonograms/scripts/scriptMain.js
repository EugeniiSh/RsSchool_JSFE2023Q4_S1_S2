import {nono} from './nonograms.js';

// const curentNono = nono.hard.dinosaur;
const curentNono = nono.midle.boat;
// const curentNono = nono.easy.candle;

const rowKeys = [];
const columKeys = [];
let count = 0;

// Get row keys
for(let i = 0; i < curentNono.length; i++)
{
  const tempRowKeys = [];

  for(let j = curentNono[i].length - 1; j >= 0; j--)
  {
    if(curentNono[i][j] === 1)
    {
      count++;
    }
    else
    {
      if(count > 0)
      {
        tempRowKeys.push(count);
        count = 0;
      }
    }
  }

  if(count > 0)
  {
    tempRowKeys.push(count);
    count = 0;
  }

  rowKeys.push(tempRowKeys);
}


count = 0;

// Get column keys
for(let i = 0; i < curentNono.length; i++)
{
  const tempColumKeys = [];

  for(let j = curentNono[i].length - 1; j >= 0; j--)
  {
    if(curentNono[j][i] === 1)
    {
      count++;
    }
    else
    {
      if(count > 0)
      {
        tempColumKeys.push(count);
        count = 0;
      }
    }
  }

  if(count > 0)
  {
    tempColumKeys.push(count);
    count = 0;
  }

  columKeys.push(tempColumKeys);
}

// Get game field
const maxLengthRowKeys = Math.max(...rowKeys.map((item) => item.length));
const maxLengthColumKeys = Math.max(...columKeys.map((item) => item.length));

const bodyTag = document.querySelector('body');
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
      if(columKeys[j][maxLengthColumKeys - 1 - i])
      {
        newCell.textContent = columKeys[j][maxLengthColumKeys - 1 - i];
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
        if(rowKeys[i - maxLengthColumKeys][maxLengthRowKeys - 1 - j])
        {
          newCell.textContent = rowKeys[i - maxLengthColumKeys][maxLengthRowKeys - 1 - j];
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

bodyTag.append(tableTag);
