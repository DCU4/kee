var lastX,touchX,touchY,touchDown,color=document.getElementById("colorPick"),lastY=-1,scale=document.querySelector(".scale"),myColor=document.getElementById("myColor"),myLight=document.getElementById("myLight"),colorDisplay=document.getElementById("colorDisplay"),container=document.getElementById("container"),mySaturation=document.getElementById("mySaturation"),save=document.getElementById("saveBtn"),points=[],saved=[],savedFace=[],menuBtn=document.getElementById("menu"),menuLine1=document.getElementById("menu-line-1"),menuLine2=document.getElementById("menu-line-2"),menu=document.getElementById("menu-list");function sketchpad_touchStart(){touchDown=1,getTouchPos(),1==touchDown&&drawLine(ctx,touchX,touchY,mySize.value),event.preventDefault()}function sketchpad_touchStop(){touchDown=0,lastY=lastX=-1,points.push(ctx.getImageData(0,0,canvas.width,canvas.height)),console.log(points)}function sketchpad_touchMove(e){getTouchPos(e),1==touchDown&&drawLine(ctx,touchX,touchY,mySize.value),event.preventDefault()}function getTouchPos(e){if(!e)e=event;if(e.touches&&1==e.touches.length){var t=e.touches[0];touchX=t.pageX-t.target.offsetLeft,touchY=t.pageY-t.target.offsetTop}}menuBtn.addEventListener("click",function(){menuLine1.classList.toggle("line-1-x"),menuLine2.classList.toggle("line-2-x"),menu.classList.contains("menu-list-open")?(menu.classList.remove("menu-list-open"),menu.classList.add("menu-list-close")):(menu.classList.add("menu-list-open"),menu.classList.remove("menu-list-close"))});var mouseX,mouseY,mouseDown=0;function sketchpad_mouseDown(){mouseDown=1,drawLine(ctx,mouseX,mouseY,mySize.value),points.push(ctx.getImageData(0,0,canvas.width,canvas.height))}function sketchpad_mouseUp(){mouseDown=0,lastY=lastX=-1}function sketchpad_mouseMove(e){getMousePos(e),1==mouseDown&&drawLine(ctx,mouseX,mouseY,mySize.value)}function getMousePos(e){if(!e)e=event;e.offsetX?(mouseX=e.offsetX,mouseY=e.offsetY):e.layerX&&(mouseX=e.layerX,mouseY=e.layerY)}function cUndo(e,t){if((e=document.getElementById("sketchpad")).getContext){t=e.getContext("2d"),points.pop(),console.log(points),t.clearRect(0,0,e.width,e.height);for(var n=0;points.length>n;n++)t.putImageData(points[n],0,0,0,0,e.width,e.height)}}function drawLine(e,t,n,a){var o=myColor.value,s=myLight.value,c=mySaturation.value;lineColor="hsl("+o+","+c+"%,"+s+"%)",e.strokeStyle=lineColor,colorDisplay.style.background=lineColor,-1==lastX&&(lastX=t,lastY=n),e.lineCap="round",e.beginPath(),e.moveTo(lastX,lastY),e.lineTo(t,n),e.lineWidth=a,e.stroke(),e.closePath(),lastX=t,lastY=n}function clearCanvas(e,t){t.clearRect(0,0,e.width,e.height)}function saveDrawing(e,t){saved.push(e.toDataURL()),savedFace.push(t.toDataURL()),console.log(savedFace),1<saved.length&&saved.shift(),console.log(saved),sessionStorage.setItem("src",saved[0]),sessionStorage.setItem("faceSrc",savedFace[0]),console.log(sessionStorage)}function savedInit(){canvasScaled=document.getElementById("sketchpadScaled"),faceScaled=document.getElementById("faceScaled");var e=sessionStorage.getItem("src"),t=sessionStorage.getItem("faceSrc");if(console.log(t),canvasScaled.getContext&&faceScaled.getContext){ctxScaled=canvasScaled.getContext("2d"),faceCtxScaled=faceScaled.getContext("2d"),canvasScaled.width=100,canvasScaled.height=100,faceScaled.width=100,faceScaled.height=100,container.style.height="300px";var n=new Image,a=new Image;console.log(a),n.onload=function(){ctxScaled.drawImage(n,0,0,canvasScaled.width,canvasScaled.height),faceCtxScaled.drawImage(a,0,0,faceScaled.width,faceScaled.height)},n.src=e,a.src=t}}function resizeCanvas(e,t){e.width=window.innerWidth-20,e.height=window.innerWidth-40,container.style.height=window.innerWidth+"px",t.width=window.innerWidth-20,console.log(t.width),t.height=window.innerWidth-40}function init(){canvas=document.getElementById("sketchpad"),face=document.getElementById("face"),canvas.getContext&&(ctx=canvas.getContext("2d"),resizeCanvas(face,canvas),window.addEventListener("resize",resizeCanvas,!1),window.addEventListener("orientationchange",resizeCanvas,!1)),face.getContext&&(faceCtx=face.getContext("2d"),resizeCanvas(face,canvas),window.addEventListener("resize",resizeCanvas,!1),window.addEventListener("orientationchange",resizeCanvas,!1)),ctx&&(canvas.addEventListener("mousedown",sketchpad_mouseDown,!1),canvas.addEventListener("mousemove",sketchpad_mouseMove,!1),window.addEventListener("mouseup",sketchpad_mouseUp,!1),canvas.addEventListener("touchstart",sketchpad_touchStart,!1),canvas.addEventListener("touchmove",sketchpad_touchMove,!1),canvas.addEventListener("touchend",sketchpad_touchStop,!1)),faceCtx&&(faceCtx.beginPath(),faceCtx.arc(window.innerWidth/2.12,window.innerWidth/2.25,window.innerWidth/2.5,0,2*Math.PI,!0),console.log(window.innerWidth),faceCtx.closePath(),faceCtx.stroke(),faceCtx.beginPath(),faceCtx.arc(window.innerWidth/1.6,window.innerWidth/2.75,10,0,2*Math.PI,!0),faceCtx.closePath(),faceCtx.fill(),faceCtx.beginPath(),faceCtx.arc(window.innerWidth/3.1,window.innerWidth/2.75,10,0,2*Math.PI,!0),faceCtx.closePath(),faceCtx.fill()),save.addEventListener("click",function(){saveDrawing(canvas,face)})}colorDisplay&&(colorDisplay.style.background="hsl("+myColor.value+","+mySaturation.value+"%,"+myLight.value+"%)",myColor.addEventListener("input",function(e){var t="hsl("+myColor.value+","+mySaturation.value+"%,"+myLight.value+"%)";colorDisplay.style.background=t}),myLight.addEventListener("input",function(e){var t="hsl("+myColor.value+","+mySaturation.value+"%,"+myLight.value+"%)";colorDisplay.style.background=t}),mySaturation.addEventListener("input",function(e){var t="hsl("+myColor.value+","+mySaturation.value+"%,"+myLight.value+"%)";colorDisplay.style.background=t}));