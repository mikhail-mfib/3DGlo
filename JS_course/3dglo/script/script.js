'use strict';

window.addEventListener('DOMContentLoaded', () => {
    //timer
    const countTimer = (deadline) => {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
        
            // добавление нуля к числам < 10
        const addZero = (num) => {
            if(num.toString().length < 2) {
                return '0' + num;
            } 
            return num.toString();
        };

        const getTimeRemainig = () => {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = addZero(Math.floor(timeRemaining % 60)),
                minutes = addZero(Math.floor((timeRemaining / 60) % 60)),
                hours = addZero(Math.floor(timeRemaining / 60 / 60) % 24);
               
                return {timeRemaining, hours, minutes, seconds};

        }; 
        
        const updateClock = () => {
            let timer = getTimeRemainig();
            if(timer.timeRemaining <= 0) {
                let timeLeft = '<span style="color:red">00</span>';
                timerHours.innerHTML = timeLeft;
                timerMinutes.innerHTML = timeLeft;
                timerSeconds.innerHTML = timeLeft;
            } else {
                timerHours.textContent = timer.hours;
                timerMinutes.textContent = timer.minutes;
                timerSeconds.textContent = timer.seconds;
            }
        };
        updateClock();
    };

    setInterval(countTimer, 1000, '19 jule 2019');

    //прокрутка
    const scroll = (aim) => {
        const aimLink = aim.querySelector('a'),
              targetY = document.querySelector(aimLink.hash).getBoundingClientRect().top,
              currentScroll = window.pageYOffset;
        
        let   start = null;
            
        const scrollStep = (time) => {
            if (start === null) {start = time;}
            
            let progress = time - start,
                step = (targetY < 0 ? Math.max(currentScroll - progress, currentScroll + targetY) : Math.min(currentScroll + progress, currentScroll + targetY));
            
            window.scrollTo(0, step);
            
            if (step != currentScroll + targetY) {
                requestAnimationFrame(scrollStep);
            } else {
                location.hash = aimLink.hash;
            }
        };

        requestAnimationFrame(scrollStep);
    };

    // меню
    const toggleMenu = () => {
        const menu = document.querySelector('menu');
        
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        document.addEventListener('click', (evt) => {
            let target = evt.target;

            if(target.classList.contains('close-btn') || target.matches('.menu, .menu>img, .menu>small')) {
                handlerMenu();
            } else {
                target = target.closest('.menu');
                if(!target) {
                    menu.classList.remove('active-menu');
                }
            }
        });
        
        menu.addEventListener('click', (evt) => {
            evt.preventDefault();
        
            let target = evt.target.closest('li');
            if(target) {
                scroll(target);
                handlerMenu();
            }
        });
    };

    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
              popupBtn = document.querySelectorAll('.popup-btn'),
              popupContent = document.querySelector('.popup-content');
        
        //анимация всплывающего модального окна заявки
        let count = 0,
            stepAnimation;

        const popupAnimation = () => {
            stepAnimation = requestAnimationFrame(popupAnimation);
            if(count < 50) {
                count += 1;
                popupContent.style = `transform: translateX(-${count}px); opacity: ${count * 0.02}`;
            } else {
                cancelAnimationFrame(stepAnimation);
            }
        };

        const defineAnimation = () => {
            popup.style = `display: block`;
            if(screen.width > 760) {
                popupAnimation();
            } 
        };

        popupBtn.forEach((item) => {
            item.addEventListener('click', () => {
                defineAnimation();
            });
        });

        popup.addEventListener('click', (evt) => {
            let target = evt.target;
            
            if(target.classList.contains('popup-close')) {
                popup.style.display = `none`;
                count = 0;
            } else {
                target = target.closest('.popup-content');
                
                if(!target) {
                    popup.style.display = `none`;
                    count = 0;
                }
            }
        });
    };

    togglePopUp();

    //табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
              tabs = tabHeader.querySelectorAll('.service-header-tab'),
              tabContent = document.querySelectorAll('.service-tab');
        
        const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++) {
                if(index === i) {
                    tabs[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tabs[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (evt) => {
            let target = evt.target;
            
            target = target.closest('.service-header-tab');

            if(target) {
                tabs.forEach((item, i) => {
                    if(item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };
    
    tabs();

    //слайдер
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

    slider();

    //смена фото команды
    const changeCommandPhoto = () => {
        const command = document.getElementById('command'),
              commandPhoto = command.querySelectorAll('.command__photo');
        
        let dataImgs = [];

        commandPhoto.forEach((img) => {
            dataImgs.push(img.src);
        });
        
        command.addEventListener('mouseover', (evt) => {
            if(evt.target.matches('.command__photo')) {
                evt.target.src = evt.target.dataset.img;
            }
        });

        command.addEventListener('mouseout', (evt) => {
            if(evt.target.matches('.command__photo')) {
                commandPhoto.forEach((img, i) => {
                    if (img == evt.target) {
                        evt.target.src = dataImgs[i];
                    }
                });
            }
        });
    };

    changeCommandPhoto();

    //калькулятор
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
              calcType = calcBlock.querySelector('.calc-type'),
              calcSquare = calcBlock.querySelector('.calc-square'),
              calcCount = calcBlock.querySelector('.calc-count'),
              calcDay = calcBlock.querySelector('.calc-day'),
              totalValue = calcBlock.querySelector('#total'),
              calcInputs = calcBlock.querySelectorAll('input');

        //ввод в форму только цифр, хотя это уже отсечено версткойr
        calcInputs.forEach((input) => {
            input.addEventListener('input', () => {
                input.value = input.value.replace(/\D/gi, '');
            });
        });

        const countSum = () => {
            let total = 0,
                startTotal = +totalValue.textContent,
                countValue = 1,
                dayValue = 1;

            const typeValue = calcType.options[calcType.selectedIndex].value,
                  squareValue = +calcSquare.value;

            if(calcCount.value > 1 ) {
                countValue += (calcCount.value - 1) / 10;
            }

            if(calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if(calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }
            
            if(typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }
            
            //анимированный вывод
            let idAnimate;
            console.log(startTotal);
            console.log(total);
            const animateCalTotal = () => {
                idAnimate = requestAnimationFrame(animateCalTotal);
                
                if(startTotal < total) {
                    startTotal += 10;
                    totalValue.textContent = startTotal;
                } else if(startTotal > total) {
                    startTotal -= 10;
                    totalValue.textContent = startTotal;
                } else {
                    cancelAnimationFrame(idAnimate);
                }
            };

            animateCalTotal();
        };

        calcBlock.addEventListener('change', (evt) => {
            const target = evt.target;
            if(target.matches('select, input')) {
                countSum();
            }
        });

    };

    calc(100);

});