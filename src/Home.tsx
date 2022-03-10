import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppName from './components/AppName';

const Home = () => {
  return (
    <View style={styles.container}>
      <AppName />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'center',
  },
});

export default Home;
