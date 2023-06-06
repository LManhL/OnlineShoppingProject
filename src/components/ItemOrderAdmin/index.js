import { View, Text,TouchableHighlight,Alert } from 'react-native'
import React,{useState} from 'react'
import styles from './styles'
import {useNavigation,useRoute} from '@react-navigation/native'
import { API } from 'aws-amplify'
import { updateOrder } from '../../graphql/mutations'

const ItemOrderAdmin = ({props}) => {
  const navigation = useNavigation();

  async function onPress(){
      navigation.navigate("OrderDetailScreen",{id: props.id})
      console.log("cdg the")
  }
  async function handleDelivering(){
      const updatedOrder = await API.graphql({
        query: updateOrder,
        variables: {
            input: {
            "id":props.id,
            "Status":"Delivering..."
      }
        }
    });
  }
  async function handleDelivered(){
      const updatedOrder = await API.graphql({
        query: updateOrder,
        variables: {
            input: {
            "id":props.id,
            "Status":"Delivered"
      }
        }
    });
  }
  const onLongPress=()=>{
    if(props.Status=="Unprocessed"){
      Alert.alert('Confirm', 'Are you sure to delivery this order?', [
        {text: 'Yes', onPress: () =>handleDelivering()},
        {
          text: 'Cancel',
          style:'cancel'
        },
      ]);
    }
    else if(props.Status=="Delivering..."){
      Alert.alert('Confirm', 'Are you sure to confirm the item has been transported successfully?', [
        {text: 'Yes', onPress: () =>handleDelivered()},
        {
          text: 'Cancel',
          style:'cancel'
        },
      ]);
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

export default ItemOrderAdmin