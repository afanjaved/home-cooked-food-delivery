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

function Menu() {
  const [data, setData] = useState([
    {
      name: "Pizza",
      rating: 8,
      price: 10,
    },
    {
      name: "Burger",
      rating: 7,
      price: 8,
    },
    {
      name: "Sushi",
      rating: 9,
      price: 15,
    },
    {
      name: "Tacos",
      rating: 8,
      price: 12,
    },
    {
      name: "Pasta",
      rating: 7,
      price: 11,
    },
    {
      name: "Steak",
      rating: 9,
      price: 20,
    },
    {
      name: "Salad",
      rating: 6,
      price: 7,
    },
    {
      name: "Sandwich",
      rating: 7,
      price: 9,
    },
    {
      name: "Ramen",
      rating: 8,
      price: 13,
    },
    {
      name: "Fried Chicken",
      rating: 8,
      price: 10,
    },
  ]);

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <ScrollView>
        <View style={styles.card}>
          {data.map((item, index) => (
            <View key={index} style={styles.main}>
              <View style={styles.left}>
                <Text style={styles.text}>{item.name}</Text>
                <Text>Price: {item.price}</Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.text}>Rating</Text>
                <Text>{item.rating}/10</Text>
              </View>
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
