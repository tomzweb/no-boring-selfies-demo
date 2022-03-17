import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {FontWeight, Theme} from '../theme/Theme';
import Button from './Button';

interface Props {
  filters: string[];
  currentFilter: string;
  setCurrentFilter: Dispatch<SetStateAction<string>>;
}

const Filters = ({filters, currentFilter, setCurrentFilter}: Props) => {
  return (
    <View>
      <ScrollView
        style={styles.container}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {filters.map((filter, index) => {
          const btnStyles =
            currentFilter === filter
              ? [styles.btn, styles.btnActive]
              : [styles.btn];

          return (
            <Button
              key={filter}
              title={filter}
              onPressHandler={() => setCurrentFilter(filter)}
              containerStyle={
                filters.length - 1 != index
                  ? btnStyles
                  : [btnStyles, styles.btnLast]
              }
              textStyle={
                currentFilter === filter
                  ? [styles.btnText, styles.btnActiveText]
                  : styles.btnText
              }
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    marginBottom: Theme.spacing.large,
  },
  btn: {
    paddingVertical: Theme.spacing.small,
    paddingHorizontal: Theme.spacing.large,
    borderRadius: Theme.borderRadius.full,
    borderWidth: Theme.spacing.tiny,
    borderColor: Theme.colors.blue,
    marginLeft: Theme.spacing.large,
    backgroundColor: 'transparent',
  },
  btnActive: {
    backgroundColor: Theme.colors.blue,
  },
  btnLast: {
    marginRight: Theme.spacing.large,
  },
  btnText: {
    color: Theme.colors.blue,
    fontSize: Theme.fontSize.small,
    fontWeight: Theme.fontWeight.light as FontWeight,
    lineHeight: Theme.fontSize.medium + 5,
  },
  btnActiveText: {
    color: Theme.colors.greyDark,
  },
});

export default Filters;
