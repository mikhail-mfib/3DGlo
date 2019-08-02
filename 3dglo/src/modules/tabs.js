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

export default tabs;