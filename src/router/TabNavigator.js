import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen/HomeScreen';
import Entypo  from 'react-native-vector-icons/Entypo';
import MenuEntypo  from 'react-native-vector-icons/Entypo'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeStack from './HomeStack';
import ShoppingCartStack from './ShoppingCartStack';
import ProfileScreen from '../screen/ProfileScreen';
import OrderScreen from '../screen/OrderScreen';
import OrderStack from './OrderStack';
import { UserContext } from './UserContext';
import { useRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const route=useRoute();
  const idUser=route.params.idUser;
  return (
    <UserContext.Provider value={idUser}>
        <Tab.Navigator 
            screenOptions={{headerShown: false}}
            tabBarOptions={{showLabel: false,activeTintColor: '#e80e27', inactiveTintColor: 'pink'}}>
            <Tab.Screen name = "HomeStack" component={HomeStack} 
                        options={{tabBarIcon : ({focus,color,string})=><Entypo name="home" size={18} color={color}/>}}
            />
            <Tab.Screen name = "Profile" component={ProfileScreen}
                        options={{tabBarIcon : ({focus,color,string})=><MaterialCommunityIcons name="account" size={18} color={color}/>}}
            />
            <Tab.Screen name = "ShoppingCartStack" component={ShoppingCartStack}
                        options={{tabBarIcon : ({focus,color,string})=><FontAwesome name="shopping-cart" size={18} color={color}/>}}
            />
            <Tab.Screen name = "OrderStack" component={OrderStack}
                        options={{tabBarIcon : ({focus,color,string})=><MenuEntypo name="menu" size={18} color={color}/>}}
            />
       </Tab.Navigator>
    </UserContext.Provider>
  )
}

export default TabNavigator;