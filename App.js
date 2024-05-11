
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/User/Login';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler'
import Hoidong from './components/HoiDong/Hoidong';
import Home from './components/Home/Home';
import HoidongDetail from './components/HoiDong/HoidongDetail';
import ThanhvienDetail from './components/HoiDong/Thanhvien';
import MyContext from './components/User/MyContext';
import MyUserReducer from './reducer/MyUserRedcer';
import Logout from './components/User/Logout';
import Register from './components/User/Register';
import AddHoidong from './components/HoiDong/AddHoidong';
import HoidongProvider from './components/HoiDong/HoidongProvider';
import { GlobalStateProvider } from './components/HoiDong/DltProvider';
import DiemDetail from './components/Diem/DiemDetail';
import Chat from './components/Chat/Chat'
import Chats from './ChatApp';
const Drawer = createDrawerNavigator(); 
export default function App() {
  const [user, dispatch] = useReducer(MyUserReducer, null);

  return (
    
    <GlobalStateProvider>
    <KLStateProvider>
    <HoidongProvider>
    <MyContext.Provider value={[user, dispatch]}>
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{headerRight: Logout}}>
        <Drawer.Screen name='Trangchu' component={Home} options={{title:'Trang chủ'}}/>
        {user===null?<><Drawer.Screen name='Dangnhap' component={Login} options={{title:'Đăng nhập'}}/></>:
        <>
          <Drawer.Screen name={"Xin chào "+ user.chucvu+": "+user.username+"!!!! "} component={Home}/>
          <Drawer.Screen name='ChatApp' component={Chats}options={{title:'Chat App'}}/>
          {user.chucvu==='GIAOVU' || user.chucvu==='ADMIN' || user.chucvu==='GIANGVIEN'?<>
          <Drawer.Screen name='Hoidong' component={Hoidong}options={{title:'Hội đồng'}}/>
          <Drawer.Screen name='HoidongDetail' component={HoidongDetail} options={{drawerItemStyle:{display:'none'}, title: 'Chi tiết hội đồng'}} />
          <Drawer.Screen name='AddHoidong' component={AddHoidong} options={{drawerItemStyle:{display:'none'}, title:'Thêm thành viên hội đồng'}} />
          <Drawer.Screen name='ThanhvienDetail' component={ThanhvienDetail} options={{drawerItemStyle:{display:'none'}, title: 'Chi tiết thành viên'}} />
          <Drawer.Screen name='DiemDetail' component={DiemDetail} options={{drawerItemStyle:{display:'none'}, title: 'Chi tiết điểm'}} />
          <Drawer.Screen name='MyHoidong' component={MyHoidong} options={{title: 'My Hội đồng'}} />
          <Drawer.Screen name='Khoaluan' component={Khoaluan} options={{title:'Khoá luận'}} />
          <Drawer.Screen name='CreateDiem' component={CreateDiem} options={{drawerItemStyle:{display:'none'}, title: 'Cho điểm'}} />
          {user.chucvu==='GIAOVU' || user.chucvu === 'ADMIN'?<>
          <Drawer.Screen name='Register' component={Register} options={{title:'Đăng kí'}} />
          </>:<></>}
          
          
          </>:<></>}
          

        </>}

      
        
        
      </Drawer.Navigator>
    </NavigationContainer>
    </MyContext.Provider>
    </HoidongProvider>
    </KLStateProvider>
    </GlobalStateProvider>
  );
}




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Users from './Users';
import MyHoidong from './components/User/MyHoidong';
import Khoaluan from './components/KhoaLuan/Khoaluan';
import CreateDiem from './components/KhoaLuan/CreateDiem';
import { KLStateContext, KLStateProvider } from './components/KhoaLuan/KhoaLuanContext';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7-mbNqkW2bJ6phd3gL-5SI_aQcY5C-4A",
  authDomain: "chatappv2-22ba0.firebaseapp.com",
  databaseURL: "https://chatappv2-22ba0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatappv2-22ba0",
  storageBucket: "chatappv2-22ba0.appspot.com",
  messagingSenderId: "611447569425",
  appId: "1:611447569425:web:d6dfd0aa7ab72560ca85b0"
};

// Initialize Firebase
initializeApp(firebaseConfig);
