var lastX,touchX,touchY,touchDown,color=document.getElementById("colorPick"),lastY=-1,scale=document.querySelector(".scale"),myColor=document.getElementById("myColor"),myLight=document.getElementById("myLight"),colorDisplay=document.getElementById("colorDisplay"),container=document.getElementById("container"),mySaturation=document.getElementById("mySaturation"),save=document.getElementById("saveBtn"),points=[],saved=[],savedFace=[],menuBtn=document.getElementById("menu"),menuLine1=document.getElementById("menu-line-1"),menuLine2=document.getElementById("menu-line-2"),menu=document.getElementById("menu-list"),saveColorBtn=document.getElementById("saveColor"),savedColorDisplay=document.getElementsByClassName("saved-color-display"),undoBtn=document.getElementById("undo"),savedColorContainer=document.getElementById("savedColorsContainer"),changeColorContainer=document.getElementById("changeColorsContainer"),changeContainer=document.getElementById("changeContainer"),savedContainer=document.getElementById("savedContainer"),slider=document.getElementById("slider"),changeSavedColorsContainer=document.getElementById("changeSavedColorsContainer");function sketchpad_touchStart(){touchDown=1,getTouchPos(),1==touchDown&&drawLine(ctx,touchX,touchY,mySize.value),event.preventDefault()}function sketchpad_touchStop(){touchDown=0,lastY=lastX=-1,points.push(ctx.getImageData(0,0,canvas.width,canvas.height)),console.log(points)}function sketchpad_touchMove(e){getTouchPos(e),1==touchDown&&drawLine(ctx,touchX,touchY,mySize.value),event.preventDefault()}function getTouchPos(e){if(!e)e=event;if(e.touches&&1==e.touches.length){var t=e.touches[0];touchX=t.pageX-t.target.offsetLeft,touchY=t.pageY-t.target.offsetTop}}menuBtn.addEventListener("click",function(){menuLine1.classList.toggle("line-1-x"),menuLine2.classList.toggle("line-2-x"),menu.classList.contains("menu-list-open")?(menu.classList.remove("menu-list-open"),menu.classList.add("menu-list-close")):(menu.classList.add("menu-list-open"),menu.classList.remove("menu-list-close"))});var mouseX,mouseY,mouseDown=0;function sketchpad_mouseDown(){mouseDown=1,drawLine(ctx,mouseX,mouseY,mySize.value),points.push(ctx.getImageData(0,0,canvas.width,canvas.height))}function sketchpad_mouseUp(){mouseDown=0,lastY=lastX=-1}function sketchpad_mouseMove(e){getMousePos(e),1==mouseDown&&drawLine(ctx,mouseX,mouseY,mySize.value)}function getMousePos(e){if(!e)e=event;e.offsetX?(mouseX=e.offsetX,mouseY=e.offsetY):e.layerX&&(mouseX=e.layerX,mouseY=e.layerY)}var savedColor=0;colorDisplay.style.background="hsl("+myColor.value+","+mySaturation.value+"%,"+myLight.value+"%)";var sizeInputContainer=document.getElementById("sizeInputContainer"),isNotInViewport=function(e){var t=e.getBoundingClientRect();return t.top>=t.top&&300<=t.left&&t.bottom<=t.bottom&&t.right<=700};function animateSlider(e){isNotInViewport(savedColorContainer)&&e.target!=myColor&&e.target!=myLight&&e.target!=mySaturation&&e.target!=mySize?changeSavedColorsContainer.classList.add("animate"):changeSavedColorsContainer.classList.remove("animate")}function stopSlider(e){isNotInViewport(savedColorContainer)&&e.target!=myColor&&e.target!=myLight&&e.target!=mySaturation&&a.target!=mySize?(changeContainer.classList.remove("this-container"),savedContainer.classList.add("this-container")):(changeContainer.classList.add("this-container"),savedContainer.classList.remove("this-container"))}function changeColor(e){var t="hsl("+myColor.value+","+mySaturation.value+"%,"+myLight.value+"%)";colorDisplay.style.background=t,savedColor=0}var sizeValue=document.getElementById("sizeValue");function preventZoom(e){var t=e.timeStamp,n=t-(e.currentTarget.dataset.lastTouch||t),a=e.touches.length;e.currentTarget.dataset.lastTouch=t,!n||500<n||1<a||(e.preventDefault(),e.target.click())}function cUndo(e,t){if((e=document.getElementById("sketchpad")).getContext){t=e.getContext("2d"),points.pop(),console.log(points),t.clearRect(0,0,e.width,e.height);for(var n=0;points.length>n;n++)t.putImageData(points[n],0,0,0,0,e.width,e.height)}}myColor.addEventListener("input",changeColor,!0),myLight.addEventListener("input",changeColor,!0),mySaturation.addEventListener("input",changeColor,!0),sizeValue.innerHTML=mySize.value/2,mySize.addEventListener("input",function(){sizeValue.innerHTML=mySize.value/2}),slider.addEventListener("touchmove",animateSlider,!1),slider.addEventListener("touchend",stopSlider,!1),undoBtn.addEventListener("touchstart",preventZoom);var savedColors=[];function saveColor(){savedColors.push(colorDisplay.style.background);for(var e=0;e<savedColorDisplay.length;e++)for(var t=0;t<savedColors.length;t++)e==t&&(savedColorDisplay[e].style.background=savedColors[t]),savedColorDisplay[t].addEventListener("click",useSavedColor)}function useSavedColor(){savedColor=1,animateSlider(),colorDisplay.style.background=this.style.background}function drawLine(e,t,n,a){var o=myColor.value,i=myLight.value,s=mySaturation.value;lineColor="hsl("+o+","+s+"%,"+i+"%)",1===savedColor?e.strokeStyle=colorDisplay.style.background:(e.strokeStyle=lineColor,colorDisplay.style.background=lineColor),-1==lastX&&(lastX=t,lastY=n),e.lineCap="round",e.beginPath(),e.moveTo(lastX,lastY),e.lineTo(t,n),e.lineWidth=a,e.stroke(),e.closePath(),lastX=t,lastY=n}function clearCanvas(e,t){t.clearRect(0,0,e.width,e.height)}function saveDrawing(e,t){saved.push(e.toDataURL()),savedFace.push(t.toDataURL("image/png",1)),console.log(savedFace),1<saved.length&&saved.shift(),console.log(saved),sessionStorage.setItem("src",saved[0]),sessionStorage.setItem("faceSrc",savedFace[0]),console.log(sessionStorage)}function savedInit(){canvasScaled=document.getElementById("sketchpadScaled"),faceScaled=document.getElementById("faceScaled");var e=sessionStorage.getItem("src"),t=sessionStorage.getItem("faceSrc");console.log(t);var n=document.getElementById("mySavedImg"),a=document.getElementById("mySavedFace");if(n.src=e,a.src=t,canvasScaled.getContext&&faceScaled.getContext){ctxScaled=canvasScaled.getContext("2d"),faceCtxScaled=faceScaled.getContext("2d"),canvasScaled.width=window.innerWidth/4,canvasScaled.height=(window.innerWidth-40)/4,faceScaled.width=window.innerWidth/4,faceScaled.height=(window.innerWidth-40)/4,container.style.height="300px";var o=new Image,i=new Image;console.log(i),o.onload=function(){ctxScaled.drawImage(o,0,0,canvasScaled.width,canvasScaled.height),faceCtxScaled.drawImage(i,0,0,faceScaled.width,faceScaled.height)},o.src=e,i.src=t}}function resizeCanvas(e,t){window.innerWidth<720?(e.width=window.innerWidth,e.height=window.innerWidth-40,container.style.height=window.innerWidth-15+"px",t.width=window.innerWidth,t.height=window.innerWidth-40):(e.width=380,e.height=360,container.style.height="375px",t.width=380,t.height=360)}function init(){canvas=document.getElementById("sketchpad"),face=document.getElementById("face"),savedColorContainer.style.width=window.innerWidth-20+"px",console.log(savedColorContainer.style.width),changeColorContainer.style.width=window.innerWidth-20+"px",canvas.getContext&&(ctx=canvas.getContext("2d"),resizeCanvas(face,canvas),window.addEventListener("resize",resizeCanvas,!1),window.addEventListener("orientationchange",resizeCanvas,!1)),face.getContext&&(faceCtx=face.getContext("2d"),resizeCanvas(face,canvas),window.addEventListener("resize",resizeCanvas,!1),window.addEventListener("orientationchange",resizeCanvas,!1)),ctx&&(canvas.addEventListener("mousedown",sketchpad_mouseDown,!1),canvas.addEventListener("mousemove",sketchpad_mouseMove,!1),window.addEventListener("mouseup",sketchpad_mouseUp,!1),canvas.addEventListener("touchstart",sketchpad_touchStart,!1),canvas.addEventListener("touchmove",sketchpad_touchMove,!1),canvas.addEventListener("touchend",sketchpad_touchStop,!1)),faceCtx&&(window.innerWidth<720?(faceCtx.beginPath(),faceCtx.arc(window.innerWidth/2.12,window.innerWidth/2.25,window.innerWidth/2.5,0,2*Math.PI,!0),console.log(window.innerWidth),faceCtx.closePath(),faceCtx.stroke(),faceCtx.beginPath(),faceCtx.arc(window.innerWidth/1.6,window.innerWidth/2.75,10,0,2*Math.PI,!0),faceCtx.closePath(),faceCtx.fill(),faceCtx.beginPath(),faceCtx.arc(window.innerWidth/3.1,window.innerWidth/2.75,10,0,2*Math.PI,!0)):(faceCtx.beginPath(),faceCtx.arc(400/2.12,400/2.25,160,0,2*Math.PI,!0),console.log(400),faceCtx.closePath(),faceCtx.stroke(),faceCtx.beginPath(),faceCtx.arc(250,400/2.75,10,0,2*Math.PI,!0),faceCtx.closePath(),faceCtx.fill(),faceCtx.beginPath(),faceCtx.arc(400/3.1,400/2.75,10,0,2*Math.PI,!0)),faceCtx.closePath(),faceCtx.fill()),save.addEventListener("click",function(){saveDrawing(canvas,face)})}saveColorBtn.addEventListener("click",saveColor);