import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { WP } from "../../helpers/Exporter";

const LoginComponent = () => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          borderColor: "#e5e7eb",
          borderRadius: WP("8%"),
          borderWidth: WP("0.3%"),
          margin: WP("2%"),
          padding: WP("1%"),
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => {
          console.log("mapclick");
        }}
      >
        <Image
          source={require("../../assets/images/mailLogo.png")}
          style={{
            width: WP("5%"),
            height: WP("5%"),
            margin: WP("2%"),
            tintColor: "#6b7280",
          }}
        />

        <TextInput
          style={{
            height: WP("6%"),
            width: WP("50%"),
            color: "#6b7280",
            margin: WP("1%"),
            padding: WP("0.5%"),
            fontWeight: "BrandonText-Regular",
            fontFamily: "BrandonText-Regular",
          }}
          placeholder="your@email.com"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#3078ff",
          borderColor: "#e5e7eb",
          borderRadius: WP("8%"),
          borderWidth: WP("0.3%"),
          margin: WP("2%"),
          marginTop: WP("3"),
          padding: WP("2%"),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontFamily: "../../assets/fonts/BrandonText-Regular.otf",
            fontWeight: "bold",
            margin: WP("1%"),
            padding: WP("0.5%"),
          }}
        >
          Login
        </Text>
      </TouchableOpacity>

      {/* Social login started */}
      <View
        style={[
          styles.container,
          { marginTop: WP("3"), marginBottom: WP("3") },
        ]}
      >
        <View style={styles.line} />
        <Text
          style={[
            styles.text,
            {
              color: "#000",
              fontWeight: "bold",
              // fontFamily: "Asap-Bold",
              fontSize: WP("3"),
            },
          ]}
        >
          OR CONTINUE WITH
        </Text>
        {/* <Text style={styles.text}>Centered Text</Text> */}
        <View style={styles.line} />
      </View>
      {/* <Text
        style={{
          color: "#000",
          fontWeight: "Asap-Bold",
          fontFamily: "Asap-Bold",
          alignSelf: "center",
          marginTop: WP("3"),
          fontSize:WP('3')
        }}>
        ----------------- OR CONTINUE WITH -----------------
      </Text> */}

     

      <TouchableOpacity style={styles.button}>
        <View style={styles.buttonContainer}>
          <Image
            source={require("../../assets/images/applelogo.png")}
            style={styles.icon}
          />
          <Text
            style={[styles.text, { fontWeight: "bold", fontSize: WP("4") }]}
          >
            Continue with Apple
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <View style={styles.buttonContainer}>
          <Image
            source={require("../../assets/images/google.png")}
            style={styles.icon}
          />
          <Text
            style={[styles.text, { fontWeight: "bold", fontSize: WP("4") }]}
          >
            Continue with Google
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <View style={styles.buttonContainer}>
          <Image
            source={require("../../assets/images/facebook.png")}
            style={styles.icon}
          />
          <Text
            style={[styles.text, {fontWeight: "bold", fontSize: WP("4") }]}
          >
            Continue with Facebook
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  text: {
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: WP("8"),
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderColor: "#999999",
    borderRadius: WP("8%"),
    borderWidth: WP("0.3%"),
    margin: WP("2%"),
    padding: WP("1%"),
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: WP("5%"),
    height: WP("5%"),
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: 'rgba(0, 0, 0, 0.7)', // Apply opacity to the color
    textAlign: "center",
  },
});

export default LoginComponent;
