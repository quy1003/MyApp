import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const HOST = 'http://192.168.1.11:8000'
export const endpoints = {
    'dskhoaluan': '/dskhoaluan/',
    'dshoidong': '/hoidongs/',
    'hoidongdetail': (hoidongId) => `/hoidongdetail/${hoidongId}/thanhviens/`,
    'thanhvien_detail': (thanhvienId) => `/users/${thanhvienId}/`,
    'login': '/o/token/',
    'current_user': '/users/current_user/',
    'register': '/users/',
    'addhoidong': (hoidongId) => `/hoidongdetail/${hoidongId}/thanhviens/create/`,
    'dltthanhvien': (hoidongId, thanhvienId) => `/hoidongdetail/${hoidongId}/thanhviens/delete/${thanhvienId}/`,
    'dlthoidong': (hoidongId) => `/hoidongs/${hoidongId}/`,
    'diem_detail': (khoaluanId) => `/khoaluans/${khoaluanId}/diem_detail/`,
    'myhoidong': '/users/current_user/my_hoidong/',
    'khoaluan': '/khoaluans/',
    'diem_create': (khoaluanId) => `/khoaluans/${khoaluanId}/create_diem/`,
    'khoaluan_detail' : (khoaluanId) => `/khoaluans/${khoaluanId}/`,
    'patch_vaitro': (hoidongId) => `/hoidongdetail/${hoidongId}/thanhviens/patch/`,
    'patch_block': (khoaluanId) => `khoaluans/${khoaluanId}/block/`,
    'khoas': '/khoas/',
    'tieuchis': '/tieuchis/',
    'addkhoaluan': '/khoaluans/create-khoaluan/',
    'updatekhoaluan': (khoaluanId) => `/khoaluans/${khoaluanId}/update-khoaluan/`,
    'nottieuchis' : (khoaluanId) => `/khoaluans/${khoaluanId}/get_tieuchi_not/`,
    'updatelink': (khoaluanId) => `/khoaluans/${khoaluanId}/update_link/`,
    'email': '/emails/',
    'suggests': '/suggests/'
}

export const authApi = (accessToken) => {
    return axios.create({
        baseURL : HOST,
        headers: {
            'Authorization': `bearer ${accessToken?accessToken:AsyncStorage.getItem("access-token")}`
        }
    })
}



export default axios.create({
    baseURL: HOST

})