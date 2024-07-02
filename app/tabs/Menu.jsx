import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable, Alert, ActivityIndicator } from "react-native";
import axios from 'axios';
import { useAuth } from '../useAuth'; // Adjust the path as per your project structure

function Menu() {
  const { authState } = useAuth();
  const { user } = authState;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [counters, setCounters] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://fyp-0qf7.onrender.com/api/food/getfood");
      setData(response.data);
      setCounters(Array(response.data.length).fill(0));
    } catch (error) {
      Alert.alert("Error", "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const counterIncrement = (index) => {
    const newCounters = [...counters];
    newCounters[index] += 1;
    setCounters(newCounters);
  };

  const counterDecrement = (index) => {
    const newCounters = [...counters];
    if (newCounters[index] > 0) {
      newCounters[index] -= 1;
    }
    setCounters(newCounters);
  };

  const placeOrder = async (index) => {
    const item = data[index];
    // console.log(item);
    const quantity = counters[index];
    const providerId = item.userRef;    ; // Adjust if your item object has a different structure

    if (quantity === 0) {
      Alert.alert("Error", "Please select a quantity greater than 0.");
      return;
    }

    setOrderLoading(true);
    try {
      const response = await axios.post("https://fyp-0qf7.onrender.com/api/order/createorder", {
        email: user.email,
        title: item.name,
        price: item.price,
        quantity: quantity,
        providerId: providerId
      });

      Alert.alert("Order Placed", `You have placed an order for ${item.name} with quantity ${quantity}`, [{ text: "OK" }]);
    } catch (error) {
      Alert.alert("Error", "Failed to place order");
    } finally {
      setOrderLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#841584" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.card}>
            {data.map((item, index) => (
              <View
                key={index}
                style={styles.cardItem}
              >
                <View style={styles.main}>
                  <View style={styles.left}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text>Price: {item.price}</Text>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.text}>Rating</Text>
                    <Text>{item.rating}/10</Text>
                  </View>
                </View>
                <View style={styles.counterContainer}>
                  <Pressable style={styles.Counterbutton} onPress={() => counterIncrement(index)}>
                    <Text style={styles.btnText}>+</Text>
                  </Pressable>
                  <Text style={styles.btnText}>{counters[index]}</Text>
                  <Pressable style={styles.Counterbutton} onPress={() => counterDecrement(index)}>
                    <Text style={styles.btnText}>-</Text>
                  </Pressable>
                </View>
                <Pressable style={styles.button} onPress={() => placeOrder(index)} disabled={orderLoading}>
                  {orderLoading ? (
                    <ActivityIndicator size="small" color="#FFF" />
                  ) : (
                    <Text style={styles.btnText}>Place Order</Text>
                  )}
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default Menu;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "100%",
    backgroundColor: "#841584",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
  Counterbutton: {
    width: "20%",
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
  card: {
    width: "100%",
    gap: 10,
  },
  cardItem: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'gray',
    borderRadius: 20,
    overflow: 'hidden',
    padding: 6,
    marginBottom: 10,
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
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  counterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
