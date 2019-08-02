'use strict';

const Validator = function(options) {
    const validatorSuccessStyle = 'border: 2px solid green',
          validatorErrorStyle = 'border: 2px solid red',
          errorMessageStyle = 'font-size: 12px; color: red; margin-top: 5px;',  
          form = document.getElementById(options.id),
          elementsForm = [...form.elements].filter(item => item.tagName !== 'BUTTON'),
          error = new Set(),
          pattern = {
              name: /[а-я]+/i,
              email: /^\w+@\w+\.\w+$/,
              phone: /^\+?[78]([()-]*\d){10}$/
          },
          validorMethod = {
              notEmpty(elem) {
                if(elem.value.trim() === '') {
                    return false;
                }
                return true;
              },
              pattern(elem, pattern) {
                  return pattern.test(elem.value);
              }
          };
    
    const isValid = (elem) => {
        const method = options.method[elem.id];
        if(method !== undefined) {
            return method.every(item => validorMethod[item[0]](elem, pattern[item[1]]));
        }
        return true;
    };

    const checkIt = (evt) => {
        let target = evt.target;
        
        if(isValid(target)) {
            showSuccess(target);
            error.delete(target);
        } else {
            showError(target);
            error.add(target);
        }
    };

    elementsForm.forEach((elem) => {
        elem.addEventListener('change', checkIt);
    });

    const showError = (elem) => {
        elem.classList.remove('validator_success');
        elem.classList.add('validator_error');
        elem.style = validatorErrorStyle;
        if(!elem.nextElementSibling) {
            const errorDiv = document.createElement('div');
            errorDiv.textContent = 'Ошибка в этом поле';
            errorDiv.classList.add('error-message');
            errorDiv.style = errorMessageStyle;
            elem.insertAdjacentElement('afterend', errorDiv);
        }
    };

    const showSuccess = (elem) => {
        elem.classList.remove('validator_error');
        elem.classList.add('validator_success');
        elem.style = validatorSuccessStyle;
        if(elem.nextElementSibling) {
            elem.nextElementSibling.remove();
        }
    };

    for (let key in options.pattern) {
        pattern[key] = options.pattern[key];
    }

    form.addEventListener('submit', (evt) => {
        elementsForm.forEach((elem) => {
            checkIt({target: elem});
        });
        if(error.size) {
            evt.preventDefault();
        }
    });

};