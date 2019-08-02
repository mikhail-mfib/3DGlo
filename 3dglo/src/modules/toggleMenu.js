const toggleMenu = () => {
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

export default toggleMenu;