import { View, Text, Image, TouchableOpacity, TouchableHighlight,Alert } from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles';
import QuantitySelectorCart from './QuantitySelectorCart';
import { updateCartProduct,deleteCartProduct } from '../../graphql/mutations';
import { API, graphqlOperation } from "aws-amplify";
import {useNavigation,useRoute} from '@react-navigation/native'


const ItemCartShopping = ({props}) => {
  const [quantity,setQuantity]=useState(props.quantity)
  const navigation = useNavigation();

  async function onPressDelete(){
    Alert.alert('Confirm', 'Are you sure to delete the item?', [
      {text: 'Yes', onPress:()=>deleteProduct()},
      {
        text: 'Cancel',
        style:'cancel'
      },
    ]);
  }

  async function deleteProduct(){
    const oneProduct = await API.graphql({
      query: deleteCartProduct,
      variables: {
        input: {
            "id": props.id,
        }
      }
    });
  }

  async function UpdateProduct(){
      const oneProduct = await API.graphql({
        query: updateCartProduct,
        variables: {
          input: {
              "id": props.id,
              "quantity": quantity
          }
        }
      });
      console.log(oneProduct)
  }
  useEffect(()=>{
      UpdateProduct();
      console.log("change quantity")
  },[quantity])
  const onPress = ()=>{
    navigation.navigate("ProductDetail",{id: props.item.id,idCartProduct: props.id,quantity: props.quantity, option: props.option})
  }
  return (
    <TouchableHighlight
      onLongPress={onPressDelete}
      activeOpacity={0.7}
      underlayColor={'#55b6d9'}
      onPress={onPress}
      >
      <View>
        <View style={styles.root}>
                  <Image style={styles.image} 
                        source={{uri: props.item.image}}/>
                  <View style={styles.containerText}>
                      <Text style={styles.title} numberOfLines={3}>{props.item.title}</Text>
                      {/* rating */}
                      <View style={styles.ratingsContainer}>
                          { 
                            [0,0,0,0,0].map(
                            (element, index,array)=>{
                              var x = Math.floor(props.item.avgRating)
                              var name = index < x ? "star" : (((props.item.avgRating-x)>0.5 && (index-x==0)) ? "star-half-o" : "star-o")
                              return <Icon key={`${props.id}-${index}`} style={styles.star} name = {name} size={18} color="#e47911"/>
                            }
                          )}
                          <Text>{props.item.ratings}</Text>
                      </View>
                      <View style={styles.priceContainer}>
                          <Text style={styles.price}>from ${props.item.price}</Text>
                          {props.item.oldPrice && <Text style={styles.oldPrice}>${props.item.oldPrice}</Text>}
                      </View>
                  </View>
          </View>
          <QuantitySelectorCart style ={styles.quantity} quantity={quantity} setQuantity={setQuantity}/>
      </View>
    </TouchableHighlight>
  )
}

export default ItemCartShopping;