import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderScreen from '../screen/OrderScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderDetailScreen from '../screen/OrderDetailScreen';
import ItemOrderDetail from '../screen/ItemOrderDetail';

const Stack=createNativeStackNavigator();
const HeaderCommponent = ()=>{
    return (
        <SafeAreaView style ={{backgroundColor:'#66d5e8', height: 70, justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:24, fontWeight:'600',color:'black'}}>Orders</Text>
        </SafeAreaView>
    )
  }
const OrderStack = () => {
  return (
    <Stack.Navigator screenOptions={{header: ()=><HeaderCommponent/>}}>
        <Stack.Screen component={OrderScreen} name="OrderScreen" />
        <Stack.Screen component={OrderDetailScreen} name="OrderDetailScreen"/>
        <Stack.Screen component={ItemOrderDetail} name="ItemOrderDetail"/>
    </Stack.Navigator>
  )
}

export default OrderStack;