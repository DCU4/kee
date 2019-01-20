



// MAIN DRAWING

// Define some variables to keep track of the mouse status
var mouseX,mouseY,mouseDown=0;
var slider = document.getElementById("myRange");
console.log(slider);
var color = document.getElementById('colorPick');
var lastX,lastY=-1;

var scale =document.querySelector('.scale');


var myColor = document.getElementById("myColor");
    var myLight = document.getElementById("myLight");

var colorDisplay = document.getElementById("colorDisplay");

// var clearBtn = document.getElementById('clear-canvas');
// console.log(clearBtn);

// clearBtn.addEventListener('click', function(){
//     this.classList.add('press-down');
// });



// TOUCH ___________________________


// Define some variables to keep track of the touch position
    var touchX,touchY,touchDown;

    function sketchpad_touchStart() {
        touchDown = 1;
        getTouchPos();
        if(touchDown == 1){
            drawLine(ctx,touchX,touchY,slider.value);
        }
        
        // Prevents an additional mousedown event being triggered
        event.preventDefault();
    }

    // Stop the line being drawn when touching to separate points
    function sketchpad_touchStop() {
        touchDown= 0;
        // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
        lastX=-1;
        lastY=-1;
    }

    function sketchpad_touchMove(e) { 
        // Update the touch co-ordinates
        getTouchPos(e);
        if(touchDown == 1){
            console.log('1');
            // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
            drawLine(ctx,touchX,touchY,slider.value); 
        }
        // Prevent a scrolling action as a result of this touchmove triggering.
        event.preventDefault();
        
    }
    

    // Get the touch position relative to the top-left of the canvas
    // When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
    // but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
    // "target.offsetTop" to get the correct values in relation to the top left of the canvas.
    function getTouchPos(e) {
        if (!e)
            var e = event;

        if (e.touches) {
            if (e.touches.length == 1) { // Only deal with one finger
                var touch = e.touches[0]; // Get the information for finger #1
                touchX=touch.pageX-touch.target.offsetLeft;
                touchY=touch.pageY-touch.target.offsetTop;
            }
        }
    }

// MOUSE ___________________________


function sketchpad_mouseDown() {
    mouseDown=1;
    drawLine(ctx,mouseX,mouseY,slider.value );
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
        console.log('1');
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


// DRAW ___________________________
    
// var h1=myColor.value,  l1=myLight.value;
// console.log(myColor.value);


myColor.addEventListener('input',function(e) {
    colorDisplay.style.background = '#000';
    var displayColor = "hsl("+myColor.value+",100%,"+myLight.value+"%)";
    colorDisplay.style.background = displayColor;
    console.log(myLight.value)
    console.log(displayColor);

});

// Draws a dot at a specific position on the supplied canvas name
// Parameters are: A canvas context, the x position, the y position
function drawLine(ctx,x,y,size) {
    // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
    // r=110; g=200; b=220; a=255;


    
    
    
    // lineColor = "hsl(200,100%,50%)";
    
    
    // // Select a fill style
    var h=myColor.value,  l=myLight.value;
    lineColor = "hsl("+h+",100%,"+l+"%)";
    console.log(myColor.value);
    ctx.strokeStyle = lineColor;

    colorDisplay.style.background = lineColor;

    myColor.addEventListener('oninput',function() {
        colorDisplay.style.background = lineColor;
        console.log(colorDisplay);
    });

    console.log(colorDisplay.style.backgroundColor);
    // ctx.fillStyle = '#00ff00';
    console.log(ctx.fillStyle);
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

// function face(){
//     //face, obviously
//     faceCtx.beginPath();
//     faceCtx.arc(200, 200, 180, 0, Math.PI*2, true);
//     faceCtx.closePath();
//     faceCtx.stroke();
//     faceCtx.beginPath();
//     faceCtx.arc(275, 150, 10, 0, Math.PI*2, true);
//     faceCtx.closePath();
//     faceCtx.fill();
//     faceCtx.beginPath();
//     faceCtx.arc(125, 150, 10, 0, Math.PI*2, true);
//     faceCtx.closePath();
//     faceCtx.fill();
// }


// function scaleDown(){
//     faceCtx.scale(.5,.5);
//     faceCtx.beginPath();
//     faceCtx.arc(200, 200, 180, 0, Math.PI*2, true);
//     faceCtx.closePath();
//     faceCtx.stroke();
//     faceCtx.beginPath();
//     faceCtx.arc(275, 150, 10, 0, Math.PI*2, true);
//     faceCtx.closePath();
//     faceCtx.fill();
//     faceCtx.beginPath();
//     faceCtx.arc(125, 150, 10, 0, Math.PI*2, true);
//     faceCtx.closePath();
//     faceCtx.fill();
    
// }

// Clear the canvas context using the canvas width and height
function clearCanvas(canvas,ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

        // touch events 
        canvas.addEventListener('touchstart', sketchpad_touchStart, false);
        canvas.addEventListener('touchmove', sketchpad_touchMove, false);
        canvas.addEventListener('touchend', sketchpad_touchStop, false);
        
    }
    if (ctx || faceCtx){
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
        //scale on click
        // scale.addEventListener('click', scaleDown);
        // if(scaleDown){

        // }
    }

}