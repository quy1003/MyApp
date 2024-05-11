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
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import API, { endpoints } from "../../configs/API";
import MyStyles, { patterns } from "../../styles/MyStyles";
import { KLStateContext } from "./KhoaLuanContext";

  
  const Khoaluan = ({ route, navigation }) => {
    const {KLState, setKLState} = useContext(KLStateContext)
    const loadToViewDetail = (khoaluanId) => {
      setKLState(!KLState)
      navigation.navigate("DiemDetail", { khoaluanId: khoaluanId });
    };
    const loadToDetail = (khoaluanId) => {
      navigation.navigate("CreateDiem", { khoaluanId: khoaluanId });
    };
    const [khoaluan, setKhoaluan] = React.useState([])
    //Tmp code
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    //
    let next = null
    
    useEffect(() => {

      const loadKhoaluan = async () => {
        try {
          //Tmp code
          let res = await API.get(`${endpoints["khoaluan"]}?page=${page}`);
          console.info(res.data)

          setKhoaluan((prevData) => [...prevData, ...res.data.results]);
      setLoading(false);
          
        } catch (ex) {
          console.error(ex);
        }
      };
          loadKhoaluan()
    }, [page]);
    //Tmp code
    const handleLoadMore = () => {
      if (!loading) {
        setPage((prevPage) => prevPage + 1);
        setLoading(true);
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
        
        <View style={patterns.centeredContainer}>
          <Text style={patterns.centerText}>DANH SÁCH KHOÁ LUẬN</Text>
        </View>
        <FlatList
          data={khoaluan}
          //tmp code
          onEndReached={next!==null?handleLoadMore:()=>{}}
          onEndReachedThreshold={0.5}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                patterns.list,
                {
                  width: "100%",
                  backgroundColor: "rgba(16, 231, 220,0.5)",
                },
              ]}
              key={item.id}
            >
              
              <TouchableOpacity style={patterns.list_kl}>
                <Text style={{ textAlign: "center", fontWeight: 'bold', color: "whitesmoke", fontSize:18 }}>{item.ten}</Text>
              </TouchableOpacity>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Text
                    style={{ padding: 2, marginLeft: "67%", color: "black" }}
                  >
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

                  <Text
                    style={{ padding: 2, marginLeft: "67%", color: "black" }}
                  >
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

                  </View>
            </View>
          )}
          ListFooterComponent={() =>
            next === null ? <></> : (
              <ActivityIndicator size="large" />
            )
          }
        />
      </ImageBackground>
    );
  };
  //
  
  //
  export default Khoaluan;
  

    

