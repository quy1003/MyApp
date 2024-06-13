import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import API, { endpoints } from "../../configs/API";
import MyStyles, { patterns } from "../../styles/MyStyles";
import HoidongStyles from "./HoidongStyles";
import { ScrollView } from "react-native";
import HoidongProvider, { HoidongContext } from "./HoidongProvider";
import { GlobalStateContext } from "./DltProvider";
import UserStyles from "../User/UserStyles";

const Hoidong = ({ route, navigation }) => {
  const { glob, setGlob } = useContext(HoidongContext);
  const { globalState, setGlobalState } = useContext(GlobalStateContext);
  const [hoidong, setHoidong] = React.useState(null);
  const [q, setQ] = React.useState("");
  const [showInput, setShowInput] = React.useState(-1);
  const [changeComp, setChangeComp] = React.useState(false)
  const [loading, setLoading] = useState(false);
  const [nameHoidong, setNameHoidong] = useState({
    ten: "",
  });

  //
  const addNewHoidong = async () => {
    setLoading(true);
    try {
      let res = await API.post(endpoints["dshoidong"], nameHoidong);
      console.info(res.data);

      Alert.alert("Thông báo", "Tạo mới thành công hội đồng");
      setNameHoidong((nameHoidong) => {
        return { ...nameHoidong, ["ten"]: "" };
      });
      setChangeComp(!changeComp)
    } catch (ex) {
      console.error(ex);
    } finally {
      setLoading(false);
    }
  };
  //

  const scrollViewRef = useRef(null);
  const newHoidong = async () => {
    setShowInput(-1 * parseInt(showInput));
    // if (scrollViewRef.current) {
    //   const endPosition = 5;
    //   scrollViewRef.current.scrollToEnd({ y: endPosition, animated: true });
    // }
  };
  const change = (field, value) => {
    setNameHoidong((nameHoidong) => {
      return { ...nameHoidong, [field]: value };
    });
  };
  //

  const toGoDown = () =>{
    if (scrollViewRef.current) {
      const endPosition = 100;
      scrollViewRef.current.scrollToEnd({ y: endPosition, animated: true });
    }
  }
  const toGoTop = () =>{
    if (scrollViewRef.current) {
      const endPosition = 100;
      scrollViewRef.current.scrollTo({ y: endPosition, animated: true });
    }
  }
  const loadToDetail = (hoidongId) => {
    navigation.navigate("HoidongDetail", { hoidongId: hoidongId });
  };
  const loadToAdd = (hoidongId) => {
    navigation.navigate("AddHoidong", { hoidongId: hoidongId });
  };
  const pressToDelete = (hoidongId) => {
    setLoading(true);
    try {
      // Hiển thị cảnh báo cho người dùng
      Alert.alert("Xác nhận", "Bạn có muốn xoá hội đồng này không?", [
        {
          text: "Huỷ",
          style: "Huỷ",
          onPress: () => {
            console.log("Cancel pressed");
            // Hủy bỏ hành động xoá
          },
        },
        {
          text: "Đồng ý",
          onPress: async () => {
            try {
              let res = await API.delete(endpoints["dlthoidong"](hoidongId));
              console.log(res.data);
              Alert.alert("Thông báo", "Xoá thành công");
              navigation.navigate("Hoidong");
              setChangeComp(!changeComp)
            } catch (ex) {
              console.error(ex);
            } finally {
              setLoading(false);
            }
          },
        },
      ]);
    } catch (ex) {
      console.error(ex);
    }
  };

  const searchHoidong = async () => {
    try {
      let res = await API.get(endpoints["dshoidong"], { params: { q: q } });
      setHoidong(res.data);
    } catch (ex) {
      console.error(ex);
    }
  };

  useEffect(() => {
    const loadHoidong = async () => {
      try {
        let res = await API.get(endpoints["dshoidong"]);

        setHoidong(res.data);
      } catch (ex) {
        console.error(ex);
      }
    };
    loadHoidong();
  }, [glob, globalState, changeComp]);
  useEffect(() => {
    searchHoidong();
  }, [q]);
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      style={{ flex: 1, resizeMode: "contain" }}
    >
      <ScrollView ref={scrollViewRef} style={patterns.pattern}>
        <View style={patterns.centeredContainer}>
          <Text style={patterns.centerText}>DANH SÁCH HỘI ĐỒNG</Text>
        </View>
        <View style={patterns.centeredContainer3}>
        <TextInput
          value={q}
          onChangeText={(txt) => setQ(txt)}
          style={patterns.searchInput}
          placeholder="Nhập tên hội đồng để tìm kiếm..."
        />
        </View>
        <TouchableOpacity
          onPress={() => newHoidong()}
          style={{marginLeft: "55%", marginBottom: 20, padding: 20 }}
        >
          {showInput === -1 ? (
            <>
              <Text style={UserStyles.btnLogin}>Thêm hội đồng</Text>
            </>
          ) : (
            <>
              <Text
                style={[
                  UserStyles.btnLogin,
                  { backgroundColor: "rgba(255, 0, 0, 0.5)" },
                ]}
              >
                Ẩn bớt
              </Text>
            </>
          )}
        </TouchableOpacity>
        {showInput === 1 ? (
          <>
            <TextInput
              value={nameHoidong.ten}
              onChangeText={(t) => change("ten", t)}
              style={[UserStyles.input, { marginTop: "1%", marginLeft: "4%" }]}
              placeholder="Nhập tên hội đồng..."
            />

            {loading === true ? (
              <ActivityIndicator />
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => addNewHoidong()}
                  style={{ marginLeft: "40%", marginBottom: 20, padding: 20 }}
                >
                  <Text style={UserStyles.btnLogin}>
                    Xác nhận thêm hội đồng
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </>
        ) : (
          <></>
        )}

<TouchableOpacity style={{width: "15%", marginLeft: "81%"}} onPress={() => toGoDown()}>
                      <Icon
                        name="arrow-down"
                        size={28}
                        color="rgba(255,255,255,0.85)"
                        style={{
                          padding: 14,
                          marginLeft: 5,
                          marginBottom: 8,
                          backgroundColor: "green",
                        }}
                      />
                    </TouchableOpacity>

        <View contentContainerStyle={patterns.leftAlignedContainer}>
          {hoidong === null ? (
            <ActivityIndicator />
          ) : (
            <>
              {hoidong.map((h) => (
                <View
                  key={h.id}
                  style={[
                    patterns.list,
                    {
                      width: "100%",
                      backgroundColor:
                        h.trangthai === true
                          ? "rgba(0,250,154,0.5)"
                          : "rgba(47,79,79,0.5)",
                    },
                  ]}
                >
                  <Text
                    style={{ padding: 2, marginLeft: "67%", color: "white" }}
                  >
                    Thêm thành viên
                  </Text>
                  <TouchableOpacity
                    style={{ width: "12%", marginLeft: "90%" }}
                    onPress={() => loadToAdd(h.id)}
                  >
                    <Icon
                      name="plus"
                      size={20}
                      color="rgba(255,255,255,0.85)"
                      style={{
                        padding: 10,
                        marginLeft: 5,
                        marginBottom: 8,
                        backgroundColor: "#0055A8",
                      }}
                    />
                  </TouchableOpacity>

                  <Text
                    style={{ padding: 2, marginLeft: "67%", color: "white" }}
                  >
                    Xoá hội đồng
                  </Text>
                  <TouchableOpacity
                    onPress={() => pressToDelete(h.id)}
                    style={{ width: "12%", marginLeft: "90%" }}
                  >
                    {loading === true ? (
                      <ActivityIndicator />
                    ) : (
                      <>
                        <Icon
                          name="trash"
                          size={20}
                          color="rgba(255,255,255,0.85)"
                          style={{
                            padding: 10,
                            marginLeft: 5,
                            marginBottom: 8,
                            backgroundColor: "red",
                          }}
                        />
                      </>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => loadToDetail(h.id)}>
                    <Text
                      style={{
                        textAlign: "center",
                        marginBottom: 30,
                        backgroundColor: "#00A855",
                        padding: 20,
                        color: "white",
                      }}
                    >
                      {h.ten}
                    </Text>
                  </TouchableOpacity>
                  {h.trangthai === true ? (
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                      {h.thanhviens.map((thanhvien, index) => (
                        <Text style={[HoidongStyles.vaitro]} key={index}>
                          {thanhvien.vaitro}
                        </Text>
                      ))}
                    </View>
                  ) : (
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                      {h.thanhviens.map((thanhvien, index) => (
                        <Text style={[HoidongStyles.vaitro]} key={index}>
                          {thanhvien.vaitro}
                        </Text>
                      ))}
                      <Text style={{ width: "100%", textAlign: "center" }}>
                        <Icon name="exclamation-circle" size={20} color="red" />
                        <Text
                          style={{
                            color: "red",
                            fontWeight: "bold",
                            fontSize: 15,
                          }}
                        >
                          {" "}
                          Chưa đủ số lượng thành viên
                        </Text>
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </>
          )}
        </View>
        <TouchableOpacity style={{width: "15%",marginLeft: "81%", marginTop: "1%"}} onPress={() => toGoTop()}>
                      <Icon
                        name="arrow-up"
                        size={28}
                        color="rgba(255,255,255,0.85)"
                        style={{
                          padding: 14,
                          marginLeft: 5,
                          marginBottom: 8,
                          backgroundColor: "green",
                        }}
                      />
                    </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};
//

//
export default Hoidong;
