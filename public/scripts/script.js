var color1,color2,isGradientColor=0,mood=document.getElementById("mood"),sunset=document.getElementById("sunset"),mintTea=document.getElementById("mint-tea"),summertime=document.getElementById("summertime"),rainySeason=document.getElementById("rainy-season");if(mood){function useGradientColor(){isGradientColor=1,savedColor=0}mood.addEventListener("click",function(){useGradientColor(),console.log(mood),colorDisplay.style.backgroundImage=this.style.backgroundImage,color1="#e66465",color2="#9198e5"},!0),sunset.addEventListener("click",function(){useGradientColor(),colorDisplay.style.backgroundImage=this.style.backgroundImage,color1="#C02425",color2="#F0CB35"},!0),mintTea.addEventListener("click",function(){useGradientColor(),colorDisplay.style.backgroundImage=this.style.backgroundImage,color1="#1D976C",color2="#93F9B9"},!0),summertime.addEventListener("click",function(){useGradientColor(),colorDisplay.style.backgroundImage=this.style.backgroundImage,color1="#c2e59c",color2="#64b3f4"},!0),rainySeason.addEventListener("click",function(){useGradientColor(),colorDisplay.style.backgroundImage=this.style.backgroundImage,color1="#757F9A",color2="#D7DDE8"},!0)}
var lastX,touchX,touchY,touchDown,mySize=document.getElementById("mySize"),lastY=-1,myColor=document.getElementById("myColor"),myLight=document.getElementById("myLight"),colorDisplay=document.getElementById("colorDisplay"),container=document.getElementById("container"),mySaturation=document.getElementById("mySaturation"),save=document.getElementById("saveBtn"),points=[],saved=[],menuBtn=document.getElementById("menu"),saveColorBtn=document.getElementById("saveColor"),undoBtn=document.getElementById("undo"),savedColorContainer=document.getElementById("savedColorsContainer"),changeColorContainer=document.getElementById("changeColorsContainer"),sizeValue=document.getElementById("sizeValue");function sketchpad_touchStart(e){touchDown=1,getTouchPos(),1==touchDown&&drawLine(ctx,touchX,touchY,mySize.value),e.preventDefault()}function sketchpad_touchStop(){touchDown=0,lastY=lastX=-1,points.push(ctx.getImageData(0,0,canvas.width,canvas.height)),console.log(points)}function sketchpad_touchMove(e){getTouchPos(e),1==touchDown&&drawLine(ctx,touchX,touchY,mySize.value),e.preventDefault()}function getTouchPos(e){if(!e)e=event;if(e.touches&&1==e.touches.length){var t=e.touches[0];touchX=t.pageX-t.target.offsetLeft,touchY=t.pageY-t.target.offsetTop-45}}menuBtn.addEventListener("click",function(){var e=document.getElementById("menu-list"),t=document.getElementById("menu-line-1"),n=document.getElementById("menu-line-2");t.classList.toggle("line-1-x"),n.classList.toggle("line-2-x"),e.classList.contains("menu-list-open")?(e.classList.remove("menu-list-open"),e.classList.add("menu-list-close")):(e.classList.add("menu-list-open"),e.classList.remove("menu-list-close"))});var mouseX,mouseY,mouseDown=0;function sketchpad_mouseDown(){mouseDown=1,drawLine(ctx,mouseX,mouseY,mySize.value),points.push(ctx.getImageData(0,0,canvas.width,canvas.height))}function sketchpad_mouseUp(){mouseDown=0,lastY=lastX=-1}function sketchpad_mouseMove(e){getMousePos(e),1==mouseDown&&drawLine(ctx,mouseX,mouseY,mySize.value)}function getMousePos(e){if(!e)e=event;e.offsetX?(mouseX=e.offsetX,mouseY=e.offsetY):e.layerX&&(mouseX=e.layerX,mouseY=e.layerY)}var savedColor=0,sizeInputContainer=document.getElementById("sizeInputContainer");sizeValue.addEventListener("click",function(){var e=document.getElementById("notMySize");mySize.classList.contains("open")?(mySize.classList.remove("open"),e.classList.remove("closed")):(mySize.classList.add("open"),e.classList.add("closed"))});var isNotInViewport=function(e){var t=e.getBoundingClientRect();return t.top>=t.top&&300<=t.left&&t.bottom<=t.bottom&&t.right<=700},changeContainer=document.getElementById("changeContainer"),savedContainer=document.getElementById("savedContainer"),slider=document.getElementById("slider");function animateSlider(e){var t=document.getElementById("changeSavedColorsContainer");isNotInViewport(savedColorContainer)||!t.classList.contains("animate")?(t.classList.add("animate"),changeContainer.classList.remove("this-container"),savedContainer.classList.add("this-container")):(t.classList.remove("animate"),changeContainer.classList.add("this-container"),savedContainer.classList.remove("this-container"))}function changeColor(e){var t="hsl("+myColor.value+","+mySaturation.value+"%,"+myLight.value+"%)";colorDisplay.style.background=t,savedColor=0,isGradientColor=0}function preventZoom(e){var t=e.timeStamp,n=t-(e.currentTarget.dataset.lastTouch||t),o=e.touches.length;e.currentTarget.dataset.lastTouch=t,!n||500<n||1<o||(e.preventDefault(),e.target.click())}function cUndo(e,t){if((e=document.getElementById("sketchpad")).getContext){t=e.getContext("2d"),1<points.length&&(points.pop(),console.log(points),console.log(points.length),t.clearRect(0,0,e.width,e.height));for(var n=0;points.length>n;n++)t.putImageData(points[n],0,0,0,0,e.width,e.height)}}var savedColors=[];function saveColor(){var e=document.getElementsByClassName("saved-color-display");savedColors.push(colorDisplay.style.background);for(var t=0;t<e.length;t++)for(var n=0;n<savedColors.length;n++)t==n&&(e[t].style.background=savedColors[n]),e[n].addEventListener("click",useSavedColor)}function useSavedColor(){savedColor=1,isGradientColor=0,animateSlider(),colorDisplay.style.background=this.style.background}function drawLine(e,t,n,o){var a=myColor.value,s=myLight.value,i="hsl("+a+","+mySaturation.value+"%,"+s+"%)",c=e.createLinearGradient(20,0,250,0);1===savedColor?e.strokeStyle=colorDisplay.style.background:1===isGradientColor?(c.addColorStop(0,color1),c.addColorStop(1,color2),e.strokeStyle=c):(e.strokeStyle=i,colorDisplay.style.background=i),-1==lastX&&(lastX=t,lastY=n),e.lineCap="round",e.beginPath(),e.moveTo(lastX,lastY),e.lineTo(t,n),e.lineWidth=o,e.stroke(),e.closePath(),lastX=t,lastY=n}function clearCanvas(e,t){t.clearRect(0,0,e.width,e.height),points.length=1;for(var n=0;points.length>n;n++)t.putImageData(points[n],0,0,0,0,e.width,e.height)}function saveDrawing(e){saved.push(e.toDataURL()),1<saved.length&&saved.shift(),sessionStorage.setItem("src",saved[0]);var t=document.getElementById("saved-response");t.classList.add("response"),setTimeout(function(){t.classList.remove("response")},2e3);var n=document.getElementById("written-note"),o="image="+encodeURIComponent(saved[0])+"&description="+n.value;fetch("/saved",{method:"POST",body:o,headers:{"Content-Type":"application/x-www-form-urlencoded"}})}function resizeCanvas(e){window.innerWidth<720?(container.style.height=window.innerWidth-15+"px",e.width=window.innerWidth,e.height=window.innerWidth-40):(container.style.height="375px",e.width=400,e.height=355)}function init(){canvas=document.getElementById("sketchpad"),savedColorContainer.style.width=window.innerWidth-20+"px",changeColorContainer.style.width=window.innerWidth-20+"px",colorDisplay.style.background="hsl("+myColor.value+","+mySaturation.value+"%,"+myLight.value+"%)",canvas.getContext&&(ctx=canvas.getContext("2d"),resizeCanvas(canvas),window.addEventListener("resize",resizeCanvas,!1),window.addEventListener("orientationchange",resizeCanvas,!1)),ctx&&(canvas.addEventListener("mousedown",sketchpad_mouseDown,!1),canvas.addEventListener("mousemove",sketchpad_mouseMove,!1),window.addEventListener("mouseup",sketchpad_mouseUp,!1),canvas.addEventListener("touchstart",sketchpad_touchStart,!1),canvas.addEventListener("touchmove",sketchpad_touchMove,!1),canvas.addEventListener("touchend",sketchpad_touchStop,!1),window.innerWidth<720?(ctx.beginPath(),ctx.arc(window.innerWidth/2,window.innerWidth/2.25,window.innerWidth/2.5,0,2*Math.PI,!0),console.log(window.innerWidth),ctx.closePath(),ctx.stroke(),ctx.beginPath(),ctx.arc(window.innerWidth/1.5,window.innerWidth/2.75,10,0,2*Math.PI,!0),ctx.closePath(),ctx.fill(),ctx.beginPath(),ctx.arc(window.innerWidth/2.9,window.innerWidth/2.75,10,0,2*Math.PI,!0)):(ctx.beginPath(),ctx.arc(200,400/2.25,160,0,2*Math.PI,!0),console.log(400),ctx.closePath(),ctx.stroke(),ctx.beginPath(),ctx.arc(400/1.5,400/2.75,10,0,2*Math.PI,!0),ctx.closePath(),ctx.fill(),ctx.beginPath(),ctx.arc(400/2.9,400/2.75,10,0,2*Math.PI,!0)),ctx.closePath(),ctx.fill(),points.push(ctx.getImageData(0,0,canvas.width,canvas.height))),myColor.addEventListener("input",changeColor,!0),myLight.addEventListener("input",changeColor,!0),mySaturation.addEventListener("input",changeColor,!0),sizeValue.innerHTML=mySize.value/2,mySize.addEventListener("input",function(){sizeValue.innerHTML=mySize.value/2}),changeContainer.addEventListener("click",animateSlider,!1),savedContainer.addEventListener("click",animateSlider,!1),save.addEventListener("click",function(){saveDrawing(canvas)}),undoBtn.addEventListener("touchstart",preventZoom),saveColorBtn.addEventListener("click",saveColor),mood.style.backgroundImage="linear-gradient(#e66465,#9198e5)",sunset.style.backgroundImage="linear-gradient(#C02425,#F0CB35)",mintTea.style.backgroundImage="linear-gradient(#1D976C,#93F9B9)",summertime.style.backgroundImage="linear-gradient(#c2e59c,#64b3f4)",rainySeason.style.backgroundImage="linear-gradient(#757F9A,#D7DDE8)"}