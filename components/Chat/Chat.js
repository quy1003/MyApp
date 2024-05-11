import React, { useState } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import ChatItem from "./ChatItem";
const Chat = (props) => {

    const [users, setUsers] = useState([
        {
            url: 'https://randomuser.me/api/portraits/men/70.jpg',
            name: 'Amanda Wailer',
            message: 'Hello, How are you?',
            numberOfUnreadMessages: 3
        },
        {
            url: 'https://randomuser.me/api/portraits/men/30.jpg',
            name: 'Wong',
            message: 'What news?',
            numberOfUnreadMessages: 0
        },
        {
            url: 'https://randomuser.me/api/portraits/men/40.jpg',
            name: 'Leechang',
            message: 'Hi guy?',
            numberOfUnreadMessages: 10
        },
        {
            url: 'https://randomuser.me/api/portraits/men/50.jpg',
            name: 'sakauno',
            message: 'Is it ok?',
            numberOfUnreadMessages: 4
        },
        {
            url: 'https://randomuser.me/api/portraits/men/60.jpg',
            name: 'Amanda Wailer',
            message: 'How old are u?',
            numberOfUnreadMessages: 99
        }
    ])
    const {navigation, route} = props
    const {navigate} = navigation
    
    return(
        <View style={{marginTop: 10}} >
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingStart: 10}}>
                <Text style={{color: "red", padding: 10}}>6 unread message</Text>
                <Icon name="trash" size={23} onPress={()=>{Alert.alert('You pressed delete')}} style={{padding: 15}} />
            </View>
            <View>
                <FlatList data={users} 
                renderItem={({item})=><ChatItem onPress={()=>{navigate("Messenger", {user:item});}} user={item} key={item.url}/>}
                keyExtractor={item=>item.url}
                />
            </View>
        </View>
    )
}

export default Chat