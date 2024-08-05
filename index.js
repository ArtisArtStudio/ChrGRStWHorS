import {Wheel} from './js/spin-wheel-esm.js';
import {confetti_effect} from './main.js';
import * as easing from './js/easing.js';
window.onload = async () => {

    const container = document.querySelector('.wheel-wrapper');
    const btn = document.getElementById("resetbutton");
    
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
        rotationSpeed: 700,
        rotationResistance: -110,
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
        function: easing.elasticOut,
      },
      {
        label: 'easeBounceOut',
        function: easing.bounceOut,
      },
    ];
    await loadImages(a);

    const wheel = new Wheel(container, props);
    document.querySelector('.wheel-wrapper').style.visibility = 'visible';
    var functionFinished = function() {
        confetti_effect();
    };
    wheel.onRest = functionFinished;


    window.addEventListener('click', (e) => {
  
      // Listen for click event on spin button:
      if (e.target === btn) {
        const winningItemIndex = 0;
        const easing = easingFunctions[1];
        const easingFunction = easing.function;
        const duration = 5000;
        const spinDirection = 1;
        const revolutions = 4;
        wheel.isInteractive = true;
        wheel.spinToItem(1, duration, true, revolutions, spinDirection, easingFunction);
      }
  

  
    });  
   
  };

  async function loadImages(images) {
  const promises=[];

    if (images instanceof HTMLImageElement) promises.push(images.decode());

  try {
    await Promise.all(promises);
  } catch (error) {
    throw new Error('An image could not be loaded');
  }
}