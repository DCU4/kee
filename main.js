
// var mySize = document.getElementById("mySize");
var color = document.getElementById('colorPick');
var lastX,lastY=-1;
var scale =document.querySelector('.scale');
var myColor = document.getElementById("myColor");
var myLight = document.getElementById("myLight");
var colorDisplay = document.getElementById("colorDisplay");
var container = document.getElementById('container');
var mySaturation = document.getElementById('mySaturation');
var points = [];

// TOUCH ___________________________

// Define some variables to keep track of the touch position
    var touchX,touchY,touchDown;

    function sketchpad_touchStart() {
        touchDown = 1;
        getTouchPos();
        if(touchDown == 1){
            drawLine(ctx,touchX,touchY,mySize.value);
            
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

        // get image data!
        points.push(ctx.getImageData(0,0,canvas.width, canvas.height));
        console.log(points);
    }

    function sketchpad_touchMove(e) {
        // Update the touch co-ordinates
        getTouchPos(e);

        // because you actually do need to track this...
        if(touchDown == 1){
            drawLine(ctx,touchX,touchY,mySize.value);
            
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
var mouseX,mouseY,mouseDown=0;
function sketchpad_mouseDown() {
    mouseDown=1;
    drawLine(ctx,mouseX,mouseY,mySize.value );
    
    points.push(ctx.getImageData(0,0,canvas.width, canvas.height));
    console.log(points);
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
        drawLine(ctx,mouseX,mouseY,mySize.value);
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

// Color display
colorDisplay.style.background = "hsl("+myColor.value+","+mySaturation.value+"%,"+myLight.value+"%)";
myColor.addEventListener('input',function(e) {
    var displayColor = "hsl("+myColor.value+","+mySaturation.value+"%,"+myLight.value+"%)";
    colorDisplay.style.background = displayColor;

});

myLight.addEventListener('input', function(f){
    var displayColor = "hsl("+myColor.value+","+mySaturation.value+"%,"+myLight.value+"%)";
    colorDisplay.style.background = displayColor;
});

mySaturation.addEventListener('input', function(g){
    var displayColor = "hsl("+myColor.value+","+mySaturation.value+"%,"+myLight.value+"%)";
    colorDisplay.style.background = displayColor;
});

// mySize.addEventListener('input', function(h){
//     colorDisplay.style.height = (mySize.value *2)+ "px";
//     colorDisplay.style.width = (mySize.value *2)+ "px";
// });

// Draws a dot at a specific position on the supplied canvas name
// Parameters are: A canvas context, the x position, the y position





function cUndo(canvas,ctx) {
    canvas = document.getElementById('sketchpad');

    if (canvas.getContext){
        ctx = canvas.getContext('2d');

        points.pop();
        console.log(points);
        //clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //redraw canvas with old data
        for( var i = 0; points.length > i; i++){
            console.log(points[i]);
            ctx.putImageData(points[i], 0,0,0,0, canvas.width, canvas.height);
        }
    }
}

function drawLine(ctx,x,y,size) {
    // lineColor = "hsl(200,100%,50%)";
    // cPush()
    // Select a fill style
    var h=myColor.value,  l=myLight.value, s=mySaturation.value;
    lineColor = "hsl("+h+","+s+"%,"+l+"%)";
    ctx.strokeStyle = lineColor;
    colorDisplay.style.background = lineColor;
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

    //get image data
    
    // points.push(ctx.getImageData(0,0,canvas.width, canvas.height));
    // console.log(points);
    

}

// Clear the canvas context using the canvas width and height
function clearCanvas(canvas,ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function resizeCanvas(face,canvas){
    face.width = (window.innerWidth - 20);
    face.height = (window.innerWidth - 40);

    container.style.height = window.innerWidth + "px";
    canvas.width = (window.innerWidth -20);
    console.log(canvas.width);
    canvas.height = (window.innerWidth -40);
}

// Set-up the canvas and add our event handlers after the page has loaded
function init() {

        // Get the specific canvas element from the HTML document
    canvas = document.getElementById('sketchpad');
    face = document.getElementById('face');


        // If the browser supports the canvas tag, get the 2d drawing context for this canvas
    if (canvas.getContext){
        ctx = canvas.getContext('2d');
        // resize canvas on change of screen width
        resizeCanvas(face,canvas);
        window.addEventListener('resize', resizeCanvas, false);
        window.addEventListener('orientationchange', resizeCanvas, false);

    }
    if (face.getContext){
        faceCtx = face.getContext('2d');
        // resize face on change of screen width
        resizeCanvas(face,canvas);
        window.addEventListener('resize', resizeCanvas, false);
        window.addEventListener('orientationchange', resizeCanvas, false);

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
        // resizeCanvas(face,canvas);

    }
    if (faceCtx){
        //face, obviously
        faceCtx.beginPath();
        faceCtx.arc(window.innerWidth/2.12, window.innerWidth/2.25, window.innerWidth/2.5, 0, Math.PI*2, true);
        console.log(window.innerWidth);
        faceCtx.closePath();
        faceCtx.stroke();
        //eyes
        faceCtx.beginPath();
        faceCtx.arc(window.innerWidth/1.6, window.innerWidth/2.75, 10, 0, Math.PI*2, true);
        faceCtx.closePath();
        faceCtx.fill();
        faceCtx.beginPath();
        faceCtx.arc(window.innerWidth/3.1, window.innerWidth/2.75, 10, 0, Math.PI*2, true);
        faceCtx.closePath();
        faceCtx.fill();


    }

}