import { ActivityIndicator, Alert, ImageBackground, PermissionsAndroid, Text, TouchableOpacity, View } from "react-native";
import MyStyles, { patterns } from "../../styles/MyStyles";
import { TextInput } from "react-native";
import UserStyles from "./UserStyles";
import { useContext, useEffect, useState } from "react";
import MyContext from "./MyContext";
import API, { authApi, endpoints } from "../../configs/API";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker'
import { Image } from "react-native";
import { findLastKey } from "lodash";
import axios from "axios";
import { ScrollView } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { RadioButton } from "react-native-paper";

const form = new FormData();
const Register = ({ navigation }) => {
  //Validate Email
  //
  const validateEmail = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  //Validate password
  //
  const checkPasswordMatch = () => {
    return user.password === user.confirmPassword;
  };

  //
  

  //
  const [img, setImg] = useState("")
  const [user, setUser] = useState({
    "last_name": "",
    "first_name": "",
    "username": "",
    "password": "",
    "confirm":"",
    "email": "",
    "chucvu": "GIANGVIEN",
    "avt": null
  })

  
    const register = async () =>{
{
  setLoading(true)
    for(let key in user)
    { 
      
        if(key!=='avt' && key!=='confirm')
        {
            form.append(key, user[key]);
        }
    }
    
    if(user.confirm!==user.password)
    {
      Alert.alert("Cảnh báo","Mật khẩu không khớp")
      setLoading(false)
    }
    if(user.confirm===user.password)
    {
      try{

    
    
        let res = await API.post(endpoints['register'], form, {
            headers:{
            'Content-Type': 'multipart/form-data'
        },})

    
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

    }
    
    //
  }
}

  
  const change = (field, value) => {

    setUser(user=>{
        return {...user, [field]:value}
    })
  }
  

  const [loading, setLoading] = useState(false);


  const picker = async() =>{
    setLoading(true)
    let {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status!=='granted')
    {
        Alert.alert("Permission Denied")
    }
    else
    {
        let res = await ImagePicker.launchImageLibraryAsync()
        if(!res.canceled)
        {
          setImg(res.assets[0].fileName)
            form.append('avt',{
                uri:res.assets[0].uri,
                type:res.assets[0].mimeType,
                name:res.assets[0].fileName,
                
                })
            
            change("avt", res.assets[0])
        }

    }

    setLoading(false)
  }

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      style={{ flex: 1, resizeMode: "contain" }}
    >
      <ScrollView>
      <View style={{ marginTop: "10%", flex: 1, alignItems: "center" }}>
        <Text style={[patterns.centerText, { margin: "2%" }]}>
          ĐĂNG KÍ NGƯỜI DÙNG
        </Text>
        {user.avt?<Image resizeMode="cover" style={UserStyles.avt} source={{uri: user.avt.uri}}/>:<></>}
        {img!==""?<Text style={UserStyles.imgName}>{img}</Text>:<></>}
        {loading===true?<ActivityIndicator/>:<>
        <TouchableOpacity onPress={picker} style={UserStyles.input}>
            <Text>Chọn ảnh đại diện...</Text>
        </TouchableOpacity>
        </>}
        

        <TextInput
          onChangeText={t=>change("last_name", t)}
          value={user.last_name}
          style={UserStyles.input}
          placeholder="Nhập last_name..."
        />
        <TextInput
        onChangeText={t=>change("first_name", t)}
          value={user.first_name}
          style={UserStyles.input}
          placeholder="Nhập first_name..."
        />
        <TextInput
          onChangeText={t=>change("username", t)}
          value={user.username}
          style={UserStyles.input}
          placeholder="Nhập username..."
        />
        <TextInput
          onChangeText={t=>change("password", t)}
          value={user.password}
          style={UserStyles.input}
          placeholder="Nhập password..."
        />
        <TextInput
          onChangeText={t=>change("confirm", t)}
          style={UserStyles.input}
          placeholder="Nhập lại password..."
        />
        <TextInput
          onChangeText={t=>change("email", t)}
          value={user.email}
          style={UserStyles.input}
          placeholder="Nhập email..."
        />
        {/* <TextInput
            onChangeText={t=>change("chucvu", t)}
          value={user.chucvu}
          style={UserStyles.input}
          placeholder="Nhập chức vụ..."
        /> */}
        <View style={{flex: 1, width: "100%", alignItems: 'center', justifyContent: "flex-start"}}>
        <Text style={UserStyles.endTextSelected}>Chọn vai trò</Text>
        <RadioButton.Group   onValueChange={t=>{change("chucvu", t)}} value={user.chucvu}>
          <RadioButton.Item labelStyle={UserStyles.textColor} label="Giáo vụ" value="GIAOVU" />
          <RadioButton.Item labelStyle={UserStyles.textColor} label="Giảng viên" value="GIANGVIEN" />
          <RadioButton.Item labelStyle={UserStyles.textColor} label="Sinh viên" value="HOCSINH" />
        </RadioButton.Group>    
        </View> 

        {loading === true ? (
          <ActivityIndicator />
        ) : (
          <>
            <TouchableOpacity onPress={register} style={{ marginTop: "1%", marginBottom: 20 }}>
              <Text style={UserStyles.btnLogin}>Đăng kí</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default Register;
