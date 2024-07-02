import React from "react";
import { View, Pressable, Text, TextInput, StyleSheet } from "react-native";
import { Link } from "@react-navigation/native";

function ChefVerifyOTP() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <TextInput style={styles.input} keyboardType="number-pad" maxLength={1} />
      </View>
      <Link to="/ChefUpdatePassword" component={Pressable} style={styles.button}>
        <Text style={styles.btnText}>Verify</Text>
      </Link>
    </View>
  );
}

export default ChefVerifyOTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  main: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10, // Ensure your React Native version supports this, otherwise use marginRight
  },
  input: {
    height: 50,
    width: 40,
    backgroundColor: "gray",
    borderRadius: 10,
    textAlign: "center",
    marginHorizontal: 2, // Use this for compatibility if gap doesn't work
  },
  button: {
    width: "40%",
    backgroundColor: "#841584",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 40,
    textAlign:'center'
  },
  btnText: {
    fontSize: 20,
    color: "white",
  },
});
