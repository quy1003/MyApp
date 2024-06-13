import { Alert, ImageBackground } from "react-native";
import { Text } from "react-native"
import { View } from "react-native"
import UserStyles from "../User/UserStyles";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { RadioButton } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
import API, { authApi, endpoints } from "../../configs/API";
import { TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native";
import { patterns } from "../../styles/MyStyles";
import { ScrollView } from "react-native";
const CreateDiem = ({route,navigation}) => {
    const { khoaluanId } = route.params;
    const [tieuchi, setTieuchi] = useState(null)
    const [loading, setLoading] = useState(false)
    const [issm, setIssm] = useState(false)
    const [diem, setDiem] = useState({
        "so_diem": 0,
        "nhanxet": "",
        "tieuchi": "HINH THUC",
        
      })
    useEffect(()=>{
      const loadTieuchi = async () => {
        try{
          let res = await API.get(endpoints['nottieuchis'](khoaluanId))
          console.info(res.data)
          setTieuchi(res.data)
        }
        catch(ex)
        {
          console.error(ex)
        }
      }
      loadTieuchi()
    },[khoaluanId, issm])
      const loadBack = () => {
        navigation.navigate("Khoaluan")
      }
    const change = (field, value) => {

            setDiem(diem => {
                return { ...diem, [field]: value };
      
            })      
        
    }
    //
    const submitDiem = async () =>{
        {
         try{
          Alert.alert(
            "Xác nhận",
            "Bạn có chắc không?",
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
                  setLoading(true)
                    try{
                        
            
                        let accessToken = await AsyncStorage.getItem("access-token")
                        let res = await authApi(accessToken).post(endpoints['diem_create'](khoaluanId), diem, {
                            headers:{
                            'Content-Type': 'application/json'
                        },})
                        
                        console.info(res.data)
                        Alert.alert("Thông báo","Nhập điểm thành công!!!")
                        setIssm(!issm)
                        setDiem({
                            "nhanxet": "",
                            "tieuchi": "MO RONG",
                            "so_diem": 0
                          })
                        }
                        catch(ex)
                        {
                            console.error(ex)
                        }
                        finally{
                            setLoading(false)
                        }
                },
              },
            ]
          );
        
         }
         catch(ex)
         {
          console.error(ex)
         }
    
             
        
            
            
            //
          }
        }

    //
    return (
        <ScrollView>
        <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        style={{ flex: 1, resizeMode: "contain" }}
      >
                    <View style={{flex:1,
alignItems: 'flex-start', marginTop: 10}} >
      <Icon onPress={()=>loadBack()} name="arrow-left" size={30} color="rgba(255,255,255,0.85)" style={{padding:14,marginLeft: 5, marginBottom: 8, backgroundColor: 'green'}} />
</View>
        <View style={{flex: 1, alignItems: "center" }}>
            <Text style={[patterns.centerText, { margin: "2%", width: "80%" }]}>Nhập điểm {khoaluanId}</Text>

            <TextInput
            onChangeText={t=>change("so_diem", t)}
            value={diem.so_diem}
            style={UserStyles.input}
            placeholder="Nhập số điểm..."
        />
        <TextInput
            onChangeText={t=>change("nhanxet", t)}
            value={diem.nhanxet}
            style={UserStyles.input}
            placeholder="Nhập nhận xét..."
        />
        <View style={{ width: "85%", padding: 10,alignItems: 'center', justifyContent: "flex-start", backgroundColor: "white"}}>
          <Text style={UserStyles.endTextSelected}>Chọn tiêu chí</Text>
          <RadioButton.Group  onValueChange={t=>{change("tieuchi", t)}} value={diem.tieuchi}>
            {/* <RadioButton.Item label="HÌNH THỨC" value="HINH THUC" />
            <RadioButton.Item label="PHẢN BIỆN" value="PHAN BIEN" />
            <RadioButton.Item label="THỰC HIỆN" value="THUC HIEN" />
            <RadioButton.Item label="ĐỘ KHÓ" value="DO KHO" />
            <RadioButton.Item label="MỞ RỘNG" value="MO RONG" />
            <RadioButton.Item label="ỨNG DỤNG" value="UNG DUNG" /> */}
            {tieuchi === null ? <></> : <>{tieuchi.map((t)=>(
              <RadioButton.Item label={t.ten} value={t.ten} key={t.ten} />
            ))}</>}
          </RadioButton.Group>    
          </View>

          {loading === true ? (
          <ActivityIndicator />
        ) : (
          <>
            <TouchableOpacity onPress={submitDiem} style={{marginTop: 20,marginBottom: "10%" }}>
              <Text style={UserStyles.btnLogin}>Thêm điểm</Text>
            </TouchableOpacity>
          </>
        )} 
        </View>
        </ImageBackground>
        </ScrollView>
    )
}

export default CreateDiem