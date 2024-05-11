const MyUserReducer = (curentState, action) => {
    switch(action.type){
        case "login":
            return action.payload
        case "logout":
            return null
    }
    return curentState;
}
export default MyUserReducer;