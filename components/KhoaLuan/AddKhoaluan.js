import { Picker } from "@react-native-picker/picker";
import { useContext, useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import KhoaluanStyle from "./KhoaluanStyle";
import UserStyles from "../User/UserStyles";
import { Checkbox } from "react-native-paper";
import { TextInput } from "react-native";
import { ScrollView } from "react-native";
import API, { authApi, endpoints } from "../../configs/API";
import { ActivityIndicator } from "react-native";
import { ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { patterns } from "../../styles/MyStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KLStateContext } from "./KhoaLuanContext";
import { ListStateContext } from "./ListKhoaluanContext";
import { isNumber } from "lodash";

// import { parseInt } from "lodash";
const AddKhoaluan = ({ route, navigation }) => {
  //const comp
  const { KLState, setKLState } = useContext(KLStateContext);
  const { listState, setListState } = useContext(ListStateContext);
  const [loading, setLoading] = useState(false);
  const register = async () => {
    {
      try {
        Alert.alert("Xác nhận", "Bạn có chắc không?", [
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
              setLoading(true);
              try {
                if (data.sinhvien[0] === undefined) {
                  data.sinhvien.splice(0, 1);
                }
                if (data.sinhvien[1] === undefined) {
                  data.sinhvien.splice(1, 1);
                }
                if (data.gv_huongdan[0] === undefined) {
                  data.gv_huongdan.splice(0, 1);
                }
                if (data.gv_huongdan[1] === undefined) {
                  data.gv_huongdan.splice(1, 1);
                }

                console.info(data);
                let accessToken = await AsyncStorage.getItem("access-token");
                let res = await authApi(accessToken).post(
                  endpoints["addkhoaluan"],
                  data,
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );

                setListState(!listState);
                Alert.alert("Thông báo", "Tạo mới thành công!!!");
                setData({
                  ten: "",
                  ghichu: "",
                  khoa: 0,
                  hoidong_id: 0,
                  sinhvien: [],
                  gv_huongdan: [],
                });
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
    }
    //dlt
    //
  };
  const loadBack = () => {
    navigation.navigate("Khoaluan");
  };
  const [data, setData] = useState({
    ten: "",
    ghichu: "",
    khoa: 0,
    hoidong_id: 0,
    sinhvien: [],
    gv_huongdan: [],
  });
  const change = (field, value) => {
    setData((data) => {
      return { ...data, [field]: value };
    });
  };
  //
  //SelectBox
  const [selectedOption, setSelectedOption] = useState(0);
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    change("khoa", option);
  };

  const [selectedOptionn, setSelectedOptionn] = useState(0);
  const handleOptionChangee = (option) => {
    setSelectedOptionn(option);
    change("hoidong_id", option);
  };
  //
  //CheckBox
  const [checkedItems, setCheckedItems] = useState([]);
  const handleToggleCheckbox = (item) => {
    const isChecked = checkedItems.includes(item);

    if (isChecked) {
      setCheckedItems(
        checkedItems.filter((checkedItem) => checkedItem !== item)
      );
    } else {
      setCheckedItems([...checkedItems, item]);
    }
  };
  //
  //Fetch API khoa
  const [khoa, setKhoa] = useState([]);
  const [hoidong, setHoidong] = useState([]);
  useEffect(() => {
    const loadKhoa = async () => {
      try {
        let res = await API.get(endpoints["khoas"]);
        let rp = await API.get(endpoints["dshoidong"]);
        setKhoa(res.data);
        setHoidong(rp.data);
      } catch (ex) {
        console.error(ex);
      }
    };
    loadKhoa();
  }, []);
  //Fetch API suggests
  const [listSuggest, setListSuggest] = useState(null);
  const [inputText, setInputText] = useState("");
  const [suggest, setSuggest] = useState([]);

  //
  const [inputText2, setInputText2] = useState("");
  const [suggest2, setSuggest2] = useState([]);

  const [inputText3, setInputText3] = useState("");
  const [suggest3, setSuggest3] = useState([]);

  const [inputText4, setInputText4] = useState("");
  const [suggest4, setSuggest4] = useState([]);
  //
  useEffect(() => {
    const loadSuggest = async () => {
      try {
        let accessToken = await AsyncStorage.getItem("access-token");
        let res = await authApi(accessToken).get(endpoints["suggests"]);
        setListSuggest(res.data);
        console.info(listSuggest);
      } catch (ex) {
        console.error(ex);
      }
    };
    loadSuggest();
  }, []);
  const handleInputChange = (text) => {
    setInputText(text);
    if (text.trim() === "") {
      setSuggest([]);
    } else {
      const filterData = listSuggest.filter(
        (item) => item.id.toString() === text
      );
      setSuggest(filterData);
    }
  };

  const handleInputChange2 = (text) => {
    setInputText2(text);
    if (text.trim() === "") {
      setSuggest2([]);
    } else {
      const filterData = listSuggest.filter(
        (item) => item.id.toString() === text
      );
      setSuggest2(filterData);
    }
  };
  const handleInputChange3 = (text) => {
    setInputText3(text);
    if (text.trim() === "") {
      setSuggest3([]);
    } else {
      const filterData = listSuggest.filter(
        (item) => item.id.toString() === text
      );
      setSuggest3(filterData);
    }
  };
  const handleInputChange4 = (text) => {
    setInputText4(text);
    if (text.trim() === "") {
      setSuggest4([]);
    } else {
      const filterData = listSuggest.filter(
        (item) => item.id.toString() === text
      );
      setSuggest4(filterData);
    }
  };
  //
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      style={{ flex: 1, resizeMode: "contain" }}
    >
      <ScrollView>
        {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} > */}
        <Text style={patterns.centerText}>THÊM KHOÁ LUẬN</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            onPress={() => loadBack()}
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
          <Text style={{ padding: 10 }}>Trở về trang khoá luận</Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TextInput
            value={data.ten}
            onChangeText={(t) => change("ten", t)}
            style={[UserStyles.input, { marginTop: "2%" }]}
            placeholder="Nhập tên khoá luận..."
          />

          <TextInput
            value={data.sinhvien[0]}
            onChangeText={(text) => {
              setData((prevData) => ({
                ...prevData,
                sinhvien: [text, prevData.sinhvien[1]], // Cập nhật giá trị đầu tiên của mảng sinhvien
              }));
              handleInputChange(text);
            }}
            style={[UserStyles.input, { marginTop: "2%" }]}
            placeholder="Nhập ID Sinh viên 1..."
          />
          {/* Suggestions */}
          {suggest.length > 0 && (
            <View style={styles.suggestionContainer}>
              {suggest.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.suggestionItem}
                  onPress={() => setInputText(item.id)}
                >
                  <Text style={{ fontStyle: "italic", textAlign: "center" }}>
                    Người dùng: {item.username}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {/*  */}

          <TextInput
            value={data.sinhvien[1]}
            onChangeText={(text) => {
              setData((prevData) => ({
                ...prevData,
                sinhvien: [prevData.sinhvien[0], text], // Cập nhật giá trị thứ hai của mảng sinhvien
              }));
              handleInputChange2(text);
            }}
            style={[UserStyles.input, { marginTop: "2%" }]}
            placeholder="Nhập ID Sinh viên 2..."
          />
          {/* Suggestions 2 */}
          {suggest2.length > 0 && (
            <View style={styles.suggestionContainer}>
              {suggest2.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.suggestionItem}
                  onPress={() => setInputText2(item.id)}
                >
                  <Text style={{ fontStyle: "italic", textAlign: "center" }}>
                    Người dùng: {item.username}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {/*  */}

          <TextInput
            value={data.gv_huongdan[0]}
            onChangeText={(text) => {
              setData((prevData) => ({
                ...prevData,
                gv_huongdan: [text, prevData.gv_huongdan[1]], // Cập nhật giá trị đầu tiên của mảng gvhd
              }));
              handleInputChange3(text);
            }}
            style={[UserStyles.input, { marginTop: "2%" }]}
            placeholder="Nhập ID Giảng viên hướng dẫn 1..."
          />
          {/* Suggestions 3 */}
          {suggest3.length > 0 && (
            <View style={styles.suggestionContainer}>
              {suggest3.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.suggestionItem}
                  onPress={() => setInputText3(item.id)}
                >
                  <Text style={{ fontStyle: "italic", textAlign: "center" }}>
                    Người dùng: {item.username}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {/*  */}
          <TextInput
            value={data.gv_huongdan[1]}
            onChangeText={(text) => {
              setData((prevData) => ({
                ...prevData,
                gv_huongdan: [prevData.gv_huongdan[0], text], // Cập nhật giá trị thứ hai của mảng gvhd
              }));
              handleInputChange4(text);
            }}
            style={[UserStyles.input, { marginTop: "2%" }]}
            placeholder="Nhập ID Giảng viên hướng dẫn 2..."
          />
          {/* Suggestions 4 */}
          {suggest4.length > 0 && (
            <View style={styles.suggestionContainer}>
              {suggest4.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.suggestionItem}
                  onPress={() => setInputText4(item.id)}
                >
                  <Text style={{ fontStyle: "italic", textAlign: "center" }}>
                    Người dùng: {item.username}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {/*  */}
          <TextInput
            onChangeText={(t) => change("ghichu", t)}
            style={[UserStyles.input, { marginTop: "2%" }]}
            placeholder="Nhập ghi chú..."
          />
          <View style={KhoaluanStyle.borderPicker}>
            <Text style={{ color: "yellow" }}>Chọn khoa</Text>
            <Picker
              selectedValue={selectedOption}
              onValueChange={handleOptionChange}
              style={{ color: "black", fontWeight: "bold" }}
            >
              <Picker.Item
                label="------------------------ Chọn khoa ------------------------"
                value="0"
                enabled={false}
              />
              {khoa.map((k) => (
                <Picker.Item label={k.ten} value={k.id} key={k.id} />
              ))}
            </Picker>
          </View>
          <View style={[KhoaluanStyle.borderPicker, { marginTop: "1%" }]}>
            <Text style={{ color: "yellow" }}>Chọn hội đồng</Text>
            <Picker
              selectedValue={selectedOptionn}
              onValueChange={handleOptionChangee}
              style={{ color: "white", fontWeight: "bold" }}
            >
              <Picker.Item
                label="------------------------ Chọn hội đồng ------------------------"
                value="0"
                enabled={false}
              />
              {hoidong.map((h) => (
                <Picker.Item label={h.ten} value={h.id} key={h.id} />
              ))}
            </Picker>
          </View>
          {/*  */}

          {/*  */}
        </View>
        {/*Submit Button*/}
        {loading === true ? (
          <ActivityIndicator />
        ) : (
          <>
            <TouchableOpacity
              onPress={register}
              style={{ marginTop: 20, marginBottom: "10%"}}
            >
              <Text style={UserStyles.btnLogin}>Thêm khoá luận</Text>
            </TouchableOpacity>
          </>
        )}
        {/*  */}
        {/* </KeyboardAvoidingView> */}
      </ScrollView>
    </ImageBackground>
  );
};

export default AddKhoaluan;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
  },
  suggestionContainer: {
    width: "50%",
    backgroundColor: "lightyellow",
    padding: 5,
    marginRight: "40%",
    marginTop: 10
  },
  suggestionItem: {
    padding: 5,
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
});
