import React, { useState } from 'react';
import { Animated } from "react-native";

interface Props {
  style?: object;
  children: any;
}

const FadeInView = (props: Props) => {
  const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 250,
      }
    ).start();
  }, []);

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...(props.style) && {
          ...props.style,
        },
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default FadeInView;
