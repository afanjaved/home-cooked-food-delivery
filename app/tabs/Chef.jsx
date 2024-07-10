import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image, Linking, ActivityIndicator, Alert, Modal, TextInput, Button } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import axios from 'axios';

function Shef() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [rating, setRating] = useState('');

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get("https://fyp-0qf7.onrender.com/api/provider/getproviders");
        setData(response.data);
      } catch (error) {
        Alert.alert("Error fetching providers", error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const renderStars = (rating) => {
    if (rating == null || typeof rating !== 'number' || rating < 0 || rating > 5) {
      rating = 0; // Default to 0 stars if rating is invalid
    }

    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <View style={styles.stars}>
        {[...Array(fullStars)].map((_, index) => (
          <Icon key={`full-${index}`} name="star" size={20} color="#FFD700" />
        ))}
        {halfStar && <Icon key="half" name="star-half-o" size={20} color="#FFD700" />}
        {[...Array(emptyStars)].map((_, index) => (
          <Icon key={`empty-${index}`} name="star-o" size={20} color="#FFD700" />
        ))}
      </View>
    );
  };

  const handleRate = (provider) => {
    setSelectedProvider(provider);
    setModalVisible(true);
  };

  const submitRating = async () => {
    if (rating < 1 || rating > 5 || !Number.isInteger(Number(rating))) {
      Alert.alert("Invalid rating", "Rating must be a whole number between 1 and 5");
      return;
    }

    try {
      await axios.post("https://fyp-0qf7.onrender.com/api/provider/rate", {
        email: selectedProvider.email,
        rate: Number(rating),
      });
      Alert.alert("Success", "Rating submitted successfully");
      setModalVisible(false);
      setRating('');
      // Optionally, refresh the data to show updated ratings
      const response = await axios.get("https://fyp-0qf7.onrender.com/api/provider/getproviders");
      setData(response.data);
    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#841584" style={{ flex: 1, justifyContent: "center" }} />;
  }

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.card}>
            {data.map((item, index) => (
              <View key={index} style={styles.main}>
                <View style={styles.left}>
                  <Image
                    source={{ uri: item.image || "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png" }}
                    style={styles.image}
                  />
                  {renderStars(item.averageRating)}
                </View>
                <View style={styles.right}>
                  <View style={styles.up}>
                    <Text style={styles.text}>Chef</Text>
                    <Text style={{ fontSize: 16, textTransform: "capitalize" }}>{item.name}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleCall(item.phone)}>
                    <View style={styles.down}>
                      <View style={styles.downleft}>
                        <Icon name="phone" size={20} color="#000" />
                      </View>
                      <View style={styles.downright}>
                        <Text>{item.phone}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleRate(item)} style={styles.rateButton}>
                    <Text style={styles.rateText}>Rate</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {selectedProvider && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Rate {selectedProvider.name}</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter rating (1-5)"
                keyboardType="numeric"
                value={rating}
                onChangeText={setRating}
              />
              <Button title="Submit" onPress={submitRating} />
              <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

export default Shef;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  card: {
    width: "100%",
  },
  up: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    padding: 6,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  down: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    backgroundColor: "#841584",
    padding: 4,
    borderRadius: 10,
  },
  downleft: {
    width: "20%",
  },
  downright: {
    width: "80%",
  },
  main: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    justifyContent: "center",
    gap: 14,
  },
  left: {
    width: "40%",
    alignItems: "center",
    gap: 4,
  },
  right: {
    width: "60%",
    borderRadius: 10,
    paddingLeft: 10,
    backgroundColor: "#EFEFEB",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  stars: {
    flexDirection: "row",
    marginTop: 4,
  },
  rateButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#841584",
    borderRadius: 10,
  },
  rateText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderColor: "#841584",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
});
