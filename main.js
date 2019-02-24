// var mySize = document.getElementById("mySize");
var color = document.getElementById('colorPick');
var lastX,lastY=-1;
var scale =document.querySelector('.scale');
var myColor = document.getElementById("myColor");
var myLight = document.getElementById("myLight");
var colorDisplay = document.getElementById("colorDisplay");
var container = document.getElementById('container');
var mySaturation = document.getElementById('mySaturation');
var save = document.getElementById('saveBtn');
var points = [];
var saved = [];
var savedFace = [];
var menuBtn = document.getElementById('menu');
var menuLine1 = document.getElementById('menu-line-1');
var menuLine2 = document.getElementById('menu-line-2');
var menu = document.getElementById('menu-list');
var saveColorBtn = document.getElementById('saveColor');
var savedColorDisplay = document.getElementById('savedColorDisplay');
// var savedColorDisplay = document.getElementsByClassName('saved-color-display')
var undoBtn = document.getElementById('undo');
var savedColorContainer = document.getElementById('savedColorsContainer');
var changeColorContainer = document.getElementById('changeColorsContainer');
var changeContainer = document.getElementById('changeContainer');
var savedContainer = document.getElementById('savedContainer');
var slider = document.getElementById('slider');
var changeSavedColorsContainer = document.getElementById('changeSavedColorsContainer');
// var inputs = document.querySelectorAll('input');

menuBtn.addEventListener('click', function(){
    menuLine1.classList.toggle('line-1-x');
    menuLine2.classList.toggle('line-2-x');

    // menu.classList.toggle('menu-list-open');
    if(menu.classList.contains('menu-list-open')) {
        menu.classList.remove('menu-list-open');
        menu.classList.add('menu-list-close');

    } else {
        menu.classList.add('menu-list-open');
        menu.classList.remove('menu-list-close');
    }
});


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
var savedColor = 0;
colorDisplay.style.background = "hsl("+myColor.value+","+mySaturation.value+"%,"+myLight.value+"%)";

var isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        // numbers are the slider position, might need to change this
        bounding.top >= bounding.top &&
        bounding.left >= 300 &&
        bounding.bottom <= bounding.bottom &&
        bounding.right <= 700
    );
};

function animateSlider (a){
    //check if container is in the view port and if the target is a color change slider
    if (isInViewport(savedColorContainer) && !(a.target == myColor) && !(a.target == myLight) && !(a.target == mySaturation)) {       
        changeSavedColorsContainer.classList.add('animate');
    } else {
        changeSavedColorsContainer.classList.remove('animate');
    }
        
}

function stopSlider(b){
    if (isInViewport(savedColorContainer) && !(b.target == myColor) && !(b.target == myLight) && !(b.target == mySaturation)) {
        changeContainer.classList.remove('this-container');
        savedContainer.classList.add('this-container');
    } else {
        changeContainer.classList.add('this-container');
        savedContainer.classList.remove('this-container');
    }
}


function changeColor(c) {
    var displayColor = "hsl("+myColor.value+","+mySaturation.value+"%,"+myLight.value+"%)";
    colorDisplay.style.background = displayColor;
    savedColor = 0;
}

    myColor.addEventListener('input',changeColor,true);
    myLight.addEventListener('input', changeColor,true);
    mySaturation.addEventListener('input', changeColor,true);

    slider.addEventListener('touchmove', animateSlider, false);
    slider.addEventListener('touchend', stopSlider, false); 

// mySize.addEventListener('input', function(h){
//     colorDisplay.style.height = (mySize.value *2)+ "px";
//     colorDisplay.style.width = (mySize.value *2)+ "px";
// });

function preventZoom(e) {
    var t2 = e.timeStamp;
    var t1 = e.currentTarget.dataset.lastTouch || t2;
    var dt = t2 - t1;
    var fingers = e.touches.length;
    e.currentTarget.dataset.lastTouch = t2;

    if (!dt || dt > 500 || fingers > 1) return; // not double-tap

    e.preventDefault();
    e.target.click();
}
undoBtn.addEventListener('touchstart', preventZoom); 

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
            // console.log(points[i]);
            ctx.putImageData(points[i], 0,0,0,0, canvas.width, canvas.height);
        }
    }
}

