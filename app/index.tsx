import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Register from './screens/Register.jsx';
import Login from './screens/Login.jsx'

export default function Index() {
  return (
    <View style={styles.container}>
      <Login />
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
