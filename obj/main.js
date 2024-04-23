document.addEventListener("DOMContentLoaded", () => {
    init();
    //setTimeout(eventProcessing, 1000);
    eventProcessing();
    screen_fill();
    //draw_links();
    draw_obj();
    setTimeout(() => {
        screen_fill();
        draw_obj();
    }, 400);
    //createInfoBlock(1);
});