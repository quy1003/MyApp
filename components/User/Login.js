import { ActivityIndicator, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import MyStyles, { patterns } from "../../styles/MyStyles";
import { TextInput } from "react-native";
import UserStyles from "./UserStyles";
import { useContext, useState } from "react";
import MyContext from "./MyContext";
import API, { authApi, endpoints } from "../../configs/API";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [user, dispatch] = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const login = async () => {
    setLoading(true);
    try {
      let res = await API.post(endpoints["login"], {
        username: username,
        password: password,
        client_id: "l5zZFiY5jLag6rHDU8CxYTptc0tJqFGL7sA3gJHD",
        client_secret:
          "HVRPFtluVOvni0SMiMFbXqEZC70esQKstD7DAdTwzcLB2szN4BaP4kZAakB84DPakmmSpzfDGx3c7qjkGk83M5qpG1CdzDtc921nHJVmRWHu0WI1MQ1x3ZwFJ36wwgyP",
        grant_type: "password",
      });
      await AsyncStorage.setItem('access-token', res.data.access_token)

      let user = await authApi(res.data.access_token).get(
        endpoints["current_user"]
      );
      dispatch({
        type: "login",
        payload: user.data,
      });

      navigation.navigate("Trangchu");
    } catch (ex) {
      console.error(ex);
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      style={{ flex: 1, resizeMode: "contain" }}
    >
      <View style={{ marginTop: "10%", flex: 1, alignItems: "center" }}>
        <Text style={[patterns.centerText, { margin: "2%" }]}>
          ĐĂNG NHẬP NGƯỜI DÙNG
        </Text>
        <Icon style={[UserStyles.iconLogin, {textAlign: 'left'}]} name="user" size={30} />
        <TextInput
          value={username}
          onChangeText={(t) => setUsername(t)}
          style={UserStyles.input}
          placeholder="Nhập tài khoản..."
        />
        <Icon style={UserStyles.iconLogin} name="lock" size={30} />
        <TextInput
          secureTextEntry={true}
          value={password}
          onChangeText={(t) => setPassword(t)}
          style={UserStyles.input}
          placeholder="Nhập mật khẩu..."
        />
        {loading === true ? (
          <ActivityIndicator />
        ) : (
          <>
            <TouchableOpacity onPress={login} style={{ marginTop: "1%" }}>
              <Text style={UserStyles.btnLogin}>Đăng nhập</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ImageBackground>
  );
};
export default Login;
