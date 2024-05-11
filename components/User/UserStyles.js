import { StyleSheet } from "react-native";

export default StyleSheet.create({
    input:{
        width: '90%',
        height: 50,
        padding: 10,
        margin: "1%",
        backgroundColor: '#fff', 
        borderBottomWidth: 1,
        position: 'relative'
    },
    btnLogin:{
        textAlign: 'center',
        backgroundColor: "#0055A8",
        color: "white",
        padding: 10,
    },
    iconLogin:{
        marginTop: 10,
        color: 'black',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 70
    },
    avt:{
        borderRadius: 75,
        width: 150,
        height: 150,
        marginBottom: 10,
        marginLeft: 20,
        marginTop: 20,
        marginRight: 20
    },
    imgName:{
        backgroundColor: 'lightgray',
        color: 'black',
        padding: 10

    },
    ipIcon:{
        fontSize: 25,
        position: 'absolute',
        top: 10,
        zIndex: 1000
    },
    endTextSelected:{
        textAlign: "left",
        color: "yellow",
        padding: 15,
        marginLeft: 10,
        fontWeight: "bold",
        fontSize: 20,

    },
    textColor:{
        color: "white",
        textAlign: "left"
    }
})