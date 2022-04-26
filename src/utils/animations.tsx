import { useEffect, useState } from 'react';
import { keyframes, Keyframes } from '@emotion/react';
import { AnimationTypeEnum } from '../types';

type Animation = {
  animationIn: Keyframes;
  animationOut: Keyframes;
}

export default function useAnimations(animationType?: AnimationTypeEnum) {
  const [animation, setAnimation] = useState<Animation>(popinAnimation);

  useEffect(() => {
    switch (animationType) {
      case 'fade':
        setAnimation(fadeAnimation);
        break;
      case 'popin':
        setAnimation(popinAnimation);
        break;
      case 'move':
      default:
        setAnimation(moveAnimation);
    }
  }, [animationType]);

  return animation;
}

// Fade in
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const fromLeftKeyFrames = keyframes`
  from {
    transform: translate(200%, 0);
  }
  to {
    transform: translate(0, 0);
  }
`;

export const fromRightKeyframes = keyframes`
  from {
    transform: translate(-200%, 0);
  }
  to {
    transform: translate(0, 0);
  }
`;

const toRight = keyframes`
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(-200%, 0);
  }
`;

// Pop in
const popIn = keyframes`
  from {
    transform: translate(200%, 0) scale(0);
  }
  to {
    transform: translate(0, 0) scale(1);
  }
`;

const fadeAnimation = {
  animationIn: fadeIn,
  animationOut: fadeOut,
}

const moveAnimation = {
  animationIn: fromLeftKeyFrames,
  animationOut: toRight,
}

const popinAnimation = {
  animationIn: popIn,
  animationOut: fadeOut,
}

export const zoomKeyframes = keyframes`
  from {
    transform: scale(1) rotate(0);
  }
  to {
    transform: scale(1.2) rotate(1.5deg);
  }
`;

export const swingKeyframes = keyframes`
  0%, 100% {
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
  }

  15% {
    -webkit-transform: translateX(-32px) rotate(-10deg);
    transform: translateX(-32px) rotate(-10deg);
  }

  30% {
    -webkit-transform: translateX(calc(32px / 2)) rotate(10deg);
    transform: translateX(calc(32px / 2)) rotate(10deg);
  }

  45% {
    -webkit-transform: translateX(calc(-32px / 2)) rotate(calc(-10deg / 1.8));
    transform: translateX(calc(-32px / 2)) rotate(calc(-10deg / 1.8));
  }

  60% {
    -webkit-transform: translateX(calc(32px / 3.3)) rotate(calc(10deg / 3));
    transform: translateX(calc(32px / 3.3)) rotate(calc(10deg / 3));
  }

  75% {
    -webkit-transform: translateX(calc(-32px / 5.5)) rotate(calc(-10deg / 5));
    transform: translateX(calc(-32px / 5.5)) rotate(calc(-10deg / 5));
  }
`;

// From Left for texts
export const fromLeftTextKeyframes = keyframes`
  from {
    transform: translate(300%, 0);
  }
  to {
    transform: translate(0, 0);
  }
`;