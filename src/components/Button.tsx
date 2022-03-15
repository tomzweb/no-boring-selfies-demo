import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {FontWeight, Theme} from '../theme/Theme';

interface Props {
  onPressHandler: () => void;
  title: string;
}

const Button = ({title, onPressHandler}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressHandler}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Theme.spacing.medium,
    backgroundColor: Theme.colors.blue,
    borderRadius: Theme.borderRadius.small,
    marginBottom: Theme.spacing.medium,
  },
  text: {
    color: Theme.colors.greyDark,
    fontSize: Theme.fontSize.medium,
    fontWeight: Theme.fontWeight.light as FontWeight,
  },
});

export default Button;
