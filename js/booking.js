// Слайдер и кнопка "Подробнее"

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const moreButton = card.querySelector('.card__more');
        const hideButton = card.querySelector('.card__hide');
        const iconsMore = card.querySelector('.card__icons-more');
        const additionalInfo = card.querySelector('.card__additional-info');

        moreButton.addEventListener('click', function () {
            iconsMore.style.opacity = '0';
            setTimeout(() => {
                iconsMore.style.display = 'none';
                additionalInfo.style.display = 'block';
                additionalInfo.style.maxHeight = '1000px';
                additionalInfo.style.opacity = '1';
            }, 400);
        });

        hideButton.addEventListener('click', function () {
            additionalInfo.style.maxHeight = '0';
            additionalInfo.style.opacity = '0';
            iconsMore.style.display = 'flex';
            setTimeout(() => {
                iconsMore.style.opacity = '1';
            }, 400);
        });

        const slider = card.querySelector('.slider__slides');
        const slides = card.querySelectorAll('.slider__slide');
        const prevButton = card.querySelector('.slider__arrow--prev');
        const nextButton = card.querySelector('.slider__arrow--next');

        let currentIndex = 0;
        let slideWidth = slides[0].offsetWidth;
        let isDragging = false;
        let startX, startScrollLeft;

        function showSlide(index) {
            slider.style.transform = `translateX(-${index * slideWidth}px)`;
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        }

        function resetSlider() {
            currentIndex = 0;
            showSlide(currentIndex);
        }

        function updateSlideWidth() {
            slideWidth = slides[0].offsetWidth;
            showSlide(currentIndex);
        }

        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);

        slider.addEventListener('touchstart', function (e) {
            isDragging = true;
            startX = e.touches[0].pageX;
            startScrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('touchmove', function (e) {
            if (!isDragging) return;
            const x = e.touches[0].pageX;
            const walk = (x - startX) * 2;
            slider.scrollLeft = startScrollLeft - walk;
        });

        slider.addEventListener('touchend', function (e) {
            isDragging = false;
        });

        function checkScreenSize() {
            if (window.innerWidth <= 1280) {
                resetSlider();
            }
            updateSlideWidth();
        }

        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    });
});

// Центрирование модального окна

function centerBlock() {
    const paymentBlock = document.querySelector('.payment');
    const bodyHeight = document.body.clientHeight;
    const blockHeight = paymentBlock.clientHeight;

    const topPosition = (bodyHeight) / 2;

    paymentBlock.style.top = `${topPosition}px`;
}

window.addEventListener('load', centerBlock);
window.addEventListener('resize', centerBlock);

// Функционал модального окна

