
var isGradientColor = 0;
var mood = document.getElementById('mood');
var sunset = document.getElementById('sunset');
var mintTea = document.getElementById('mint-tea');
var summertime = document.getElementById('summertime');
var rainySeason = document.getElementById('rainy-season');

var color1;
var color2;

if (mood){


    mood.addEventListener('click', function(){
        useGradientColor();
        console.log(mood)
        colorDisplay.style.backgroundImage = this.style.backgroundImage;

        color1 = '#e66465';
        color2 = '#9198e5';

    }, true);

    sunset.addEventListener('click', function(){
        useGradientColor();
        colorDisplay.style.backgroundImage = this.style.backgroundImage;
        color1 = '#C02425';
        color2 = '#F0CB35';

    }, true);

    mintTea.addEventListener('click', function(){
        useGradientColor();
        colorDisplay.style.backgroundImage = this.style.backgroundImage;
        color1 = '#1D976C';
        color2 = '#93F9B9';

    }, true);

    summertime.addEventListener('click', function(){
        useGradientColor();
        colorDisplay.style.backgroundImage = this.style.backgroundImage;
        color1 = '#c2e59c';
        color2 = '#64b3f4';

    }, true);

    rainySeason.addEventListener('click', function(){
        useGradientColor();
        colorDisplay.style.backgroundImage = this.style.backgroundImage;
        color1 = '#757F9A';
        color2 = '#D7DDE8';

    }, true);

    function useGradientColor () {
        isGradientColor = 1;
        savedColor = 0;
    }

}