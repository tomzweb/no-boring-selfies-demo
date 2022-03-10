import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Theme} from '../theme/Theme';

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
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 36,
    fontWeight: '900',
    color: Theme.colors.blue,
    paddingHorizontal: 2.5,
  },
  textAlt: {
    color: Theme.colors.pink,
  },
});

export default AppName;
