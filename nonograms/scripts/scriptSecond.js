//Устанавливает ширину background-image в зависимости от ширины игрового поля (game-field)
export function setBackGroundSize(gameFieldWidth, elemWidthBackground)
{
  const percentPlayFieldArea = 27.24; /*Постоянный процент ширины от background-image 
                                       в котором должно разместиться игоровое поле.*/
  const newBackGroundSize = (gameFieldWidth / percentPlayFieldArea) * 100;
  elemWidthBackground.style.setProperty('--backGroundSize', newBackGroundSize + 'px');

  return newBackGroundSize;
}

export function setBackGroundPosition(currentSizeBgImg, elemWidthBackground)
{
  const headerHeight = elemWidthBackground.querySelector('header').offsetHeight;
  const tableWrapperHeight = elemWidthBackground.querySelector('.table-wrapper').offsetHeight;
  const bodyPaddingTop = parseInt(window.getComputedStyle(elemWidthBackground).paddingTop);

  //Коэффициент вычисляющий необходимую позицию для нижней границы игрового поля на background-image
  const positionCoefficient = 0.7724; 
  //Высота от верхней границы экрана до нижней границы игрового поля
  const heightTopFromBottom = headerHeight + tableWrapperHeight + bodyPaddingTop;
  //Высота отступа для background-image
  const newMarginTopBgImg = (currentSizeBgImg * positionCoefficient) - heightTopFromBottom;

  elemWidthBackground.style.setProperty('--backGroundPositionHeight', -newMarginTopBgImg + 'px');
}
