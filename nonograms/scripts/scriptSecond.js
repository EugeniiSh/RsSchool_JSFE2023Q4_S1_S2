//Устанавливает ширину background-image в зависимости от ширины игрового поля (game-field)
export function setBackGroundSize(gameFieldWidth, elemWidthBackground)
{
  const percentPlayFieldArea = 26.9; /*Постоянный процент ширины от background-image 
                                       в котором должно разместиться игоровое поле.*/
  const newBackGroundSize = (gameFieldWidth / percentPlayFieldArea) * 100;
  elemWidthBackground.style.setProperty('--backGroundSize', newBackGroundSize + 'px');

  return newBackGroundSize;
}

//Устанавливает необходимые отступы background-image в зависимости от текущей ширины и высоты игрового поля (game-field)
export function setBackGroundPosition(currentSizeBgImg, elemWidthBackground)
{
  //Вычисление отступа сверху:
  const headerHeight = elemWidthBackground.querySelector('header').offsetHeight;
  const tableWrapperHeight = elemWidthBackground.querySelector('.table-wrapper').offsetHeight;
  const bodyPaddingTop = parseInt(window.getComputedStyle(elemWidthBackground).paddingTop);

  //Коэффициент вычисляющий необходимую позицию для нижней границы игрового поля на background-image
  //или как высоко вверх надо поднять background-image
  const coefficientPositionTop = 0.7724; 
  //Высота от верхней границы экрана до нижней границы игрового поля
  const heightTopFromBottom = headerHeight + tableWrapperHeight + bodyPaddingTop;
  //Высота отступа для background-image
  const newMarginTopBgImg = (currentSizeBgImg * coefficientPositionTop) - heightTopFromBottom;

  //Вычисление отступа слева:
  const gameField = elemWidthBackground.querySelector('.game-field');
  const gameFieldWidth = gameField.offsetWidth;
  const gameFieldMarginLeft =  gameField.offsetLeft;

  //Коэффициент вычисляющий необходимую позицию для правой границы игрового поля на background-image
  //или как далеко влево надо сместить background-image
  const coefficientPositionLeft = 0.653;
  //Ширина от левой границы экрана до правой границы игрового поля
  const widthLeftFromRight = gameFieldWidth + gameFieldMarginLeft;
  //Ширина отступа для background-image
  const newMarginLeftBgImg = (currentSizeBgImg * coefficientPositionLeft) - widthLeftFromRight;

  elemWidthBackground.style.setProperty('--backGroundPositionTop', -newMarginTopBgImg + 'px');
  elemWidthBackground.style.setProperty('--backGroundPositionLeft', -newMarginLeftBgImg + 'px');
}

//Адаптирует background-image под размеры игрового поля (game-field)
export function adaptationBgImg(gameFieldWidth, elemWidthBackground)
{
  const currentSizeBgImg = setBackGroundSize(gameFieldWidth, elemWidthBackground);
  setBackGroundPosition(currentSizeBgImg, elemWidthBackground);
}

//Возвращает имя класса shaded-Cell, с рандомным числом в конце, от 1 до 4
export function getRandomShadedCell(string)
{
  const randomNum = Math.floor(Math.random() * 4 + 1); //4 - количество вариантов закрашеных клеток
  return `${string}-${randomNum}`;
}

//Возвращает имя класса shaded-Cell в элементе, с текущим числом в конце. 
//Если такого класса нет, возвращает  shaded-Cell с рандомным числом.
export function getCurrentShadedCell(elem)
{
  for(let className of elem.classList)
  {
    if(className.includes('shaded-cell'))
    {
      return className;
    }
  }

  return getRandomShadedCell('shaded-cell');
} 
