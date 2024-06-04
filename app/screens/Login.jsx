import React from 'react';
import { View, StyleSheet } from 'react-native-web';

function Login() {
  return (
    <View style={styles.main}>
      <View style={styles.container}></View>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Make the main container take the full height of the viewport
  },
  container: {
    height: '60%',
    width: '80%',
    backgroundColor: '#808080',
  },
});
