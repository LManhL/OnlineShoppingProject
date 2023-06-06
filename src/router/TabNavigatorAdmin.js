import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo  from 'react-native-vector-icons/Entypo';
import MenuEntypo  from 'react-native-vector-icons/Entypo'; 
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import OrderScreenAdmin from '../screen/OrderScreenAdmin';
import HomeStackAdmin from './HomeStackAdmin';
import OrderStackAdmin from './OrderStackAdmin';

const Tab = createBottomTabNavigator();

const TabNavigatorAdmin = () => {
  const route=useRoute();
  return (
        <Tab.Navigator 
            screenOptions={{headerShown: false}}
            tabBarOptions={{showLabel: false,activeTintColor: '#e80e27', inactiveTintColor: 'pink'}}>
            <Tab.Screen name = "HomeStackAdmin" component={HomeStackAdmin} 
                        options={{tabBarIcon : ({focus,color,string})=><Entypo name="home" size={18} color={color}/>}}
            />
            <Tab.Screen name = "OrderStackAdmin" component={OrderStackAdmin}
                        options={{tabBarIcon : ({focus,color,string})=><MenuEntypo name="menu" size={18} color={color}/>}}
            />
       </Tab.Navigator>
  )
}

export default TabNavigatorAdmin;