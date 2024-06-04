import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Image
} from "react-native";

function Register() {
  const [email, setEmail] = useState("");

  const onChangeNumber = (text) => {
    setEmail(text);
  };

  return (
    <View style={styles.container}>
      {/* <Image style={styles.img} source={require('../../assets/images/logo.png')} /> */}
      <View style={styles.signup}>
        <Text style={styles.title}>Please Sign Up</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={email}
        placeholder="Enter your email"
        keyboardType="default"
      />
      <TouchableHighlight style={styles.button} onPress={() => {}}>
        <Text style={styles.btnText}>Next</Text>
      </TouchableHighlight>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? Login</Text>
      </View>
    </View>
  );
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "auto",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  img: {
    height: 120,
    width: 80,
  },
  signup: {
    height: 60,
    width: "100%",
    paddingHorizontal: 6,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 24,
    marginBottom: 3,
    textTransform: "uppercase",
  },
  input: {
    height: 60,
    width: "100%",
    paddingHorizontal: 6,
    backgroundColor: "#808080",
    alignItems: "flex-end",
    borderRadius: 5,
    marginBottom: 12,
  },
  button: {
    width: "100%",
    backgroundColor: "#2196F3",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
  btnText: {
    fontSize: 20,
    color: "white",
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    color: "blue",
    textTransform:'uppercase'
  },
});
