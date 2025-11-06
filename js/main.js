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

const breakpoint = 576;
let partnersSlider;
function enableSwiper() {
    partnersSlider = new Swiper('.partners-slider', {
        slidesPerView: 'auto',
        speed: 1200,
        spaceBetween: 0,
        centerInsufficientSlides: 1
    });
}

function checkPartnersSlider() {
    const windowWidth = window.innerWidth;
    if (windowWidth >= breakpoint && !partnersSlider) {
        enableSwiper();
    } else if (windowWidth < breakpoint && partnersSlider) {
        partnersSlider.destroy(true, true);
        partnersSlider = null;
    }
}

window.addEventListener('load', checkPartnersSlider);
window.addEventListener('resize', checkPartnersSlider);



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
const mobMenu = document.querySelector('.header-mob__menu');

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


    if (target.closest('.result-message-close') || (target.closest('.result-modal') && !target.closest('.result-message'))) {
        target.closest('.show').classList.remove('show');
    }

    if (target.closest('.hot-line__close') || (target.closest('.hot-line-modal') && !target.closest('.hot-line__form'))) {
        target.closest('.show').classList.remove('show');
    }

    if (target.closest('.header-menu-btn')) {
        target.closest('.header-menu-btn').classList.toggle('open')
        mobMenu && mobMenu.classList.toggle('show')
    }

})

const isEmail = (value) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(value).trim());
};


const subscribeForm = document.querySelector('.mailing-section__form');
const subscribeEmailField = subscribeForm.querySelector('[name="email"]');
const agree = subscribeForm.querySelector('[name="agree"]');
const subscribeResModal = document.querySelector('.subscribe-res');

subscribeEmailField.addEventListener('input', (e) => {
    subscribeEmailField.classList.remove('err')
})

agree.addEventListener('change', (e) => {
    agree.classList.remove('err')
})

subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (subscribeForm.classList.contains('sending')) return
    if (!agree.checked) agree.classList.add('err')
    if (!isEmail(subscribeEmailField.value)) subscribeEmailField.classList.add('err');
    if (subscribeForm.querySelector('.err')) return;

    subscribeForm.classList.add('sending');
    $.ajax({
        url: 'ajax.php',
        type: 'POST',
        data: { email: subscribeEmailField.value },
        success: function (response) {
            console.log('Ответ сервера:', response);
            subscribeResModal.classList.add('show');
            subscribeForm.reset();
            subscribeForm.classList.remove('sending');
        },
        error: function (xhr, status, error) {
            console.error('Ошибка:', error);
            console.log('Произошла ошибка при отправке.');
            subscribeForm.classList.remove('sending');
        }
    });
})



const hotLineForm = document.querySelector('.hot-line__form');
const hotLineResult = document.querySelector('.hot-line-result');

const nameField = hotLineForm.querySelector('input[type="text"]');
const emailField = hotLineForm.querySelector('input[name="email"]');
const phoneField = hotLineForm.querySelector('input[name="phone"]');
const messageField = hotLineForm.querySelector('textarea');

[nameField, emailField, phoneField, messageField].forEach(el => {
    el.addEventListener('input', (e) => {
        el.classList.remove('error')
    })
})

hotLineForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (hotLineForm.classList.contains('sennding')) return;

    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const phone = phoneField.value.trim();
    const message = messageField.value.trim();


    let hasError = false;

    // Проверка имени
    if (name.length < 2 || !/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(name)) {
        nameField.classList.add('error');
        hasError = true;
    }

    // Проверка email
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
        emailField.classList.add('error');
        hasError = true;
    }

    // Проверка телефона
    if (!/^[\d\s()+-]{6,20}$/.test(phone)) {
        phoneField.classList.add('error');
        hasError = true;
    }

    // Проверка сообщения
    if (message.length < 3) {
        messageField.classList.add('error');
        hasError = true;
    }

    if (hasError) return;


    hotLineForm.classList.add('sennding');
    $.ajax({
        url: 'ajax.php',
        type: 'POST',
        data: {
            name: name,
            email: email,
            phone: phone,
            message: message
        },

        success: function (response) {
            console.log('Ответ сервера:', response);
            hotLineForm.reset();
            hotLineResult.classList.add('show');
        },
        error: function (xhr, status, error) {
            console.error('Ошибка:', error);
            console.log('Ошибка при отправке. Попробуйте позже.');
        },
        complete: function () {
            hotLineForm.classList.remove('sennding');
        }
    });
});

