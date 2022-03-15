import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {FontWeight, Theme} from '../theme/Theme';

interface Props {
  onPressHandler: () => void;
  title: string;
  icon?: string;
  iconSize?: number;
  iconColor?: string;
}

const Button = ({title, icon, iconSize, iconColor, onPressHandler}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressHandler}>
      {icon && (
        <Icon
          style={styles.icon}
          name={icon}
          size={iconSize ?? Theme.fontSize.medium}
          color={iconColor ?? Theme.colors.greyDark}
        />
      )}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Theme.spacing.large,
    backgroundColor: Theme.colors.blue,
    borderRadius: Theme.borderRadius.small,
    marginBottom: Theme.spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: Theme.spacing.medium,
  },
  text: {
    color: Theme.colors.greyDark,
    fontSize: Theme.fontSize.medium,
    fontWeight: Theme.fontWeight.light as FontWeight,
    flexShrink: 1,
  },
});

export default Button;