document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.querySelector('.overlay');
    const paymentModal = document.querySelector('.payment');
    const paymentBackButton = document.querySelector('.payment__back');
    const paymentChangeButton = document.querySelector('.conditions__button');
    const nightsSelect = document.querySelector('select[name="nights"]');
    const peopleSelect = document.querySelector('select[name="people"]');
    const dateInInput = document.querySelector('.booking__input');
    const dateInPlaceholder = document.querySelector('.booking__placeholder');
    const paymentTotal = document.querySelector('.payment__text.bank__text');
    const paymentDateIn = document.getElementById('payment-date-in');
    const paymentDateOut = document.getElementById('payment-date-out');
    const paymentGuests = document.getElementById('payment-guests');
    const paymentNights = document.getElementById('payment-nights');
    const paymentImage = document.getElementById('payment-image');
    const paymentServiceTitle = document.getElementById('payment-service-title');
    const paymentServicePrice = document.getElementById('payment-service-price');
    const bookingForm = document.querySelector('.booking__filter');

    const calendarIcon = document.querySelector('.booking__calendar');
    const arrowIcons = document.querySelectorAll('.booking__arrow');

    function resetStyles(element) {
        element.style.borderColor = '#606c38';
        element.style.color = '';
        dateInPlaceholder.style.color = '';
        changeIconColor([calendarIcon], '#606c38', 'fill');
        arrowIcons.forEach(arrow => changeIconColor([arrow], '#606c38', 'stroke'));
    }

    function changeIconColor(elements, color, attribute) {
        elements.forEach(element => {
            if (element.nodeName === 'svg') {
                element.querySelectorAll('path').forEach(path => {
                    path.style[attribute] = color;
                });
            } else {
                element.style[attribute] = color;
            }
        });
    }

    function addTransition(elements, duration) {
        elements.forEach(element => {
            if (element.nodeName === 'svg') {
                element.querySelectorAll('path').forEach(path => {
                    path.style.transition = `all ${duration}s ease`;
                });
            } else {
                element.style.transition = `all ${duration}s ease`;
            }
        });
    }

    addTransition([calendarIcon, ...arrowIcons], 0.3);

    dateInInput.addEventListener('focus', function () {
        resetStyles(this);
        changeIconColor([calendarIcon], '#283618', 'fill');
    });

    dateInInput.addEventListener('blur', function () {
        changeIconColor([calendarIcon], '#606c38', 'fill');
    });

    dateInInput.addEventListener('input', function () {
        if (this.value) {
            dateInPlaceholder.style.display = 'none';
        } else {
            dateInPlaceholder.style.display = 'block';
        }
        resetStyles(this);
    });

    document.querySelectorAll('.card__button').forEach(button => {
        button.addEventListener('click', function () {
            const price = parseFloat(this.getAttribute('data-price'));
            const title = this.getAttribute('data-title');
            const imageSrc = this.getAttribute('data-image');
            const nights = nightsSelect.options[nightsSelect.selectedIndex].text;
            const people = peopleSelect.options[peopleSelect.selectedIndex].text;
            const dateIn = dateInInput.value;

            let isValid = true;
            let invalidElements = [];

            if (!dateIn) {
                dateInInput.style.borderColor = '#bc6c25';
                dateInInput.style.color = '#bc6c25';
                dateInPlaceholder.style.color = '#bc6c25';
                changeIconColor([calendarIcon], '#bc6c25', 'fill');
                invalidElements.push(dateInInput);
                isValid = false;
            } else {
                resetStyles(dateInInput);
            }

            if (nights === 'Количество ночей') {
                nightsSelect.style.borderColor = '#bc6c25';
                nightsSelect.style.color = '#bc6c25';
                changeIconColor([arrowIcons[0]], '#bc6c25', 'stroke');
                invalidElements.push(nightsSelect);
                isValid = false;
            } else {
                resetStyles(nightsSelect);
            }

            if (people === 'Количество гостей') {
                peopleSelect.style.borderColor = '#bc6c25';
                peopleSelect.style.color = '#bc6c25';
                changeIconColor([arrowIcons[1]], '#bc6c25', 'stroke');
                invalidElements.push(peopleSelect);
                isValid = false;
            } else {
                resetStyles(peopleSelect);
            }

            if (!isValid) {
                bookingForm.scrollIntoView({ behavior: 'smooth' });

                setTimeout(() => {
                    invalidElements.forEach(element => {
                        resetStyles(element);
                    });
                }, 3000);

                return;
            }

            const dateOut = new Date(new Date(dateIn).getTime() + (parseInt(nights) * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
            const totalPrice = price * parseInt(nights);

            paymentImage.src = imageSrc;
            paymentServiceTitle.textContent = title;
            paymentServicePrice.textContent = `${price} р. ночь`;
            paymentTotal.textContent = `К оплате: ${totalPrice} р.`;
            paymentDateIn.textContent = dateIn;
            paymentDateOut.textContent = dateOut;
            paymentGuests.textContent = people;
            paymentNights.textContent = nights;

            overlay.style.display = 'block';
            paymentModal.style.display = 'block';
        });
    });

    paymentBackButton.addEventListener('click', function () {
        overlay.style.display = 'none';
        paymentModal.style.display = 'none';
    });

    paymentChangeButton.addEventListener('click', function () {
        bookingForm.scrollIntoView({ behavior: 'smooth' });
        overlay.style.display = 'none';
        paymentModal.style.display = 'none';
    });

    document.querySelectorAll('.booking__select').forEach((select, index) => {
        select.addEventListener('focus', function () {
            resetStyles(this);
            changeIconColor([arrowIcons[index]], '#283618', 'stroke');
        });

        select.addEventListener('blur', function () {
            changeIconColor([arrowIcons[index]], '#606c38', 'stroke');
        });

        select.addEventListener('mousedown', function () {
            changeIconColor([arrowIcons[index]], '#283618', 'stroke');
        });

        select.addEventListener('mouseup', function () {
            changeIconColor([arrowIcons[index]], '#606c38', 'stroke');
        });

        select.addEventListener('mouseenter', function () {
            if (!select.value) {
                resetStyles(this);
                changeIconColor([arrowIcons[index]], '#283618', 'stroke');
            }
        });

        select.addEventListener('mouseleave', function () {
            if (!select.value) {
                changeIconColor([arrowIcons[index]], '#606c38', 'stroke');
            }
        });

        select.addEventListener('click', function () {
            changeIconColor([arrowIcons[index]], '#283618', 'stroke');
        });
    });

    document.querySelectorAll('.booking__input, .booking__select').forEach((input, index) => {
        input.addEventListener('mouseenter', function () {
            if (!input.value) {
                resetStyles(this);
                if (input === dateInInput) {
                    changeIconColor([calendarIcon], '#283618', 'fill');
                } else {
                    changeIconColor([arrowIcons[index - 1]], '#283618', 'stroke');
                }
            }
        });

        input.addEventListener('mouseleave', function () {
            if (!input.value) {
                if (input === dateInInput) {
                    changeIconColor([calendarIcon], '#606c38', 'fill');
                } else {
                    changeIconColor([arrowIcons[index - 1]], '#606c38', 'stroke');
                }
            }
        });

        input.addEventListener('mousedown', function () {
            if (input === dateInInput) {
                changeIconColor([calendarIcon], '#283618', 'fill');
            } else {
                changeIconColor([arrowIcons[index - 1]], '#283618', 'stroke');
            }
        });

        input.addEventListener('mouseup', function () {
            if (input === dateInInput) {
                changeIconColor([calendarIcon], '#606c38', 'fill');
            } else {
                changeIconColor([arrowIcons[index - 1]], '#606c38', 'stroke');
            }
        });

        input.addEventListener('click', function () {
            if (input === dateInInput) {
                changeIconColor([calendarIcon], '#283618', 'fill');
            } else {
                changeIconColor([arrowIcons[index - 1]], '#283618', 'stroke');
            }
        });
    });

    calendarIcon.addEventListener('mouseenter', function () {
        if (!dateInInput.value) {
            changeIconColor([calendarIcon], '#283618', 'fill');
        }
    });

    calendarIcon.addEventListener('mouseleave', function () {
        if (!dateInInput.value) {
            changeIconColor([calendarIcon], '#606c38', 'fill');
        }
    });

    calendarIcon.addEventListener('mousedown', function () {
        changeIconColor([calendarIcon], '#283618', 'fill');
    });

    calendarIcon.addEventListener('mouseup', function () {
        changeIconColor([calendarIcon], '#606c38', 'fill');
    });

    calendarIcon.addEventListener('click', function () {
        changeIconColor([calendarIcon], '#283618', 'fill');
    });
});