function saveColor() {
    savedColorDisplay.style.background = colorDisplay.style.background;
}
saveColorBtn.addEventListener('click', saveColor);

function useSavedColor(){
    savedColor = 1;
    colorDisplay.style.background = savedColorDisplay.style.background;
}
savedColorDisplay.addEventListener('click', useSavedColor);

// Draws a dot at a specific position on the supplied canvas name
// Parameters are: A canvas context, the x position, the y position
function drawLine(ctx,x,y,size) {
    // Select a fill style
    var h=myColor.value,  l=myLight.value, s=mySaturation.value;
    lineColor = "hsl("+h+","+s+"%,"+l+"%)";

    //checks whether its a saved color
    if (savedColor===1){
        ctx.strokeStyle = savedColorDisplay.style.background;
    } else {
        ctx.strokeStyle = lineColor;
        colorDisplay.style.background = lineColor;
    }   
    
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

//save drawing
function saveDrawing(canvas,face) {

        // var cavnasData = canvas.toDataURL();
        saved.push(canvas.toDataURL());
        savedFace.push(face.toDataURL('image/png',1));

        // console.log(saved);
        console.log(savedFace);
        //if saved is less than one, push, else, shift!!

        if(saved.length > 1){
            saved.shift();
        } 
        console.log(saved);
        // Save data to sessionStorage
        sessionStorage.setItem('src', saved[0]);
        sessionStorage.setItem('faceSrc',savedFace[0]);
        console.log(sessionStorage);
        // Get saved data from sessionStorage
        
        // Remove saved data from sessionStorage
        // sessionStorage.removeItem('key');

        // Remove all saved data from sessionStorage
        // sessionStorage.clear();

}

function savedInit() {

    //for scaled versions
    canvasScaled = document.getElementById('sketchpadScaled');
    faceScaled = document.getElementById('faceScaled');

    var data = sessionStorage.getItem('src');
    var faceData = sessionStorage.getItem('faceSrc');
    console.log(faceData);
    // console.log(data);

    var mySavedImg = document.getElementById('mySavedImg');
    var mySavedFace = document.getElementById('mySavedFace');
    mySavedImg.src = data;
    mySavedFace.src = faceData;
    

    if (canvasScaled.getContext && faceScaled.getContext){
        ctxScaled = canvasScaled.getContext('2d');
        faceCtxScaled = faceScaled.getContext('2d');
        canvasScaled.width = 100;
        canvasScaled.height = 100;
        faceScaled.width = 100;
        faceScaled.height = 100;
        container.style.height = 300 + 'px';

        var myImage = new Image();
        var myFace = new Image();
        console.log(myFace);
        // ctxScaled.scale(.5,.5);
        myImage.onload = function(){
            ctxScaled.drawImage(myImage, 0, 0, canvasScaled.width, canvasScaled.height);
            faceCtxScaled.drawImage(myFace, 0, 0, faceScaled.width, faceScaled.height);
        };
        // ctxScaled.drawImage(myImage, 0, 0);
        myImage.src = data;
        myFace.src = faceData;

    }
}


function resizeCanvas(face,canvas){
    face.width = (window.innerWidth - 20);
    face.height = (window.innerWidth - 40);

    container.style.height = window.innerWidth - 25 + "px";
    canvas.width = (window.innerWidth -20);
    canvas.height = (window.innerWidth -40);
}

// Set-up the canvas and add our event handlers after the page has loaded
function init() {

    // Get the specific canvas element from the HTML document
    canvas = document.getElementById('sketchpad');
    face = document.getElementById('face');

    // styling for slider
    savedColorContainer.style.width = window.innerWidth -20+"px";
    console.log(savedColorContainer.style.width);
    changeColorContainer.style.width = window.innerWidth -20+"px";


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

    // if(canvasScaled.getContext){
    //     ctxScaled = canvasScaled.getContext('2d');
    // }
    // if(faceScaled.getContext){
    //     faceCtxScaled = faceScaled.getContext('2d');
    // }

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

    save.addEventListener('click', function(){
        saveDrawing(canvas,face);
    });

}