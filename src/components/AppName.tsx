import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FontWeight, Theme} from '../theme/Theme';

const AppName = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No</Text>
      <Text style={[styles.text, styles.textAlt]}>Boring</Text>
      <Text style={styles.text}>Selfies</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.large,
  },
  text: {
    fontSize: Theme.fontSize.larger,
    fontWeight: Theme.fontWeight.bold as FontWeight,
    color: Theme.colors.blue,
  },
  textAlt: {
    color: Theme.colors.pink,
  },
});

export default AppName;
