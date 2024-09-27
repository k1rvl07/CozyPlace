// Массив с текстами
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