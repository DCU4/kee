function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const publicVapidKey = 'BAKF9mYAKExogpQu4YNV6Z9cQDx5QcTqczvwxlTH2GuPyzG9U8kv44yq569kK5eH0rRFDT23iVVGJlrA3Pp9aww';
const convertedPVK = urlBase64ToUint8Array(publicVapidKey);

if ("serviceWorker" in navigator) {

  // send().catch(function (err) { console.error(err) })

} else {
  console.log('no');
}


async function send() {
  const register = await navigator.serviceWorker
    .register("sw.js")
    // .then(console.log)
    .catch(console.error);


  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedPVK
  });
// console.log(JSON.stringify(subscription));

  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(function (res) { console.log(res) })
  .catch(function (err) { console.error(err) });
}




if (document.querySelector('#splash')) {
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#splash').addEventListener('transitionend', function (event) {
      event.target.remove();
    });
    requestAnimationFrame(function () {
      document.querySelector('#splash').classList.add('animate');
    });
  });
}

// checks if an element is in the viewport
// control when it is called with n
function isElementInView(el, n) {
  const rect = el.getBoundingClientRect();
  const elemTop = rect.top
  const elemBottom = rect.bottom
  console.log(elemBottom)
  const isVisible = (elemTop >= 0) && ((elemBottom/n) <= ((window.innerHeight) || (document.documentElement.clientHeight)));
  return isVisible
}

lazyLoadImages = () =>{
  var images = document.querySelectorAll('.saved-image');
  images.forEach(function (image, i) {
      if (isElementInView(image, 1)) {
        let lazySrc = image.getAttribute('data-lazy');
        image.src = lazySrc;
        setTimeout(function(){
          image.classList.add('revealed');
        }, (i*50)+100);
      }
  });
}

window.addEventListener('scroll', lazyLoadImages, false);
window.addEventListener('load', lazyLoadImages, false);




var mySize = document.getElementById("mySize");
var lastX, lastY = -1;
var myColor = document.getElementById("myColor");
var myLight = document.getElementById("myLight");
var colorDisplay = document.getElementById("colorDisplay");
var container = document.getElementById('container');
var mySaturation = document.getElementById('mySaturation');

var points = [];
var saved = [];

var saveColorBtn = document.getElementById('saveColor');
var undoBtn = document.getElementById('undo');
var savedColorContainer = document.getElementById('savedColorsContainer');
var changeColorContainer = document.getElementById('changeColorsContainer');



// window.onscroll = () => {
//   let nav = document.getElementById('nav');
//   nav.classList.add('fixed');
// };

var menuBtn = document.getElementById('menu');
menuBtn.addEventListener('click', function () {
  var menu = document.getElementById('menu-list');
  var menuLine1 = document.getElementById('menu-line-1');
  var menuLine2 = document.getElementById('menu-line-2');
  menuLine1.classList.toggle('line-1-x');
  menuLine2.classList.toggle('line-2-x');

  // menu.classList.toggle('menu-list-open');
  if (menu.classList.contains('menu-list-open')) {
    menu.classList.remove('menu-list-open');

  } else {
    menu.classList.add('menu-list-open');
  }
});


var writtenNoteIcon = document.getElementById('writtenNoteIcon');
if (writtenNoteIcon) {
  writtenNoteIcon.addEventListener('click', function (y) {
    var writtenNoteContainer = document.getElementById('writtenNoteContainer');
    var closeNote = document.getElementById('close-note');
    // console.log(this, y);

    if (y.target == closeNote && writtenNoteContainer.classList.contains('open')) {
      writtenNoteContainer.classList.remove('open');
    } else {
      writtenNoteContainer.classList.add('open');
    }
  });

}

// TOUCH ___________________________

// Define some variables to keep track of the touch position
var touchX, touchY, touchDown;

function sketchpad_touchStart(event) {
  touchDown = 1;
  getTouchPos();
  if (touchDown == 1) {
    drawLine(ctx, touchX, touchY, mySize.value);

  }

  // Prevents an additional mousedown event being triggered
  event.preventDefault();
}

// Stop the line being drawn when touching to separate points
function sketchpad_touchStop() {
  touchDown = 0;
  // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
  lastX = -1;
  lastY = -1;

  // get image data!
  points.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  console.log(points);
}

