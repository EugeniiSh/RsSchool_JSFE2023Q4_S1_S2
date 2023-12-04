/* ============================== +Burger menu+ ============================== */
const burgerButtonConteiner = document.querySelector('.heading__burger-button-conteiner');
const headingNavContainer = document.querySelector('.heading__nav-container');
const burgerButtonLine = document.querySelector('.burger-button__line');
const listItem = document.querySelectorAll('.list-item');

const heading = document.querySelector('.heading');
const menu = document.querySelector('.menu');


burgerButtonConteiner.addEventListener('click', () =>
{
    headingNavContainer.classList.toggle('activ-burger');
    burgerButtonLine.classList.toggle('activ-burger__line');
    heading.classList.toggle('active-heading');
    menu.classList.toggle('active-offer');
});

listItem.forEach((item) =>
{
    item.addEventListener('click', () =>
    {
        headingNavContainer.classList.remove('activ-burger');
        burgerButtonLine.classList.remove('activ-burger__line');
        heading.classList.remove('active-heading');
        menu.classList.remove('active-offer');
    });
});

window.addEventListener('resize',() =>
{
    const width = document.body.clientWidth;
    if(width > 768)
    {
        headingNavContainer.classList.remove('activ-burger');
        burgerButtonLine.classList.remove('activ-burger__line');
        heading.classList.remove('active-heading');
        menu.classList.remove('active-offer');
    }
});
/* ============================== -Burger menu- ============================== */

/* ============================== +Menu Section+ ============================== */

//- - - - - -  +Switch menu+ - - - - - -
const menuGridContainer = document.querySelector('.menu__grid-container');
const menuButtonInput = document.querySelectorAll('.menu-button__input');
const menuBlocks = document.querySelectorAll('.menu-block');
const menuContainerCoffee = document.querySelector('.menu-container__coffee');
const menuContainerTea = document.querySelector('.menu-container__tea');
const menuContainerDessert = document.querySelector('.menu-container__dessert');
const menuRefreshButtonContainer = document.querySelector('.menu__refresh-button-container');


menuButtonInput.forEach((item, index) => 
{
    item.addEventListener('change', () =>
    {
        for (let block of menuBlocks)
        {
            block.classList.remove('active-menu-container');
            block.classList.remove('active__full-height');
            menuGridContainer.classList.remove('active__menu-tea');
        }

        switch(true)
        {
            case(index === 0): 
                menuContainerCoffee.classList.add('active-menu-container');
                menuRefreshButtonContainer.classList.add('active-block');
            break;

            case(index === 1): 
                menuGridContainer.classList.add('active__menu-tea');
                menuContainerTea.classList.add('active-menu-container');
                menuRefreshButtonContainer.classList.remove('active-block');
            break;

            case(index === 2): 
                menuContainerDessert.classList.add('active-menu-container');
                menuRefreshButtonContainer.classList.add('active-block');
            break;
        };
    });
});

menuRefreshButtonContainer.addEventListener('click', () =>
{
    menuBlocks.forEach((item) => 
    {
        item.classList.add('active__full-height');
    })

    menuRefreshButtonContainer.classList.remove('active-block');
})
//- - - - - -  -Switch menu- - - - - - -

//- - - - - - -  +Load menu+ - - - - - - -
// const response = await fetch('../../../json/products.json');
// const products = await response.json();

import products from '../../../json/products.json' assert {type: 'json'};
console.log(products);

const cardBlocks = document.querySelectorAll('.card-block');

function loadCardDescription(elem, num)
{
    elem.children[1].children[0].textContent = `${products[num].name}`;
    elem.children[1].children[1].textContent = `${products[num].description}`;
    elem.children[1].children[2].textContent = `$${products[num].price}`;
}

cardBlocks.forEach((item, index) => 
{
    loadCardDescription(item, index);
})
//- - - - - - -  -Load menu- - - - - - - -

/* ============================== -Menu Section- ============================== */


