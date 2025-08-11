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
