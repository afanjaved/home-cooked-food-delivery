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

function Register() {
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
    router.push("/Login");
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        {/* <Image style={styles.img} source={require('../../assets/images/logo.png')} /> */}
        <View style={styles.signup}>
          <Text style={styles.title}>Please Sign Up</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Enter your email"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Enter your Password"
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
          <Text style={styles.btnText}>Next</Text>
        </TouchableHighlight>
        <View style={styles.footer}>
          <Link href="/Login" asChild>
            <Pressable>
              <Text style={styles.footerText}>
                Already have an account? Login
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}

export default Register;

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
  signup: {
    height: 60,
    width: "100%",
    paddingHorizontal: 6,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#841584",
  },
  input: {
    height: 60,
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
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    color: "#fff",
    textDecorationLine: "underline",
  },
});
