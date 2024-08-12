/**
 * This file controls the page logic
 *
 * depends on jQuery>=1.7
 */

var surname;
var soundHandle = new Audio();
var tickSound = new Audio();
//var soundcounter= 0;
var triggered=false;
var nosound=true;
var params = new URLSearchParams(window.location.search.slice(1));
var color1 = '#ED0000';
var color2 = '#00A44C';
var color3 ='#969696';
var colortxt1 = '#8d0000';
var colortxt2= '#00612d';
var colortxt3= '#000000';
//Select the background color
var color =color1;
//Select the text color
var colortxt = colortxt1;
var gendertext1 = "It is a Girl!";
var gendertext2 = "It is a Boy!";
var gendertext3= "It is a Demo!";
//Select the gender text
var gendertext = gendertext1;
var c;
function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
};
function randomInRangeint(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};
function confetti_effect() {
    soundHandle.src = 'audio/celebrate.mp3';
    $('#tboy').show();
    $('#tboy').text(gendertext);
    $('#tboy').css('color',colortxt);
    $('#boy').hide();
    $('.images').hide();
    $('#or').hide();
    $('#girl').hide();
    document.getElementsByTagName("body")[0].style.backgroundColor = color;
    document.getElementsByTagName("body")[0].style.backgroundImage = 'none';
    //document.getElementById("H3").insertAdjacentHTML('afterend', "<h4 id='testtext' style='white-space:normal'> Depending on the product you buy, here it will say either <br> 'It is a Girl!' or 'It is a Boy! with pink or blue background.</h4>");

    $('#H3').hide();
    $('#H4').hide();
    $('#scratcher3Pct').hide();
    if(triggered==true) {
        return;
    }
    if (!nosound) {
        soundHandle.volume=0.5;
        soundHandle.play();
    }
    triggered=true;
    //soundcounter=0;
    var duration = 10 * 1000;
    var animationEnd = Date.now() + duration;
    var skew=1;
    (function frame() {
        var timeLeft = animationEnd - Date.now();
        // var ticks = Math.max(200, 300 * (timeLeft / duration));
        skew = Math.max(0.8, skew - 0.001);
        c = confetti({
            particleCount: 1,
            startVelocity: 0,
            ticks: 100,
            scalar: 2,
            origin: {
            x: Math.random(),
            // since particles fall down, skew start toward the top
            y: (Math.random() * skew) - 0.2
            },
            colors: ['#ffffff'],
            shapes: ['circle'],
            gravity: randomInRange(0.4, 0.6),
            scalar: randomInRange(0.4, 1),
            drift: randomInRange(-0.4, 0.4)
        });
        // keep going until we are out of time
        if (timeLeft > 0) {
            requestAnimationFrame(frame);

            return;
        }
        //$("#resetbutton").show();

    }());
          
 };

 export {confetti_effect};

    function playticksound() {
        if (!nosound ) {
            if (tickSound.currentTime!=0) return;
            tickSound.src = "data:audio/wav;base64,//uURAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAADAAAJAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMz///////////////////////////////////////////8AAABQTEFNRTMuMTAwBLkAAAAAAAAAADUgJAO/jQAB4AAACQDIu0rqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//vkRAAAAlUAV20AAApUoJqtoQABWKlHW/m8JAMbqOl3N5BAAAASUmbc+/AjMPD8z8AAAD8w8PDDHf//0PDBH/4eHv/wB3+P//DAAAAAAPDw8PSAAAACA8PDw8MAAAAAA8PDw9IAAAA5sPD36ABAAAABhZRCTnACTgYGBi4e8AAMzz+5gCD///jj///wd////wDDw/MPAAAAAEYeHh4eAAAAAIw8PDw8AAAAARh4eHngAAAAAGHh5/////xx///////jwBgARCARwJwAAEAJOwEAgDgnMy9hMZTB9xIANbJkJgZ6TGxIRrL6WRQ0HQRBIMl5cEBJpElJBK3m2I5BQULlYgsVvBBcZgEEKXPItpsQgMZFmAxk4f1226tuheBQgwhdh/GblqDFYGBDiPcWyd1c0eQQRNw5GrheTwrXpkNU+h5r8xb6ejg5duP/Vypnuqf//7X+///9bHGrllWx///////////GrllWxxq5Zf////////////9NdpaW5TU12lpddpv/9qrQCAIBKUAQAAAPfgIBgDFhcGh5iqsdsICoKAgcQggGCjdlYzd3MkCTNAoACC4DFTMSKDAAFRFGtzhGAIEGmtzai9cCA5MYGi0PJXr/o2UJPl2TocK0YaBIokBDT9Nozt+RaN14bK0S7BfoGBIXr6UAlrvyiPXG0ChD4moEOBojPkh8GaLxm1QNLYvPc7VypkeKT///Joor///02ONLlTSrH//////////8auWVbHGrlTf////////////77UtLS/clVLSxm5TUykAABQAAAOAAIlI1vgOoAqDAst6MxOB3nEAXSVrWCYtIWbvxROVGp5fMSa7M3H8UCg9rKEpx35jic4CM8yJp0CqFuBeAOUg0Fgq4OIhIzYnLYSo0h8tFrDcGLq9pnbhuKwS5tdhrZ0NXcgJzFsLmcansX7XCABAAAHAAkTSoyy5WwM0vF+3jmEDCzTOYda7Hs9QY42N6EwtkrlO+y5m6qrDlC2SwDDoIKytCkRDWQCtAVgldIgAuNAALAgKB+gYK6kgAqROZ0VcL2BByNx+CFFqVK+VKsEpumi7Siw8J5EHQaktKt1uUXvyruspjdBNW8ETkIZf8OxLMGEOXNTuQ4LMLWl4YJkXXpboXFvZ9scBiZ8OTjC04Mr0wD1UsKK1w4BN2xWFwSx/Hkq2VWnS1KZVxIJPzpql3kRzbXznGeqVsMV7gLRyqBogAoHDCfQjGrgVeCTGui1nrLlMuWGZE068/tKz0i0spG9Wp+A96tdoT//u0ZLgDM5woU+9jAAh15Qo67GABC2iXUpWXgCmCk+lSsPAELIOmETYkY4KE1ZjiJMFcQIVUA8xirJSE0SBgHKwgtRqF+U5MFpIpY8yxk1b0NUolmFGV1twqLGFVZUNTUQATBgYsBwNAAPnSDG5MiCwUEpUtoYo1m4KpeUKg0/KjXXQ5MeEgZpNrEYQgHa0puePj8o25oygBlP6//ChgqqQc5lURcnX6MS8GiA1CMAnMmYf19n6lUM1atmtWQUbIhNBwow5sHBYFmYlFn1iX73/+sDA9qk5YzcZ/qtLS1qb/////7/8/+xqrSymtTU1X7i84CoiCoKiL6ZwvOf/y58EC58KcEU2QWQYADQChJ4TgcCg1JIGmxABACN2YCMBtJU5gib/QbKTzgkfC+qSOHQE6FiVpMm14ok1ovU6S+S0P/4AKESprAx6AWc6/IRnBxxj2hdRDN/a0y7OpmU4XdhKoNHVwKiihDcmtNe+Uv7W/Wu72PZQO7j+Tkbl7jO1KYzDNam////+3SUljO33UNTMZjNamjVX///////////+llNampqtLS5U39ybiwlCQNCU6Hf03F0xBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uURPMABUo4UP5vRCCzyMo/zWSEAAABpBwAACAAADSDgAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq";
            tickSound.volume=0.5;              
            tickSound.play();
        }

    }
