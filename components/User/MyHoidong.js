import { ActivityIndicator, FlatList, Text, View } from "react-native"
import { HoidongContext } from "../HoiDong/HoidongProvider";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../configs/API";
import { patterns } from "../../styles/MyStyles";
import { ImageBackground } from "react-native";
import { GlobalStateContext } from "../HoiDong/DltProvider";

const MyHoidong = () => {
    const { globalState, setGlobalState } = useContext(GlobalStateContext);  
    const { glob,setGlob } = useContext(HoidongContext);
    const [hoidong, setHoidong] = useState(null)

    useEffect(()=>{
        const loadHoidong = async() =>{
            try{
            let accessToken = await AsyncStorage.getItem("access-token")
            let res = await authApi(accessToken).get(endpoints['myhoidong'])
            setHoidong(res.data)
            }
            catch(ex){
                console.error(ex)
            }
        };
        loadHoidong();
    },[glob, globalState])
    return (
        <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      style={{ flex: 1, resizeMode: "contain" }}
    >
        <View style={{ marginTop: "2%", flex: 1, alignItems: "center" }}>
      <Text style={[patterns.centerText, { margin: "2%" }]}>Hội đồng của tôi</Text>
      {hoidong === null ? <ActivityIndicator /> :
        <FlatList
          data={hoidong}
          keyExtractor={(item) => item.hoidong}
          renderItem={({ item }) => (
            <View style={[
              patterns.list_2,
              {
                width: "100%",
                backgroundColor: "rgba(0,250,154,0.5)",
              },
            ]}>
              <Text style={{fontSize: 20, color:'red'}}><Text style={patterns.text_bold}>Hội đồng id: </Text>{item.hoidong}</Text>
              <Text style={{fontSize: 20, color:'red'}}><Text style={patterns.text_bold}>Tên hội đồng: </Text>{item.hoidong_ten}</Text>
              <Text style={{fontSize: 20, color:'red'}}><Text style={patterns.text_bold}>Vai trò: </Text>{item.vaitro}</Text>
            </View>
          )}
        />
      }
    </View>
    </ImageBackground>
    )
}
export default MyHoidong