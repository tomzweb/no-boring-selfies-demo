import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {FontWeight, Theme} from '../theme/Theme';
import LoadingIcon from './LoadingIcon';

interface Props {
  onPressHandler: () => void;
  title: string;
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  loading?: boolean;
}

const Button = ({
  title,
  icon,
  iconSize = Theme.fontSize.medium,
  iconColor = Theme.colors.greyLightest,
  loading = false,
  onPressHandler,
}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressHandler}>
      {!loading && icon && (
        <Icon
          style={styles.icon}
          name={icon}
          size={iconSize}
          color={iconColor}
        />
      )}
      {loading && <LoadingIcon size={iconSize} />}
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