export {playticksound};

    function supportsCanvas() {
        return !!document.createElement('canvas').getContext;
    };
    
    

    function onResetClicked() {
        //$("#resetbutton").hide();
        $('#tboy').hide();
        $('#boy').show();
        $('#or').show();
        $('#girl').show();
        $('.images').show();
        document.getElementsByTagName("body")[0].style.backgroundColor = "#FFFFFF";
        document.getElementsByTagName("body")[0].style.backgroundImage = 'url(images/background.jpg)';
        document.getElementById("resetbutton").value = "Spin!";

        $('#H3').show();
        $('#H4').show();
        triggered = false;
        soundHandle.pause();
        soundHandle.currentTime = 0;    
        return false;
    };
    export {onResetClicked};

   
    
    function initPage() {
        //alert("loaded main.js");

        var i, i1;
        surname = params.get('surname');
        if (surname !=null && surname.replace(/\s/g, '').length) {
            $("#baby").text('baby ' + surname+'!');}
        else {
            $("#baby").text('the baby!');
            surname="the";
        }
        
        document.getElementById('intro').innerHTML= "This is a gender reveal spin the wheel for <strong>" + surname + "</strong> family. It contains sound when the gender is revealed. Do you want to continue with sound?";
        document.getElementById('id01').style.display='block';
        $('.nosoundbtn').on("click", function (e) {
            document.getElementById('id01').style.display='none';
            nosound=true;
        });
        $('.withsoundbtn').on("click", function (e) {
            document.getElementById('id01').style.display='none';
            nosound=false;
            soundHandle = document.getElementById('soundHandle');              
            soundHandle = document.getElementById('tickSound');  
            tickSound.addEventListener("ended", function(){
                tickSound.currentTime = 0;
           });
            soundHandle.autoplay = true;
            soundHandle.muted=false;
            soundHandle.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
            soundHandle.play();
            soundHandle.pause();
            tickSound.autoplay = true;
            tickSound.muted=false;
            tickSound.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
            tickSound.play();
            tickSound.pause();
            //tickSound.load();    
        });
        document.addEventListener(
            "visibilitychange",
             function(evt) {
              if (document.visibilityState != "visible") {
                soundHandle.pause();
                soundHandle.currentTime=0;              }
            },
            false,
          );
      
        
        //document.getElementById("resetbutton").style.backgroundColor = colortxt;

    };
    
    /**
     * Handle page load
     */
    $(function() {
        if (supportsCanvas()) {
            initPage();
        } else {
            $('#scratcher-box').hide();
            $('#lamebrowser').show();
        }
    });
        