import React, { useContext, useEffect } from "react";
import API, { authApi, endpoints } from "../../configs/API";
import { ActivityIndicator, Alert, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
//
import { HoidongContext } from "./HoidongProvider";
//
import { useState } from "react";
import { TextInput } from "react-native";
import UserStyles from "../User/UserStyles";
import { RadioButton } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
const AddHoidong = ({route, navigation}, props)  =>{

    //
    const loadBack = () => {
      navigation.navigate("Hoidong")
    }
    const { glob,setGlob } = useContext(HoidongContext);
    //
    const [loading, setLoading] = useState(false);
    const {hoidongId} = route.params;
    const [user, setUser] = useState({
        "thanhvien_id": 0,
        "vaitro": "THANH VIEN KHAC",
        "hoidong_id": parseInt(hoidongId)
      })
      //Temp

      //
      const register = async () =>{
        {
          setLoading(true)
        
              try{
        
            
            let accessToken = await AsyncStorage.getItem("access-token")
            let res = await authApi(accessToken).post(endpoints['addhoidong'](hoidongId), user, {
                headers:{
                'Content-Type': 'application/json'
            },})
            //Temp
            setGlob(res.data)
            //
            console.info(res.data)
            Alert.alert("Thông báo","Đăng kí thành công!!!")
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
        }
      //



      const change = (field, value) => {
          setUser(user => {
            return { ...user, [field]: value };

        })
      }

    return (
      <>
      <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      style={{ flex: 1, resizeMode: "contain"}}>  

<View style={{flexDirection: 'row',
alignItems: 'center'}} >
      <Icon onPress={()=>loadBack()} name="arrow-left" size={30} color="rgba(255,255,255,0.85)" style={{padding:14,marginLeft: 5, marginBottom: 8, backgroundColor: 'green'}} />
      <Text style={{padding: 10,}}>Trở về trang hội đồng</Text>
</View>

        <View style={{flex: 1, alignItems: "center", marginTop: "5%"}}>
          <View style={{ width: "85%", padding: 10,alignItems: 'center', justifyContent: "flex-start", backgroundColor: "white"}}>
          <Text style={UserStyles.endTextSelected}>Chọn chức vụ</Text>
          <RadioButton.Group  onValueChange={t=>{change("vaitro", t)}} value={user.vaitro}>
            <RadioButton.Item label="CHỦ TỊCH" value="CHU TICH" />
            <RadioButton.Item label="THƯ KÝ" value="THU KY" />
            <RadioButton.Item label="PHẢN BIỆN" value="PHAN BIEN" />
            <RadioButton.Item label="THÀNH VIÊN KHÁC" value="THANH VIEN KHAC" />
          </RadioButton.Group>    
          </View> 
          <TextInput
            
            onChangeText={t=>change("thanhvien_id", t)}
            style={[UserStyles.input,{marginTop: "2%"}]}
            placeholder="Nhập mã số thành viên..."
          />
          {loading === true ? (
          <ActivityIndicator />
        ) : (
          <>
            <TouchableOpacity onPress={register} style={{marginTop: 20,marginBottom: "10%" }}>
              <Text style={UserStyles.btnLogin}>Thêm thành viên</Text>
            </TouchableOpacity>
          </>
        )}
        </View>
        
        </ImageBackground>
      </>
)
}


export default AddHoidong;

