import React, { useContext, useEffect } from "react";
import API, { authApi, endpoints } from "../../configs/API";
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { patterns } from "../../styles/MyStyles";
import { ScrollView } from "react-native";
import HoidongStyles, { hoidongStyle } from "./HoidongStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { HoidongContext, HoidongProvider } from "./HoidongContext";
import ThanhvienDetail from "./Thanhvien";
import { createContext } from "react";
import { GlobalStateContext } from "./DltProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

const HoidongDetail = ({ route, navigation }) => {
  const { globalState, setGlobalState } = useContext(GlobalStateContext);
  const [isDeleted, setIsDeleted] = React.useState(false);
  const [tvId, setTvId] = React.useState(0);
  const { hoidongId } = route.params;
  const [hd, setHd] = React.useState(null);
  const loadBack = () => {
    navigation.navigate("Hoidong");
  };

  const dltThanhvien = async (thanhvienId) => {
    try {
      // Hiển thị cảnh báo cho người dùng
      Alert.alert(
        "Xác nhận",
        "Bạn có muốn xoá người này khỏi hội đồng không?",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => {
              console.log("Cancel pressed");
              // Hủy bỏ hành động xoá
            },
          },
          {
            text: "Yes",
            onPress: async () => {
              try {
                  /*
                   let accessToken = await AsyncStorage.getItem("access-token")
            let res = await authApi(accessToken).post(endpoints['addhoidong'](hoidongId), user, {
                headers:{
                'Content-Type': 'application/json'
            },})
                  */
            let accessToken = await AsyncStorage.getItem("access-token")
            let res = await authApi(accessToken).delete(
                  endpoints["dltthanhvien"](hoidongId, thanhvienId)
                );
                console.log(res.data);
                Alert.alert("Thông báo", "Xoá thành công");
                navigation.navigate("Hoidong");
                setIsDeleted(true);
                setGlobalState(true);
              } catch (ex) {
                console.error(ex);
              }
            },
          },
        ]
      );
    } catch (ex) {
      console.error(ex);
    }
  };

  useEffect(() => {
    const loadHd = async () => {
      try {
        let res = await API.get(endpoints["hoidongdetail"](hoidongId));
        setHd(res.data);
      } catch (ex) {
        setHd([]);
        console.error(ex);
      }
    };
    loadHd();
  }, [hoidongId, isDeleted]);

  return (
    <>
      {tvId === 0 ? (
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          style={{ flex: 1, resizeMode: "contain" }}
        >
          <ScrollView>
            <View style={patterns.centeredContainer}>
              <Text style={patterns.centerText}>
                CHI TIẾT HỘI ĐỒNG {hoidongId}
              </Text>
            </View>
            <View contentContainerStyle={patterns.leftAlignedContainer}>
              {hd === null ? (
                <ActivityIndicator />
              ) : (
                <>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => loadBack()}>
                      <Icon
                        name="arrow-left"
                        size={30}
                        color="rgba(255,255,255,0.85)"
                        style={{
                          padding: 14,
                          marginLeft: 5,
                          marginBottom: 8,
                          backgroundColor: "green",
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  {hd.map((h) => (
                    <View
                      key={h.id}
                      style={[patterns.list, hoidongStyle.list_gvhd]}
                    >
                      <View style={{ flexDirection: "row", marginLeft: "85%" }}>
                        <TouchableOpacity onPress={() => dltThanhvien(h.id)}>
                          <Icon
                            name="close"
                            size={25}
                            color="rgba(255,255,255,0.85)"
                            style={{
                              padding: 10,
                              marginLeft: 5,
                              marginBottom: 8,
                              backgroundColor: "red",
                              borderRadius: 25,
                            }}
                          />
                        </TouchableOpacity>
                      </View>

                      <TouchableOpacity onPress={() => setTvId(h.id)}>
                        <Image
                          resizeMode="stretch"
                          style={{ width: 100, height: 100, marginLeft: "40%" }}
                          source={{ uri: `${h.avt}` }}
                        />
                      </TouchableOpacity>
                      <Text style={hoidongStyle.text_list_gvhd}>
                        Tên Giảng Viên:{" "}
                        <Text style={{ color: "black" }}>{h.full_name}</Text>
                      </Text>

                      <Text style={hoidongStyle.text_list_gvhd}>
                        ID: <Text style={{ color: "black" }}>{h.id}</Text>
                      </Text>

                      <Text style={hoidongStyle.text_list_gvhd}>
                        Email: <Text style={{ color: "black" }}>{h.email}</Text>
                      </Text>
                      <Text style={hoidongStyle.text_list_gvhd}>
                        Vai trò:{" "}
                        <Text style={{ color: "black" }}>{h.vaitro}</Text>
                      </Text>
                      <View style={{ display: "none" }}>
                        <ThanhvienDetail id={h.id} />
                      </View>
                    </View>
                  ))}
                </>
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            onPress={() => setTvId(0)}
            name="arrow-left"
            size={30}
            color="rgba(255,255,255,0.85)"
            style={{
              padding: 14,
              marginLeft: 5,
              borderRadius: 30,
              marginBottom: 8,
              backgroundColor: "green",
            }}
          />

          <ThanhvienDetail id={tvId} />
        </View>
      )}
    </>
  );
};

export default HoidongDetail;
