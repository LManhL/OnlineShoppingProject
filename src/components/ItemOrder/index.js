import { View, Text,TouchableHighlight,Alert } from 'react-native'
import React,{useState} from 'react'
import styles from './styles'
import {useNavigation,useRoute} from '@react-navigation/native'
import { API } from 'aws-amplify'
import { deleteOrder } from '../../graphql/mutations'

const ItemOrder = ({props}) => {
  const navigation = useNavigation();

  async function onPress(){
      navigation.navigate("OrderDetailScreen",{id: props.id})
  }

  async function deleteOrderGraphQL(){
      const deletedOrder = await API.graphql({
          query: deleteOrder,
          variables: {
              input: {
                  id: props.id
              }
          }
      });
      console.log(deletedOrder)
  }

  const onLongPress=()=>{
    if(props.Status=="Unprocessed" || props.Status=="Delivered"){
      Alert.alert('Confirm', 'Are you sure to delete this order?', [
        {text: 'Yes', onPress: () =>deleteOrderGraphQL()},
        {
          text: 'Cancel',
          style:'cancel'
        },
      ]);
    }
    else {
      Alert.alert('You can not delete the order in delivering state!')
    }
  }

  return (
    <TouchableHighlight 
        onLongPress={onLongPress}
        activeOpacity={0.5}
        underlayColor={'#55b6d9'} 
        onPress={onPress}>
        <View style={styles.container}>
            <Text style={styles.textStatus }>Status: {props.Status}</Text>
            <Text style={styles.textRow}>FullName: {props.FullName}</Text>
            <Text style={styles.textRow}>PhoneNumber: {props.PhoneNumber}</Text>
            <Text style={styles.textRow}>Address: {props.Address}, {props.City}, {props.Country}</Text>
            <Text style={styles.textRow}>TotalMoney: {props.TotalMoney}</Text>
        </View>  
    </TouchableHighlight>
  )
}

export default ItemOrder