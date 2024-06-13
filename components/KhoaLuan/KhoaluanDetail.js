import { ActivityIndicator, ImageBackground, ScrollView, TouchableOpacity } from "react-native"
import { Text, View } from "react-native"
import { patterns } from "../../styles/MyStyles"
import { useContext, useEffect, useState } from "react"
import API, { endpoints } from "../../configs/API"
import DiemStyles from "../Diem/DiemStyles"
import { Linking } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome";
import { KLStateContext } from "./KhoaLuanContext"
const KhoaluanDetail = ({route, navigation}) => {
  const loadBack = () => {
    navigation.navigate("Khoaluan");
  };
  const {KLState, setKLState} = useContext(KLStateContext);
    const [trangthai, setTrangthai] = useState(false)
    const {khoaluanId} = route.params
    const [detail, setDetail] = useState(null)
    useEffect(()=>{
        const loadKhoaluan = async () => {
            try{
                let res = await API.get(endpoints['khoaluan_detail'](khoaluanId))
                setDetail(res.data)
                setTrangthai(res.data.trangthai)
                
                
              }
            catch(ex){
                console.error(ex)
            }
        };
        loadKhoaluan()
    },[khoaluanId, KLState])

    const handleLinkPress = (link) => {
      Linking.openURL(link);
    };

    return (
        <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      style={{ flex: 1, resizeMode: "contain" }}
    >
        {/* <View style={{ marginTop: "2%", flex: 1, alignItems: "center" }}> */}
      <Text style={[patterns.centerText, { marginTop: "2%" }]}>Chi tiết khoá luận</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => loadBack()}>
                      <Icon
                        name="arrow-left"
                        size={30}
                        color="rgba(255,255,255,0.85)"
                        style={{
                          padding: 14,
                          marginLeft: 5,
                          marginBottom: 8,
                          backgroundColor: "green",
                        }}
                      />
                    </TouchableOpacity>
                  </View>
      {/* </View> */}
      <ScrollView style={{backgroundColor: trangthai===true? 'rgba(255, 255, 255, 0.5)' : 'rgba(128, 128, 128, 0.5)'}}>
        {detail === null ? <ActivityIndicator/> : <>
            
                    <>
                    <View key={detail.id} style={[DiemStyles.borderDetail, DiemStyles.pd10, DiemStyles.mgbtm ]} >
                    <Text style={[patterns.centerText, DiemStyles.pd10, {textAlign: "center", marginTop: 5}]}>{detail.ten}</Text>
                        <Text style={[DiemStyles.fontBlueBold, {marginTop: 10}]}>ID: 
                        <Text style={[DiemStyles.fontBlack]}> {detail.id}</Text>
                        </Text>
                        <Text style={[DiemStyles.fontBlueBold]}>Sinh viên: 
                        {detail.sinhvien.map((s)=>(
                        
                        <Text style={[DiemStyles.fontBlack]} key={s.id}> {s.full_name}</Text>
                    ))}
                        </Text>
                        <Text style={[DiemStyles.fontBlueBold]}>GVHD: 
                        {detail.gv_huongdan.map((s)=>(
                        
                        <Text style={[DiemStyles.fontBlack]} key={s.id}> {s.full_name}; </Text>
                    ))}
                        </Text>
                        <Text style={[DiemStyles.fontBlueBold]}>Khoa: 
                        <Text style={[DiemStyles.fontBlack]}> {detail.khoa.ten}</Text>
                        </Text>
                        <Text style={[DiemStyles.fontBlueBold]}>Hội đồng: 
                        <Text style={[DiemStyles.fontBlack]}> {detail.hoidong.ten}</Text>
                        </Text>
                        <Text style={[DiemStyles.fontBlueBold]}>Giáo vụ: 
                        <Text style={[DiemStyles.fontBlack]}> {detail.giaovu.username}</Text>
                        </Text>
                        <Text style={[DiemStyles.fontBlueBold]}>Ngày tạo: 
                        <Text style={[DiemStyles.fontBlack]}> {detail.ngaytao}</Text>
                        </Text>
                        <Text style={[DiemStyles.fontBlueBold]}>Ngày cập nhật: 
                        <Text style={[DiemStyles.fontBlack]}> {detail.ngaycapnhat}</Text>
                        </Text>
                        <Text style={[DiemStyles.fontBlueBold]}>Link: 
                        <Text onPress={()=>handleLinkPress(detail.link)} style={[DiemStyles.fontRedBold]}> {detail.link}</Text>
                        </Text>
                        <Text style={[DiemStyles.fontBlueBold]}>Ghi chú: 
                        <Text style={[DiemStyles.fontBlack]}> {detail.ghichu}</Text>
                        </Text>
  
                        </View>

                    {/* <Text style={[patterns.centerText, DiemStyles.pd10, {textAlign: "center", marginTop: 5}]}>{detail.ten}</Text>
                    <Text>ID: {detail.id}</Text>
                    <Text>Tên: {detail.ten}</Text>
                    <Text>Sinh viên: </Text>
                    {detail.sinhvien.map((s)=>(
                        
                        <Text key={s.id}>{s.full_name}</Text>
                    ))}
                    <Text>Hội đồng: {detail.hoidong.ten} </Text>
                    
                    <Text>Ngày tạo: {detail.ngaytao}</Text>
                    <Text>Ngày cập nhật: {detail.ngaycapnhat}</Text>
                    <Text>Link: {detail.link}</Text>
                    <Text>Ghi chú: {detail.ghichu}</Text>
                    <Text>Trạng thái: {detail.trangthai}</Text> */}

                    </>
            
        </>}
      </ScrollView>
      </ImageBackground>
    )
}

export default KhoaluanDetail