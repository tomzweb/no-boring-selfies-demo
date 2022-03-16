import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {FontWeight, Theme} from '../theme/Theme';
import LoadingIcon from './LoadingIcon';

interface Props {
  title: string;
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  loading?: boolean;
  onPressHandler: () => void;
  onPressResultText?: string;
}

const Button = ({
  title,
  icon,
  iconSize = Theme.fontSize.medium,
  iconColor = Theme.colors.greyLightest,
  loading = false,
  onPressHandler,
  onPressResultText,
}: Props) => {
  const [label, setLabel] = useState<string>(title);

  useEffect(() => {
    if (onPressResultText) {
      setLabel(onPressResultText);
    }
    const timeId = setTimeout(() => {
      // revert title after 3 seconds
      setLabel(title);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [onPressResultText, title]);

  return (
    <TouchableOpacity
      style={loading ? [styles.container, styles.disabled] : styles.container}
      onPress={onPressHandler}
      disabled={loading}>
      {!loading && icon && (
        <Icon
          style={styles.icon}
          name={icon}
          size={iconSize}
          color={iconColor}
        />
      )}
      {loading && <LoadingIcon size={iconSize} />}
      <Text style={styles.text}>{label}</Text>
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
  disabled: {
    opacity: 0.7,
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
