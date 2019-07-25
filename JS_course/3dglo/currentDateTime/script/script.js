'use strict';

let currentDate = new Date(),
    newYear = new Date(2019, 11, 31),
    newYaerLeft = Math.ceil((newYear - currentDate) / 1000 / 60 / 60 / 24),
    day = currentDate.toLocaleString('ru', {weekday: 'long'}),
    hours = currentDate.getHours(),
    upDay = day[0].toUpperCase() + day.slice(1),
    time = currentDate.toLocaleTimeString('en'),
    timesOfDay;
    

if (hours >= 5 && hours <= 11) {
    timesOfDay = 'Доброе утро';
} else if ( hours > 11 && hours <= 17) {
    timesOfDay = 'Добрый день';
} else if (hours > 17 && hours <= 23) {
    timesOfDay = 'Добрый вечер';
} else if ( hours > 23 || hours < 5) {
    timesOfDay = 'Доброй ночи';
} 

document.body.innerHTML = `<i>
${timesOfDay} <br>
Сегодня: ${upDay} <br>
Текущее время: ${time} <br>
До Нового года осталось ${newYaerLeft} дней
</i>`;