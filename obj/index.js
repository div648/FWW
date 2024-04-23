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
    {"id":0,"i-index": -1,"z-index":0,"title":"Сараево","name":"Убийство, запустившее мировой конфликт","description":"Атентат на эрцгерцога Франца Фердинанда в Сараево, который стал прямым поводом к началу войны.","imglink":"","references":[null],"x":-1,"y":-1,"r":-1,"ac":-1},
    {"id":1,"i-index": -1,"z-index":1,"title":"Рубикон","name":"Австро-Венгерский ультиматум","description":"Австро-Венгрия предъявляет ультиматум Сербии, что приводит к объявлению войны.","imglink":"","references":[0],"x":-1,"y":-1,"r":-1,"ac":-1},
    {"id":2,"i-index": -1,"z-index":1,"title":"Марне","name":"Марне: Переломный момент","description":"Первая битва на Марне останавливает немецкое наступление и заставляет их отступить.","imglink":"","references":[1],"x":-1,"y":-1,"r":-1,"ac":-1},
    {"id":3,"i-index": -1,"z-index":2,"title":"Галицийская битва","name":"Восточный фронт в огне","description":"Русские войска одерживают победу над австро-венгерскими войсками, освобождая Галицию.","imglink":"","references":[1,2],"x":-1,"y":-1,"r":-1,"ac":-1},
    {"id":4,"i-index": -1,"z-index":2,"title":"Хлор","name":"Новая эра ведения войны","description":"Впервые использование газа в качестве оружия, что привело к массовым жертвам.","imglink":"","references":[2,3],"x":-1,"y":-1,"r":-1,"ac":-1},
    {"id":5,"i-index": -1,"z-index":3,"title":"Прорыв","name":"Решающее наступление на Востоке","description":"Одно из самых успешных наступлений союзников, значительно ослабившее центральные державы.","imglink":"","references":[3,4],"x":-1,"y":-1,"r":-1,"ac":-1},
    {"id":6,"i-index": -1,"z-index":3,"title":"Верден","name":"Верден: Изнурительная битва","description":"Одна из самых длительных и кровопролитных битв войны.","imglink":"","references":[4,5],"x":-1,"y":-1,"r":-1,"ac":-1},
    {"id":7,"i-index": -1,"z-index":3,"title":"Революция","name":"Конец империи, начало новой эры","description":"Свержение монархии и начало пути к большевистской власти.","imglink":"","references":[6,7],"x":-1,"y":-1,"r":-1,"ac":-1},
    {"id":8,"i-index": -1,"z-index":4,"title":"США","name":"Вступление США в войну","description":"Вступление США в войну приносит новые ресурсы и силы союзникам.","imglink":"","references":[6,7],"x":-1,"y":-1,"r":-1,"ac":-1},
    {"id":9,"i-index": -1,"z-index":5,"title":"Компьен","name":"Конец войны, начало мира","description":"Подписание перемирия, положившего конец боевым действиям.","imglink":"","references":[7,8],"x":-1,"y":-1,"r":-1,"ac":-1}
    ];


let COLOR_particle = 'rgba(255, 255, 255, 0.4)';
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
let numGen = 2;
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
                //console.log('Obj select(index): ' + i);
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