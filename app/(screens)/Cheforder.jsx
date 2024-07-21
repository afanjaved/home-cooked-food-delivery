import React, { useState, useEffect } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
  ActivityIndicator,
  Alert
} from "react-native";
import axios from 'axios';
import { useAuth } from '../useAuth'; // Adjust the path as per your project structure

function Chefoder() {
  const { authState } = useAuth();
  const { user } = authState;
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post("https://fyp-0qf7.onrender.com/api/order/getproviderorder", {
          email: user.email
        });
        setFoodItems(response.data);
        setOrderLoading(Array(response.data.length).fill(false));
      } catch (error) {
        Alert.alert("Error fetching orders", error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.email]);

  const handleCompleteOrder = async (index, orderId) => {
    setOrderLoading(prevState => {
      const newLoadingState = [...prevState];
      newLoadingState[index] = true;
      return newLoadingState;
    });

    try {
      const response = await axios.post("https://fyp-0qf7.onrender.com/api/order/updateorder", {
        status: "completed",
        orderId: orderId
      });

      setFoodItems(prevItems => {
        const newItems = [...prevItems];
        newItems[index] = { ...newItems[index], status: "completed" };
        return newItems;
      });

      Alert.alert("Order Completed", `The order for ${foodItems[index].title} has been completed.`, [{ text: "OK" }]);
    } catch (error) {
      Alert.alert("Error", "Failed to complete order");
    } finally {
      setOrderLoading(prevState => {
        const newLoadingState = [...prevState];
        newLoadingState[index] = false;
        return newLoadingState;
      });
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#841584" style={{ flex: 1, justifyContent: "center" }} />;
  }

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <Link href="/CreateFood" asChild>
          <TouchableHighlight style={styles.button}>
            <Text style={styles.btnText}>Add food item</Text>
          </TouchableHighlight>
        </Link>
        <Link href="/ChefOrderHistory" asChild>
          <TouchableHighlight style={styles.button}>
            <Text style={styles.btnText}>Order History</Text>
          </TouchableHighlight>
        </Link>
        <ScrollView>
          <View style={styles.card}>
            {foodItems.map((item, index) => (
              <View key={index} style={{ display: 'flex', flexDirection: 'column', padding: 10, borderRadius: 20, backgroundColor: 'gray' }}>
                <View style={styles.main}>
                  <View style={styles.left}>
                    <Text style={styles.text}>{item.title}</Text>
                    <View style={styles.leftdown}>
                      <Text style={styles.text}>Price :</Text>
                      <Text>{item.price} $</Text>
                    </View>
                  </View>
                  <View style={styles.right}>
                    <View style={styles.up}>
                      <View style={styles.leftdown}>
                        <Text style={styles.text}>Quantity :</Text>
                        <Text style={styles.text}>{item.quantity}</Text>
                      </View>
                      <View style={styles.leftdown}>
                        <Text style={styles.text}>Total Price :</Text>
                        <Text style={{ fontSize: 16, textTransform: "capitalize" }}>
                          {(item.price * item.quantity).toFixed(2)} $
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <TouchableHighlight 
                  style={styles.button} 
                  onPress={() => handleCompleteOrder(index, item._id)} 
                  disabled={orderLoading[index] || item.status === "completed"}
                >
                  {orderLoading[index] ? (
                    <ActivityIndicator size="small" color="#FFF" />
                  ) : (
                    <Text style={styles.btnText}>
                      {item.status === "completed" ? "Order Completed" : "Complete Order"}
                    </Text>
                  )}
                </TouchableHighlight>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default Chefoder;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  card: {
    width: "100%",
    gap: 10
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
