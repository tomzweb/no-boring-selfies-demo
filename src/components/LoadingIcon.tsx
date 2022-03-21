import React from 'react';
import {Animated, Easing} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Theme} from '../theme/Theme';

interface Props {
  size: number;
  iconColor?: string;
}

const LoadingIcon = ({size, iconColor}: Props) => {
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const iconSize = size ?? Theme.fontSize.large;

  return (
    <Animated.View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{rotate: spin}],
      }}>
      <Icon
        name={'cog'}
        size={iconSize}
        color={iconColor ?? Theme.colors.greyLightest}
        style={{
          paddingLeft: 2,
        }}
      />
    </Animated.View>
  );
};

export default LoadingIcon;
