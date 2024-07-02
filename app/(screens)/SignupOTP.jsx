import React, { useState } from "react";
import { View, Pressable, Text, TextInput, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";

function SignupOTP() {
  const [OTP, setOTP] = useState("");
  const [email, setEmail] = useState(""); // Make sure email is stored properly
  const router = useRouter();

  const handleNext = async () => {
    const url = "https://fyp-0qf7.onrender.com/api/user/verify";
    const userData = {
      email,
      code: OTP, // Use 'code' as expected by the backend
    };

    console.log("Sending user data:", userData);

    try {
      const response = await axios.post(url, userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Response data:", response.data);
      router.push("/Login"); // Navigate to login on successful verification
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
      <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Enter your email"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          onChangeText={setOTP}
          value={OTP}
          placeholder="OTP"
          keyboardType="default"
        />
      </View>
      <Pressable style={styles.button} onPress={handleNext}>
        <Text style={styles.btnText}>Verify</Text>
      </Pressable>
    </View>
  );
}

export default SignupOTP;


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
    gap: 10, 
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
