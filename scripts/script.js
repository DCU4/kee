var mouseX,mouseY,lastX,touchX,touchY,touchDown,mouseDown=0,color=document.getElementById("colorPick"),lastY=-1,scale=document.querySelector(".scale"),myColor=document.getElementById("myColor"),myLight=document.getElementById("myLight"),colorDisplay=document.getElementById("colorDisplay"),container=document.getElementById("container"),mySaturation=document.getElementById("mySaturation");function sketchpad_touchStart(){touchDown=1,getTouchPos(),1==touchDown&&drawLine(ctx,touchX,touchY,mySize.value),event.preventDefault()}function sketchpad_touchStop(){touchDown=0,lastY=lastX=-1}function sketchpad_touchMove(e){getTouchPos(e),1==touchDown&&drawLine(ctx,touchX,touchY,mySize.value),event.preventDefault()}function getTouchPos(e){if(!e)e=event;if(e.touches&&1==e.touches.length){var t=e.touches[0];touchX=t.pageX-t.target.offsetLeft,touchY=t.pageY-t.target.offsetTop}}function sketchpad_mouseDown(){mouseDown=1,drawLine(ctx,mouseX,mouseY,mySize.value)}function sketchpad_mouseUp(){mouseDown=0,lastY=lastX=-1}function sketchpad_mouseMove(e){getMousePos(e),1==mouseDown&&(console.log("1"),drawLine(ctx,mouseX,mouseY,mySize.value))}function getMousePos(e){if(!e)e=event;e.offsetX?(mouseX=e.offsetX,mouseY=e.offsetY):e.layerX&&(mouseX=e.layerX,mouseY=e.layerY)}function drawLine(e,t,o,n){var a=myColor.value,c=myLight.value,i=mySaturation.value;lineColor="hsl("+a+","+i+"%,"+c+"%)",e.strokeStyle=lineColor,colorDisplay.style.background=lineColor,console.log(lineColor),-1==lastX&&(lastX=t,lastY=o),e.lineCap="round",e.beginPath(),e.moveTo(lastX,lastY),e.lineTo(t,o),e.lineWidth=n,e.stroke(),e.closePath(),lastX=t,lastY=o}function clearCanvas(e,t){t.clearRect(0,0,e.width,e.height)}function resizeCanvas(){}function init(){canvas=document.getElementById("sketchpad"),face=document.getElementById("face"),canvas.getContext&&(ctx=canvas.getContext("2d"),container.style.height=window.innerWidth+20+"px",canvas.width=window.innerWidth-20,console.log(canvas.width),canvas.height=window.innerWidth-20),face.getContext&&(faceCtx=face.getContext("2d"),face.width=window.innerWidth-20,face.height=window.innerWidth-20),ctx&&(canvas.addEventListener("mousedown",sketchpad_mouseDown,!1),canvas.addEventListener("mousemove",sketchpad_mouseMove,!1),window.addEventListener("mouseup",sketchpad_mouseUp,!1),canvas.addEventListener("touchstart",sketchpad_touchStart,!1),canvas.addEventListener("touchmove",sketchpad_touchMove,!1),canvas.addEventListener("touchend",sketchpad_touchStop,!1)),faceCtx&&(faceCtx.beginPath(),faceCtx.arc(window.innerWidth/2.13,window.innerWidth/2.13,window.innerWidth/2.5,0,2*Math.PI,!0),faceCtx.closePath(),faceCtx.stroke(),faceCtx.beginPath(),faceCtx.arc(window.innerWidth/1.6,window.innerWidth/2.5,10,0,2*Math.PI,!0),faceCtx.closePath(),faceCtx.fill(),faceCtx.beginPath(),faceCtx.arc(window.innerWidth/3.1,window.innerWidth/2.5,10,0,2*Math.PI,!0),faceCtx.closePath(),faceCtx.fill())}colorDisplay.style.background="hsl("+myColor.value+","+mySaturation.value+"%,"+myLight.value+"%)",myColor.addEventListener("input",function(e){var t="hsl("+myColor.value+","+mySaturation.value+"%,"+myLight.value+"%)";colorDisplay.style.background=t}),myLight.addEventListener("input",function(e){var t="hsl("+myColor.value+","+mySaturation.value+"%,"+myLight.value+"%)";colorDisplay.style.background=t}),mySaturation.addEventListener("input",function(e){var t="hsl("+myColor.value+","+mySaturation.value+"%,"+myLight.value+"%)";colorDisplay.style.background=t});