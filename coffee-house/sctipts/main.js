/* ============================== +Burger menu+ ============================== */
const burgerButtonConteiner = document.querySelector('.heading__burger-button-conteiner');
const headingNavContainer = document.querySelector('.heading__nav-container');
const burgerButtonLine = document.querySelector('.burger-button__line');
const listItem = document.querySelectorAll('.list-item');

const heading = document.querySelector('.heading');
const offer = document.querySelector('.offer');


burgerButtonConteiner.addEventListener('click', () =>
{
    headingNavContainer.classList.toggle('activ-burger');
    burgerButtonLine.classList.toggle('activ-burger__line');
    heading.classList.toggle('active-heading');
    offer.classList.toggle('active-offer');
});

listItem.forEach((item) =>
{
    item.addEventListener('click', () =>
    {
        headingNavContainer.classList.remove('activ-burger');
        burgerButtonLine.classList.remove('activ-burger__line');
        heading.classList.remove('active-heading');
        offer.classList.remove('active-offer');
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
        offer.classList.remove('active-offer');
    }
});
/* ============================== -Burger menu- ============================== */

/* ============================ +Favorite Carusel+ ============================= */
const carouselBlocks = document.querySelector('.carousel-blocks');
const carouselArrowLeft = document.querySelector('.carousel-arrow-left');
const carouselArrowRight = document.querySelector('.carousel-arrow-right');
const paginationBlockItem = document.querySelectorAll('.pagination-block__item');

let position = 0;
let pagIndex = 0;

function nextSlide()
{
    if(position < ((paginationBlockItem.length - 1) * 580))
    {
        position += 580;
        pagIndex++;
    }
    else
    {
        position = 0;
        pagIndex = 0;
    }

    carouselBlocks.style.left = -position + 'px';
    // thisSlide(pagIndex);
}

function prevSlide()
{
    if(position > 0)
    {
        position -= 580;
        pagIndex--;
    }
    else
    {
        position = (paginationBlockItem.length - 1) * 580;
        pagIndex = paginationBlockItem.length;
    }

    carouselBlocks.style.left = -position + 'px';
    // thisSlide(pagIndex);
}

carouselArrowRight.addEventListener('click', nextSlide);
carouselArrowLeft.addEventListener('click', prevSlide);

setInterval(() =>
{
    nextSlide()
}, 
3000);
/* ============================ -Favorite Carusel- ============================= */

