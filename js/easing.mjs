/*
Copyright 2010-2021 Mike Bostock
Copyright 2001 Robert Penner
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of the author nor the names of contributors may be used to
  endorse or promote products derived from this software without specific prior
  written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

function tpmt(x) {
  return (Math.pow(2, -10 * x) - 0.0009765625) * 1.0009775171065494;
}

var pi = Math.PI,
    b1 = 4 / 11,
    b2 = 6 / 11,
    b3 = 8 / 11,
    b4 = 3 / 4,
    b5 = 9 / 11,
    b6 = 10 / 11,
    b7 = 15 / 16,
    b8 = 21 / 22,
    b9 = 63 / 64,
    b0 = 1 / b1 / b1,
    tau = 2 * Math.PI,
    amplitude = 1,
    period = 0.3;

export function sinInOut(t) {
  return (1 - Math.cos(pi * t)) / 2;
}

export function cubicOut(t) {
  return --t * t * t + 1;
}

export function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

export var elasticInOut = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticInOut(t) {
    return ((t = t * 2 - 1) < 0
        ? a * tpmt(-t) * Math.sin((s - t) / p)
        : 2 - a * tpmt(t) * Math.sin((s + t) / p)) / 2;
  }

  elasticInOut.amplitude = function(a) { return custom(a, p * tau); };
  elasticInOut.period = function(p) { return custom(a, p); };

  return elasticInOut;
})(amplitude, period);

export function bounceOut(t) {
  return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
}
// Based on https://gist.github.com/gre/1650294

// No easing, no acceleration
export function linear( t ) {
  return t;
}

// Slight acceleration from zero to full speed
export function easeInSine( t ) {
  return -1 * Math.cos( t * ( Math.PI / 2 ) ) + 1;
}

// Slight deceleration at the end
export function easeOutSine( t ) {
  return Math.sin( t * ( Math.PI / 2 ) );
}

// Slight acceleration at beginning and slight deceleration at end
export function easeInOutSine( t ) {
  return -0.5 * ( Math.cos( Math.PI * t ) - 1 );
}

// Accelerating from zero velocity
export function easeInQuad( t ) {
  return t * t;
}

// Decelerating to zero velocity
export function easeOutQuad( t ) {
  return t * ( 2 - t );
}

// Acceleration until halfway, then deceleration
export function easeInOutQuad( t ) {
  return t < 0.5 ? 2 * t * t : - 1 + ( 4 - 2 * t ) * t;
}

// Accelerating from zero velocity
export function easeInCubic( t ) {
  return t * t * t;
}

// Decelerating to zero velocity
export function easeOutCubic( t ) {
  const t1 = t - 1;
  return t1 * t1 * t1 + 1;
}

// Acceleration until halfway, then deceleration
export function easeInOutCubic( t ) {
  return t < 0.5 ? 4 * t * t * t : ( t - 1 ) * ( 2 * t - 2 ) * ( 2 * t - 2 ) + 1;
}

// Accelerating from zero velocity
export function easeInQuart( t ) {
  return t * t * t * t;
}

// Decelerating to zero velocity
export function easeOutQuart( t ) {
  const t1 = t - 1;
  return 1 - t1 * t1 * t1 * t1;
}

// Acceleration until halfway, then deceleration
export function easeInOutQuart( t ) {
  const t1 = t - 1;
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * t1 * t1 * t1 * t1;
}

// Accelerating from zero velocity
export function easeInQuint( t ) {
  return t * t * t * t * t;
}

// Decelerating to zero velocity
export function easeOutQuint( t ) {
  const t1 = t - 1;
  return 1 + t1 * t1 * t1 * t1 * t1;
}

// Acceleration until halfway, then deceleration
export function easeInOutQuint( t ) {
  const t1 = t - 1;
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * t1 * t1 * t1 * t1 * t1;
}

// Accelerate exponentially until finish
export function easeInExpo( t ) {

  if( t === 0 ) {
      return 0;
  }

  return Math.pow( 2, 10 * ( t - 1 ) );

}

// Initial exponential acceleration slowing to stop
export function easeOutExpo( t ) {

  if( t === 1 ) {
      return 1;
  }

  return ( -Math.pow( 2, -10 * t ) + 1 );

}

// Exponential acceleration and deceleration
export function easeInOutExpo( t ) {
  
  if( t === 0 || t === 1 ) {
      return t;
  }

  const scaledTime = t * 2;
  const scaledTime1 = scaledTime - 1;

  if( scaledTime < 1 ) {
      return 0.5 * Math.pow( 2, 10 * ( scaledTime1 ) );
  }

  return 0.5 * ( -Math.pow( 2, -10 * scaledTime1 ) + 2 );

}

// Increasing velocity until stop
export function easeInCirc( t ) {

  const scaledTime = t / 1;
  return -1 * ( Math.sqrt( 1 - scaledTime * t ) - 1 );

}

// Start fast, decreasing velocity until stop
export function easeOutCirc( t ) {

  const t1 = t - 1;
  return Math.sqrt( 1 - t1 * t1 );

}

// Fast increase in velocity, fast decrease in velocity
export function easeInOutCirc( t ) {

  const scaledTime = t * 2;
  const scaledTime1 = scaledTime - 2;

  if( scaledTime < 1 ) {
      return -0.5 * ( Math.sqrt( 1 - scaledTime * scaledTime ) - 1 );
  }

  return 0.5 * ( Math.sqrt( 1 - scaledTime1 * scaledTime1 ) + 1 );

}

// Slow movement backwards then fast snap to finish
export function easeInBack( t, magnitude = 1.70158 ) {

  return t * t * ( ( magnitude + 1 ) * t - magnitude );

}

// Fast snap to backwards point then slow resolve to finish
export function easeOutBack( t, magnitude = 1.70158 ) {

  const scaledTime = ( t / 1 ) - 1;
  
  return (
      scaledTime * scaledTime * ( ( magnitude + 1 ) * scaledTime + magnitude )
  ) + 1;

}

// Slow movement backwards, fast snap to past finish, slow resolve to finish
export function easeInOutBack( t, magnitude = 1.70158 ) {

  const scaledTime = t * 2;
  const scaledTime2 = scaledTime - 2;

  const s = magnitude * 1.525;

  if( scaledTime < 1) {

      return 0.5 * scaledTime * scaledTime * (
          ( ( s + 1 ) * scaledTime ) - s
      );

  }

  return 0.5 * (
      scaledTime2 * scaledTime2 * ( ( s + 1 ) * scaledTime2 + s ) + 2
  );

}
// Bounces slowly then quickly to finish
export function easeInElastic( t, magnitude = 0.7 ) {

  if( t === 0 || t === 1 ) {
      return t;
  }

  const scaledTime = t / 1;
  const scaledTime1 = scaledTime - 1;

  const p = 1 - magnitude;
  const s = p / ( 2 * Math.PI ) * Math.asin( 1 );

  return -(
      Math.pow( 2, 10 * scaledTime1 ) *
      Math.sin( ( scaledTime1 - s ) * ( 2 * Math.PI ) / p )
  );

}

// Fast acceleration, bounces to zero
export function easeOutElastic( t, magnitude = 0.7 ) {
  
  if( t === 0 || t === 1 ) {
      return t;
  }
  
  const p = 1 - magnitude;
  const scaledTime = t * 2;

  const s = p / ( 2 * Math.PI ) * Math.asin( 1 );
  return (
      Math.pow( 2, -10 * scaledTime ) *
      Math.sin( ( scaledTime - s ) * ( 2 * Math.PI ) / p )
  ) + 1;

}

// Slow start and end, two bounces sandwich a fast motion
export function easeInOutElastic( t, magnitude = 0.65 ) {

  if( t === 0 || t === 1 ) {
      return t;
  }

  const p = 1 - magnitude;
  const scaledTime = t * 2;
  const scaledTime1 = scaledTime - 1;
  
  const s = p / ( 2 * Math.PI ) * Math.asin( 1 );

  if( scaledTime < 1 ) {
      return -0.5 * (
          Math.pow( 2, 10 * scaledTime1 ) *
          Math.sin( ( scaledTime1 - s ) * ( 2 * Math.PI ) / p )
      );
  }

  return (
      Math.pow( 2, -10 * scaledTime1 ) *
      Math.sin( ( scaledTime1 - s ) * ( 2 * Math.PI ) / p ) * 0.5
  ) + 1;

}

// Bounce to completion
export function easeOutBounce( t ) {

  const scaledTime = t / 1;

  if( scaledTime < ( 1 / 2.75 ) ) {

      return 7.5625 * scaledTime * scaledTime;

  } else if( scaledTime < ( 2 / 2.75 ) ) {

      const scaledTime2 = scaledTime - ( 1.5 / 2.75 );
      return ( 7.5625 * scaledTime2 * scaledTime2 ) + 0.75;

  } else if( scaledTime < ( 2.5 / 2.75 ) ) {

      const scaledTime2 = scaledTime - ( 2.25 / 2.75 );
      return ( 7.5625 * scaledTime2 * scaledTime2 ) + 0.9375;

  } else {

      const scaledTime2 = scaledTime - ( 2.625 / 2.75 );
      return ( 7.5625 * scaledTime2 * scaledTime2 ) + 0.984375;

  }

}

// Bounce increasing in velocity until completion
export function easeInBounce( t ) {
  return 1 - easeOutBounce( 1 - t );
}

// Bounce in and bounce out
export function easeInOutBounce( t ) {

  if( t < 0.5 ) {

      return easeInBounce( t * 2 ) * 0.5;
      
  }

  return ( easeOutBounce( ( t * 2 ) - 1 ) * 0.5 ) + 0.5;

}