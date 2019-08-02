'use strict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeCommandPhoto from './modules/changeCommandPhoto';
import calc from './modules/calc';
import sendForm from './modules/sendForm';


//timer
setInterval(countTimer, 1000);
// меню
toggleMenu();
//popup
togglePopUp();
//табы
tabs();
//слайдер
slider();
//смена фото команды
changeCommandPhoto();
//калькулятор
calc();
// send-ajax-form
sendForm();