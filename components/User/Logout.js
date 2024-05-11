import { useContext } from "react"
import { Button, TouchableOpacity,Text } from "react-native"
import MyContext from "./MyContext"

const Logout = () => {
    const [user, dispatch] = useContext(MyContext)
    const logout = () => {
        dispatch({
            type: "logout"
        })
    }
//<Button title="Đăng xuất" onPress={logout}/>
    return <TouchableOpacity style={{marginRight:5,backgroundColor: "red", padding: 13,display: user!==null?"flex":"none"}} onPress={logout}>
        <Text style={{fontWeight: "bold", color:"white"}}>Đăng xuất</Text>
    </TouchableOpacity>
    

    
}

export default Logout;