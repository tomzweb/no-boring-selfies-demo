import React from 'react';
import {Animated, Easing} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Theme} from '../theme/Theme';

interface Props {
  size: number;
}

const LoadingIcon = ({size}: Props) => {
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{transform: [{rotate: spin}]}}>
      <Icon
        name={'ios-cog'}
        size={size ?? Theme.fontSize.large}
        color={Theme.colors.greyLightest}
      />
    </Animated.View>
  );
};

export default LoadingIcon;
