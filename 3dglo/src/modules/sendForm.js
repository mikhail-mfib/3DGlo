const sendForm = () => {
    const errorMessage = 'Что-то пошло не так',
          successMessage = `Мы скоро с <span style='color: red'>Вами</span> свяжемся!`,
          statusMessageContainer = document.createElement('div'),
          statusMessage = document.createElement('div');
    
    const removeMessage = () => {
            statusMessage.textContent = '';
            statusMessageContainer.remove();
    };
    
    statusMessageContainer.classList.add('loader-container');
    statusMessageContainer.appendChild(statusMessage);

    document.body.addEventListener('input', (evt) => {
        if(evt.target.matches('.form-name, #form2-name, .mess')) {
            evt.target.value = evt.target.value.replace(/[^а-я ]/gi, '');
        }

        if(evt.target.matches('.form-phone')) {
            evt.target.value = evt.target.value.replace(/[^0-9+]/gi, '');
        }
    });

    document.body.addEventListener('submit', (evt) => {
        let target;

        if(evt.target.tagName == 'FORM') {
            evt.preventDefault();
            target = evt.target;

            const   elementsForm = [...target.elements].filter(item => item.tagName !== 'BUTTON'), 
                    formData = new FormData(target);

            let body = {};
    
            target.appendChild(statusMessageContainer);
            statusMessage.classList.add('loader');
            formData.forEach((val, key) => {body[key] = val;});
            elementsForm.forEach((input) => {input.value = '';});
            
            postDate(body)
                .then((response) => {
                    if(response.status !== 200) {
                        throw new Error('status network not 200');
                    }
                    statusMessage.classList.remove('loader');
                    statusMessage.classList.add('resultMessage')
                    statusMessage.innerHTML = successMessage;
                }) 
                .catch((error) => {
                    statusMessage.classList.remove('loader');
                    statusMessage.classList.add('resultMessage');
                    statusMessage.textContent = errorMessage;
                    console.log(error);
                });
            
            setTimeout(removeMessage, 4000);
            
        }
    });


    const postDate = (body) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };
};

export default sendForm;