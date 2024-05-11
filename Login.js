import React, { useContext, useEffect, useReducer } from 'react';
import {Alert, Button, StyleSheet, TextInput, View} from 'react-native';
import MyUserReducer from './reducer/MyUserRedcer';
import MyContext from './components/User/MyContext';

export default function Login({onLogin, username, setUsername}) {
  const [user, dispatch] = useContext(MyContext)
  
  
// try{
//   setUsername(user.username)
// }
// catch(ex){

// }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        // editable={false}
      />
      <Button title={'Login'} onPress={onLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#cacaca',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    marginBottom: 20,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
});