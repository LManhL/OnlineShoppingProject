import { View, TextInput } from 'react-native';
import React,{useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderScreenAdmin from '../screen/OrderScreenAdmin';
import OrderDetailScreen from '../screen/OrderDetailScreen';
import ItemOrderDetail from '../screen/ItemOrderDetail';
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
const OrderStackAdmin = () => {
  const [searchValue,setSearchValue]=useState("")
  
  return (
    <Stack.Navigator screenOptions={{header: ()=><HeaderCommponent searchValue={searchValue} setSearchValue={setSearchValue}/>}}>
        <Stack.Screen name="OrderScreenAdmin" options={{title:'Home'}}>
                  {()=><OrderScreenAdmin searchValue={searchValue}/>}
        </Stack.Screen>
        <Stack.Screen component={OrderDetailScreen} name="OrderDetailScreen"/>
        <Stack.Screen component={ItemOrderDetail} name="ItemOrderDetail"/>
    </Stack.Navigator>
  )
}

export default OrderStackAdmin;