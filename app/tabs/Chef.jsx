import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image, Linking, ActivityIndicator, Alert } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import axios from 'axios';

function Shef() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
                  <View style={styles.leftdown}>
                    <Icon name="star" size={20} color="#FFD700" />
                    <Icon name="star" size={20} color="#FFD700" />
                    <Icon name="star" size={20} color="#FFD700" />
                    <Icon name="star-o" size={20} color="#FFD700" />
                    <Icon name="star-o" size={20} color="#FFD700" />
                  </View>
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
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
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
  leftdown: {
    display: "flex",
    flexDirection: "row",
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
});