function sketchpad_touchMove(e) {
  // Update the touch co-ordinates
  getTouchPos(e);

  // because you actually do need to track this...
  if (touchDown == 1) {
    drawLine(ctx, touchX, touchY, mySize.value);

  }
  // Prevent a scrolling action as a result of this touchmove triggering.
  e.preventDefault();

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
      touchX = touch.pageX - touch.target.offsetLeft;
      touchY = touch.pageY - touch.target.offsetTop - 45;
      // touchY=touch.pageY-touch.target.offsetTop-40;
    }
  }
}


// MOUSE ___________________________
var mouseX, mouseY, mouseDown = 0;
function sketchpad_mouseDown() {
  mouseDown = 1;
  drawLine(ctx, mouseX, mouseY, mySize.value);
  points.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

function sketchpad_mouseUp() {
  mouseDown = 0;

  // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
  lastX = -1;
  lastY = -1;


}

function sketchpad_mouseMove(e) {
  // Update the mouse co-ordinates when moved
  getMousePos(e);

  // Draw a pixel if the mouse button is currently being pressed
  if (mouseDown == 1) {
    drawLine(ctx, mouseX, mouseY, mySize.value);
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

var sizeInputContainer = document.getElementById('sizeInputContainer');

var sizeValue = document.getElementById('sizeValue');
if (sizeValue) {
  sizeValue.addEventListener('click', function () {
    // mySize.classList.add('open');
    var notMySize = document.getElementById('notMySize');
    if (mySize.classList.contains('open')) {
      mySize.classList.remove('open');
      notMySize.classList.remove('closed');
    } else {
      mySize.classList.add('open');
      notMySize.classList.add('closed');
    }

  });
}
var isNotInViewport = function (elem) {
  var bounding = elem.getBoundingClientRect();
  return (
    // numbers are the slider position, might need to change this
    bounding.top >= bounding.top &&
    bounding.left >= 300 &&
    bounding.bottom <= bounding.bottom &&
    bounding.right <= 700
  );
};

var changeContainer = document.getElementById('changeContainer');
var savedContainer = document.getElementById('savedContainer');
var slider = document.getElementById('slider');

function animateSlider() {
  var changeSavedColorsContainer = document.getElementById('changeSavedColorsContainer');
  var savedColorDisplay = document.querySelectorAll('.saved-color');


  //check if container is in the view port and if the target is a color change slider
  if (isNotInViewport(savedColorContainer) || !changeSavedColorsContainer.classList.contains('animate')) {
    changeSavedColorsContainer.classList.add('animate');
    changeContainer.classList.remove('this-container');
    savedContainer.classList.add('this-container');

    savedColorDisplay.forEach(function (color, c) {
      if (color.style.background != '') {
        setTimeout(function () {
          color.classList.add('bloop');
        }, (25 * c) + 25);
      }
    });

  } else {
    // console.log('no')
    changeSavedColorsContainer.classList.remove('animate');
    changeContainer.classList.add('this-container');
    savedContainer.classList.remove('this-container');
    savedColorDisplay.forEach(function (color, c) {
      if (color.style.background != '') {
        setTimeout(function () {
          color.classList.remove('bloop');
        }, (25 * c) + 25);
      }
    });
  }


}

function changeColor(c) {
  var displayColor = "hsl(" + myColor.value + "," + mySaturation.value + "%," + myLight.value + "%)";
  colorDisplay.style.background = displayColor;
  savedColor = 0;
  isGradientColor = 0;
}


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


function cUndo(canvas, ctx) {
  canvas = document.getElementById('sketchpad');

  if (canvas.getContext) {
    ctx = canvas.getContext('2d');

    // first set of points is the face, we dont want to undo that!
    if (points.length > 1) {
      points.pop();
      console.log(points);
      console.log(points.length);
      //clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    //redraw canvas with old data
    for (var i = 0; points.length > i; i++) {
      // console.log(points[i]);
      ctx.putImageData(points[i], 0, 0, 0, 0, canvas.width, canvas.height);
    }
  }
}




function saveColor() {

  // fetch push to savedColors array
  var url = '/save-color';
  var data = 'savedColors=' + colorDisplay.style.background;
  // console.log(data);
  fetch(url, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }

  })
  .catch(function (error) { console.error('Error:', error) })

  
  createSavedColor();

  // if you click save, create a new element
  // let savedColors = [];
  // var savedColorDisplay = document.getElementsByClassName('saved-color');
  // savedColors.push(colorDisplay.style.background);
  // 	for (var j = 0; j < savedColorDisplay.length; j++) {
  // 		for (var i = 0; i < savedColors.length; i++) {
  // 			if (j == i) {
  // 				savedColorDisplay[j].classList.add('bloop');
  //         // savedColorDisplay[j].style.background = savedColors[i];
  //         // savedColorContainer.innerHTML = newSavedColor;
  // 			}
  // 			savedColorDisplay[i].addEventListener('click', useSavedColor);
  // 		}
  //   }

}


// if current color is apart of the savedcolors array, change the plus to an x



function createSavedColor() {

  let newSavedColor = `
  <div class="saved-color-display">
    <div style="background:${colorDisplay.style.background}" class="saved-color bloop"></div>
  </div>
  `;
  savedColorContainer.innerHTML += newSavedColor;
  let savedColorDisplay = document.querySelectorAll('.saved-color');
  savedColorDisplay.forEach(function(display,i){
    display.addEventListener('click', useSavedColor);
  });
  
}


function useSavedColor() {
  savedColor = 1;
  isGradientColor = 0;
  animateSlider();
  colorDisplay.style.background = this.style.background;
}

// Draws a dot at a specific position on the supplied canvas name
// Parameters are: A canvas context, the x position, the y position

function drawLine(ctx, x, y, size) {
  // Select a fill style
  var h = myColor.value, l = myLight.value, s = mySaturation.value;
  var lineColor = "hsl(" + h + "," + s + "%," + l + "%)";

  var gradient = ctx.createLinearGradient(20, 0, 250, 0);

  //checks whether its a saved color or gradient
  if (savedColor === 1) {
    ctx.strokeStyle = colorDisplay.style.background;
  } else if (isGradientColor === 1) {
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    ctx.strokeStyle = gradient;
  } else {
    ctx.strokeStyle = lineColor;
    colorDisplay.style.background = lineColor;
  }

  // If lastX is not set, set lastX and lastY to the current position
  if (lastX == -1) {
    lastX = x;
    lastY = y;
  }

  // Set the line "cap" style to round, so lines at different angles can join into each other
  ctx.lineCap = "round";

  // Draw a filled line
  ctx.beginPath();

  // First, move to the old (previous) position
  ctx.moveTo(lastX, lastY);

  // Now draw a line to the current touch/pointer position
  ctx.lineTo(x, y);

  // Set the line thickness and draw the line
  ctx.lineWidth = size;
  ctx.stroke();

  ctx.closePath();

  // Update the last position to reference the current position
  lastX = x;
  lastY = y;

}

// Clear the canvas context using the canvas width and height
function clearCanvas(canvas, ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // first point is the face!
  points.length = 1;
  for (var i = 0; points.length > i; i++) {
    ctx.putImageData(points[i], 0, 0, 0, 0, canvas.width, canvas.height);
  }
}

//save drawing
function saveDrawing(canvas) {

  // var cavnasData = canvas.toDataURL();
  saved.push(canvas.toDataURL());
  // savedFace.push(face.toDataURL('image/png',1));

  // console.log(saved);
  // console.log(savedFace);

  //if saved is less than one, push, else, shift!!
  if (saved.length > 1) {
    saved.shift();
  }
  // console.log(saved);
  // Save data to sessionStorage for testing purposes
  sessionStorage.setItem('src', saved[0]);
  // sessionStorage.setItem('faceSrc',savedFace[0]);
  // console.log(sessionStorage);
  // Get saved data from sessionStorage


  var savedResponse = document.getElementById('saved-response');
  savedResponse.classList.add('response');
  setTimeout(function () {
    savedResponse.classList.remove('response');
  }, 2000);

  var note = document.getElementById('writtenNote');
  var url = '/saved';
  //holy shit this works
  var savedEncoded = encodeURIComponent(saved[0]);
  var data = 'image=' + savedEncoded + '&description=' + note.value;
  // let data = 'kee[image]='+savedEncoded+'&kee[description]=hello';

  fetch(url, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }

  })
    .then(function (response) { window.location.href = response.url })
    .then(function (response) { console.log('Success:', response.url, window.location) })
    .catch(function (error) { console.error('Error:', error) });

}


