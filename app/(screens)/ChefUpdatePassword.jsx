import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Image,
  Pressable,
} from "react-native";

function ChefUpdatePassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleNext = () => {
    // Log input data to the console
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    // Navigate to the Login screen
    router.push("/ChefLogin");
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.update}>
          <Text style={styles.title}>Update Password</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Enter New Password"
          keyboardType="default"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder="Confirm Password"
          keyboardType="default"
          secureTextEntry
        />
        <TouchableHighlight style={styles.button} onPress={handleNext}>
          <Text style={styles.btnText}>Update</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default ChefUpdatePassword;

const styles = StyleSheet.create({
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "#f5f5f5",
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#808080",
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
  },
  img: {
    height: 120,
    width: 80,
  },
  update: {
    height: 60,
    width: "100%",
    paddingHorizontal: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent:'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#841584",
  },
  input: {
    height: 40,
    width: "100%",
    paddingHorizontal: 6,
    backgroundColor: "white",
    alignItems: "flex-end",
    borderRadius: 5,
    marginBottom: 12,
  },
  button: {
    width: "100%",
    backgroundColor: "#841584",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
  btnText: {
    fontSize: 20,
    color: "white",
  }
});
