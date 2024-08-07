import React, { useState, useEffect } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  TouchableOpacity // Import TouchableOpacity for button styling
} from "react-native";
import axios from 'axios';
import { useAuth } from '../useAuth'; // Adjust the path as per your project structure
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

function Order() {
  const { authState } = useAuth();
  const { user } = authState;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Initialize navigation

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post("https://fyp-0qf7.onrender.com/api/order/geteaterorder", { email: user.email });
        setOrders(response.data);
      } catch (error) {
        Alert.alert("Error fetching orders", error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.email]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#841584" style={{ flex: 1, justifyContent: "center" }} />;
  }

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <ScrollView>
        <Link href='/EaterSummary' asChild>
        <TouchableOpacity
        style={styles.button} // Apply custom styles to the button
      >
        <Text style={styles.buttonText}>Order Summary</Text>
      </TouchableOpacity>
      </Link>
          <View style={styles.card}>
            {orders.map((order, index) => (
              <View key={index} style={styles.main}>
                <View style={styles.left}>
                  <Text style={styles.text}>{order.title}</Text>
                  <View style={styles.leftdown}>
                    <Text style={styles.text}>Price :</Text>
                    <Text>{order.price} $</Text>
                  </View>
                  <View style={styles.leftdown}>
                    <Text style={styles.text}>{order.status}</Text>
                  </View>
                  <View style={styles.leftdown}>
                    <Text style={styles.text}>Date :</Text>
                    <Text>{formatDate(order.createdAt)}</Text>
                  </View>
                </View>
                <View style={styles.right}>
                  <View style={styles.up}>
                    <View style={styles.leftdown}>
                      <Text style={styles.text}>Quantity :</Text>
                      <Text style={styles.text}>{order.quantity}</Text>
                    </View>
                    <View style={styles.leftdown}>
                      <Text style={styles.text}>Total Price :</Text>
                      <Text style={{ fontSize: 16, textTransform: "capitalize" }}>
                        {(order.price * order.quantity).toFixed(2)} $
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default Order;

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
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
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
    width: "100%",
    height: 110,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#841584",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
