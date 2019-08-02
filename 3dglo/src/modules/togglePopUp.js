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
            popupContent.style.transform = `translateX(-${count}px)`;
            popupContent.style.opacity = `opacity: ${count * 0.02}`;
        } else {
            cancelAnimationFrame(stepAnimation);
        }
    };

    const defineAnimation = () => {
        popup.style.display = 'block';
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

export default togglePopUp;