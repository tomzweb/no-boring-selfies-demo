import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {FontWeight, Theme} from '../theme/Theme';
import {windowWidth} from '../utilities/Utilities';
import LoadingIcon from './LoadingIcon';

interface Props {
  isActive: boolean;
  title?: string;
}

const Loading = ({isActive, title}: Props) => {
  if (!isActive) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LoadingIcon size={Theme.fontSize.larger} />
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
