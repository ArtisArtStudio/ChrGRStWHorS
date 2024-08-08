/**
 * This file controls the page logic
 *
 * depends on jQuery>=1.7
 */

var snow;
var surname;
var soundHandle = new Audio();
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
    var duration = 10 * 1000;
    var animationEnd = Date.now() + duration;
    var skew=1;
    (function frame() {
        var timeLeft = animationEnd - Date.now();
        // var ticks = Math.max(200, 300 * (timeLeft / duration));
        skew = Math.max(0.8, skew - 0.001);
        confetti({
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
        if (!nosound) {
            var ticksound = new Audio();
            // soundHandle.pause();
            ticksound.currentTime=0;
            ticksound.volume=0.5;              
            ticksound.src = 'audio/tick.mp3';
            ticksound.play();
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

        document.getElementsByTagName("body")[0].style.backgroundColor = colortxt;
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
        alert("loaded main.js");

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
            if (soundHandle.currentTime!=0) {return;}
                soundHandle = document.getElementById('soundHandle');  
                soundHandle.autoplay = true;
                soundHandle.muted=false;
                soundHandle.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
                soundHandle.play();
                soundHandle.pause();
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
      
        
        document.getElementById("resetbutton").style.backgroundColor = colortxt;

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
        