import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
// import logo from "../../assets/images/logo.png";

function Main() {
  return (
    <View style={styles.main}>
      <View style={styles.headingCont}>
        <Text style={styles.headingText}>how you wanna use Homocook</Text>
      </View>
      <View style={styles.box1}>
        <Image
          style={styles.image}
          source="https://picsum.photos/seed/696/3000/2000"
          contentFit="cover"
          transition={1000}
        />
        {/* <Image
            style={styles.image}
          source={require('../../assets/logo.png')}
        /> */}
        <Text style={styles.title}>Eat Food</Text>
      </View>
      <View style={styles.box2}>
      <Image
          style={styles.image}
          source="https://picsum.photos/seed/696/3000/2000"
          contentFit="cover"
          transition={1000}
        />
        <Text style={styles.title}>Provide Food</Text>
      </View>
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
    fontSize: 20,
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
    marginBottom: 60,
  },
  image: {
    height: "80%",
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
  },
});
