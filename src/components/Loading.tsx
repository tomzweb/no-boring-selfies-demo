import React from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';

import {FontWeight, Theme} from '../theme/Theme';
import {windowHeight, windowWidth} from '../utilities/Utilities';
import LoadingIcon from './LoadingIcon';

interface Props {
  isActive: boolean;
  title?: string;
}

const Loading = ({isActive, title}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';

  if (!isActive) {
    return null;
  }

  return (
    <View
      style={
        isDarkMode ? [styles.container, styles.containerDark] : styles.container
      }>
      <LoadingIcon
        size={Theme.fontSize.larger}
        iconColor={
          isDarkMode ? Theme.colors.greyLightest : Theme.colors.greyDark
        }
      />
      {title && (
        <Text style={isDarkMode ? [styles.text, styles.textDark] : styles.text}>
          {title}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    width: windowWidth,
    height: windowHeight,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.greyLightest,
  },
  containerDark: {
    backgroundColor: Theme.colors.greyDark,
  },
  text: {
    color: Theme.colors.greyDark,
    fontSize: Theme.fontSize.medium,
    fontWeight: Theme.fontWeight.light as FontWeight,
    marginTop: Theme.spacing.medium,
  },
  textDark: {
    color: Theme.colors.greyLightest,
  },
});

export default Loading;
