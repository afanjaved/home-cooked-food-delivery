import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Pressable,
  ActivityIndicator,
  Alert
} from "react-native";
import axios from 'axios';
import { useRouter } from "expo-router"; // Assuming this is how you import the router

function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("provider");
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    setLoading(true);

    const url = "https://fyp-0qf7.onrender.com/api/user/signup";
    const userData = {
      email,
      password,
      phone: phoneNumber,  // Make sure to use 'phone' to match backend expectations
      name,
      role,
    };

    try {
      const response = await axios.post(url, userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Response data:", response.data);
      setLoading(false);
      router.navigate("/ChefSignupOTP");
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
        Alert.alert("Error", error.response.data.message || "Something went wrong");
      } else if (error.request) {
        console.error("No response received:", error.request);
        Alert.alert("Error", "No response received from server");
      } else {
        console.error("Error setting up request:", error.message);
        Alert.alert("Error", error.message || "Error setting up request");
      }
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
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
          onChangeText={setName}
          value={name}
          placeholder="Name"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          placeholder="Phone Number"
          keyboardType="default"
        />
        <TouchableHighlight 
          style={styles.button} 
          onPress={handleNext}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.btnText}>Next</Text>
          )}
        </TouchableHighlight>
        <View style={styles.footer}>
          <Pressable>
            <Text style={styles.footerText}>
              Already have an account? Login
            </Text>
          </Pressable>
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
  signup: {
    height: 60,
    width: "100%",
    paddingHorizontal: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: 'center',
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
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    color: "#fff",
    textDecorationLine: "underline",
  },
});
