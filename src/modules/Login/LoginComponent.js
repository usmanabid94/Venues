import React from 'react';
import { View, TouchableOpacity, Image, TextInput, Text } from 'react-native';
import { WP } from '../../helpers/Exporter';

const LoginComponent = () => {
  return (
    <View>
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
          source={require("../../assets/images/mail.png")}
          style={{
            width: WP("5%"),
            height: WP("5%"),
            margin: WP("2%"),
            tintColor: "#6b7280",
          }}
        />

        <TextInput
          style={{
            height: WP("5%"),
            width: WP("50%"),
            color: "#6b7280",
            margin: WP("1%"),
            padding: WP("0.5%"),
          }}
          placeholder="your@email.com*"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#3078ff",
          borderColor: "#e5e7eb",
          borderRadius: WP("8%"),
          borderWidth: WP("0.3%"),
          margin: WP("2%"),
          padding: WP("1%"),
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
      <Text style={{color:'#e5e7eb',alignSelf:'center'}}>-------------OR CONTINUE WITH-------------</Text>
   
      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
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
          source={require("../../assets/images/applelogo.png")}
          style={{
            width: WP("5%"),
            height: WP("5%"),
            margin: WP("2%"),
          }}
        />

        <Text
          style={{
            height: WP("6%"),
            width: WP("50%"),
            color: "#6b7280",
            margin: WP("1%"),
            padding: WP("0.5%"),
          }}
        >
          Continue with Apple
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
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
          source={require("../../assets/images/google.png")}
          style={{
            width: WP("5%"),
            height: WP("5%"),
            margin: WP("2%"),
          }}
        />

        <Text
          style={{
            height: WP("6%"),
            width: WP("50%"),
            color: "#6b7280",
            margin: WP("1%"),
            padding: WP("0.5%"),
          }}
        >
          Continue with Google
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
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
          source={require("../../assets/images/facebook.png")}
          style={{
            width: WP("5%"),
            height: WP("5%"),
            margin: WP("2%"),
          }}
        />

        <Text
          style={{
            height: WP("6%"),
            width: WP("50%"),
            color: "#6b7280",
            margin: WP("1%"),
            padding: WP("0.5%"),
          }}
        >
          Continue with Facebook
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginComponent;
