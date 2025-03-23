/*

Задание 6

Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:

Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводится ниже текст «Номер страницы вне диапазона от 1 до 10»;
Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводится ниже текст «Лимит вне диапазона от 1 до 10»;
Если и первый, и второй input не в диапазонах или не являются числами — выводится ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input.
Пример: если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
После получения данных вывести список картинок на экран.

Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).                

*/

import {FormParams, LastResponseStorage} from './classes_6.js';


document.addEventListener('DOMContentLoaded', ()=> {
    function onclick(selector, handler) {
        document.querySelector(selector).onclick = handler;
    }
  
    onclick('#btn_fetch', (event) => act_fetch(event));

    showLastResponse();
});


const response_container = document.querySelector('#response_container');
const images = document.querySelector('.response__images');
const page__error = document.querySelector(".page__error");

function showLastResponse() {
    const lastResponse = LastResponseStorage.getData();
    if (lastResponse !== null) {
        createResponseView(lastResponse);
    }
}

function act_fetch(event) {
    event.preventDefault();

    hideParamsError();

    const p = getFormParams();
    if (p.getHasBrokenRules()) {
        showParamsError(p.getMessage());
        return;
    }

    const url = `https://picsum.photos/v2/list?page=${p.getNum()}&limit=${p.getLimit()}`;

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            createResponseView(data);
        });
}

function getFormParams() {
    const page_num = document.querySelector("#page_num").value;
    const page_limit = document.querySelector("#page_limit").value;

    return new FormParams(page_num, page_limit);
}

function showParamsError(text) {
    page__error.innerHTML = text;
}

function hideParamsError() {
    page__error.innerHTML = "";
}

function clearResponse() {
    while (images.firstChild) {
        images.removeChild(images.lastChild);
    };
}

function addElement(item) {
    const img = document.createElement("img");

    img.src = getResizedUrl(item);
    img.alt = `img_${item.id}`;
    img.classList.add("response__image");

    images.appendChild(img);
}

function getResizedUrl(item) {
    return item.download_url
        .replace(item.width, '200')
        .replace(item.height, '133');
}

function hideResponse() {
    response_container.classList.add('page__content--hidden');
}

function showResponse() {
    response_container.classList.remove('page__content--hidden');
}

function createResponseView(data) {

    LastResponseStorage.save(data);

    hideResponse();

    clearResponse();

    data.forEach(element => {
        addElement(element);
    });

    showResponse();
}

