import React, { useContext, useEffect } from "react"
import { useState } from "react"
import API, { endpoints } from "../../configs/API";

import { ActivityIndicator, View,Text, ImageBackground, Alert } from "react-native";
import { patterns } from "../../styles/MyStyles";
import { hoidongStyle } from "./HoidongStyles";
import { Image } from "react-native";

const ThanhvienDetail  = ({id}) => {

    const [tv, setTv] = useState(null)

    useEffect(()=>{
        const loadTv = async() => {
            try
            {
                let res = await API.get(endpoints['thanhvien_detail'](id))
                setTv(res.data)
            }
            catch(ex)
            {
                console.error(ex)
            }
        }
        loadTv()
    },[])
    return(
        <ImageBackground source={{
            uri: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          style={{ flex: 1, resizeMode: "contain" }}>
            {tv===null?(<ActivityIndicator/>):
            <>
            
              <View style={[patterns.list, hoidongStyle.list_gvhd, {height: "100%", marginTop: "5%"}]}>
                <Image resizeMode="stretch" style={{width: 150, height: 150, marginLeft: "25%", borderRadius: 75}} source={{uri: `${tv.avt}`}}/>
                <View style={{padding: 5}}>
                <Text style={hoidongStyle.text_list_gvhd}>Họ: <Text style={{color: "black"}}>{tv.last_name}</Text></Text>
                  <Text style={hoidongStyle.text_list_gvhd}>Tên: <Text style={{color: "black"}}>{tv.first_name}</Text></Text>

                  <Text style={hoidongStyle.text_list_gvhd}>ID: <Text style={{color: "black"}}>{tv.id}</Text></Text>
                  <Text style={hoidongStyle.text_list_gvhd}>Email: <Text style={{color: "black"}}>{tv.email}</Text></Text>
                  <Text style={hoidongStyle.text_list_gvhd}>Chức vụ: <Text style={{color: "black"}}>{tv.chucvu}</Text></Text>
                  </View>
              </View>
            </>
        }
        </ImageBackground>
    )
}
export default ThanhvienDetail