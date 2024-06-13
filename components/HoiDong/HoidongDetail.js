import React, { useContext, useEffect, useState } from "react";
import API, { authApi, endpoints } from "../../configs/API";
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { patterns } from "../../styles/MyStyles";
import { ScrollView } from "react-native";
import HoidongStyles, { hoidongStyle } from "./HoidongStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import ThanhvienDetail from "./Thanhvien";
import { createContext } from "react";
import { GlobalStateContext } from "./DltProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserStyles from "../User/UserStyles";
import { RadioButton } from "react-native-paper";
import { HoidongContext } from "./HoidongProvider";

export const ThemeContext = createContext();

const HoidongDetail = ({ route, navigation }) => {
  const { glob,setGlob } = useContext(HoidongContext);
  const [loading, setLoading] = useState(false)
  const register = async () => {
    console.info(newRole)
    // 
    setLoading(true)
        
    try{

  
  let accessToken = await AsyncStorage.getItem("access-token")
  let res = await authApi(accessToken).patch(endpoints['patch_vaitro'](hoidongId), newRole, {
      headers:{
      'Content-Type': 'application/json'
  },})
  //Temp
  
  //
  console.info(res.data)
  Alert.alert("Thông báo","Đăng kí thành công!!!")
  setIsDeleted(!isDeleted);
  setGlobalState(true);
  setGlob(res.data)
  }
  catch(ex)
  {
      console.error(ex)
  }
  finally{
      setLoading(false)
  }
    // 
  }
  const changeRole = (field, value) => {

    setNewRole(newRole=>{
        return {...newRole, [field]:value}
    })
  }
  const [newRole, setNewRole] = useState({
    "vaitro": "",
    "thanhvien_id": 0
  })
  const [change, setChange] = useState(false)
  const changeVaitro = (thanhvien_id) => {
    setChange(true)
    
    changeRole("thanhvien_id", thanhvien_id)
  }
  const hideChange = () => {
    setChange(false)
  }
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
                      
                      {/*  */}
                      <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text
                    style={{ padding: 2, marginLeft: "67%", color: "black", fontStyle: 'italic', color:'orange', fontWeight:'bold' }}
                  >
                    Sửa vai trò
                  </Text>
              <TouchableOpacity
                    style={{ width: "12%", marginLeft: "90%" }}
                    onPress={() => changeVaitro(h.id)}
                  >
                    <Icon
                      name="refresh"
                      size={15}
                      color="rgba(255,255,255,0.85)"
                      style={{
                        padding: 11,
                        marginLeft: 5,
                        marginBottom: 8,
                        backgroundColor: "green",
                      }}
                    />
                  </TouchableOpacity>
                  </View>
                      {/*  */}

                      {/*  */}
                      {change === true && newRole.thanhvien_id === h.id?<>
                        <View>
                      {/*  */}
                      <View style={{ width: "100%", padding: 10,alignItems: 'center', justifyContent: "flex-start", backgroundColor: "white"}}>
          <Text style={UserStyles.endTextSelected}>Chọn chức vụ</Text>
          <RadioButton.Group  onValueChange={t=>{changeRole("vaitro", t)}} value={newRole.vaitro}>
            <RadioButton.Item label="CHỦ TỊCH" value="CHU TICH" />
            <RadioButton.Item label="THƯ KÝ" value="THU KY" />
            <RadioButton.Item label="PHẢN BIỆN" value="PHAN BIEN" />
            <RadioButton.Item label="THÀNH VIÊN KHÁC" value="THANH VIEN KHAC" />
          </RadioButton.Group>    
          </View> 
                      {/*  */}
        {loading === true ? <ActivityIndicator/> : <><TouchableOpacity onPress={register} style={{ marginTop: "1%", marginBottom: 20 }}>
              <Text style={UserStyles.btnLogin}>Thay đổi</Text>
            </TouchableOpacity></>}
        <TouchableOpacity onPress={hideChange}>
        <Text
                style={[
                  UserStyles.btnLogin,
                  { backgroundColor: "rgba(255, 0, 0, 0.5)" },
                ]}
              >
                Ẩn bớt
              </Text>
              </TouchableOpacity>
                      </View>
                      </>:<>
                      
                      </>}

                      {/*  */}


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