function resizeCanvas(canvas) {

  if (window.innerWidth < 720) {
    container.style.height = window.innerWidth - 15 + "px";
    canvas.width = (window.innerWidth);
    canvas.height = (window.innerWidth - 40);
  } else {
    container.style.height = 400 - 25 + "px";
    canvas.width = (400);
    canvas.height = (400 - 45);
  }
}

// Set-up the canvas and add our event handlers after the page has loaded
function init() {

  // Get the specific canvas element from the HTML document

  canvas = document.getElementById('sketchpad');

  // show save button on draw page
  // if (canvas) {
  // 	var nav = document.getElementById('nav');
  // 	nav.innerHTML += '<div id="saveBtn" class="save"></div>';
  // }
  // styling for slider
  if (savedColorContainer || changeColorContainer || colorDisplay) {
    savedColorContainer.style.width = window.innerWidth - 20 + "px";

    changeColorContainer.style.width = window.innerWidth - 20 + "px";
    //first color to display
    colorDisplay.style.background = "hsl(" + myColor.value + "," + mySaturation.value + "%," + myLight.value + "%)";

    let savedColorDisplay = document.querySelectorAll('.saved-color');
    savedColorDisplay.forEach(function(display,i){
      display.addEventListener('click', useSavedColor);
    });

    // logic for checking if color is already saved
    const checkSavedColors = (color) => color.style.background == colorDisplay.style.background;
    const savedColorDisplayArr = [].slice.call(savedColorDisplay);
    const svArr = savedColorDisplayArr.find((color) =>  color.style.background == colorDisplay.style.background );
    // console.log(, svArr );
    // check if color is saved
    const isColorSaved = savedColorDisplayArr.some(checkSavedColors);
    console.log(isColorSaved, svArr );
    if (isColorSaved) {
      saveColorBtn.classList.add('delete');
    } else {
      saveColorBtn.classList.remove('delete');
    }

  }


  // If the browser supports the canvas tag, get the 2d drawing context for this canvas
  if (canvas.getContext) {
    ctx = canvas.getContext('2d');
    // resize canvas on change of screen width
    resizeCanvas(canvas);
    // resizeCanvas(face,canvas);
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

    //FACE
    if (window.innerWidth < 720) {
      ctx.beginPath();
      ctx.arc(window.innerWidth / 2, window.innerWidth / 2.25, window.innerWidth / 2.5, 0, Math.PI * 2, true);
      console.log(window.innerWidth);
      ctx.closePath();
      ctx.stroke();
      //eyes
      ctx.beginPath();
      ctx.arc(window.innerWidth / 1.5, window.innerWidth / 2.75, 10, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.arc(window.innerWidth / 2.9, window.innerWidth / 2.75, 10, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      points.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    } else {
      ctx.beginPath();
      ctx.arc(400 / 2, 400 / 2.25, 400 / 2.5, 0, Math.PI * 2, true);
      console.log(400);
      ctx.closePath();
      ctx.stroke();
      //eyes
      ctx.beginPath();
      ctx.arc(400 / 1.5, 400 / 2.75, 10, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.arc(400 / 2.9, 400 / 2.75, 10, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fill();
      points.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }

  }


  myColor.addEventListener('input', changeColor, true);
  myLight.addEventListener('input', changeColor, true);
  mySaturation.addEventListener('input', changeColor, true);

  sizeValue.innerHTML = (mySize.value / 2);
  mySize.addEventListener('input', function () {
    sizeValue.innerHTML = (mySize.value / 2);
  });

  changeContainer.addEventListener('click', animateSlider, false);
  savedContainer.addEventListener('click', animateSlider, false);

  var save = document.getElementById('saveBtn');
  save.addEventListener('click', function () {
    saveDrawing(canvas);
  });

  undoBtn.addEventListener('touchstart', preventZoom);

  saveColorBtn.addEventListener('click', saveColor);


  //gradients in here because it was causing errors on history page in gradient.js file
  mood.style.backgroundImage = 'linear-gradient(#e66465,#9198e5)';
  sunset.style.backgroundImage = 'linear-gradient(#C02425,#F0CB35)';
  mintTea.style.backgroundImage = 'linear-gradient(#1D976C,#93F9B9)';
  summertime.style.backgroundImage = 'linear-gradient(#c2e59c,#64b3f4)';
  rainySeason.style.backgroundImage = 'linear-gradient(#757F9A,#D7DDE8)';


}
