import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginStack from './LoginStack';
import TabNavigatorAdmin from './TabNavigatorAdmin';


const root=createNativeStackNavigator();

const Router = () => {
  return (
        <NavigationContainer >
            <root.Navigator screenOptions={{headerShown: false}} initialRouteName="LoginStack">
               <root.Screen component={LoginStack} name="LoginStack"/>
               <root.Screen component={TabNavigator} name="HomeTabs"/>
               <root.Screen component={TabNavigatorAdmin} name="HomeTabsAdmin"/>
            </root.Navigator>
         </NavigationContainer>
  )
}

export default Router;