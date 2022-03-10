import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Home from './src/Home';
import {Theme} from './src/theme/Theme';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Theme.colors.greyDark : Theme.colors.greyDark,
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Home />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
