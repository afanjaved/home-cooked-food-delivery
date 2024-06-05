import React from 'react';
import { View, StyleSheet } from 'react-native';
import Home from './Home';
import Main from './(screens)/Main'
import  Chefs from './Cards/chefs'

export default function Index() {
  return (
    <View style={styles.container}>
      <Main/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 'auto',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
