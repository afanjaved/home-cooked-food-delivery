import { Link,useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import { CheckBox } from "react-native-elements";

function Login() {
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", isChecked);
    // Navigate to Home screen
    // navigation.navigate('Home');
    route.push("/Main");
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.heading}>Login</Text>
        <View style={styles.inpcont}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inpcont}>
          <Text style={styles.label}>Password</Text>
          <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Enter your Password"
          keyboardType="default"
          secureTextEntry
        />
        </View>
        <CheckBox
          center
          title="Remember me"
          checked={isChecked}
          onPress={() => setIsChecked(!isChecked)}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxText}
          checkedColor="#2196F3"
          uncheckedColor="#2196F3"
        />
        <Link href="/Home" asChild>
          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.btnText}>Login</Text>
          </Pressable>
        </Link>
        <View style={styles.container}>
          <Link href="/Register" asChild>
            <Pressable>
              <Text style={styles.label}>If dont have na Account</Text>
            </Pressable>
          </Link>
        </View>
        <View style={styles.fgtpsswd}>
          <Pressable>
            <Text style={styles.fgttxt}>Forget Password</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default Login;

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
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
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
  inpcont: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#841584",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  fgtpsswd: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    textAlign: "left",
  },
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    margin: 0,
    marginLeft: -10,
  },
  checkboxText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 10,
  },
  fgttxt: {
    color: "#fff",
    textDecorationLine: "underline",
  },
});
