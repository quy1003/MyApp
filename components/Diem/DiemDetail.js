import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { ImageBackground, ScrollView, View } from "react-native"
import API, { endpoints } from "../../configs/API";
import { ActivityIndicator } from "react-native";
import { Text } from "react-native";
import { patterns } from "../../styles/MyStyles";
import DiemStyles from "./DiemStyles";

import Icon from 'react-native-vector-icons/FontAwesome';
import { KLStateContext } from "../KhoaLuan/KhoaLuanContext";
const DiemDetail = ({route, navigation}) =>{
  const {khoaluanId} = route.params
  // const {KLState, setKLState} = useContext(KLStateContext)
  // const memoizedKLState = useMemo(() => KLState, [KLState]);
  const [loading, setLoading] = useState(true)
    const [diem, setDiem] = useState(null)
    // const khoaluanId = 1
    useEffect(() => {
        
        const loadDiem = async () => {
          try {
            setLoading(true)
            let res = await API.get(endpoints['diem_detail'](khoaluanId))
            
            setDiem(res.data);
          } catch (ex) {
            setDiem([]);
            console.error(ex);
          }
        };
        loadDiem();
        setLoading(false)
      }, [khoaluanId]);
      

      const loadBack = () => {
        navigation.navigate("Khoaluan")
      }
    return(
      <ScrollView>
        <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      style={{ flex: 1, resizeMode: "contain"}}> 
        {loading===true?<><ActivityIndicator/></>:<>
        <View>
        <View style={{flex:1,
alignItems: 'flex-start', marginTop: 10}} >
      <Icon onPress={()=>loadBack()} name="arrow-left" size={30} color="rgba(255,255,255,0.85)" style={{padding:14,marginLeft: 5, marginBottom: 8, backgroundColor: 'green'}} />
</View>
                {diem===null?<ActivityIndicator/>:<View>
                    <Text style={[patterns.centerText, DiemStyles.pd10, {textAlign: "center", marginTop: 20}]}>{diem.ten}</Text>
                    <Text style={[patterns.text_header, {textAlign: "center"}]}>Tổng điểm: {diem.total_score}</Text>
                    {diem.diems.map((d, index) => (
                        <View style={[DiemStyles.borderDetail, DiemStyles.pd10, DiemStyles.mgbtm,{backgroundColor: "rgba(255,255,255,0.5)"} ]} key={index}>
                        <Text style={[DiemStyles.fontRedBold]}>Tiêu chí: 
                        <Text style={[DiemStyles.fontBlack]}> {d.tieuchi}</Text>
                        </Text>
                        <Text style={[DiemStyles.fontRedBold]}>Số điểm: 
                          <Text style={[DiemStyles.fontBlack]}> {d.so_diem}</Text>
                        </Text>
                        <Text style={[DiemStyles.fontRedBold]}>Nhận xét: 
                          <Text style={[DiemStyles.fontBlack]}> {d.nhanxet}</Text>
                        </Text>
                        <Text style={[DiemStyles.fontRedBold]}>Người đánh giá: 
                        <Text style={[DiemStyles.fontBlack]}> {d.nguoi_danhgia}</Text>
                        </Text>
                        </View>
                      ))}
                    </View>}
                    <View style={{marginBottom: 20}}></View>
            </View>
        </>}
            
            </ImageBackground>
            </ScrollView>
    )
}

export default DiemDetail