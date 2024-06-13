import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import Emoji from 'react-native-emoji';
import { patterns } from "../../styles/MyStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import UserStyles from "../User/UserStyles";
import KhoaluanStyle from "./KhoaluanStyle";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import API, { authApi, endpoints } from "../../configs/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KLStateContext } from "./KhoaLuanContext";
import { useContext } from "react";
import { ListStateContext } from "./ListKhoaluanContext";
import { styles } from "./AddKhoaluan";

const UpdateKhoaluan = ({ route, navigation }) => {
  const { khoaluanId } = route.params;
  const [loading, setLoading] = useState(false);
  //Selection box
  const [selectedOption, setSelectedOption] = useState(0);
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    change("khoa", option);
  };
  const [stu, setStu] = useState(null);
  const [stu2, setStu2] = useState(null);
  const [tch, setTch] = useState(null);
  const [tch2, setTch2] = useState(null);

  const [selectedOptionn, setSelectedOptionn] = useState(0);
  const handleOptionChangee = (option) => {
    setSelectedOptionn(option);
    change("hoidong_id", option);
  };
  //register
  const { listState, setListState } = useContext(ListStateContext);
  const register = () => {
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
                console.info(data);
                let accessToken = await AsyncStorage.getItem("access-token");
                let res = await authApi(accessToken).patch(
                  endpoints["updatekhoaluan"](khoaluanId),
                  data,
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                setKLState(!KLState);
                setListState(!listState);
                Alert.alert("Thông báo", "Cập nhật thành công!!!");

                // navigation.navigate("Khoaluan")
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
  };
  //
  //load back
  const loadBack = () => {
    navigation.navigate("Khoaluan");
  };
  //Info this khoaluan
  const { KLState, setKLState } = useContext(KLStateContext);
  const [detail, setDetail] = useState(null);
  const [hoidong, setHoidong] = useState(null);
  useEffect(() => {
    const loadKhoaluan = async () => {
      try {
        let res = await API.get(endpoints["khoaluan_detail"](khoaluanId));
        let rp = await API.get(endpoints["dshoidong"]);
        setHoidong(rp.data);
        setDetail(res.data);

        setData({
          ten: res.data.ten,
          ghichu: res.data.ghichu,
          sinhvien:
            res.data.sinhvien.length === 0
              ? []
              : res.data.sinhvien.length === 1
              ? [res.data.sinhvien[0].id]
              : [res.data.sinhvien[0].id, res.data.sinhvien[1].id],
          gv_huongdan:
            res.data.gv_huongdan.length === 0
              ? []
              : res.data.gv_huongdan.length === 1
              ? [res.data.gv_huongdan[0].id]
              : [res.data.gv_huongdan[0].id, res.data.gv_huongdan[1].id],
        });
      } catch (ex) {
        console.error(ex);
      }
    };

    loadKhoaluan();
  }, [khoaluanId]);
  //Info khoaluan update

  const [data, setData] = useState({
    ten: "",
    ghichu: "",
    khoa: "",
    hoidong: "",
    sinhvien: [],
    gv_huongdan: [],
    link: "",
  });

  //Fetch API khoa
  const [khoa, setKhoa] = useState([]);
  useEffect(() => {
    const loadKhoa = async () => {
      try {
        let res = await API.get(endpoints["khoas"]);
        setKhoa(res.data);
      } catch (ex) {
        console.error(ex);
      }
    };
    loadKhoa();
  }, []);
  //change data
  const change = (field, value) => {
    setData((data) => {
      return { ...data, [field]: value };
    });
  };

  //
  //Fetch API suggests
  useEffect(() => {
    const loadSuggest = async () => {
      try {
        let accessToken = await AsyncStorage.getItem("access-token");
        let res = await authApi(accessToken).get(endpoints["suggests"]);
        setListSuggest(res.data);
        //
        try {
          if (detail && detail.sinhvien && detail.sinhvien.length === 1) {
            const tmp = res.data.find(
              (item) => item.id === detail.sinhvien[0].id
            );
            setStu(tmp);
          }
          if (detail && detail.gv_huongdan && detail.gv_huongdan.length === 1) {
            const tmp = res.data.find(
              (item) => item.id === detail.gv_huongdan[0].id
            );
            setTch(tmp);
          }

          if (detail && detail.sinhvien && detail.sinhvien.length === 2) {
            const tmp = res.data.find(
              (item) => item.id === detail.sinhvien[0].id
            );
            const tmpp = res.data.find(
              (item) => item.id === detail.sinhvien[1].id
            );
            setStu(tmp);
            setStu2(tmpp);
          }
          if (detail && detail.gv_huongdan && detail.gv_huongdan.length === 2) {
            const tmp = res.data.find(
              (item) => item.id === detail.gv_huongdan[0].id
            );
            const tmpp = res.data.find(
              (item) => item.id === detail.gv_huongdan[1].id
            );
            setTch(tmp);
            setTch2(tmpp);
          }
        } catch (e) {
          console.info(e);
          console.error(e);
        }

        //
      } catch (ex) {
        console.error(ex);
      }
    };
    loadSuggest();
  }, [detail, khoaluanId]);
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

  // useEffect(() => {

  // }, []);
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
  // const stu = listSuggest.filter((item)=> item.id.toString() === detail.sinhvien[0].id.toString())

  //
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      style={{ flex: 1, resizeMode: "contain" }}
    >
      {detail === null ? (
        <ActivityIndicator />
      ) : (
        <>
          <ScrollView>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "flex-start" }}
            >
              <Icon
                onPress={() => loadBack()}
                name="arrow-left"
                size={30}
                color="rgba(255,255,255,0.85)"
                style={{
                  marginLeft: 10,
                  marginTop: 10,
                  padding: 14,
                  backgroundColor: "green",
                }}
              />
            </TouchableOpacity>
            <View style={patterns.centeredContainer2}>
              <Text style={patterns.centerText}>
                Chỉnh sửa khoá luận {khoaluanId}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={UserStyles.iconLogin2}>Tên</Text>
              <TextInput
                // value={data.ten}
                onChangeText={(t) => change("ten", t)}
                style={[UserStyles.input, { marginTop: "2%" }]}
                placeholder={detail.ten}
              />

              <Text style={UserStyles.iconLogin2}>Link</Text>
              <TextInput
                value={data.link}
                onChangeText={(t) => change("link", t)}
                style={[UserStyles.input, { marginTop: "2%" }]}
                placeholder={detail.link}
              />
              {/* Sinh viên */}
              {detail.sinhvien.length === 0 ? (
                <>
                  <Text style={UserStyles.iconLogin2}>ID SV 1</Text>
                  {/* Suggestions */}
                  {suggest.length > 0 && (
                    <View style={styles.suggestionContainer}>
                      {suggest.map((item) => (
                        <TouchableOpacity
                          key={item.id}
                          style={styles.suggestionItem}
                          onPress={() => setInputText(item.id)}
                        >
                          <Text
                            style={{ fontStyle: "italic", textAlign: "left" }}
                          >
                            💡 Người dùng: {item.username}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                  {/*  */}
                  <TextInput
                    value={data.sinhvien[0]}
                    style={[UserStyles.input, { marginTop: "2%" }]}
                    placeholder="Thêm ID sinh viên số 1..."
                    onChangeText={(text) => {
                      setData((prevData) => ({
                        ...prevData,
                        sinhvien: [text, prevData.sinhvien[1]], // Cập nhật giá trị đầu tiên của mảng sinhvien
                      }));
                      handleInputChange(text);
                    }}
                  />

                  <Text style={UserStyles.iconLogin2}>ID SV 2</Text>
                  {/* Suggestions 2 */}
                  {suggest2.length > 0 && (
                    <View style={styles.suggestionContainer}>
                      {suggest2.map((item) => (
                        <TouchableOpacity
                          key={item.id}
                          style={styles.suggestionItem}
                          onPress={() => setInputText2(item.id)}
                        >
                          <Text
                            style={{ fontStyle: "italic", textAlign: "left" }}
                          >
                            💡 Người dùng: {item.username}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                  {/*  */}
                  <TextInput
                    value={data.sinhvien[1]}
                    style={[UserStyles.input, { marginTop: "2%" }]}
                    placeholder="Thêm ID sinh viên số 2..."
                    onChangeText={(text) => {
                      setData((prevData) => ({
                        ...prevData,
                        sinhvien: [prevData.sinhvien[0], text], // Cập nhật giá trị thứ hai của mảng sinhvien
                      }));
                      handleInputChange2(text);
                    }}
                  />
                </>
              ) : (
                <></>
              )}
              {detail.sinhvien.length === 1 ? (
                <>
                  <Text style={UserStyles.iconLogin2}>ID SV 1</Text>
                  {/* Suggestions */}
                  {suggest.length === 0 ? (
                    <>
                      <View style={styles.suggestionContainer}>
                        <TouchableOpacity style={styles.suggestionItem}>
                          <Text
                            style={{ fontStyle: "italic", textAlign: "left" }}
                          >
                            💡 Người dùng:{" "}
                            {stu === null ? (
                              <ActivityIndicator />
                            ) : (
                              stu.username
                            )}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (
                    <>
                      <View style={styles.suggestionContainer}>
                        {suggest.map((item) => (
                          <TouchableOpacity
                            key={item.id}
                            style={styles.suggestionItem}
                            onPress={() => setInputText(item.id)}
                          >
                            <Text
                              style={{ fontStyle: "italic", textAlign: "left" }}
                            >
                              💡 Người dùng: {item.username}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </>
                  )}

                  {/*  */}
                  <TextInput
                    value={data.sinhvien[0]}
                    style={[UserStyles.input, { marginTop: "2%" }]}
                    placeholder={detail.sinhvien[0].id.toString()}
                    onChangeText={(text) => {
                      setData((prevData) => ({
                        ...prevData,
                        sinhvien: [text, prevData.sinhvien[1]], // Cập nhật giá trị đầu tiên của mảng sinhvien
                      }));
                      handleInputChange(text);
                    }}
                  />

                  <Text style={UserStyles.iconLogin2}>ID SV 2</Text>
                  {/* Suggestions 2 */}
                  {suggest2.length > 0 && (
                    <View style={styles.suggestionContainer}>
                      {suggest2.map((item) => (
                        <TouchableOpacity
                          key={item.id}
                          style={styles.suggestionItem}
                          onPress={() => setInputText2(item.id)}
                        >
                          <Text
                            style={{ fontStyle: "italic", textAlign: "left" }}
                          >
                            💡 Người dùng: {item.username}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                  {/*  */}
                  <TextInput
                    value={data.sinhvien[1]}
                    style={[UserStyles.input, { marginTop: "2%" }]}
                    placeholder="Thêm ID sinh viên số 2..."
                    onChangeText={(text) => {
                      setData((prevData) => ({
                        ...prevData,
                        sinhvien: [prevData.sinhvien[0], text], // Cập nhật giá trị thứ hai của mảng sinhvien
                      }));
                      handleInputChange2(text);
                    }}
                  />
                </>
              ) : (
                <></>
              )}
              {detail.sinhvien.length === 2 ? (
                <>
                  <Text style={UserStyles.iconLogin2}>ID SV 1</Text>
                  {/* Suggestions */}

                  {suggest.length === 0 ? (
                    <>
                      <View style={styles.suggestionContainer}>
                        <TouchableOpacity style={styles.suggestionItem}>
                          <Text
                            style={{ fontStyle: "italic", textAlign: "left" }}
                          >
                            💡 Người dùng:{" "}
                            {stu === null ? (
                              <ActivityIndicator />
                            ) : (
                              stu.username
                            )}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (
                    <>
                      <View style={styles.suggestionContainer}>
                        {suggest.map((item) => (
                          <TouchableOpacity
                            key={item.id}
                            style={styles.suggestionItem}
                            onPress={() => setInputText(item.id)}
                          >
                            <Text
                              style={{ fontStyle: "italic", textAlign: "left" }}
                            >
                              💡 Người dùng: {item.username}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </>
                  )}

                  {/*  */}
                  <TextInput
                    value={data.sinhvien[0]}
                    style={[UserStyles.input, { marginTop: "2%" }]}
                    placeholder={detail.sinhvien[0].id.toString()}
                    onChangeText={(text) => {
                      setData((prevData) => ({
                        ...prevData,
                        sinhvien: [text, prevData.sinhvien[1]], // Cập nhật giá trị đầu tiên của mảng sinhvien
                      }));
                      handleInputChange(text);
                    }}
                  />

                  <Text style={UserStyles.iconLogin2}>ID SV 2</Text>
                  {/* Suggestions 2 */}

                  {suggest2.length === 0 ? (
                    <>
                      <View style={styles.suggestionContainer}>
                        <TouchableOpacity style={styles.suggestionItem}>
                          <Text
                            style={{ fontStyle: "italic", textAlign: "left" }}
                          >
                            💡 Người dùng:{" "}
                            {stu2 === null ? (
                              <ActivityIndicator />
                            ) : (
                              stu2.username
                            )}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (
                    <>
                      <View style={styles.suggestionContainer}>
                        {suggest2.map((item) => (
                          <TouchableOpacity
                            key={item.id}
                            style={styles.suggestionItem}
                            onPress={() => setInputText2(item.id)}
                          >
                            <Text
                              style={{ fontStyle: "italic", textAlign: "left" }}
                            >
                              💡 Người dùng: {item.username}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </>
                  )}

                  {/*  */}
                  <TextInput
                    value={data.sinhvien[1]}
                    style={[UserStyles.input, { marginTop: "2%" }]}
                    placeholder={detail.sinhvien[1].id.toString()}
                    onChangeText={(text) => {
                      setData((prevData) => ({
                        ...prevData,
                        sinhvien: [prevData.sinhvien[0], text], // Cập nhật giá trị thứ hai của mảng sinhvien
                      }));
                      handleInputChange2(text);
                    }}
                  />
                </>
              ) : (
                <></>
              )}
              {/* Giáo viên hướng dẫn */}
              {detail.gv_huongdan.length === 0 ? (
                <>
                  <Text style={UserStyles.iconLogin2}>ID GVHD 1</Text>
                  {/* Suggestions 3 */}
                  {suggest3.length === 0 ? (
                    <></>
                  ) : (
                    <>
                      <View style={styles.suggestionContainer}>
                        {suggest3.map((item) => (
                          <TouchableOpacity
                            key={item.id}
                            style={styles.suggestionItem}
                            onPress={() => setInputText3(item.id)}
                          >
                            <Text
                              style={{ fontStyle: "italic", textAlign: "left" }}
                            >
                              💡 Người dùng: {item.username}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </>
                  )}

                  {/*  */}
                  <TextInput
                    value={data.gv_huongdan[0]}
                    style={[UserStyles.input, { marginTop: "2%" }]}
                    placeholder="Thêm ID GVHD số 1..."
                    onChangeText={(text) => {
                      setData((prevData) => ({
                        ...prevData,
                        gv_huongdan: [text, prevData.gv_huongdan[1]], // Cập nhật giá trị đầu tiên của mảng gvhd
                      }));
                      handleInputChange3(text);
                    }}
                  />
                  <Text style={UserStyles.iconLogin2}>ID GVHD 2</Text>
                  {/* Suggestions 4 */}
                  {suggest4.length > 0 && (
                    <View style={styles.suggestionContainer}>
                      {suggest4.map((item) => (
                        <TouchableOpacity
                          key={item.id}
                          style={styles.suggestionItem}
                          onPress={() => setInputText4(item.id)}
                        >
                          <Text
                            style={{ fontStyle: "italic", textAlign: "left" }}
                          >
                            💡 Người dùng: {item.username}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                  {/*  */}
                  <TextInput
                    value={data.gv_huongdan[1]}
                    style={[UserStyles.input, { marginTop: "2%" }]}
                    placeholder="Thêm ID GVHD số 2..."
                    onChangeText={(text) => {
                      setData((prevData) => ({
                        ...prevData,
                        gv_huongdan: [prevData.gv_huongdan[0], text], // Cập nhật giá trị thứ hai của mảng gvhd
                      }));
                      handleInputChange4(text);
                    }}
                  />
                </>
              ) : (
                <></>
              )}
              {detail.gv_huongdan.length === 1 ? (
                <>
                  <Text style={UserStyles.iconLogin2}>ID GVHD 1</Text>
                  {/* Suggestions 3 */}
                  {suggest3.length === 0 ? (
                    <>
                      <View style={styles.suggestionContainer}>
                        <TouchableOpacity style={styles.suggestionItem}>
                          <Text
                            style={{ fontStyle: "italic", textAlign: "left" }}
                          >
                            💡 Người dùng:{" "}
                            {tch === null ? (
                              <ActivityIndicator />
                            ) : (
                              tch.username
                            )}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (
                    <>
                      <View style={styles.suggestionContainer}>
                        {suggest3.map((item) => (
                          <TouchableOpacity
                            key={item.id}
                            style={styles.suggestionItem}
                            onPress={() => setInputText3(item.id)}
                          >
                            <Text
                              style={{ fontStyle: "italic", textAlign: "left" }}
                            >
                              💡 Người dùng: {item.username}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </>
                  )}

                  {/*  */}
                  <TextInput
                    value={data.gv_huongdan[0]}
                    style={[UserStyles.input, { marginTop: "2%" }]}
                    placeholder={detail.gv_huongdan[0].id.toString()}
                    onChangeText={(text) => {
                      setData((prevData) => ({
                        ...prevData,
                        gv_huongdan: [text, prevData.gv_huongdan[1]], // Cập nhật giá trị đầu tiên của mảng gvhd
                      }));
                      handleInputChange3(text);
                    }}
                  />
                  <Text style={UserStyles.iconLogin2}>ID GVHD 2</Text>
                  {/* Suggestions 4 */}
                  {suggest4.length > 0 && (
                    <View style={styles.suggestionContainer}>
                      {suggest4.map((item) => (
                        <TouchableOpacity
                          key={item.id}
                          style={styles.suggestionItem}
                          onPress={() => setInputText4(item.id)}
                        >
                          <Text
                            style={{ fontStyle: "italic", textAlign: "left" }}
                          >
                            💡 Người dùng: {item.username}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                  {/*  */}
                  <TextInput
                    value={data.gv_huongdan[1]}
                    style={[UserStyles.input, { marginTop: "2%" }]}
                    placeholder="Thêm ID GVHD số 2..."
                    onChangeText={(text) => {
                      setData((prevData) => ({
                        ...prevData,
                        gv_huongdan: [prevData.gv_huongdan[0], text], // Cập nhật giá trị thứ hai của mảng gvhd
                      }));
                      handleInputChange4(text);
                    }}
                  />
                </>
              ) : (
                <></>
              )}
              {detail.gv_huongdan.length === 2 ? (
                <>
                  <Text style={UserStyles.iconLogin2}>ID GVHD 1</Text>
                  {/* Suggestions 3 */}
                  {suggest3.length === 0 ? (
                    <>
                      <View style={styles.suggestionContainer}>
                        <TouchableOpacity style={styles.suggestionItem}>
                          <Text
                            style={{ fontStyle: "italic", textAlign: "left" }}
                          >
                            💡 Người dùng:{" "}
                            {tch === null ? (
                              <ActivityIndicator />
                            ) : (
                              tch.username
                            )}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (
                    <>
                      <View style={styles.suggestionContainer}>
                        {suggest3.map((item) => (
                          <TouchableOpacity
                            key={item.id}
                            style={styles.suggestionItem}
                            onPress={() => setInputText3(item.id)}
                          >
                            <Text
                              style={{ fontStyle: "italic", textAlign: "left" }}
                            >
                              💡 Người dùng: {item.username}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </>
                  )}

                  {/*  */}
                  <TextInput
                    value={data.gv_huongdan[0]}
                    style={[UserStyles.input, { marginTop: "2%" }]}
                    placeholder={detail.gv_huongdan[0].id.toString()}
                    onChangeText={(text) => {
                      setData((prevData) => ({
                        ...prevData,
                        gv_huongdan: [text, prevData.gv_huongdan[1]], // Cập nhật giá trị đầu tiên của mảng gvhd
                      }));
                      handleInputChange3(text);
                    }}
                  />
                  <Text style={UserStyles.iconLogin2}>ID GVHD 2</Text>
                  {/* Suggestions 4 */}
                  {suggest4.length === 0 ? (
                    <>
                      <View style={styles.suggestionContainer}>
                        <TouchableOpacity style={styles.suggestionItem}>
                          <Text
                            style={{ fontStyle: "italic", textAlign: "left" }}
                          >
                            💡 Người dùng:{" "}
                            {tch2 === null ? (
                              <ActivityIndicator />
                            ) : (
                              tch2.username
                            )}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (
                    <>
                      <View style={styles.suggestionContainer}>
                        {suggest4.map((item) => (
                          <TouchableOpacity
                            key={item.id}
                            style={styles.suggestionItem}
                            onPress={() => setInputText4(item.id)}
                          >
                            <Text
                              style={{ fontStyle: "italic", textAlign: "left" }}
                            >
                              💡 Người dùng: {item.username}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </>
                  )}

                  {/*  */}
                  <TextInput
                    value={data.gv_huongdan[1]}
                    style={[UserStyles.input, { marginTop: "2%" }]}
                    placeholder={detail.gv_huongdan[1].id.toString()}
                    onChangeText={(text) => {
                      setData((prevData) => ({
                        ...prevData,
                        gv_huongdan: [prevData.gv_huongdan[0], text], // Cập nhật giá trị thứ hai của mảng gvhd
                      }));
                      handleInputChange4(text);
                    }}
                  />
                </>
              ) : (
                <></>
              )}

              <Text style={UserStyles.iconLogin2}>Ghi chú</Text>
              <TextInput
                value={data.ghichu}
                onChangeText={(t) => change("ghichu", t)}
                style={[UserStyles.input, { marginTop: "2%" }]}
                placeholder={detail.ghichu}
              />
              <View style={KhoaluanStyle.borderPicker}>
                <Text style={{ color: "yellow" }}>Chọn khoa</Text>
                <Picker
                  selectedValue={selectedOption}
                  onValueChange={handleOptionChange}
                  style={{ color: "orange", fontWeight: "bold", height: 40 }}
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
                  style={{ marginTop: 20, marginBottom: "10%" }}
                >
                  <Text style={UserStyles.btnLogin}>Chỉnh sửa</Text>
                </TouchableOpacity>
              </>
            )}
            {/*  */}
          </ScrollView>
        </>
      )}
    </ImageBackground>
  );
};

export default UpdateKhoaluan;
