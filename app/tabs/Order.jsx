import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function Oder() {
  const foodItems = [
    {
      title: "Pizza",
      price: "8.99 $",
      quantity: 2,
      totalAmount: (8.99 * 2).toFixed(2),
    },
    {
      title: "Burger",
      price: "5.49 $",
      quantity: 3,
      totalAmount: (5.49 * 3).toFixed(2),
    },
    {
      title: "Pasta",
      price: "7.99 $",
      quantity: 1,
      totalAmount: (7.99 * 1).toFixed(2),
    },
    {
      title: "Salad",
      price: "4.99 $",
      quantity: 4,
      totalAmount: (4.99 * 4).toFixed(2),
    },
    {
      title: "Sushi",
      price: "12.49 $",
      quantity: 2,
      totalAmount: (12.49 * 2).toFixed(2),
    },
    {
      title: "Taco",
      price: "3.99 $",
      quantity: 5,
      totalAmount: (3.99 * 5).toFixed(2),
    },
    {
      title: "Sandwich",
      price: "6.49 $",
      quantity: 2,
      totalAmount: (6.49 * 2).toFixed(2),
    },
    {
      title: "Steak",
      price: "15.99 $",
      quantity: 1,
      totalAmount: (15.99 * 1).toFixed(2),
    },
    {
      title: "Soup",
      price: "4.49 $",
      quantity: 3,
      totalAmount: (4.49 * 3).toFixed(2),
    },
    {
      title: "Ice Cream",
      price: "3.49 $",
      quantity: 4,
      totalAmount: (3.49 * 4).toFixed(2),
    },
  ];

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.card}>
            {foodItems.map((item, index) => (
              <View key={index} style={styles.main}>
                <View style={styles.left}>
                  <Text style={styles.text}>{item.title}</Text>
                  <View style={styles.leftdown}>
                    <Text style={styles.text}>Price :</Text>
                    <Text>{item.price}</Text>
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
                      {item.totalAmount}
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

export default Oder;

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
