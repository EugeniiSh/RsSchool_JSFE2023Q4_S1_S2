import {nono} from './nonograms.js';

const curentNono = nono.easy.candle;

const rowKeys = [];
const columKeys = [];
let count = 0;

// Get row keys
for(let i = 0; i < curentNono.length; i++)
{
  const tempRowKeys = [];

  for(let j = 0; j < curentNono[i].length; j++)
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
for(let i = 0; i < curentNono[0].length; i++)
{
  const tempColumKeys = [];

  for(let j = 0; j < curentNono.length; j++)
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

for(let i = 0; i < curentNono.length + maxLengthColumKeys; i++)
{
  const newRow = document.createElement('tr');

  for(let j = 0; j < curentNono[0].length + maxLengthRowKeys; j++)
  {
    let newCell;

    if(i < maxLengthRowKeys || j < maxLengthColumKeys)
    {
      newCell = document.createElement('th');
    }
    else
    {
      newCell = document.createElement('td');
    }
    
    newRow.append(newCell);
  }

  tableTag.append(newRow);
}

bodyTag.append(tableTag);
