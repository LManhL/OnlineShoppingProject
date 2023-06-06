import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity,KeyboardAvoidingView, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {listUsers} from '../../graphql/queries'
import { API, graphqlOperation } from 'aws-amplify';
import { onCreateUser } from '../../graphql/subscriptions';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers]=useState([]);
  const navigation=useNavigation();

  async function getListUsers(){
    const allUsers = await API.graphql({
      query: listUsers
    });
    console.log(allUsers)
    const loginInfor=allUsers.data.listUsers.items;
    const res=loginInfor.map((value)=>{
        return {
          id: value.id,
          PhoneNumber: value.PhoneNumber,
          Password: value.Password
        }
    })
    console.log(res);
    setUsers(res);
  }

  function checkLogin(phone,pass){
    const obj=users.find((value)=>value.PhoneNumber===phone && value.Password===pass);
    return obj;
  }

  const handleLogin = () => {
    let phone=phoneNumber.replace(/\s+/g, '');
    let pass=password.replace(/\s+/g, '');
    if(phone==='' || pass===''){
      alert("Can't let phone number or password empty!")
      return;
    }
    let obj=checkLogin(phone,pass);
    if(obj==undefined){
      alert("Wrong phone number or password");
      return;
    }
    if(phone=='999999999'){
      navigation.navigate("HomeTabsAdmin");
    }
    else 
      navigation.navigate("HomeTabs",{idUser: obj.id})
  };
  const userSub =()=>{
    navigation.navigate("CreateAccountScreen")
  }
  useEffect(()=>{
    getListUsers();
  },[])
  useEffect(()=>{
    const subscription = API.graphql(graphqlOperation(onCreateUser)).subscribe({
        next: (data)=>{getListUsers()},
        error: (error)=>console.warn(error)
    })
    return ()=>{
        subscription.unsubscribe()
    };
},[])
  return (
    <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder="Phone number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.buttonSub} onPress={userSub}>
          <Text style={{color: '#2c58e8',fontSize:14}}>Create account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
    </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonSub: {
    marginRight: 230,
    marginBottom: 10,
  }
});

export default LoginScreen;
