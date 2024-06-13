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
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import API, { authApi, endpoints } from "../../configs/API";
import MyStyles, { patterns } from "../../styles/MyStyles";
import { KLStateContext } from "./KhoaLuanContext";
import MyContext from "../User/MyContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { iteratee } from "lodash";
import UserStyles from "../User/UserStyles";
import { ListStateContext } from "./ListKhoaluanContext";
const Khoaluan = ({ route, navigation }) => {
  const { KLState, setKLState } = useContext(KLStateContext);
  const { listState, setListState } = useContext(ListStateContext);
  const [choose, setChoose] = useState(0);
//Searching
const searchKhoaluan = async () => {
  try {
    let res = await API.get(endpoints["khoaluan"], { params: { q: q } });
    setKhoaluan(res.data.results);
  } catch (ex) {
    console.error(ex);
  }
};
  const [q, setQ] = React.useState("");
  useEffect(() => {
    searchKhoaluan();
  }, [q]);

  const [isUpdate, setIsUpdate] = useState(false);
  const [linking, setLinking] = useState({
    link: "",
  });

  const loadToUpdate = (khoaluanId) => {
    navigation.navigate("UpdateKhoaluan", { khoaluanId: khoaluanId });
  };

  const newKhoaluan = () => {
    navigation.navigate("AddKhoaluan");
  };

  const blockKhoaluan = async (khoaluanId) => {
    const block = {
      trangthai: false,
    };
    try {
      let accessToken = await AsyncStorage.getItem("access-token");
      let res = await authApi(accessToken).patch(
        endpoints["patch_block"](khoaluanId),
        block,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.info(res.data);
      //
      // setIsBlock(!isBlock)
      khoaluan.forEach((item, index) => {
        if (item.id === khoaluanId) {
          khoaluan[index] = {
            ...item,
            trangthai: false,
          };
        }
      });
      setKhoaluan([...khoaluan]);
      //
      setKLState(!KLState);
    } catch (ex) {
      console.error(ex);
    }
  };
  ///
  const unblockKhoaluan = async (khoaluanId) => {
    const block = {
      trangthai: true,
    };
    try {
      let accessToken = await AsyncStorage.getItem("access-token");
      let res = await authApi(accessToken).patch(
        endpoints["patch_block"](khoaluanId),
        block,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.info(res.data);
      //
      khoaluan.forEach((item, index) => {
        if (item.id === khoaluanId) {
          khoaluan[index] = {
            ...item,
            trangthai: true,
          };
        }
      });
      //
      setKhoaluan([...khoaluan]);
      //
      setKLState(!KLState);
    } catch (ex) {
      console.error(ex);
    }
  };

  ///
  const [isBlock, setIsBlock] = useState(false);
  const [user, dispatch] = useContext(MyContext);
  const loadToInfo = (khoaluanId) => {
    navigation.navigate("KhoaluanDetail", { khoaluanId: khoaluanId });
  };

  const loadToViewDetail = (khoaluanId) => {
    // setKLState(!KLState)
    navigation.navigate("DiemDetail", { khoaluanId: khoaluanId });
  };
  const loadToDetail = (khoaluanId) => {
    navigation.navigate("CreateDiem", { khoaluanId: khoaluanId });

  };
  const [khoaluan, setKhoaluan] = React.useState([]);
  //Tmp code
  const [page, setPage] = useState(1);

  //
  const [count, setCount] = useState(0);
  useEffect(() => {

    const loadKhoaluan = async () => {
      try {
        //Tmp code
        let res = await API.get(`${endpoints["khoaluan"]}?page=${page}`);
        setCount(res.data.count);
        setKhoaluan(res.data.results);
      } catch (ex) {
        console.error(ex);
      }
    };
    loadKhoaluan();
    setIsLoading(false)
  }, [page, listState]);
  //tmp
  //

  //Tmp code
  const handleLoadMore = () => {
    setPage((page) => page + 1);
  };
  
  //
  const [isLoading, setIsLoading] = useState(false);

  //
  
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      style={{ flex: 1, resizeMode: "contain" }}
    >
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={70} color="whitesmoke" />
        </View>
      )}
      <View style={patterns.centeredContainer}>
        <Text style={patterns.centerText}>DANH SÁCH KHOÁ LUẬN</Text>
      </View>
      <View style={patterns.centeredContainer3}>
        <TextInput
          value={q}
          onChangeText={(txt) => setQ(txt)}
          style={patterns.searchInput}
          placeholder="Nhập tên khoá luận để tìm kiếm..."
        />
        </View>
      {/*  */}

      <TouchableOpacity
        onPress={() => newKhoaluan()}
        style={{ marginLeft: "55%", marginBottom: 20, padding: 10 }}
      >
        <>
          <Text style={UserStyles.btnLogin}>Thêm Khoá Luận</Text>
        </>
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ marginTop: 2 }}
          disabled={page === 1 ? true : false}
          onPress={() => {
            if (page >= 2) {
              setIsLoading(true)
              setPage(page - 1);
            }
          }}
        >

            <Icon
            name="arrow-left"
            size={30}
            color="rgba(255,255,255,0.85)"
            style={{
              padding: 14,
              marginLeft: 5,
              marginBottom: 8,
              backgroundColor: page === 1 ? "rgba(0, 0, 255,0.5)" : "blue",
            }}
          />
          
        </TouchableOpacity>
        {/*  */}
        {count === 0 ? (
          <ActivityIndicator />
        ) : (
          <>
            <TouchableOpacity
              
              style={{ marginTop: 2, width: '46%',marginLeft: "37%" }}
              onPress={() => {
                if (count % 5 !== 0) {
                  let countPage = count / 5;
                  if (page <= countPage) {
                    setIsLoading(true)
                    setPage(page + 1);
                  }
                } else {
                  let countPage = count / 5;
                  if (page < countPage) {
                    setIsLoading(true)
                    setPage(page + 1);
                  }
                }
              }}
            >
              <Icon
                name="arrow-right"
                size={30}
                color="rgba(255,255,255,0.85)"
                style={{
                  padding: 14,
                  marginLeft: "69%",
                  marginBottom: 8,
                  backgroundColor: (count % 5 === 0 && page === parseInt(count / 5)) || (count % 5 !== 0 && page === parseInt(count / 5) + 1) ?
                  "rgba(0, 0, 255,0.5)" : 'blue'
                }}
              />
            </TouchableOpacity>
          </>
        )}
        {/*  */}
      </View>
      {/*  */}

      <FlatList
        data={khoaluan}
        //tmp code
        keyExtractor={() => Math.random()}
        renderItem={({ item }) => (
          <>
            <View
              style={[
                patterns.list,
                {
                  width: "100%",
                  // backgroundColor: "rgba(16, 231, 220,0.5)",
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => loadToInfo(item.id)}
                style={patterns.list_kl}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "whitesmoke",
                    fontSize: 18,
                  }}
                >
                  {item.ten}
                </Text>
              </TouchableOpacity>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text style={{ padding: 2, marginLeft: "67%", color: "black" }}>
                  Cho điểm
                </Text>
                <TouchableOpacity
                  style={{ width: "12%", marginLeft: "90%" }}
                  onPress={() => loadToDetail(item.id)}
                  
                >
                  <Icon
                    name="plus"
                    size={20}
                    color="rgba(255,255,255,0.85)"
                    style={{
                      padding: 10,
                      marginLeft: 5,
                      marginBottom: 8,
                      backgroundColor: "#F79E02",
                    }}
                  />
                </TouchableOpacity>

                <Text style={{ padding: 2, marginLeft: "67%", color: "black" }}>
                  Xem điểm
                </Text>
                <TouchableOpacity
                  style={{ width: "12%", marginLeft: "90%" }}
                  onPress={() => loadToViewDetail(item.id)}
                >
                  <Icon
                    name="eye"
                    size={16}
                    color="rgba(255,255,255,0.85)"
                    style={{
                      padding: 10,

                      marginLeft: 5,
                      marginBottom: 8,
                      backgroundColor: "#0055A8",
                    }}
                  />
                </TouchableOpacity>
                {/*  */}
                {user.chucvu === "GIAOVU" || user.chucvu === "ADMIN" ? (
                  <>
                    {item.trangthai === true ? (
                      <View>
                        <Text
                          style={{
                            padding: 2,
                            marginLeft: "67%",
                            color: "black",
                          }}
                        >
                        Khoá cập nhật
                        </Text>
                        <TouchableOpacity
                          style={{ width: "12%", marginLeft: "90%" }}
                          onPress={() => blockKhoaluan(item.id)}
                        >
                          <Icon
                            name="lock"
                            size={20}
                            color="rgba(255,255,255,0.85)"
                            style={{
                              padding: 10,
                              marginLeft: 5,
                              marginBottom: 8,
                              backgroundColor: "gray",
                            }}
                          />
                        </TouchableOpacity>
                        {/*  */}
                        
                        {/*  */}
                        {/*  */}
                        <Text
                          style={{
                            padding: 2,
                            marginLeft: "78%",
                            color: "black",
                          }}
                        >
                          Chỉnh sửa
                        </Text>
                        <TouchableOpacity
                          style={{ width: "12%", marginLeft: "91%" }}
                          onPress={() => loadToUpdate(item.id)}
                        >
                          <Icon
                            name="pencil-square-o"
                            size={20}
                            color="black"
                            style={{
                              padding: 7,

                              marginBottom: 8,
                              backgroundColor: "white",
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View>
                        <Text
                          style={{
                            padding: 2,
                            marginLeft: "75%",
                            color: "black",
                          }}
                        >
                          Mở cập nhật
                        </Text>
                        <TouchableOpacity
                          style={{ width: "12%", marginLeft: "90%" }}
                          onPress={() => unblockKhoaluan(item.id)}
                        >
                          <Icon
                            name="unlock-alt"
                            size={20}
                            color="rgba(255,255,255,0.85)"
                            style={{
                              padding: 10,
                              marginLeft: 5,
                              marginBottom: 8,
                              backgroundColor: "green",
                            }}
                          />
                        </TouchableOpacity>
                        {/*  */}
                        
                        {/*  */}
                        {/*  */}
                        <Text
                          style={{
                            padding: 2,
                            marginLeft: "78%",
                            color: "black",
                          }}
                        >
                          Chỉnh sửa
                        </Text>
                        <TouchableOpacity
                          style={{ width: "12%", marginLeft: "91%" }}
                          onPress={() => loadToUpdate(item.id)}
                        >
                          <Icon
                            name="pencil-square-o"
                            size={20}
                            color="black"
                            style={{
                              padding: 7,

                              marginBottom: 8,
                              backgroundColor: "white",
                            }}
                          />
                        </TouchableOpacity>

                        {/*  */}
                      </View>
                    )}
                  </>
                ) : (
                  <></>
                )}

                {/*  */}
              </View>
            </View>
          </>
        )}
      />
      {/* display: page <= parseInt(count/5) ? 'flex' : 'none' */}
    </ImageBackground>
  );
};
//

//
export default Khoaluan;
const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
});