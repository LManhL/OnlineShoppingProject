import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShoppingCartScreen from '../screen/ShoppingCart';
import ProductCartScreen from '../screen/ProductCartScreen';
import AddressScreen from '../screen/AddressScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack=createNativeStackNavigator();
const HeaderCommponent = ()=>{
  return (
      <SafeAreaView style ={{backgroundColor:'#66d5e8', height: 70, justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontSize:24, fontWeight:'600',color:'black'}}>Shopping Cart</Text>
      </SafeAreaView>
  )
}
const ShoppingCartStack = () => {
  return (
    <Stack.Navigator screenOptions={{header: ()=><HeaderCommponent/>}}>
        <Stack.Screen component={ShoppingCartScreen} name="ShoppingCart" options={{title:'Shopping Cart'}}/>
        <Stack.Screen component={ProductCartScreen} name="ProductDetail"/>
        <Stack.Screen component={AddressScreen} name="Address"/>
    </Stack.Navigator>
  )
}

export default ShoppingCartStack;