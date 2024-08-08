import {Wheel} from './js/spin-wheel-esm.js';
import {confetti_effect, playticksound, onResetClicked} from './main.js';
import * as easing from './js/easing.js';
var spinning = false;
var finishedSpin = false;
window.onload = async () => {

    const container = document.querySelector('.wheel-wrapper');
    const btn = document.getElementById("resetbutton");
    //alert("loaded index.js");
    var a = new Image();
    a.src = './images/spinthewheel-overlay.svg';
    const props = {
        radius: 0.9,
        pointerAngle: 0,
        itemLabelRadius: 0.6,
        itemLabelRadiusMax: 0.9,
        itemLabelRotation: 0,
        itemLabelFont: 'bona nova sc',
        itemLabelAlign: "center",
        itemLabelColors: ['#000'],
        itemLabelBaselineOffset: -0.06,
        itemBackgroundColors: ['#00A44C','#ED0000'],
        rotationSpeed: 10,
        rotationResistance: 0,
        lineWidth: 0,
        overlayImage: a,
        borderWidth: 0,
      items: [
        {
          label: 'Boy',
        },
        {
          label: 'Girl',
        },
        {
          label: 'Twin Boy',
        },
        {
          label: 'Girl',
        },
        {
          label: 'Boy',
        },
        {
          label: 'Twin Girl',
        },
        {
          label: 'Boy',
        },
        {
          label: 'Girl',
        },
      ],
      itemLabelRadiusMax: 0.3,
    };
  
    const easingFunctions = [
      {
        label: 'default (easeSinOut)',
        function: null,
      },
      {
        label: 'easeSinInOut',
        function: easing.sinInOut,
      },
      {
        label: 'easeCubicOut',
        function: easing.cubicOut,
      },
      {
        label: 'easeCubicInOut',
        function: easing.cubicInOut,
      },
      {
        label: 'easeElasticOut',
        function: easing.easeOutCirc,
      },
      {
        label: 'easeBounceOut',
        function: easing.bounceOut,
      },
    ];
    await loadImages(a);

    const wheel = new Wheel(container, props);
    wheel.isInteractive = true;

    document.querySelector('.wheel-wrapper').style.visibility = 'visible';
    var functionFinished = function() {
        confetti_effect();
        finishedSpin = true;
        spinning=false;
        document.getElementById("resetbutton").value = "Try Again";

    };
    var playtick = function() {
        playticksound();
    };
    wheel.onRest = functionFinished;
    wheel.onCurrentIndexChange= playtick;


    window.addEventListener('click', (e) => {
  
      // Listen for click event on spin button:
      if (e.target === btn) {
        if (spinning) {
          return;
        }
        if (finishedSpin) {
          finishedSpin=false;
          onResetClicked();
          return;
        }
        spinning = true;
        const winningItemIndex = fetchWinningItemIndexFromApi();
        const easing = easingFunctions[4];
        const easingFunction = easing.function;
        const duration = 13000;
        const spinDirection = 1;
        const revolutions = 8;

        wheel.spinToItem(winningItemIndex, duration, true, revolutions, spinDirection, easingFunction);

      }
  

  
    });  
   
  };
  function fetchWinningItemIndexFromApi() {
    // Simulate a call to the back-end
    return 1;
  }

  async function loadImages(images) {
  const promises=[];

    if (images instanceof HTMLImageElement) promises.push(images.decode());

  try {
    await Promise.all(promises);
  } catch (error) {
    throw new Error('An image could not be loaded');
  }
}