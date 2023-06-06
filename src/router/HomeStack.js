import { View, Text, TextInput } from 'react-native';
import React,{useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen/HomeScreen';
import ProductScreen from '../screen/ProductScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather'

const Stack=createNativeStackNavigator();

const HeaderCommponent = ({searchValue,setSearchValue})=>{
  return (
      <SafeAreaView style ={{backgroundColor:'#66d5e8', height: 90, justifyContent:'center'}}>
          <View style = {{backgroundColor: 'white',height: 40,margin: 10,flexDirection:'row',alignItems: 'center'}}>
              <Icon style={{marginLeft: 5}} name="search" size ={18}/>
              <TextInput placeholder='Search...' value={searchValue} onChangeText={setSearchValue} style ={{padding: 5}} />
          </View>
      </SafeAreaView>
  )
}

const HomeStack = () => {

  const [searchValue,setSearchValue]=useState("")

  return (
        <Stack.Navigator screenOptions={{header: ()=><HeaderCommponent searchValue={searchValue} setSearchValue={setSearchValue}/>}}>
              <Stack.Screen name="HomeScreen" options={{title:'Home'}}>
                  {()=><HomeScreen searchValue={searchValue}/>}
              </Stack.Screen>
              <Stack.Screen component={ProductScreen} name="ProductDetail"/>
        </Stack.Navigator>
  )
}

export default HomeStack