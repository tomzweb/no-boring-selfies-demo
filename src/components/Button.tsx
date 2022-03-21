import React, {useEffect, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text, TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
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
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button = ({
  title,
  icon,
  iconSize = Theme.fontSize.medium,
  iconColor = Theme.colors.greyLightest,
  loading = false,
  onPressHandler,
  onPressResultText,
  containerStyle,
  textStyle,
}: Props) => {
  const [label, setLabel] = useState<string>(title);

  useEffect(() => {
    if (onPressResultText) {
      setLabel(onPressResultText);
    }
    const timeId = setTimeout(() => {
      // revert title after 2 seconds
      setLabel(title);
    }, 2000);

    return () => {
      clearTimeout(timeId);
    };
  }, [onPressResultText, title]);

  return (
    <TouchableOpacity
      style={
        loading
          ? [styles.container, containerStyle, styles.disabled]
          : [styles.container, containerStyle]
      }
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
      {loading && <LoadingIcon size={iconSize} iconColor={iconColor} />}
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Theme.spacing.large,
    paddingHorizontal: Theme.spacing.larger,
    backgroundColor: Theme.colors.blue,
    borderRadius: Theme.borderRadius.full,
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
    textAlign: 'right',
  },
});

export default Button;
