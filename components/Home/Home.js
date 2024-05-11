import React, { useEffect } from "react";
import MyStyles, { patterns } from "../../styles/MyStyles";
import HomeStyles from "./HomeStyles";
import API, { endpoints } from "../../configs/API";
import axios from "axios";
const {
  View,
  Text,
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
} = require("react-native");

const Home = () => {
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      style={{ flex: 1, resizeMode: "contain" }}
    >
      <View
        style={[
          {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255,255,240, 0.4)",
          },
        ]}
      >
        <Text
          style={[
            {
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
              color: "#ffffff",
              paddingHorizontal: 20,
              textShadowOffset: { width: 5, height: 5 },
              textShadowColor: "#000000",
              textShadowRadius: 4,
            },
          ]}
        >
          Chào mừng bạn đến với trang quản lí khoá luận tốt nghiệp
        </Text>
      </View>
    </ImageBackground>
  );
};

export default Home;
