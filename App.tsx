import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import {Theme} from './src/theme/Theme';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './src/HomeScreen';
import GalleryScreen from './src/GalleryScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const contentStyle = {
    backgroundColor: isDarkMode
      ? Theme.colors.greyDarkest
      : Theme.colors.greyLightest,
  };

  const headerStyle = {
    backgroundColor: isDarkMode
      ? Theme.colors.greyDarkest
      : Theme.colors.greyLightest,
    color: isDarkMode ? Theme.colors.pink : Theme.colors.blue,
  };

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: [styles.container, contentStyle],
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Gallery" component={GalleryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
