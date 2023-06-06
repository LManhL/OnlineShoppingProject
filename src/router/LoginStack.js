import { View, Text,SafeAreaView } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screen/LoginScreen';
import CreateAccountScreen from '../screen/CreateAccountScreen';

const Stack=createNativeStackNavigator();
const LoginStack = () => {
  const HeaderCommponent = ()=>{
    return (
        <SafeAreaView style ={{backgroundColor:'#66d5e8', height: 70, justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:24, fontWeight:'600',color:'black'}}>LOGIN</Text>
        </SafeAreaView>
    )
  }
  return (
    <Stack.Navigator screenOptions={{header: ()=><HeaderCommponent/>}}>
        <Stack.Screen component={LoginScreen} name="LoginScreen"/>
        <Stack.Screen component={CreateAccountScreen} name="CreateAccountScreen"/>
    </Stack.Navigator>
  )
}

export default LoginStack;