import { View, Text,FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { listOrders } from '../../graphql/queries';
import {API,graphqlOperation} from "aws-amplify"
import ItemOrder from '../../components/ItemOrder';
import { UserContext } from '../../router/UserContext';
import { useContext } from 'react';
import { onCreateOrder,onDeleteOrder } from '../../graphql/subscriptions';

const OrderScreen = () => {
  const [orders,setOrders]=useState([])
  const [checkLoad,setCheckLoad]=useState(false);
  const idUser=useContext(UserContext)
  async function getAllOrders(){
      // List all items
      const allOrders = await API.graphql({
        query: listOrders
      });
      let res=allOrders.data.listOrders.items
      console.log(res)
      res=res.filter(value=>value.userSub==idUser)
      setOrders(res)
      setCheckLoad(true);
  }

  useEffect(()=>{
    getAllOrders();
  },[])

  useEffect(()=>{
    const subscription = API.graphql(graphqlOperation(onCreateOrder)).subscribe({
        next: (data)=>{getAllOrders()},
        error: (error)=>console.warn(error)
    })
    return ()=>{
        subscription.unsubscribe()
    };
  },[])

  useEffect(()=>{
    const subscription = API.graphql(graphqlOperation(onDeleteOrder)).subscribe({
        next: (data)=>{getAllOrders()},
        error: (error)=>console.warn(error)
    })
    return ()=>{
        subscription.unsubscribe()
    };
  },[])

  if(checkLoad==false){
    return <ActivityIndicator/>
  }
  if(checkLoad==true && orders.length==0){
    return (
    <View style={{justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:16}}>You have no order</Text>
    </View>
    )
  }
  return (
    <View>
      <FlatList
        data={orders}
        renderItem = {({item})=><ItemOrder props={item}/>}
        keyExtractor={item=>item.id}
        showsHorizontalScrollIndicator = {false}
      />
    </View>
  )
}

export default OrderScreen;