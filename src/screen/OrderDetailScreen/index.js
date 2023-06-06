import { View, Text,StyleSheet,FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API } from "aws-amplify";
import { listOrders, getOrder,getProduct } from "../../graphql/queries";
import { useRoute } from '@react-navigation/native';
import ItemCartShopping from '../../components/ItemCartShopping';
import ItemOrderProduct from '../../components/ItemOrderProduct';

const OrderDetailScreen = () => {
  const [products,setProducts]=useState([])
  const [AllCartProducts,setAllCartProducts]=useState([])
  const [cart,setCart]=useState([])
  const route=useRoute();

  async function getOneOrder(){
      // Get a specific item
      const oneOrder = await API.graphql({
        query: getOrder,
        variables: { id: route.params.id }
      });
      return oneOrder.data.getOrder;
  }

  async function getOneProduct(value){
      const oneProduct=await API.graphql({
        query: getProduct,
        variables:{id: value.productID}
      })
      return oneProduct.data.getProduct
  }
  
  async function getCartProducts(){
      const order= await getOneOrder();
      const listCartProducts=order.CartProducts;
      const result=[]
      for(let i in listCartProducts){
        let item=await getOneProduct(listCartProducts[i])
        result.push(item)
      }
      setProducts(result)
      setAllCartProducts(listCartProducts)
  }
  useEffect(()=>{
    getCartProducts()
  },[])
  useEffect(()=>{
    const cartResult = AllCartProducts.map((value,index)=>{
        return {
                quantity: value.quantity,
                option: value.option,
                item: products[index]
                }
    })
    console.log(cartResult)
    setCart(cartResult)
  },[AllCartProducts])
  if(AllCartProducts.length==0){
    return <ActivityIndicator/>
  }
  return ( 
    <View style={styles.container}>
            {/* Render product components */}
            <FlatList
                style={styles.list}
                data={cart}
                renderItem = {({item})=><ItemOrderProduct props={item}/>}
                keyExtractor={(item,index)=>index.toString()}
                showsHorizontalScrollIndicator = {false}
            />
        </View>
  )
}
const styles = StyleSheet.create({
  container:{
      
      padding: 10,
  },
  text: {
      marginTop: 10,
      fontWeight:'bold',
      fontSize:18
  },
  list: {
      
  }
})

export default OrderDetailScreen