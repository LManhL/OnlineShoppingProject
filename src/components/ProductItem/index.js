import { View, Text, Image,Pressable, TouchableHighlight } from 'react-native';
import {useNavigation,useRoute} from '@react-navigation/native'
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import QuantitySelector from '../QuantitySelector';
import { useState } from 'react';

const ProductItem = ({props}) => {
  const [quantity,setQuantity] = useState(0);
  const navigation = useNavigation();
  
  const onPress =()=>{
      navigation.navigate("ProductDetail",{id: props.id})
  }
  return (
    <TouchableHighlight 
        activeOpacity={0.7}
        underlayColor={'#55b6d9'} 
        onPress={onPress}>
      <View style={styles.root}>
                <Image style={styles.image} 
                       source={{uri: props.image}}>
                </Image>
                <View style={styles.containerText}>
                    <Text style={styles.title} numberOfLines={3}>{props.title}</Text>
                    {/* rating */}
                    <View style={styles.ratingsContainer}>
                        { 
                          [0,0,0,0,0].map(
                          (element, index,array)=>{
                            var x = Math.floor(props.avgRating)
                            var name = index < x ? "star" : (((props.avgRating-x)>0.5 && (index-x==0)) ? "star-half-o" : "star-o")
                            return <Icon key={`${props.id}-${index}`} style={styles.star} name = {name} size={18} color="#e47911"/>
                          }
                        )}
                        <Text>{props.ratings}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                         <Text style={styles.price}>from ${props.price}</Text>
                         {props.oldPrice && <Text style={styles.oldPrice}>${props.oldPrice}</Text>}
                    </View>
                </View>
        </View>
        
    </TouchableHighlight>
  )
}

export default ProductItem;