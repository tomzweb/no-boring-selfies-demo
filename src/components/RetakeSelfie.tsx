import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Theme} from '../theme/Theme';

interface Props {
  onPressHandler: () => void;
}

const RetakeSelfie = ({onPressHandler}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressHandler}>
      <Text style={styles.text}>Choose Another Selfie</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Theme.spacing.medium,
    backgroundColor: Theme.colors.blue,
    borderRadius: Theme.borderRadius.small,
  },
  text: {
    color: Theme.colors.greyDark,
  },
});

export default RetakeSelfie;
