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

export default calc;