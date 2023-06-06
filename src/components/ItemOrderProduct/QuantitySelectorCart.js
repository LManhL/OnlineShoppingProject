import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

const QuantitySelectorCart = ({quantity,setQuantity}) => {
  return (
    <View style={styles.container}>
       <Pressable style={styles.pressMinus}
                  onPress={()=>setQuantity(quantity)}
        >
            <Text style={styles.font}>-</Text>
       </Pressable>
       <View style={styles.quantityContainer}>
            <Text style={styles.font}>{quantity}</Text>
       </View>
       <Pressable style={styles.pressAdd}
                  onPress={()=>setQuantity(quantity)}
        >   
            <Text style={styles.font}>+</Text>
       </Pressable>
    </View>
  )
}
const styles=StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    quantity: {
        
    },
    pressAdd: {
        width:40,
        height:40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#ced3db',
    },
    pressMinus: {
        width:40,
        height:40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#ced3db',
    },
    quantityContainer: {
        width:60,
        height:40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#f0f2f5',
        borderColor:'#ced3db',
    },
    font: {
        fontSize: 15,
    }
})
export default QuantitySelectorCart;