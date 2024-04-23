/*
id:                 уникалный идентификатор
z-index:            позиция во временном промежутоке (ближе к "верху" или "низу". значения абсолютны, чем ближе к 0 тем более старшее событие)
i-index:            важность события (при значении -1 определяеться автоматически в зависимости от общего колличесва связей)
name, description:  инфа для отображения
references:         связи от этого элекмента к id другим элементам
x, y, r, ac:        всегда ставить -1, поля заполняются автоматически
*/

let foolder_name = ''//'img/';

/*let allEvents = [
    { 'id': 0, 'i-index': -1, 'z-index': 0, 'title': 'Some', 'name': 'Начало Первой мировой войны', 'description': '1 августа 1914 года началась Первая мировая война...', 'imglink': '', 'references': [], 'x': -1, 'y': -1, 'r': -1, 'ac': -1 },
    { 'id': 1, 'i-index': -1, 'z-index': 1, 'title': 'текст', 'name': 'Битва при Марне', 'description': 'Битва при Марне произошла в сентябре 1914 года...', 'imglink': 'img0.jpg', 'references': [0], 'x': -1, 'y': -1, 'r': -1, 'ac': -1 },
    { 'id': 2, 'i-index': -1, 'z-index': 2, 'title': 'для', 'name': 'Подписание Третьего антантского соглашения', 'description': 'В 1915 году было подписано Третье антантское соглашение...', 'imglink': '', 'references': [1], 'x': -1, 'y': -1, 'r': -1, 'ac': -1 },
    { 'id': 3, 'i-index': -1, 'z-index': 2, 'title': 'теста', 'name': 'Еще что то непонятное,', 'description': 'т.к у меня нет инфы. Вроде в музыке такой текст "рыбой" называют', 'imglink': '', 'references': [1, 2], 'x': -1, 'y': -1, 'r': -1, 'ac': -1 }
];*/


let allEvents = [
    { 'id': 0, 'i-index': -1, 'z-index': 0, 'title': '', 'name': 'Начало Первой мировой войны', 'description': '1 августа 1914 года началась Первая мировая война...', 'imglink': 'https://www.pravoslavie.ru/sas/image/101827/182779.p.jpg?0.6129116895608604', 'references': [0], 'x': -1, 'y': -1, 'r': -1, 'ac': -1 },
    { 'id': 1, 'i-index': -1, 'z-index': 1, 'title': '', 'name': 'Битва при Марне', 'description': 'Битва при Марне произошла в сентябре 1914 года...', 'imglink': 'https://naked-science.ru/wp-content/uploads/2023/09/photo_2023-09-12_13-40-17.jpg', 'references': [0], 'x': -1, 'y': -1, 'r': -1, 'ac': -1 },
    { 'id': 2, 'i-index': -1, 'z-index': 2, 'title': '', 'name': 'Подписание Третьего антантского соглашения', 'description': 'В 1915 году было подписано Третье антантское соглашение...', 'imglink': 'https://img.gazeta.ru/files3/859/8125859/Treaty-pic905-895x505-35054.jpg', 'references': [1], 'x': -1, 'y': -1, 'r': -1, 'ac': -1 },
    { 'id': 3, 'i-index': -1, 'z-index': 2, 'title': '', 'name': 'Керинд-Касрешинская операция,', 'description': 'Наступление русского экспедиционного корпуса Кавказской армии на позиции 6-й турецкой армии в апреле–мае 1916 г. в Месопотамии. Наступление развивалось успешно, однако из-за отсутствия взаимодействия с...', 'imglink': 'https://pochta-polevaya.ru/content/i/25556/russkie_nastupajut_iz_okopov_podho-93715.i250x268.jpg', 'references': [1, 2], 'x': -1, 'y': -1, 'r': -1, 'ac': -1 },
    { 'id': 4, 'i-index': -1, 'z-index': 3, 'title': '', 'name': 'Апрельское наступление англо-французских войск («Бойня Нивеля»)', 'description': 'В апреле-мае 1917 года, войска Антанты попытались прорвать оборону германской армии. Это было крупнейшее сражение Первой мировой войны по количеству участвовавших (4,5 млн. человек). Наступление было...', 'imglink': 'https://gwar.mil.ru/upload/iblock/711/7113aed164fb5e5a5bb28a2a4d86541e.jpg', 'references': [3], 'x': -1, 'y': -1, 'r': -1, 'ac': -1 },
    { 'id': 5, 'i-index': -1, 'z-index': 3, 'title': '', 'name': 'Вторая фаза «Весеннего наступления» (Операция «Жоржетта»)', 'description': 'С 4 по 30 апреля  1918 года продолжалась вторая операция «Весеннего наступления» под названием «Жоржетта». Это наступление германской армии во Фландрии было продолжением операции «Михаэль»....', 'imglink': 'https://gwar.mil.ru/upload/iblock/64f/64fdfacf91c9a72622c02d726f9afe9a.jpg', 'references': [0], 'x': -1, 'y': -1, 'r': -1, 'ac': -1 },
    { 'id': 6, 'i-index': -1, 'z-index': 3, 'title': '', 'name': 'Ванское сражение', 'description': 'Ванское сражение – оборонительное сражение армянского населения г. Ван и армянских сёл Ванского вилайета Османской империи против турецкой армии с 19 апреля по 16 мая 1914 г. 12-ти тысячной турецкой армии...', 'imglink': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Van1.jpg/1200px-Van1.jpg', 'references': [1], 'x': -1, 'y': -1, 'r': -1, 'ac': -1 }
];


let COLOR_particle = 'rgba(255, 255, 255, 0.2)';
let COLOR_fillLink = 'rgba(255, 255, 255, 0.4)'; // manual draw
let COLOR_strokeLink = 'rgb(100,100,100)';
let COLOR_shadowLink = 'rgb(255, 230, 0)';
let COLOR_background = 'rgb(0, 0, 20)';


let particles = [];
let particles_fw = [];

let canvas, ctx, height, width;

let particle_render_on = false; // start anim
let particle_animate_on = false;
let render_node = -1; // nodes in array
let render_step = 0; // 0-1
let particle_obj = [];
let maxConn = 0;


let intervals = 10; // number of radii
let radius = 10;
let spread = 5;
let step = 10;
let numGen = 3;
let particle_ttl = 400;

let particle_fw_ttl = 50; // for windows
let particle_size = 10;

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    height = canvas.height;
    width = canvas.width;
    ctx.shadowBlur = 10;
    ctx.font = '13px Montserrat';
    ctx.textAlign = 'center';

    for (let i = 0; i < allEvents.length; i++) {
        let n = numConnection(allEvents, i);
        if (n > maxConn) maxConn = n;
    }

    canvas.addEventListener('click', function (event) {
        let rect = canvas.getBoundingClientRect();
        let mouseX = event.clientX - rect.left;
        let mouseY = event.clientY - rect.top;
        for (let i = 0; i < allEvents.length; i++) {
            if (isInsideCircle(mouseX, mouseY, i)) {
                console.log('Obj select(index): ' + i);
                createInfoBlock(i);
                init_render(i);
            }
        }
    });
    /*
    for (let i = 0; i < 1000; i++) {
        ctx.beginPath();
        ctx.arc(getRandomInt(0, canvas.width), getRandomInt(0, canvas.height), 1, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fill();
        
    }*/
}