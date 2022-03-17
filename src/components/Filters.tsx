import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {StyleSheet, ScrollView, View, useColorScheme} from 'react-native';
import {FontWeight, Theme} from '../theme/Theme';
import Button from './Button';

interface Props {
  filters: string[];
  currentFilter: string;
  setCurrentFilter: Dispatch<SetStateAction<string>>;
}

const Filters = ({filters, currentFilter, setCurrentFilter}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    filters.sort(function (a) {
      return a !== currentFilter ? 1 : -1;
    });
  }, [filters, currentFilter]);

  const getBtnStyles = (filter: string, index: number) => {
    if (currentFilter === filter) {
      return [styles.btn, styles.btnActive];
    }
    const defaultStyles =
      filters.length - 1 != index ? styles.btn : [styles.btn, styles.btnLast];
    return isDarkMode ? [defaultStyles, styles.btnDark] : defaultStyles;
  };

  const getBtnTextStyles = (filter: string) => {
    if (currentFilter === filter) {
      return [styles.btnText, styles.btnActiveText];
    }
    const defaultStyles = styles.btnText;
    return isDarkMode ? [defaultStyles, styles.btnTextDark] : defaultStyles;
  };

  return (
    <View>
      <ScrollView
        style={styles.container}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {filters.map((filter, index) => {
          const btnStyles = getBtnStyles(filter, index);

          return (
            <Button
              key={filter}
              title={filter}
              onPressHandler={() => setCurrentFilter(filter)}
              containerStyle={btnStyles}
              textStyle={getBtnTextStyles(filter)}
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
    marginBottom: Theme.spacing.medium,
  },
  btn: {
    paddingVertical: Theme.spacing.small,
    paddingHorizontal: Theme.spacing.large,
    borderRadius: Theme.borderRadius.full,
    borderWidth: Theme.spacing.tiny,
    borderColor: Theme.colors.greyLightest,
    marginLeft: Theme.spacing.large,
    backgroundColor: Theme.colors.greyLightest,
  },
  btnDark: {
    backgroundColor: Theme.colors.greyDark,
    borderColor: Theme.colors.greyDark,
  },
  btnActive: {
    backgroundColor: Theme.colors.blue,
    borderColor: Theme.colors.blue,
  },
  btnLast: {
    marginRight: Theme.spacing.large,
  },
  btnText: {
    color: Theme.colors.grey,
    fontSize: Theme.fontSize.small,
    fontWeight: Theme.fontWeight.light as FontWeight,
    lineHeight: Theme.fontSize.medium + 5,
  },
  btnActiveText: {
    color: Theme.colors.greyDark,
  },
  btnTextDark: {
    color: Theme.colors.greyLightest,
  },
});

export default Filters;
