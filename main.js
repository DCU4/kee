// Define some variables to keep track of the mouse status
var mouseX,mouseY,mouseDown=0;
var slider = document.getElementById("myRange");
var color = document.getElementById('colorPick');
var lastX,lastY=-1;

// Draws a dot at a specific position on the supplied canvas name
// Parameters are: A canvas context, the x position, the y position
function drawLine(ctx,x,y,size) {
    // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
    r=0; g=0; b=0; a=255;

    // Select a fill style
    // ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
    ctx.fillStyle = color.value;

    // If lastX is not set, set lastX and lastY to the current position
    if (lastX==-1) {
        lastX=x;
        lastY=y;
    }

    // Set the line "cap" style to round, so lines at different angles can join into each other
    ctx.lineCap = "round";

    // Draw a filled line
    ctx.beginPath();

    // First, move to the old (previous) position
    ctx.moveTo(lastX,lastY);

    // Now draw a line to the current touch/pointer position
    ctx.lineTo(x,y);

    // Set the line thickness and draw the line
    ctx.lineWidth = size;
    ctx.stroke();

    ctx.closePath();

    // Update the last position to reference the current position
    lastX=x;
    lastY=y;
}

// Clear the canvas context using the canvas width and height
function clearCanvas(canvas,ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}



function sketchpad_mouseDown() {
    mouseDown=1;
    drawLine(ctx,mouseX,mouseY,slider.value );
    console.log(color.value);
}

function sketchpad_mouseUp() {
    mouseDown=0;

    // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
    lastX=-1;
    lastY=-1;
}

function sketchpad_mouseMove(e) {
    // Update the mouse co-ordinates when moved
    getMousePos(e);

    // Draw a pixel if the mouse button is currently being pressed
    if (mouseDown==1) {
        drawLine(ctx,mouseX,mouseY,slider.value);
    }
}

// Get the current mouse position relative to the top-left of the canvas
function getMousePos(e) {
    if (!e)
    var e = event;

    if (e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if (e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
}
// Set-up the canvas and add our event handlers after the page has loaded
function init() {
    // Get the specific canvas element from the HTML document
    canvas = document.getElementById('sketchpad');
    face = document.getElementById('face');
    // If the browser supports the canvas tag, get the 2d drawing context for this canvas
    if (canvas.getContext){
        ctx = canvas.getContext('2d');
    }
    if (face.getContext){
        faceCtx = face.getContext('2d');
    }
// Check that we have a valid context to draw on/with before adding event handlers
    if (ctx) {
        canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
        canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
        window.addEventListener('mouseup', sketchpad_mouseUp, false);
    }

    //face, obviously
    faceCtx.beginPath();
    faceCtx.arc(200, 200, 180, 0, Math.PI*2, true);
    faceCtx.closePath();
    faceCtx.stroke();
    faceCtx.beginPath();
    faceCtx.arc(275, 150, 10, 0, Math.PI*2, true);
    faceCtx.closePath();
    faceCtx.fill();
    faceCtx.beginPath();
    faceCtx.arc(125, 150, 10, 0, Math.PI*2, true);
    faceCtx.closePath();
    faceCtx.fill();
    faceCtx.save();


}