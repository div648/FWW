
var connections = [
    { from: "event1", to: "event2" },
    { from: "event2", to: "event3" }
];

document.addEventListener("DOMContentLoaded", () => {

    //render_line();


});

function render_line() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    connections.forEach(function (connection) {
        var fromBlock = document.getElementById(connection.from);
        var toBlock = document.getElementById(connection.to);

        var fromRect = fromBlock.getBoundingClientRect();
        var toRect = toBlock.getBoundingClientRect();

        // Начало связи
        var fromX = fromRect.left + fromRect.width / 2;
        var fromY = fromRect.top + fromRect.height / 2;

        // Конец связи
        var toX = toRect.left + toRect.width / 2;
        var toY = toRect.top + toRect.height / 2;

        // Рассчитываем управляющие точки для кривой Безье-Кубической
        var controlPointX1 = fromX + (toX - fromX) * 0.75;
        var controlPointY1 = fromY;
        var controlPointX2 = toX - (toX - fromX) * 0.75;
        var controlPointY2 = toY;

        // Рисуем кривую Безье-Кубическую
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.bezierCurveTo(controlPointX1, controlPointY1, controlPointX2, controlPointY2, toX, toY);
        ctx.strokeStyle = "#000"; // цвет связи
        ctx.lineWidth = 2; // толщина связи
        ctx.stroke();
    });


}


var draggedElement = null;

document.addEventListener("dragstart", function (event) {
    // Установка элемента, который будет перетаскиваться
    draggedElement = event.target;
});

document.addEventListener("dragover", function (event) {
    event.preventDefault();
});

document.addEventListener("drop", function (event) {
    event.preventDefault();
    if (draggedElement) {
        // Получение текущих координат перемещения
        var offsetX = event.clientX - draggedElement.offsetWidth / 2;
        var offsetY = event.clientY - draggedElement.offsetHeight / 2;

        // Установка новой позиции для перемещаемого элемента
        draggedElement.style.left = offsetX + "px";
        draggedElement.style.top = offsetY + "px";

        // Сброс переменной draggedElement после завершения перемещения
        draggedElement = null;
        render_line();

    }
});

