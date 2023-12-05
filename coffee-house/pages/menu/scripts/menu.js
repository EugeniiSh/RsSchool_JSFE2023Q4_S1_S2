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

/* ============================== +Modal Window+ ============================== */
const body = document.querySelector('.body');
const modalWindowBackground = document.querySelector('.modal-window__background');
const modalWindowContainer = document.querySelector('.modal-window__container');
const descriptionButtonClose = document.querySelector('.description__button-close');
// console.log(document.getElementsByName("additivesButton"));
// console.log(document.getElementById("sizeS").checked);
// console.log(body);


function setDefaultChecked()
{
    if(!(document.getElementById("sizeS").checked))
    {
        document.getElementById("sizeS").checked = true;
    }

    const additivesButton = document.getElementsByName("additivesButton");
    additivesButton.forEach((item) => {item.checked = false})
}

function setProductDescription(element)
{
    const elemImgUrl = getComputedStyle(element.children[0]).backgroundImage;
    const elemName = element.children[1].children[0].textContent;
    const descriptionObj = products.find(item => item.name == elemName);

    // console.log(products[0].name)
    // console.log(elemName)
    // console.log(descriptionObj)


    // Image
    const modalWindowImg = modalWindowContainer.querySelector('.preview-box img');
    modalWindowImg.src = `../../${elemImgUrl.slice(elemImgUrl.indexOf('assets'), -2)}`;
    // Title name and description
    const title = modalWindowContainer.querySelector('.description__title-box');
    title.children[0].textContent = descriptionObj.name;
    title.children[1].textContent = descriptionObj.description;
    // Size
    const sizeLetter = modalWindowContainer.querySelector('.size-buttons').querySelectorAll('.size-letter');
    // console.log(sizeLetter[0].parentNode.parentNode.parentNode.children[1].children[0].textContent);
    // console.log(descriptionObj.sizes)
    sizeLetter.forEach((item) =>
    {
        for(let key in descriptionObj.sizes)
        {
            if(key === item.textContent.toLocaleLowerCase())
            {
                const sizeText = item.parentNode.parentNode.parentNode.children[1].children[0];
                sizeText.textContent = descriptionObj.sizes[key].size;
            }
        }
    });

}

cardBlocks.forEach((item) => 
{
    item.addEventListener('click', (event) =>
    {
        // console.log(event.target);
        // let elem = getComputedStyle(event.target.children[0]);
        // console.log(elem.backgroundImage);
        // console.log(getComputedStyle(event.target.children[0]).backgroundImage.slice(getComputedStyle(event.target.children[0]).backgroundImage.indexOf('assets'), -2));
        // console.log(getComputedStyle(event.target.children[0]));
        // console.log(event.target.children[1].children[0].textContent);
        // console.log(modalWindowContainer.querySelector('.preview-box img').src);

        modalWindowBackground.classList.add('active__modal-window');
        body.classList.add('disabling-scrolling');
        setDefaultChecked();
        setProductDescription(event.target);
    })
})

descriptionButtonClose.addEventListener('click', () =>
{
    modalWindowBackground.classList.remove('active__modal-window');
    body.classList.remove('disabling-scrolling');
});

modalWindowBackground.addEventListener('click', (event) =>
{
    if(event.target.classList.contains('modal-window__background'))
    {
        modalWindowBackground.classList.remove('active__modal-window');
        body.classList.remove('disabling-scrolling');
    }
})
/* ============================== -Modal Window- ============================== */

// window.scrollTo(0, 0);
// const response = await fetch('../../../json/products.json');
// const products = await response.json();