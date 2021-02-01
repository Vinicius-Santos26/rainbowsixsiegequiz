import React from 'react';
import { Lottie } from '@crello/react-lottie';
import Widget from '../Widget';
import loadingAnimation from '../../animations/loading.json';

export default function LoadingWidget() {
  
  return (
    <Widget>
      <Widget.Content>
      <Lottie
          width="300px"
          height="300px"
          className="lottie-container basic"
          config={{ animationData: loadingAnimation, loop: true, autoplay: true }}
        />
      </Widget.Content>
    </Widget>
  );
}
