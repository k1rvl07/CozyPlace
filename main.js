// Изменение текста в блоке "О глэмпинге"

const texts = [
    "Никто здесь не торопится. <br> Мы наслаждаемся рассветами, наблюдаем за закатами, ценим тишину и делимся приятными моментами с близкими",
    "Насладитесь уникальным отдыхом <br> в наших удобных домиках. Ортопедические матрасы и уютные веранды создадут атмосферу комфорта и уединения на природе",
    "Отдохните душой и телом <br> в окружении природы. Каждый элемент нашего пространства создан с любовью и заботой <br> о вашем комфорте",
    "Мы стремимся создавать для вас идеальные условия отдыха. Каждый день мы работаем над тем, чтобы ваше пребывание стало еще более комфортным и запоминающимся"
];

const textSlider = document.querySelector('.about__text-slider .about__text');

let currentIndex = 0;

function changeText() {
    textSlider.style.opacity = 0;

    setTimeout(() => {
        textSlider.innerHTML = texts[currentIndex];

        textSlider.style.opacity = 1;

        currentIndex = (currentIndex + 1) % texts.length;
    }, 1000);
}

setInterval(changeText, 10000);

changeText()

// Изменение картинки в блоке "Питание" и "Фотогалерея"

document.addEventListener('DOMContentLoaded', function () {
    const foodImage = document.querySelector('.food__image');
    const photosImage = document.querySelector('.photos__image');

    let foodCurrentIndex = 1;
    let photosCurrentIndex = 1;
    let foodIntervalId, photosIntervalId;

    function changeFoodImage() {
        foodCurrentIndex = (foodCurrentIndex % 3) + 1;
        const newSrc = `./images/food_collage_${foodCurrentIndex}.png`;

        foodImage.style.opacity = 0;
        setTimeout(() => {
            foodImage.src = newSrc;
            foodImage.style.opacity = 1;
        }, 500);
    }

    function changePhotosImage() {
        photosCurrentIndex = (photosCurrentIndex % 4) + 1;
        const newSrc = `./images/photos_collage_${photosCurrentIndex}.png`;

        photosImage.style.opacity = 0;
        setTimeout(() => {
            photosImage.src = newSrc;
            photosImage.style.opacity = 1;
        }, 500);
    }

    function startFoodImageChange() {
        if (!foodIntervalId) {
            foodIntervalId = setInterval(changeFoodImage, 8000);
        }
    }

    function stopFoodImageChange() {
        if (foodIntervalId) {
            clearInterval(foodIntervalId);
            foodIntervalId = null;
            foodCurrentIndex = 1;
            foodImage.src = `./images/food_collage_${foodCurrentIndex}.png`;
        }
    }

    function startPhotosImageChange() {
        if (!photosIntervalId) {
            photosIntervalId = setInterval(changePhotosImage, 6000);
        }
    }

    function stopPhotosImageChange() {
        if (photosIntervalId) {
            clearInterval(photosIntervalId);
            photosIntervalId = null;
            photosCurrentIndex = 1;
            photosImage.src = `./images/photos_collage_${photosCurrentIndex}.png`;
        }
    }

    function checkScreenWidth() {
        if (window.innerWidth < 1280) {
            startFoodImageChange();
            startPhotosImageChange();
        } else {
            stopFoodImageChange();
            stopPhotosImageChange();
        }
    }

    checkScreenWidth();

    window.addEventListener('resize', checkScreenWidth);
});

// Открытие и закрытие вопросов в блоке "Частые вопросы"

document.addEventListener('DOMContentLoaded', function () {
    const toggleButtons = document.querySelectorAll('.questions__button');
    const questions = document.querySelectorAll('.questions__question');
    const answers = document.querySelectorAll('.questions__answer');

    let lastWidth = window.innerWidth;

    function resetQuestions() {
        questions.forEach((question, index) => {
            const img = toggleButtons[index].querySelector('img');
            img.style.transform = 'rotate(0deg)';
            if (window.innerWidth >= 1280) {
                question.style.height = '67px';
            } else {
                question.style.height = '44px';
            }
        });
    }

    toggleButtons.forEach((button, index) => {
        let isExpanded = false;

        button.addEventListener('click', function () {
            const img = button.querySelector('img');
            if (isExpanded) {
                img.style.transform = 'rotate(0deg)';
            } else {
                img.style.transform = 'rotate(135deg)';
            }

            const question = questions[index];
            if (isExpanded) {
                if (window.innerWidth >= 1280) {
                    question.style.height = '67px';
                } else {
                    question.style.height = '44px';
                }
            } else {
                if (window.innerWidth >= 1280) {
                    question.style.height = `${question.scrollHeight}px`;
                } else {
                    question.style.height = `${question.scrollHeight}px`;
                }
            }

            isExpanded = !isExpanded;
        });
    });

    window.addEventListener('resize', function () {
        const currentWidth = window.innerWidth;
        if ((lastWidth >= 1280 && currentWidth < 1280) || (lastWidth < 1280 && currentWidth >= 1280)) {
            resetQuestions();
        }
        lastWidth = currentWidth;
    });

    resetQuestions();
});

// Переход на страницу бронирования

document.addEventListener('DOMContentLoaded', function () {
    const greenButtons = document.querySelectorAll('.card__button');
    const mainButtons = document.querySelectorAll('.main__button');

    greenButtons.forEach(button => {
        button.addEventListener('click', function () {
            window.location.href = './booking.html';
        });
    });

    mainButtons.forEach(button => {
        button.addEventListener('click', function () {
            window.location.href = './booking.html';
        });
    });
});