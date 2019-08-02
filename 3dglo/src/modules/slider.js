const slider = () => {
    const slider = document.querySelector('.portfolio-content'),
          slides = slider.querySelectorAll('.portfolio-item'),
          portfolioDots = slider.querySelector('.portfolio-dots');

    //добавление точек для слайдов
    const addSliderDots = () => {
        for(let i = 0; i < slides.length; i++) {
            let newDot = document.createElement('li');
            newDot.classList.add('dot');
            if(slides[i].matches('.portfolio-item-active')) {
                newDot.classList.add('dot-active');
            }
            portfolioDots.appendChild(newDot);
        }
    };

    addSliderDots();

    //анимация слайдера
    const dots = slider.querySelectorAll('.dot');
    let currentSlide = 0,
        interval;

    const prevSlide = (elem, index, strClass) => {
        elem[index].classList.remove(strClass);

    };

    const nextSlide = (elem, index, strClass) => {
        elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
        prevSlide(slides, currentSlide, 'portfolio-item-active');
        prevSlide(dots, currentSlide, 'dot-active');
        currentSlide++;
        
        if(currentSlide >= slides.length) {
            currentSlide = 0;
        }

        nextSlide(slides, currentSlide, 'portfolio-item-active');
        nextSlide(dots, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
        interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
        clearInterval(interval);
    };

    slider.addEventListener('click', (evt) => {
        evt.preventDefault();
        
        let target = evt.target;

        if(!target.matches('.portfolio-btn, .dot')) {
            return;
        }

        prevSlide(slides, currentSlide, 'portfolio-item-active');
        prevSlide(dots, currentSlide, 'dot-active');

        if(target.matches('#arrow-right')) {
            currentSlide++;
        } else if(target.matches('#arrow-left')) {
            currentSlide--;
        } else if(target.matches('.dot')) {
            dots.forEach((elem, index) => {
                if(elem === target) {
                    currentSlide = index;
                }
            });
        }

        if(currentSlide >= slides.length) {
            currentSlide = 0;
        }

        if(currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        nextSlide(slides, currentSlide, 'portfolio-item-active');
        nextSlide(dots, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (evt) => {
        if(evt.target.matches('.portfolio-btn, .dot')) {
            stopSlide();
        }
    });

    slider.addEventListener('mouseout', (evt) => {
        if(evt.target.matches('.portfolio-btn, .dot')) {
            startSlide();
        }
    });

    startSlide(3000);
};

export default slider;