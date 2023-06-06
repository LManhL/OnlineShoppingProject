import { View, Text, Image, TouchableOpacity, TouchableHighlight,Alert } from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles';
import QuantitySelectorCart from './QuantitySelectorCart';
import {useNavigation,useRoute} from '@react-navigation/native'


const ItemOrderProduct = ({props}) => {
  const [quantity,setQuantity]=useState(props.quantity)
  const navigation = useNavigation();
  const onPress = ()=>{
    navigation.navigate("ItemOrderDetail",{id: props.item.id,quantity: props.quantity, option: props.option})
  }
  return (
    <TouchableHighlight
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

export default ItemOrderProduct;