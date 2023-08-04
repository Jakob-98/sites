//main JS file project


//Initialization
window.onload = function() {
    paper = Raphael("svg_paper", PAPER_HEIGHT, PAPER_WIDTH);
    MOUSE = new MouseManager();
    MODEL = new Model();
    A0 = new Process(null);
    MODEL.CONTEXT = new Process(null);
    
    PAPER_OFFSET =  $("#svg_paper").offset();

    $("#svg_paper").mousedown(function(e) {
        MOUSE.mouseDown(e);
    });
    $("#svg_paper").mouseup(function(e) {
        MOUSE.mouseUp(e);
    });
    $("#svg_paper").mousemove(function(e) {
        MOUSE.mouseMove(e);
    });
    $('.btn').click(function(e) {
        btnClick(e);
    });
}

