import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert
} from "react-native";
import axios from 'axios';
import { useAuth } from '../useAuth'; // Adjust the path as per your project structure

function Order() {
  const { authState } = useAuth();
  const { user } = authState;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <ActivityIndicator size="large" color="#841584" style={{ flex: 1, justifyContent: "center" }} />;
  }

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.card}>
            {orders.map((order, index) => (
              <View key={index} style={styles.main}>
                <View style={styles.left}>
                  <Text style={styles.text}>{order.title}</Text>
                  <View style={styles.leftdown}>
                    <Text style={styles.text}>Price :</Text>
                    <Text>{order.price} $</Text>
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
});
