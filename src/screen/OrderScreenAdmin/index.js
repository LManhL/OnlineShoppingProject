import { View, Text,FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { listOrders } from '../../graphql/queries';
import {API,graphqlOperation} from "aws-amplify"
import { onCreateOrder } from '../../graphql/subscriptions';
import { onUpdateOrder } from '../../graphql/subscriptions';
import ItemOrderAdmin from '../../components/ItemOrderAdmin'

const OrderScreenAdmin = ({searchValue}) => {
  const [orders,setOrders]=useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [checkLoad,setCheckLoad]=useState(false);
  async function getAllOrders(){
      // List all items
      const allOrders = await API.graphql({
        query: listOrders
      });
      let res=allOrders.data.listOrders.items
      setOrders(res)
      setFilteredData(res)
      setCheckLoad(true);
  }

  const searchFilterFunction = (text) => {
    if(orders.length==0){
        return;
    }
    if(text.length==0) {
        setFilteredData(orders)
        return;
    }

    const newData = orders.filter((item) => {
      const status = item.Status.toUpperCase();
      const name=item.FullName.toUpperCase();
      const searchTextData = text.toUpperCase();
      return status.indexOf(searchTextData) > -1 || name.indexOf(searchTextData)>-1;
    });
    setFilteredData(newData);
  };

  useEffect(()=>{
    getAllOrders();
  },[])

  useEffect(()=>{
    searchFilterFunction(searchValue)
  },[searchValue])

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
    const subscription = API.graphql(graphqlOperation(onUpdateOrder)).subscribe({
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
        data={filteredData}
        renderItem = {({item})=><ItemOrderAdmin props={item}/>}
        keyExtractor={item=>item.id}
        showsHorizontalScrollIndicator = {false}
      />
    </View>
  )
}

export default OrderScreenAdmin;