const countTimer = (deadline = '03 august 2019') => {
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

export default countTimer;