import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
// import logo from "../../assets/images/logo.png";
import { Link, useNavigation } from "expo-router";

function Main() {
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <View style={styles.headingCont}>
        <Text style={styles.headingText}>how you wanna use Homocook</Text>
      </View>
      <Link href='/Login' asChild>
        <Pressable style={styles.box1}>
            <Image
              style={styles.image}
              source="https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_1280.jpg"
              contentFit="cover"
              transition={1000}
            />
            <Text style={styles.title}>Provide Food</Text>
        </Pressable>
      </Link>
      <Link href='/Login' asChild>
        <Pressable style={styles.box2}>
            <Image
              style={styles.image}
              source="https://cdn.pixabay.com/photo/2014/12/15/14/05/salad-569156_1280.jpg"
              contentFit="cover"
              transition={1000}
            />
            <Text style={styles.title}>Eat Food</Text>
        </Pressable>
      </Link>
    </View>
  );
}

export default Main;

const styles = StyleSheet.create({
  main: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 50,
    // backgroundColor:'blue'
  },
  headingCont: {
    height: "10%",
    width: "100%",
    backgroundColor: "#841584",
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
  },
  headingText: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 18,
    color: "white",
  },
  box1: {
    height: 200,
    width: "90%",
    display: "flex",
    flexDirection: "column",
    borderwidth: 2,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderRadius:10,
    overflow:'hidden'
  },
  image: {
    height: "86%",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  box2: {
    height: 200,
    width: "90%",
    display: "flex",
    flexDirection: "column",
    borderwidth: 2,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
    borderRadius:10,
    overflow:'hidden'
  },
});
