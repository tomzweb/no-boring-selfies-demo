import React from 'react';
import {Text, StyleSheet, useColorScheme} from 'react-native';
import {FontWeight, Theme} from '../theme/Theme';

const InstructionText = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Text
      style={[
        styles.text,
        {
          color: isDarkMode ? Theme.colors.greyLightest : Theme.colors.greyDark,
        },
      ]}>
      To get started, select a <Text style={styles.boldText}>selfie</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: Theme.fontSize.medium,
    fontWeight: Theme.fontWeight.light as FontWeight,
    color: Theme.colors.greyLightest,
    marginBottom: Theme.spacing.large,
  },
  boldText: {
    fontWeight: Theme.fontWeight.bold as FontWeight,
  },
});

export default InstructionText;
