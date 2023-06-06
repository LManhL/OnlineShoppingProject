import { View, Text, TextInput, Pressable } from 'react-native';
import React,{useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather'
import HomeScreenAdmin from '../screen/HomeScreenAdmin';
import ProductScreenAdmin from '../screen/ProductScreenAdmin';
import { createProduct } from '../graphql/mutations';
import { API } from 'aws-amplify';
import CreateProductScreen from '../screen/CreateProductScreen';

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

const HomeStackAdmin = () => {

  const [searchValue,setSearchValue]=useState("")

  return (
        <Stack.Navigator screenOptions={{header: ()=><HeaderCommponent searchValue={searchValue} setSearchValue={setSearchValue}/>}}>
              <Stack.Screen name="HomeScreenAdmin" options={{title:'Home'}}>
                  {()=><HomeScreenAdmin searchValue={searchValue}/>}
              </Stack.Screen>
              <Stack.Screen component={ProductScreenAdmin} name="ProductDetailAdmin"/>
              <Stack.Screen component={CreateProductScreen} name="CreateProductScreen"/>
        </Stack.Navigator>
  )
}

export default HomeStackAdmin