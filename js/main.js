const mainScreenBgSlider = new Swiper('.main-screen-bg-slider', {
    slidesPerView: 1,
    speed: 1200,
    spaceBetween: 20,
    loop: 1,
    autoplay: {
        delay: 3000,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
});



const partnersSlider = new Swiper('.partners-slider', {
    slidesPerView: 'auto',
    speed: 1200,
    spaceBetween: 0,
    centerInsufficientSlides: 1
});



const applicationSlider = new Swiper('.application-slider', {
    slidesPerView: 1,
    speed: 1200,
    spaceBetween: 20,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    navigation: {
        nextEl: '.application .swiper-button-next',
        prevEl: '.application .swiper-button-prev',
    },
});


const mediaSectionSlider = new Swiper('.media-section__slider', {
    slidesPerView: 'auto',
    speed: 1200,
    spaceBetween: 0,
    navigation: {
        nextEl: '.media-section .swiper-button-next',
        prevEl: '.media-section .swiper-button-prev',
    },
});



$(".toggle-item__head").on("click", function () {
    const parent = $(this).parent('.toggle-item');
    const toggleBody = parent.find('.toggle-item__body');
    const innerContent = toggleBody.find('.toggle-item__inner');
    const itemHeadHeight = $(this).outerHeight();

    if (parent.hasClass('open')) {
        parent.removeClass('open');
        parent.removeClass('open-finish');
        // innerContent.css({
        //     'margin-top': `0`
        // });
        setTimeout(() => {
            toggleBody.slideUp("slow", function () {
                console.log('close');
            });
        }, 300)
    } else {

        parent.addClass('open');
        innerContent.css({
            'margin-top': `-${itemHeadHeight - 30}px`
        })
        toggleBody.slideDown("slow", function () {
            console.log('close');
            parent.addClass('open-finish');
        });
    }



});


const searchModal = document.querySelector('.search-modal');
const hotLineModal = document.querySelector('.hot-line-modal');

document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.header-search')) {
        searchModal && searchModal.classList.add('show');
    }

    if (target.closest('.search-modal__close') || (target.closest('.search-modal') && !target.closest('.search-modal__content'))) {
        searchModal && searchModal.classList.remove('show');
    }


    if (target.closest('.mailing-section__hot-line')) {
        e.preventDefault()
        hotLineModal && hotLineModal.classList.add('show');
    }


    if (target.closest('.hot-line__close') || (target.closest('.hot-line-modal') && !target.closest('.hot-line__form'))) {
        hotLineModal && hotLineModal.classList.remove('show');
    }
})