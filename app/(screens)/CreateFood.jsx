import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Alert,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from 'axios';
import { useAuth } from '../useAuth'; // Adjust the path as per your project structure

function CreateFood() {
  const router = useRouter();
  const { authState } = useAuth();
  const { user } = authState;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [availabilityTime, setAvailabilityTime] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !price || !availabilityTime) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    setLoading(true); // Start the loader

    try {
      const response = await axios.post("https://fyp-0qf7.onrender.com/api/food/createfood", {
        name,
        price,
        avlabilityTime: availabilityTime,
        email: user.email,
        phone: "123-456-7890", // Default phone number
        rating: rating || 3.6
      });
      Alert.alert("Success", "Food item created successfully");
      // Clear form
      setName("");
      setPrice("");
      setAvailabilityTime("");
      setRating("");
      // Navigate to the previous screen or another screen
      router.back();
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false); // Stop the loader
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter food name"
          />
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Enter price"
            keyboardType="numeric"
          />
          <Text style={styles.label}>Availability Time</Text>
          <TextInput
            style={styles.input}
            value={availabilityTime}
            onChangeText={setAvailabilityTime}
            placeholder="Enter availability time"
          />
          <Text style={styles.label}>Rating</Text>
          <TextInput
            style={styles.input}
            value={rating}
            onChangeText={setRating}
            placeholder="Enter rating (default 3.6)"
            keyboardType="numeric"
          />
          <TouchableHighlight style={styles.button} onPress={handleSubmit} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.btnText}>Create Food Item</Text>
            )}
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CreateFood;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  form: {
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#841584",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  btnText: {
    fontSize: 20,
    color: "white",
  },
});
