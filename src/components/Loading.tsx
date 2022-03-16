import React, {useEffect} from 'react';
import {Animated, Easing, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {FontWeight, Theme} from '../theme/Theme';
import {windowWidth} from '../utilities/Utilities';

interface Props {
  isActive: boolean;
  title?: string;
}

const Loading = ({isActive, title}: Props) => {
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  if (!isActive) {
    return null;
  }

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{transform: [{rotate: spin}]}}>
        <Icon
          name={'ios-cog'}
          size={Theme.fontSize.large}
          color={Theme.colors.greyLightest}
        />
      </Animated.View>
      {title && <Text style={styles.text}>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    width: windowWidth,
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Theme.colors.greyLightest,
    fontSize: Theme.fontSize.medium,
    fontWeight: Theme.fontWeight.light as FontWeight,
    marginTop: Theme.spacing.medium,
  },
});

export default Loading;
